import express from "express";
import {
  getExit,
  getReviewedExits,
  addExit,
  deleteExit,
  getExitsByUser,
} from "../controllers/exitController";
import { getExitImages } from "../controllers/imageController";
import { getExitComments } from "../controllers/commentController";
import { QueryResult } from "pg";

const router = express.Router();

router.get("/reviewed", async (req, res, next) => {
  try {
    const response = await getReviewedExits();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

router.get("/:id", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  const exit_data = req.body;
  try {
    const response = (await addExit(exit_data)) as QueryResult;
    res.status(200).send(response); //FixThis
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = (await deleteExit(+req.params.id)) as QueryResult | number;
    if (response === 0) throw new Error("Delete failed");
    res.status(200).send(response.toString()); //FixThis
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.get("/by-user-id/:id", async (req, res, next) => {
  const user_id = req.params.id as string;
  try {
    const exits = (await getExitsByUser(user_id)) as any[];
    res.send(exits);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

export default router;
