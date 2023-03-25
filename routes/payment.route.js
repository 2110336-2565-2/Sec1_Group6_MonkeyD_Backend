import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createPayment,
  getPayments,
} from "../controllers/payment.controller.js";
const router = express.Router();

router
  .route("/payment")
  .get(getPayments)
  .post(createPayment);

export default router;
