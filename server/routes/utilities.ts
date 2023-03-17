import express, { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const upload = multer().single("image");

router.post("/validate-file", upload, (req, res) => {
  const mimeTypes = [
    "image/avif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  if (!mimeTypes.includes(req.file.mimetype)) {
    res.status(415).send(false);
  } else if (req.file.size / (1024 * 1024) > 10) {
    res.status(413).send(false);
  } else {
    res.status(200).send(true);
  }
});

export default router;
