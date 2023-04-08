import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {
  createPayment,
  getPayments,
  getPaymentsByID,
  createOmiseCharge,
  createOmiseTransfer,
  getOmiseTransactions,
} from "../controllers/payment.controller.js";
const router = express.Router();

router.route("/payment").get(getPayments).post(createPayment);

router.route("/payment/:id").get(getPaymentsByID);

// router.route("/wallet/:id").post(createOmiseAccount);

router.route("/payment/charge/:id").post(createOmiseCharge);

router.route("/payment/transfer/:id").post(createOmiseTransfer);

router.route("/payment/transaction/:id").get(getOmiseTransactions);

export default router;
