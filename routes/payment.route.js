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
 *       required:
 *         - status
 *         - renterID
 *         - lessorID
 *         - matchID
 *         - price
 *       properties:
 *         status:
 *           type: string
 *           enum: ["Pending", "Cancelled", "Completed"]
 *           default: Pending
 *           description: Status of the payment
 *         renterID:
 *           type: string
 *           description: ID of the user who rents the item
 *         lessorID:
 *           type: string
 *           description: ID of the user who owns the item
 *         matchID:
 *           type: string
 *           description: ID of the match between the renter and lessor
 *         price:
 *           type: number
 *           description: The price of the rental
 *       example:
 *         status: "Pending"
 *         renterID: "613be5c05a0a132b5db0de45"
 *         lessorID: "613be5c05a0a132b5db0de46"
 *         matchID: "613be5c05a0a132b5db0de47"
 *         price: 100
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment:
 *                 type: object
 *                 required:
 *                   - lessorID
 *                   - renterID
 *                   - matchID
 *                   - price
 *                 properties:
 *                   status:
 *                     type: string
 *                     enum: [Pending, Cancelled, Completed]
 *                     description: Payment status
 *                   lessorID:
 *                     type: string
 *                     description: ID of the user who is receiving the payment
 *                   renterID:
 *                     type: string
 *                     description: ID of the user who is making the payment
 *                   matchID:
 *                     type: string
 *                     description: ID of the match for which the payment is being made
 *                   price:
 *                     type: number
 *                     description: Amount of the payment
 *                 example:
 *                   payment:
 *                     status: Pending
 *                     lessorID: "613be5c05a0a132b5db0de45"
 *                     renterID: "613be5c05a0a132b5db0de46"
 *                     matchID: "613be5c05a0a132b5db0de47"
 *                     price: 150.00
 *     responses:
 *       200:
 *         description: Returns the newly created payment object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payment:
 *                   type: object
 *                   $ref: '#/components/schemas/Payment'
 *                   example:
 *                     status: Pending
 *                     lessorID: "613be5c05a0a132b5db0de45"
 *                     renterID: "613be5c05a0a132b5db0de46"
 *                     matchID: "613be5c05a0a132b5db0de47"
 *                     price: 150.00
 *       400:
 *         description: Returns an error message if the payment already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Something already exists"
 *       500:
 *         description: Returns an error message if there was an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments or filter by lessorID or renterID.
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: lessorID
 *         schema:
 *           type: string
 *         description: ID of the user who is receiving the payment
 *       - in: query
 *         name: renterID
 *         schema:
 *           type: string
 *         description: ID of the user who is making the payment
 *     responses:
 *       200:
 *         description: Returns an array of all payments that meet the filtering criteria, or all payments if no filter is provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Payment'
 *                     example:
 *                       status: Pending
 *                       lessorID: "613be5c05a0a132b5db0de45"
 *                       renterID: "613be5c05a0a132b5db0de46"
 *                       matchID: "613be5c05a0a132b5db0de47"
 *                       price: 150.00
 *       500:
 *         description: Returns an error message if there was an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 * /payment/{id}:
 *   get:
 *     summary: Get a payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payment to retrieve
 *     responses:
 *       200:
 *         description: Returns the payment object with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Payment'
 *               example:
 *                 status: Pending
 *                 lessorID: "613be5c05a0a132b5db0de45"
 *                 renterID: "613be5c05a0a132b5db0de46"
 *                 matchID: "613be5c05a0a132b5db0de47"
 *                 price: 150.00
 *       404:
 *         description: Returns an error message if the payment with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Cannot find payment"
 *       500:
 *         description: Returns an error message if there was an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /payment/charge/{id}:
 *   post:
 *     summary: Creates an Omise charge for a user with the specified ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to create the charge for.
 *         schema:
 *           type: string
 *           example: 1234567890
 *       - in: body
 *         name: charge
 *         required: true
 *         description: The charge information.
 *         schema:
 *           type: object
 *           properties:
 *             cardToken:
 *               type: string
 *               example: tokn_test_1234567890abcdef
 *             amount:
 *               type: number
 *               example: 1000
 *             description:
 *               type: string
 *               example: Test charge
 *     responses:
 *       200:
 *         description: The created charge object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: chrg_test_1234567890abcdef
 *                 amount:
 *                   type: number
 *                   example: 1000
 *                 description:
 *                   type: string
 *                   example: Test charge
 *       500:
 *         description: Returns an error message if there was an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /payment/transfer/{id}:
 *   post:
 *     summary: Create an Omise transfer for a user.
 *     description: Create a transfer using the Omise API for a given user.
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to create the transfer for.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to transfer, in THB.
 *                 example: 1000
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the transfer.
 *                   example: trsf_test_1234567890abcdef
 *                 amount:
 *                   type: number
 *                   description: The amount transferred, in THB.
 *                   example: 850
 *                 recipient:
 *                   type: object
 *                   description: Information about the recipient of the transfer.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the recipient.
 *                       example: recp_test_1234567890abcdef
 *                     name:
 *                       type: string
 *                       description: The name of the recipient.
 *                       example: John Doe
 *                     bank_account:
 *                       type: object
 *                       description: Information about the bank account of the recipient.
 *                       properties:
 *                         brand:
 *                           type: string
 *                           description: The brand of the bank account.
 *                           example: Test Bank
 *                         number:
 *                           type: string
 *                           description: The number of the bank account.
 *                           example: 1234567890
 *                         bank_code:
 *                           type: string
 *                           description: The bank code of the bank account.
 *                           example: bbl
 *                         branch_code:
 *                           type: string
 *                           description: The branch code of the bank account.
 *                           example: 0001
 *                         account_type:
 *                           type: string
 *                           description: The type of the bank account.
 *                           example: savings
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                   example: Failed to transfer
 */
/**
 * @swagger
 * /payment/transaction/{id}:
 *   get:
 *     summary: Get Omise transactions for a user
 *     description: Retrieve a list of Omise transactions (charges and transfers) for a user with the specified ID, sorted by date or amount.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Sort criteria
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortBy:
 *                 type: string
 *                 enum: [newest date, oldest date, highest price, lowest price]
 *                 default: newest date
 *             example:
 *               sortBy: newest date
 *     responses:
 *       200:
 *         description: A list of Omise transactions (charges and transfers) sorted by date or amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 charges:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Charge'
 *                   description: List of Omise charges
 *                 transfers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transfer'
 *                   description: List of Omise transfers
 *             example:
 *               charges:
 *                 - id: chrg_test_1234
 *                   amount: 100
 *                   currency: THB
 *                   status: successful
 *                   created_at: '2022-05-01T10:00:00Z'
 *                   description: 'Payment for order #1234'
 *                 - id: chrg_test_5678
 *                   amount: 50
 *                   currency: THB
 *                   status: successful
 *                   created_at: '2022-05-02T11:00:00Z'
 *                   description: 'Payment for order #5678'
 *               transfers:
 *                 - id: trsf_test_1234
 *                   amount: 85
 *                   currency: THB
 *                   status: successful
 *                   created_at: '2022-05-03T12:00:00Z'
 *                   description: 'Transfer to bank account #1234'
 *                 - id: trsf_test_5678
 *                   amount: 42.5
 *                   currency: THB
 *                   status: successful
 *                   created_at: '2022-05-04T13:00:00Z'
 *                   description: 'Transfer to bank account #5678'
 *       500:
 *         description: Failed to get transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Failed to get transaction
 */

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

router.route("/payment/transaction/:id").post(
  // authenticateUser.required,
  getOmiseTransactions
);

export default router;
