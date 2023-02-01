import express from "express";
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
