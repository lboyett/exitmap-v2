import express, { Express, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { QueryResult } from "pg";
import uniqid from "uniqid";
import path from "path";
import passport from "passport";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  getExit,
  getReviewedExits,
  addExit,
  deleteExit,
} from "../controllers/exitController";
import {
  getExitImages,
  addImage,
  getMainImageData,
} from "../controllers/imageController";
import { getExitComments, addComment } from "../controllers/commentController";
import {
  addUser,
  populateTestUsers,
  UserData as UserDataType,
} from "../controllers/userController";
const router = express.Router();

// =========================== Exits ===========================

router.get("/exits/reviewed", async (req, res, next) => {
  try {
    const response = await getReviewedExits();
    res.send(response);
  } catch (err) {
    res.status(500).send("error");
  }
});

router.get("/exits/:id", async (req, res, next) => {
  try {
    let results: any = {};
    const exitData = await getExit(req.params.id);
    aggregate("data", exitData);
    const exitImages = await getExitImages(req.params.id);
    aggregate("images", exitImages);
    const exitComments = await getExitComments(req.params.id);
    aggregate("comments", exitComments);
    function aggregate(name: string, data: any) {
      results[name] = data;
      if (results.data && results.images && results.comments) {
        res.json(results);
      }
    }
  } catch (err) {
    res.status(500).send("Internal server error in the getExit request");
  }
});

router.post("/exits", async (req, res, next) => {
  const exit_data = req.body;
  try {
    const response = (await addExit(exit_data)) as QueryResult;
    res.status(200).send(response); //FixThis
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/exits/:id", async (req, res, next) => {
  try {
    const response = (await deleteExit(+req.params.id)) as QueryResult | number;
    if (response === 0) throw new Error("Delete failed");
    res.status(200).send(response.toString()); //FixThis
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// router.post("/users", async (req, res, next) => {
//   const user_data = req.body.headers;
//   try {
//     const response = await addUser(user_data);
//     console.log(response);
//     res.send("OK");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// router.post("/login", (req, res, next) => {
//   const login_data = req.body.headers;
//   console.log(login_data);
// });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

router.get("/success", (req, res) => {
  console.log("SUCCESS!!!!!!!!!!!!");
});

router.get("/failure", (req, res) => {
  console.log("FAILURE!!!!!!!!!!!!");
});

// router.post("/populate-test-users", (req, res, next) => {
//   let salt = crypto.randomBytes(16);
//   pool.query('INSERT INTO users (username, first_name, last_name, email, hashed_password, salt, is_approved, is_admin, is_deleted) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
//     req.body.username,
//     req.body.first_name,
//     req.body.last_name,
//     req.body.email,
//     crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256'),
//     salt,
//     true,
//     true,
//     false
//   ])
// })

router.post("/populate-test-users", (req, res, next) => {
  populateTestUsers();
});

// YOU NEED TO FIGURE OUT HOW TO POPULATE MULTIPLE USERS ALL AT ONE CLICK OF THE BUTTON

router.post("/users", async (req, res, next) => {
  const user_data = req.body.headers;
  try {
    const response = await addUser(user_data);
    res.send("OK");
  } catch (err) {
    res.send(err);
  }
});

//=========================== IMAGES ===========================

const s3 = new S3Client({
  apiVersion: "2006-03-01",
  region: "eu-central-1",
});

const bucketName = "lboyett-exitmap-v2";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.filename });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${uniqid()}${ext}`);
    },
  }),
}).single("image");

function uploadFile(req: Request, res: Response, next: Function) {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(500).send("A multer error occured during upload");
    } else if (err) {
      console.log(err);
      res.status(500).send("An unknown error occured during upload");
    } else {
      next();
    }
  });
}

router.get("/signed-url", async (req, res, next) => {
  const key = `${Date.now()}-${uniqid()}`;
  const s3 = new S3Client({
    apiVersion: "2006-03-01",
    region: "eu-central-1",
  });
  const command = new PutObjectCommand({
    Bucket: "lboyett-exitmap-v2",
    Key: key,
  });
  try {
    const url = await getSignedUrl(s3 as any, command as any, {
      expiresIn: 30,
    });
    res.send({ signedUrl: url, key: key });
  } catch (err) {
    console.log(err);
  }
});

router.post("/images", async (req, res, next) => {
  const { submitted_by, exit, url, key } = req.body;
  console.log(req.body);
  try {
    const response = (await addImage(
      submitted_by,
      exit,
      url,
      key
    )) as QueryResult;
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/images/:exit_id/main", async (req, res, next) => {
  try {
    const data = await getMainImageData(req.params.exit_id);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

//============================COMMENTS============================
router.post("/comments", async (req, res, next) => {
  try {
    const response = await addComment(
      req.body.comment,
      req.body.author_id,
      req.body.exit_id
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
