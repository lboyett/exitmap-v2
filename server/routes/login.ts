import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail } from "../controllers/userController";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw { status: 400, message: "Must input email" };
    const user = (await getUserByEmail(email)) as any;
    if (!user.is_approved) {
      res.status(403).send("User not approved");
      return;
    }
    await validatePassword(password, user.hashed_password, user.salt);
    delete user.hashed_password;
    delete user.salt;
    const session_id = uniqid();
    await storeSessionInRedis(session_id, user._id);
    res
      .status(200)
      .setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      .setHeader("Access-Control-Allow-Headers", "Content-Type, *")
      .cookie("token", session_id, {
        httpOnly: false,
        sameSite: "none", //FixThis
        secure: true,
        maxAge: 1000 * 60 * 60 * 48,
        signed: true,
      })
      .send(user);
  } catch (err: any) {
    console.log(err);
    if (err.status) res.status(err.status).send(err.message);
    else res.send(err);
  }
});

async function storeSessionInRedis(session_id: string, user_id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await redisClient.setEx(
        session_id.toString(),
        60 * 60,
        user_id.toString()
      );
      resolve("added");
    } catch (err) {
      console.log(err);
      reject("not added");
    }
  });
}

async function validatePassword(
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
