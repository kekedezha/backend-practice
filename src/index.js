// initialize environment variables from config file
import "dotenv/config";
// import cors module from cors package
import cors from "cors";
// import express module from express package
import express from "express";

// create an instance of an Express application
// This object will provide methods to define routes,
// handle middleware and configure the server
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/example", (req, res) => {
  res.send("This will be the example page");
});

// have the app start listening for incoming HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
