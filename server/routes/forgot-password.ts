import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail } from "../controllers/userController";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;

  const uuid = crypto.randomUUID();

  try {
    const user = await getUserByEmail(email);
    res.status(200).send();
  } catch (err: any) {
    console.log(err.message);
    res.status(404).send(err.message);
  }

  try {
    const redis_response = await redisClient.hSet(uuid, {
      email: email,
      uuid: uuid,
    });
    const expiry_response = await redisClient.expire(uuid, 60 * 60);
    // const redis_value = await redisClient.hGetAll(uuid);
  } catch (err: any) {
    res.status(err.status).send(err.message);
  }

  async function main() {
    let transporter = nodemailer.createTransport({
      service: "smtp.zoho.eu",
      port: 465,
      auth: {
        user: "exitmap@exit-map.com",
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: '"ExitMap" <exitmap@exit-map.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Reset ExitMap Password", // Subject line
      text: `This message was sent to you by ExitMap. To reset your password, please click the following link, import.meta.env.VITE_CLIENT_DOMAIN/reset-password?uuid=${uuid}.`, // plain text body
      html: `<h1>Hello!</h1><br><p>This message was sent to you by ExitMap.</p><br><p>To reset your password, please click the following link:</p><br><h2>import.meta.env.VITE_CLIENT_DOMAIN/reset-password?uuid=${uuid}</h2>`, // html body
    });
  }

  main().catch(console.error);
});

export default router;
