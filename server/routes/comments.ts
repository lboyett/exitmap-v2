import express from "express";
import {
  addComment,
  getCommentsByUser,
  deleteComment,
} from "../controllers/commentController";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const response = await addComment(
      req.body.comment,
      req.body.author_id,
      req.body.exit_id
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/by-user-id/:id", async (req, res, next) => {
  const user_id = req.params.id as string;
  try {
    const comments = (await getCommentsByUser(user_id)) as any[];
    res.send(comments);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

router.delete("/:comment_id", async (req, res, next) => {
  const comment_id = req.params.comment_id;
  try {
    const response = await deleteComment(comment_id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});
export default router;
