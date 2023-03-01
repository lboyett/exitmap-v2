import express, { Express, Request, Response } from "express";
import * as testController from "../controllers/testController";
import { getExit, addExit } from "../controllers/exitController";
import { getExitImages } from "../controllers/imageController";
import { getExitComments } from "../controllers/commentController";
const router = express.Router();

// router.get("/exits/:id", async (req, res, next) => {
//   try {
//     const exitData = await getExit(req.params.id);
//     const exitImages = await getExitImages(req.params.id);
//     const exitComments = await getExitComments(req.params.id);
//     res.json([exitData, exitImages, exitComments]);
//   } catch (err) {
//     res.status(500).send("Internal server error in the getExit request");
//   }
// });

router.get("/exits/:id", async (req, res, next) => {
  try {
    let results: any = {};
    const exitData = await getExit(req.params.id);
    aggregate("data", exitData);
    const exitImages = await getExitImages(req.params.id);
    aggregate("images", exitImages);
    const exitComments = await getExitComments(req.params.id);
    aggregate("comments", exitComments);
    function aggregate(name: string, data: any) {
      results[name] = data;
      if (results.data && results.images && results.comments) {
        res.json(results);
      }
    }
  } catch (err) {
    res.status(500).send("Internal server error in the getExit request");
  }
});

router.post("/exits", async (req, res, next) => {
  const exit_data = req.body.headers;
  try {
    const response = await addExit(exit_data);
    console.log(response);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.send(err);
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
