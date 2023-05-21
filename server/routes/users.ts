import express from "express";
import {
  addUser,
  UserData as UserDataType,
  getUserById,
  changeUserPassword,
  getUnreviewedUsers,
  approveUser,
} from "../controllers/userController";
import authorizeUser from "../utils/authorizeUser";
import redisClient from "../redis-config";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { UserData } from "../controllers/userController";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const uuid = crypto.randomUUID();

router.post("/", async (req, res) => {
  const user_data = req.body.headers;
  const email = user_data.email;
  try {
    const redis_response = await redisClient.hSet(uuid, user_data);
    const expiry_response = await redisClient.expire(uuid, 60 * 60 * 24);
    const redis_value = await redisClient.hGetAll(uuid);
    console.log("User added to redis database");
    res.send("OK");
  } catch (err: any) {
    console.log("There is an error is the user posting to redis");
    console.log(err);
  }

  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: "exitmap@exit-map.com",
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: '"ExitMap" <exitmap@exit-map.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "ExitMap Email Verification", // Subject line
      text: `This message was sent to you by ExitMap. To verify your email, please click the following link, http://${process.env.CLIENT_DOMAIN}/verify-user?uuid=${uuid}.`, // plain text body
      html: `<h1>Hello!</h1><br><p>This message was sent to you by ExitMap.</p><br><p>To verify your email, please click the following link:</p><br><h2>http://localhost:5174/verify-user?uuid=${uuid}</h2>`, // html body
    });
  }
  main().catch(console.error);
});

router.post("/verify-user/:uuid", async (req, res) => {
  console.log("Verify user backend called");
  try {
    const redis_user = await redisClient.hGetAll(req.params.uuid);
    const userData: UserDataType = {
      first_name: redis_user.first_name,
      last_name: redis_user.last_name,
      username: redis_user.username,
      email: redis_user.email,
      password: redis_user.password,
      is_approved: false,
      is_admin: false,
    };
    console.log("ADD USER FUNCTION IS ABOUT TO BE CALLED");
    const addUser_response = await addUser(userData);
    res.send("OK");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.code);
  }
});

router.get("/unreviewed", async (req, res) => {
  try {
    const users = (await getUnreviewedUsers()) as UserDataType[];
    users.forEach((user) => {
      delete user.hashed_password;
      delete user.salt;
    });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.post("/unreviewed/:id", async (req, res, next) => {
  try {
    const response = await approveUser(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

router.get("/current-user", authorizeUser, async (req, res) => {
  try {
    const user = await getUserById(res.locals.toString());
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.get("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    const user = (await getUserById(id)) as UserDataType;
    delete user.hashed_password;
    delete user.salt;
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.put("/:user_id/change-password", async (req, res) => {
  const user_id = req.params.user_id;
  const { old_password, new_password } = req.body;
  try {
    const response = await changeUserPassword(
      user_id,
      old_password,
      new_password
    );
    console.log(response);
    res.send("ok");
  } catch (err) {}
});

export default router;
