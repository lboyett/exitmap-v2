import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the / route from the routes/index.js file");
});

export default router;
