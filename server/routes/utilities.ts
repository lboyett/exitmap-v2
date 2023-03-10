import express, { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const upload = multer().single("image");

router.post("/validate-file", upload, (req, res) => {
  console.log(req);
  res.send("ok");
});

export default router;
