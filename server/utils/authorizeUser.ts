import { Request, Response, NextFunction } from "express";
import redisClient from "../redis-config";

export default async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.signedCookies.token);
    if (req.signedCookies.token) {
      console.log("1");
      const response = await redisClient.get(
        req.signedCookies.token.toString()
      );
      if (!response) {
        console.log("no response from Redis");
        throw { code: 401, message: "No active session" };
      }
      console.log("2");
      console.log(response);
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
