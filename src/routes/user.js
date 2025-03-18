// import the router class from the express module to create modular route handlers
import { Router } from "express";

// initialize a router instance to use with user routes
const router = Router();

// GET route to retrieve all users from database
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// GET route to get user by userID
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

export default router;
