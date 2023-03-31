import express from "express";
import pool from "../pool-config";
import crypto from "crypto";
import uniqid from "uniqid";
import * as Redis from "redis";

const router = express.Router();
const redisClient = Redis.createClient();
redisClient.connect();
redisClient.on("connect", () => [
  console.log("\x1b[41m Redis connected\x1b[0m"),
]);

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = (await getUserByEmail(email)) as any;
    await validatePassword(password, user.hashed_password, user.salt);
    const session_id = uniqid();
    await storeSessionInRedis(session_id, user._id);
    res
      .status(200)
      .setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      .setHeader("Access-Control-Allow-Headers", "Content-Type, *")
      .cookie("token", session_id, {
        httpOnly: true,
        sameSite: "none", //FixThis
        secure: true,
        maxAge: 10000000,
        signed: true,
      })
      .send("ok");
  } catch (err: any) {
    if (err.status) res.status(err.status).send(err.message);
    else res.send(err);
  }
});

async function storeSessionInRedis(session_id: string, user_id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await redisClient.setEx(
        session_id.toString(),
        120,
        user_id.toString()
      );
      resolve("added");
    } catch (err) {
      console.log(err);
      reject("not added");
    }
  });
}

router.get("/test-redis", async (req, res) => {
  try {
    const session_id = req.signedCookies.token;
    const response = await redisClient.get(session_id.toString());
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

async function getUserByEmail(email: string) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) reject({ status: 500, message: "Internal server error" });
        else if (!results.rows[0])
          reject({ status: 401, message: "Email not found" });
        else resolve(results.rows[0]);
      }
    );
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
      if (!crypto.timingSafeEqual(storedHash, derivedKey))
        reject({ status: 401, message: "Incorrect password" });
      else resolve(true);
    });
  });
}

export default router;
