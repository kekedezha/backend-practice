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
import { readData, appendData } from "../rw";

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
app.post("/messages", (req, res) => {
  // create unique id for new message
  const id = uuidv4();

  const message = {
    id,
    text: req.body.text,
    userId: req.body.userId,
  };

  try {
    appendData(message);
    return res.send(message);
  } catch (err) {
    console.log(err);
  }
});

// PUT route to update a user or message
app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.put("/messages/:messageId", (req, res) => {
  return res.send(`PUT HTTP method on message/${req.params.userId} resource`);
});

// DELETE route to delete a user or message for the specified id
app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.delete("/messages/:messageId", (req, res) => {
  return res.send(
    `DELETE HTTP method on message/${req.params.messageId} resource`
  );
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
