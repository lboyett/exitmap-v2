import { Request, Response, NextFunction } from "express";
import redisClient from "../redis-config";

export default async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.signedCookies.token) {
      const response = await redisClient.get(
        req.signedCookies.token.toString()
      );
      if (!response) {
        console.log("no response from Redis");
        throw { code: 401, message: "No active session" };
      }
      res.locals = response as any;
      next();
    } else {
      res.status(401).send("No active session");
    }
  } catch (err: any) {
    console.log(err);
    if (err.code && err.code == 401) {
      res.status(401).send("No active session");
    } else {
      res.status(500).send("Internal server error");
    }
  }
}
