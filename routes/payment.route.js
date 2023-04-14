/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: API for managing payments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The payment ID.
 *           example: 610a6e07d6ebd10aa48fa8ca
 *         status:
 *           type: string
 *           description: The status of the payment.
 *           enum: [Pending, Cancelled, Completed]
 *           example: Pending
 *         renterID:
 *           type: string
 *           description: The ID of the user renting the car.
 *           example: 610a6e07d6ebd10aa48fa8cb
 *         lessorID:
 *           type: string
 *           description: The ID of the user leasing the car.
 *           example: 610a6e07d6ebd10aa48fa8cc
 *         matchID:
 *           type: string
 *           description: The ID of the match between the lessor and renter.
 *           example: 610a6e07d6ebd10aa48fa8cd
 *         price:
 *           type: number
 *           description: The price of the payment.
 *           example: 200
 *       required:
 *         - status
 *         - renterID
 *         - lessorID
 *         - matchID
 *         - price
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments.
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Returns all payments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Create a new payment.
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Returns the newly created payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 * /payment/{id}:
 *   get:
 *     summary: Get a payment by ID.
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID.
 *     responses:
 *       200:
 *         description: Returns the payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * 
 * /payment/charge/{id}:
 *   post:
 *     summary: Charge a payment using Omise.
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to be charged.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token representing the payment source.
 *     responses:
 *       '200':
 *         description: A message confirming the payment has been charged successfully.
 *       '400':
 *         description: Invalid or missing parameters in the request.
 *       '500':
 *         description: An error occurred while processing the request.
 *
 * /payment/transfer/{id}:
 *   post:
 *     summary: Transfer a payment using Omise.
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to be transferred.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 description: The email address or phone number of the payment recipient.
 *               amount:
 *                 type: integer
 *                 description: The amount to be transferred, in the smallest unit of the currency (e.g. cents).
 *     responses:
 *       '200':
 *         description: A message confirming the payment has been transferred successfully.
 *       '400':
 *         description: Invalid or missing parameters in the request.
 *       '500':
 *         description: An error occurred while processing the request.
 *
 * /payment/transaction/{id}:
 *   get:
 *     summary: Get a list of transactions associated with a payment in Omise.
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to retrieve transactions for.
 *     responses:
 *       '200':
 *         description: A list of transactions associated with the specified payment.
 *       '400':
 *         description: Invalid or missing parameters in the request.
 *       '500':
 *         description: An error occurred while processing the request.
 */


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
