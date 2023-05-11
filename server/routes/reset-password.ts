import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail, resetUserPassword } from "../controllers/userController";
import { UserData } from "../controllers/userController";

const router = express.Router();

router.post("/:uuid", async (req, res, next) => {
  const uuid = req.params.uuid;
  try {
    console.log('Submitted')
    const redis_value = await redisClient.hGetAll(uuid);
    const user = await getUserByEmail(redis_value.email) as UserData;
    console.log(user)
    if (user._id) {
    const resetPassword = await resetUserPassword(user._id, req.body.password)
    } else {
      return res.send(500).send('Internal server error')
    }
  } catch (err: any) {
    console.log(err)
    res.status(err.status).send(err.message)
  }
});

export default router;
