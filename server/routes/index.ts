import express, { Express, Request, Response } from "express";
import * as testController from "../controllers/testController";
import { getExit, addExit } from "../controllers/exitController";
import { getExitImages } from "../controllers/imageController";
const router = express.Router();

router.get("/exits/:id", async (req, res, next) => {
  try {
    const exitData = await getExit(req.params.id);
    const exitImages = await getExitImages(req.params.id);
    res.json([exitImages, exitData]);
  } catch (err) {
    res.status(500).send("Internal server error in the getExit request");
  }
});
router.post("/exits", async (req, res, next) => {
  const exit_data = req.body.headers.exit_data;
  try {
    const response = await addExit(exit_data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
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
