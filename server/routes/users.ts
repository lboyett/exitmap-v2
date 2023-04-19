import express from "express";
import {
  addUser,
  UserData as UserDataType,
  getUserById,
  changeUserPassword,
  getUnreviewedUsers,
  approveUser,
} from "../controllers/userController";
import authorizeUser from "../utils/authorizeUser";

const router = express.Router();

router.post("/", async (req, res) => {
  const user_data = req.body.headers;
  try {
    const response = await addUser(user_data);
    res.send("OK");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/unreviewed", async (req, res) => {
  try {
    const users = (await getUnreviewedUsers()) as UserDataType[];
    users.forEach((user) => {
      delete user.hashed_password;
      delete user.salt;
    });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.post("/unreviewed/:id", async (req, res, next) => {
  try {
    const response = await approveUser(req.params.id);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

router.get("/current-user", authorizeUser, async (req, res) => {
  try {
    const user = await getUserById(res.locals.toString());
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.get("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    const user = (await getUserById(id)) as UserDataType;
    delete user.hashed_password;
    delete user.salt;
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.put("/:user_id/change-password", async (req, res) => {
  const user_id = req.params.user_id;
  const { old_password, new_password } = req.body;
  try {
    const response = await changeUserPassword(
      user_id,
      old_password,
      new_password
    );
    console.log(response);
    res.send("ok");
  } catch (err) {}
});

export default router;
