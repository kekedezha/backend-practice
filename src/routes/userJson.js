import { Router } from "express";
//import read/write functions
import { appendNewUser, deleteUser, updateUser } from "../../rw";

const router = Router();

router.param("userId", (req, res, next, userId) => {
  const user = Object.values(req.context.models.User).find(
    (user) => user.id == userId
  );

  if (!user) {
    return res
      .status(404)
      .send("Sorry, no user with that id exists. Try again.");
  }

  next();
});

// GET routes to retrieve all users messages, each endpoint has its own route
router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.User));
});

// GET routes for retrieving a single user or a single message
router.get("/:userId", (req, res) => {
  return res.send(req.context.models.User[req.params.userId]);
});

// POST routes to post a new user or a new message
router.post("/", (req, res) => {
  const newUserId =
    parseInt(
      Object.values(req.context.models.User)[
        Object.values(req.context.models.User).length - 1
      ].id
    ) + 1;

  const user = {
    id: newUserId.toString(),
    username: req.body.username,
  };

  if (user.username.trim() == "") {
    return res
      .status(400)
      .send(
        "Sorry, username missing from body. Missing information. Please try again."
      );
  }
  appendNewUser(user);
  return res.send(user);
});

// PUT route to update a user or message
router.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  let newUsername;

  if (req.body.username != undefined) {
    newUsername = req.body.username;
  }

  if (newUsername.trim() == "") {
    return res
      .status(400)
      .send(
        "Sorry, username missing from body. Missing information. Please try again."
      );
  }
  updateUser(userId, newUsername);
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

// DELETE route to delete a user or message for the specified id
router.delete("/:userId", (req, res) => {
  deleteUser(req.params.userId);
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

export default router;
