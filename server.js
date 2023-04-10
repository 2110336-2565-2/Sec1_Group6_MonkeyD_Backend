import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {customLogger} from "./middlewares/logger.middleware.js";
import {customCORS} from "./middlewares/cors.middleware.js";
import {errorHandler} from "./middlewares/error-handler.middleware.js";
import routes from "./routes/index.js";
import "./configs/passport.config.js";
import http from "http";
import connectToDatabase from "./configs/mongodb.config.js";
import configureChatSocket from "./configs/chatSocket.config.js";

dotenv.config({path: ".env"});
const isProduction = process.env.NODE_ENV === "production";

const app = express();

connectToDatabase();

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(customLogger);
app.use(customCORS);

app.use("/", routes);

const server = http.createServer(app);
configureChatSocket(server);

const PORT = process.env.PORT || 8080;

server.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
