import express from "express";
import usersRouter from "./user.route.js";
import carsRouter from "./car.route.js";
import matchRouter from "./match.route.js";
import paymentRouter from "./payment.route.js";
import reviewRouter from "./review.route.js";
import notificationRouter from "./notification.route.js";
import {
  checkValidationError,
  errorHandler,
} from "../middlewares/error-handler.middleware.js";

const router = express.Router();

router.use("/", usersRouter, carsRouter, matchRouter, reviewRouter, paymentRouter, notificationRouter);
router.use(checkValidationError, errorHandler);

export default router;
