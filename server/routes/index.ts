import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import exitsRouter from "./exits";
import imagesRouter from "./images";
import commentsRouter from "./comments";
import usersRouter from "./users";
import forgotPasswordRouter from "./forgot-password";
import resetPasswordRouter from "./reset-password";
import serverTestRouter from "./server-test";
import authorizeUser from "../utils/authorizeUser";

const router = express.Router();

// =========================== ROUTES ===========================

router.use("/server-test", serverTestRouter);
router.use("/exits", authorizeUser, exitsRouter);
router.use("/images", authorizeUser, imagesRouter);
router.use("/comments", authorizeUser, commentsRouter);
router.use("/users", usersRouter);
router.use("/forgot-password", forgotPasswordRouter);
router.use("/reset-password", resetPasswordRouter);

router.get("/", (req, res) => res.send("This is ExitMap's backend"));

export default router;
