import express, { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
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

export async function validatePassword(
  password: string,
  storedHash: Buffer,
  salt: Buffer
) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, derivedKey) => {
      if (err) reject(err);
      if (storedHash.length !== derivedKey.length) {
        reject({ status: 401, message: "Incorrect password" });
        return;
      }
      if (!crypto.timingSafeEqual(storedHash, derivedKey))
        reject({ status: 401, message: "Incorrect password" });
      else resolve(true);
    });
  });
}

export default router;
