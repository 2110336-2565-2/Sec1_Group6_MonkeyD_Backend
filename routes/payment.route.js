import express from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {
  createPayment,
  getPayments,
  getPaymentsByID,
  createOmiseCharge,
  createOmiseTransfer,
  getOmiseTransactions,
} from "../controllers/payment.controller.js";
const router = express.Router();

router
  .route("/payment")
  .get(getPayments)
  .post(authenticateUser.required, createPayment);

router.route("/payment/:id").get(authenticateUser.required, getPaymentsByID);

router
  .route("/payment/charge/:id")
  .post(authenticateUser.required, createOmiseCharge);

router
  .route("/payment/transfer/:id")
  .post(authenticateUser.required, createOmiseTransfer);

router
  .route("/payment/transaction/:id")
  .post(authenticateUser.required, getOmiseTransactions);

export default router;
