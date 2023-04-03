import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {customLogger} from "./middlewares/logger.middleware.js";
import {customCORS} from "./middlewares/cors.middleware.js";
import {errorHandler} from "./middlewares/error-handler.middleware.js";
import routes from "./routes/index.js";
import "./configs/passport.config.js";

dotenv.config({path: ".env"});
const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(customLogger);
app.use(customCORS);
// deprecate **change later**
mongoose.set("strictQuery", true);

if (isProduction) {
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect("mongodb://127.0.0.1:27017/testDatabase");
  mongoose.set("debug", true);
}

app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
