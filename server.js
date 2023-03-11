import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(customLogger);
app.use(customCORS);
app.use(cookieParser());
// deprecate **change later**
mongoose.set("strictQuery", true);

if (isProduction) {
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/testDatabase");
  // mongoose.connect("mongodb://127.0.0.1:27017/testDatabase");
  mongoose.set("debug", true);
}

app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
