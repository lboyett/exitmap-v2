import express, { Express, Request, Response } from "express";
import testController from "../controllers/testController";
import { getExit } from "../controllers/exitController";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is the / route from the routes/index.js file");
});

router.get("/exits/:id", (req, res, next) => {
  getInfoFromSpecific(req, res, getExit);
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
