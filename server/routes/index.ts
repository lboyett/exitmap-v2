import express, { Express, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import * as AWS from "@aws-sdk/client-s3";
import { QueryResult } from "pg";
import uniqid from "uniqid";
import path from "path";
import passport from "passport";

import {
  getExit,
  getReviewedExits,
  addExit,
} from "../controllers/exitController";
import { getExitImages, addImage } from "../controllers/imageController";
import { getExitComments } from "../controllers/commentController";
import { addUser } from "../controllers/userController";
const router = express.Router();

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

router.post('/login', (req, res, next) => {
  console.log('You just posted to the /login route')
})

router.post("/users", async (req, res, next) => {
  const user_data = req.body.headers;
  try {
    const response = await addUser(user_data);
    res.send("OK");
  } catch (err) {
    res.send(err);
  }
});

const s3 = new AWS.S3Client({
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

router.post("/images", uploadFile, async (req, res, next) => {
  const exit = req.body.exit;
  const submitted_by = req.body.submitted_by;
  const url = req.file.location;
  try {
    const response = (await addImage(submitted_by, exit, url)) as QueryResult;
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
