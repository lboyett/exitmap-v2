import express from "express";
import {
  getExitImages,
  addImage,
  getMainImageData,
} from "../controllers/imageController";
import { QueryResult } from "pg";
import { putUserAvatar } from "../controllers/userController";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const { submitted_by, exit, url, key, is_main } = req.body;
  try {
    const response = (await addImage(
      submitted_by,
      exit,
      url,
      key,
      is_main
    )) as QueryResult;
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:exit_id/main", async (req, res, next) => {
  try {
    const data = await getMainImageData(req.params.exit_id);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

router.put("/avatars/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { key } = req.body;
  try {
    await putUserAvatar(user_id, key);
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

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

export default router;
