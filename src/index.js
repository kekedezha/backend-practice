// initialize environment variables from config file
import "dotenv/config";
// import cors module from cors package
import cors from "cors";
// import express module from express package
import express from "express";
// import mock data from data.js file
import { users, messages } from "./models/data";
// import routes
import routes from "./routes";
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

app.use((req, res, next) => {
  req.context = {
    users,
    messages,
  };
  next();
});
app.use("/users", routes.user);
app.use("/messages", routes.message);

// GET route home page
app.get("/", (req, res) => {
  return res.send(
    "Hello welcome to this back-end example app brought to you by Express.js"
  );
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
