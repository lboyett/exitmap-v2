import express, { Express, Request, Response } from "express";
import * as testController from "../controllers/testController";
import { getExit, addExit } from "../controllers/exitController";
import { getExitImages } from "../controllers/imageController";
import { getExitComments } from "../controllers/commentController";
import multer from "multer";
import multerS3 from "multer-s3";
import * as AWS from "@aws-sdk/client-s3";
const router = express.Router();

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
    key: (req: Request, file, cb) => {
      cb(null, file.originalname);
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

router.post("/exits", async (req, res, next) => {
  const exit_data = req.body;
  try {
    const response = await addExit(exit_data);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/images", uploadFile, async (req, res, next) => {
  res.status(200).send("OK");
});

router.get("/test", async (req, res) => {
  try {
    const exits = await testController.getExits();
    res.send(await exits);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
