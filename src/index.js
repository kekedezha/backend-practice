// initialize environment variables from config file
import "dotenv/config";
// import cors module from cors package
import cors from "cors";
// import express module from express package
import express from "express";

import { users, messages } from "../data";

// create an instance of an Express application
// This object will provide methods to define routes,
// handle middleware and configure the server
const app = express();

app.use(cors());

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

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
