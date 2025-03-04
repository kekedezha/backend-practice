// initialize environment variables from config file
import "dotenv/config";
// import cors module from cors package
import cors from "cors";
// import express module from express package
import express from "express";
//import mock data from data.js file
import { users, messages } from "../data";
//import v4 function from uuid package
import { v4 as uuidv4 } from "uuid";
//import read/write functions
import {
  appendNewMessage,
  appendNewUser,
  deleteMessage,
  deleteUser,
  updateUser,
  updateMessage,
} from "../rw";

// create an instance of an Express application
// This object will provide methods to define routes,
// handle middleware and configure the server
const app = express();

// initialize basic cors config
app.use(cors());
// parse JSON request bodies
app.use(express.json());
// parse URL-encoded data (from form submissions like 'application/x-www-form-urlencoded)
// 'extended: true'  allows parsing of nested objects
app.use(express.urlencoded({ extended: true }));

// middleware to check if user id exists. For all routes that have the "userId" param
app.param("userId", (req, res, next, userId) => {
  const user = Object.values(users).find((user) => user.id == userId);

  if (!user) {
    return res
      .status(404)
      .send("Sorry, no user with that id exists. Try again.");
  }

  next();
});

// middleware to check if message id exists. For all routes that have the "/messages/:messageId" path
app.param("messageId", (req, res, next, messageId) => {
  const message = Object.values(messages).find(
    (message) => message.id == messageId
  );

  if (!message) {
    return res
      .status(404)
      .send("Sorry, no message with thad id exists. Try again.");
  }

  next();
});

// GET route home page
app.get("/", (req, res) => {
  return res.send(
    "Hello welcome to this back-end example app brought to you by Express.js"
  );
});

// GET routes to retrieve all users messages, each endpoint has its own route
app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

// GET routes for retrieving a single user or a single message
app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

// POST routes to post a new user or a new message
app.post("/users", (req, res) => {
  const newUserId =
    parseInt(Object.values(users)[Object.values(users).length - 1].id) + 1;

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

app.post("/messages", (req, res) => {
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

// PUT route to update a user or message
app.put("/users/:userId", (req, res) => {
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

app.put("/messages/:messageId", (req, res) => {
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

// DELETE route to delete a user or message for the specified id
app.delete("/users/:userId", (req, res) => {
  deleteUser(req.params.userId);
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.delete("/messages/:messageId", (req, res) => {
  deleteMessage(req.params.messageId);
  return res.send(
    `DELETE HTTP method on message/${req.params.messageId} resource`
  );
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
