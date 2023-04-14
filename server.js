import express from "express";
import csrf from "csrf";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { customLogger } from "./middlewares/logger.middleware.js";
import { customCORS } from "./middlewares/cors.middleware.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import routes from "./routes/index.js";
import "./configs/passport.config.js";
import http from "http";
import connectToDatabase from "./configs/mongodb.config.js";
import configureChatSocket from "./configs/chatSocket.config.js";

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

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

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express VacQ API'
    }
  },
  apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
