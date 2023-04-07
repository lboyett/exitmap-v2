import express from "express";
import redisClient from "../redis-config";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await deleteRedisSession(req.signedCookies.token);
    res
      .cookie("token", "none", {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
      })
      .status(200)
      .send("Successful logout");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

async function deleteRedisSession(session_id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await redisClient.del(session_id);
      resolve("deleted");
    } catch (err) {
      reject(err);
    }
  });
}

export default router;
