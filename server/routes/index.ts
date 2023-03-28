import express, { Express, NextFunction, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { QueryResult } from "pg";
import uniqid from "uniqid";
import path from "path";
import passport from "passport";
import jwt from "jsonwebtoken";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

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

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any) => {
    if (err) {
      console.log("THERE IS AN ERROR AUTHORIZING THE TOKEN!!!!!!!");
      return res.sendStatus(403);
    }
    console.log("JWT IS AUTHORIZED!!!!!!!!!!");
    next();
  });
}

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

router.get("/exits/by-user/:id", async (req, res, next) => {
  const user_id = req.params.id;
  res.send(user_id);
});

//================== USERS AND AUTHENTICATION ==========================

// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/success",
//     failureRedirect: "/failure",
//   })
// );

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }

        // generate a signed son web token with the contents of user object and return it in the response

        const token = jwt.sign(
          { user: user },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: 10080 }
        );
        return res.json({ user, token });
      });
    }
  )(req, res);
});

router.get("/success", (req, res) => {
  res.json("IT WORKSSSSSS");
});

router.get("/failure", (req, res) => {
  console.log("FAILURE!!!!!!!!!!!!");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/populate-test-users", authenticateToken, (req, res, next) => {
  populateTestUsers();
});

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
