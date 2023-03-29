import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createPayment,
  getPayments,
  getPaymentsByID,
} from "../controllers/payment.controller.js";
const router = express.Router();

router
  .route("/payment")
  .get(getPayments)
  .post(createPayment);

router.route("/payment/:id")
  .get(getPaymentsByID);
export default router;
