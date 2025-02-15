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
import { readData, writeData } from "../rw";

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

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();

  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
