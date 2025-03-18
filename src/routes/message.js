// import the router class from the express module to create modular route handlers
import { Router } from "express";

// initialize a router instance to use with message routes
const router = Router();

// GET route to retrieve all messages from db
router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

// GET route to retrieve message specified by messageId
router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );
  return res.send(message);
});

// POST route to add message to db
router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

// DELETE route to delete message from db
router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

export default router;
