/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the match.
 *         carID:
 *           type: string
 *           description: The ID of the car associated with the match.
 *         lessorID:
 *           type: string
 *           description: The ID of the lessor associated with the match.
 *         renterID:
 *           type: string
 *           description: The ID of the renter associated with the match.
 *         status:
 *           type: string
 *           enum: ['Unverified renter', 'Wait for payment', 'Cancelled', 'Rented', 'Completed']
 *           description: The status of the match.
 *         pickupLocation:
 *           type: string
 *           description: The pickup location for the car rental.
 *         pickUpDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the car pickup.
 *         returnLocation:
 *           type: string
 *           description: The return location for the car rental.
 *         returnDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the car return.
 *         price:
 *           type: number
 *           description: The price of the car rental.
 *         isReview:
 *           type: boolean
 *           description: Indicates whether the match has been reviewed or not.
 *       required:
 *         - status
 *         - pickupLocation
 *         - returnLocation
 *         - pickUpDateTime
 *         - returnDateTime
 *         - renterID
 *         - lessorID
 *         - carID
 *         - price
 */
/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Match management APIs
 *
 * /match:
 *   get:
 *     summary: Get all matches
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Create a new match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Match object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       201:
 *         description: Returns the newly created match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /match/status:
 *   get:
 *     summary: Get all match statuses
 *     tags: [Match]
 *     responses:
 *       200:
 *         description: Returns all match statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   patch:
 *     summary: Toggle a match status
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: matchID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the match to be updated
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: New status of the match
 *     responses:
 *       200:
 *         description: Returns the updated match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /match/admin:
 *   get:
 *     summary: Get rental matches by search query
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve (default = 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to retrieve per page (default = 10)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting order (default = "-createdAt")
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Match'
 *                 totalCount:
 *                   type: integer
 *
 * /match/{id}:
 *   get:
 *     summary: Get rental match by ID
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the rental match
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Rental match not found
 *
 * /match/me/{id}:
 *   get:
 *     summary: Get rental match by ID for authenticated user
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the rental match
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Rental match not found
 *
 * /match/cancel-reservation:
 *   patch:
 *     summary: Cancel a rental reservation
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: string
 *                 description: ID of the rental match to cancel
 *     responses:
 *       200:
 *         description: Rental reservation cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Rental match not found
 *
 */
import express from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {
  createMatch,
  getMatches,
  getMatchInfo,
  getMyBookings,
  cancelReserevation,
  getMatchStatuses,
  toggleStatus,
  getMatchesBySearch,
  matchComplete,
} from "../controllers/match.controller.js";
const router = express.Router();

router
  .route("/match")
  .get(authenticateUser.required, getMatches)
  .post(authenticateUser.required, createMatch);

router.route("/match/status").get(authenticateUser.required, getMatchStatuses);
router
  .route("/match/admin")
  .get(
    // authenticateUser.required, authorizeUser("admin"), 
  getMatchesBySearch);
router.route("/match/:id").get(authenticateUser.required, getMatchInfo);
router.route("/match/me/:id").get(authenticateUser.required, getMyBookings);
router
  .route("/match/cancel-reservation")
  .patch(authenticateUser.required, cancelReserevation);

router.route("/match/status").patch(authenticateUser.required, toggleStatus);
router.route("/match/complete").patch(authenticateUser.required, matchComplete);

export default router;
