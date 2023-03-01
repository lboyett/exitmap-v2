import express, { Express, Request, Response } from "express";
import * as testController from "../controllers/testController";
import { getExit, addExit } from "../controllers/exitController";
const router = express.Router();

router.get("/exits/:id", (req, res, next) => {
  getInfoFromSpecific(req, res, getExit);
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

async function getInfoFromSpecific(
  req: Request,
  res: Response,
  _function: (_id: string) => any
) {
  try {
    const info = await _function(req.params.id);
    res.json(info);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

export default router;
