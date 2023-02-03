import express from "express";
import usersRouter from "./user.route.js";
import carsRouter from "./car.route.js";
import {checkValidationError} from "../middlewares/error-handler.middleware.js";

const router = express.Router();

router.use("/", usersRouter, carsRouter);

router.use(checkValidationError);

export default router;
