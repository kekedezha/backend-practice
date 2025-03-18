import { Router } from "express";
// import read/write functions
import { appendNewMessage, deleteMessage, updateMessage } from "../../rw";
//import v4 function from uuid package
import { v4 as uuidv4 } from "uuid";

const router = Router();

// middleware to check if message id exists. For all routes that have the "/messages/:messageId" path
router.param("messageId", (req, res, next, messageId) => {
  const message = Object.values(req.context.models.Message).find(
    (message) => message.id == messageId
  );

  if (!message) {
    return res
      .status(404)
      .send("Sorry, no message with thad id exists. Try again.");
  }

  next();
});

router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.Message));
});

router.get("/:messageId", (req, res) => {
  return res.send(req.context.models.Message[req.params.messageId]);
});

router.post("/", (req, res) => {
  // create unique id for new message
  const id = uuidv4();

  const message = {
    id,
    text: req.body.text,
    userId: req.body.userId,
  };

  if (message.text.trim() == "" || message.userId.trim() == "") {
    return res
      .status(400)
      .send(
        "Sorry, text and/or userId missing from body. Missing information. Please try again."
      );
  }

  appendNewMessage(message);
  return res.send(message);
});

router.put("/:messageId", (req, res) => {
  const messageId = req.params.messageId;
  let newText = "";
  let newUser = "";

  if (req.body.text != undefined) {
    newText = req.body.text;
  }
  if (req.body.userId != undefined) {
    newUser = req.body.userId;
  }

  if (newText.trim() == "" && newUser.trim() == "") {
    return res
      .status(400)
      .send(
        "Sorry, text and userId missing from body. Missing information. Please try again."
      );
  } else if (newText.trim() == "") {
    updateMessage(messageId, null, newUser);
  } else if (newUser.trim() == "") {
    updateMessage(messageId, newText, null);
  }

  return res.send(
    `PUT HTTP method on message/${req.params.messageId} resource`
  );
});

router.delete("/:messageId", (req, res) => {
  deleteMessage(req.params.messageId);
  return res.send(
    `DELETE HTTP method on message/${req.params.messageId} resource`
  );
});

export default router;
