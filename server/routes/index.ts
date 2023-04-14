import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import exitsRouter from "./exits";
import imagesRouter from "./images";
import commentsRouter from "./comments";
import usersRouter from "./users";

const router = express.Router();

// =========================== ROUTES ===========================

router.use("/exits", exitsRouter);
router.use("/images", imagesRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);

export default router;
