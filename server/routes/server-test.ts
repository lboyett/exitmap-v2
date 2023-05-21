import express from "express";
import pool from "../pool-config";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

router.get("/test-connection", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) =>
      pool.query("SELECT * FROM users;", [], (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (results && results.rows) resolve(results.rows);
        else resolve("no results");
      })
    );
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
