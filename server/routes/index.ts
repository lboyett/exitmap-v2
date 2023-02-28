import express from "express";
import testController from "../controllers/testController";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the / route from the routes/index.js file");
});

router.get("/exits/:id", (req, res, next) => {
  res.send("This is the / route from the routes/index.js file");
});

router.get("/test", async (req, res) => {
  try {
    const exits = await testController.getExits();
    res.send(await exits);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
