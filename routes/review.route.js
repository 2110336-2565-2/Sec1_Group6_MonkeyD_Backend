/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         hygeine:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         carCondition:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         service:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         comment:
 *           type: string
 *         matchID:
 *           type: string
 *           unique: true
 *         reviewerID:
 *           type: string
 *           $ref: '#/components/schemas/User'
 *         carID:
 *           type: string
 *           $ref: '#/components/schemas/Car'
 *       required:
 *         - hygeine
 *         - carCondition
 *         - service
 *         - matchID
 *         - reviewerID
 *         - carID
 */
/**
 * @swagger
 * tags:
 *   name: Review
 *   description: APIs related to reviews
 * /review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Returns all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Returns the newly created review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid or missing parameters in the request
 *       401:
 *         description: Unauthorized request, missing or invalid authentication token
 *       500:
 *         description: Internal server error
 * /review/{id}:
 *   get:
 *     summary: Get review information by ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       200:
 *         description: Returns the review information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized request, missing or invalid authentication token
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */


import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {
  createReview,
  getReviews,
  getReviewInfo,
} from "../controllers/review.controllers.js";
const router = express.Router();

router
  .route("/review")
  .get(getReviews)
  // .post(createReview);
  // .get(auth.required, getReviews)
  .post(authenticateUser.required, createReview);
router.route("/review/:id").get(authenticateUser.required, getReviewInfo);

export default router;
