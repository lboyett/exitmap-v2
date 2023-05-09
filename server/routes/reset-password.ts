import express from "express";
import crypto from "crypto";
import uniqid from "uniqid";
import redisClient from "../redis-config";
import { getUserByEmail } from "../controllers/userController";
import nodemailer from "nodemailer";


const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log('THIS IS THE RESET PASSWORD ROUTE')
});

export default router;
