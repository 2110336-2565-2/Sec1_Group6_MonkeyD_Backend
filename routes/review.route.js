/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - hygeine
 *         - carCondition
 *         - service
 *         - matchID
 *         - reviewerID
 *         - carID
 *       properties:
 *         hygeine:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: The rating for hygiene, on a scale from 0 to 5.
 *         carCondition:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: The rating for car condition, on a scale from 0 to 5.
 *         service:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: The rating for service, on a scale from 0 to 5.
 *         comment:
 *           type: string
 *           description: An optional comment about the review.
 *         matchID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the match associated with the review.
 *           example: 6123fa64cc9ac57c5d937d8f
 *         reviewerID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user who left the review.
 *           example: 6123fa64cc9ac57c5d937d90
 *         carID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the car that was reviewed.
 *           example: 6123fa64cc9ac57c5d937d91
 *       example:
 *         hygeine: 4.5
 *         carCondition: 3
 *         service: 4
 *         comment: "The car was clean and the driver was friendly."
 *         matchID: 6123fa64cc9ac57c5d937d8f
 *         reviewerID: 6123fa64cc9ac57c5d937d90
 *         carID: 6123fa64cc9ac57c5d937d91
 */
/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API for managing reviews
 */

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Create a new review for a car
 *     description: Create a new review for a car with the given review data
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *           example:
 *             review:
 *               hygeine: 4.5
 *               carCondition: 3.2
 *               service: 2.8
 *               comment: "Great car and service!"
 *               matchID: "61493e1a793fa62b78e8c527"
 *               reviewerID: "61493e1a793fa62b78e8c528"
 *               carID: "61493e1a793fa62b78e8c529"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *             example:
 *               review:
 *                 id: "61493e1a793fa62b78e8c52a"
 *                 hygeine: 4.5
 *                 carCondition: 3.2
 *                 service: 2.8
 *                 comment: "Great car and service!"
 *                 matchID: "61493e1a793fa62b78e8c527"
 *                 reviewerID: "61493e1a793fa62b78e8c528"
 *                 carID: "61493e1a793fa62b78e8c529"
 *                 createdAt: "2023-04-22T00:00:00.000Z"
 *                 updatedAt: "2023-04-22T00:00:00.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "match ID already exists"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Car not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server error occurred"
 */
/**
 * @swagger
 * /review:
 *   get:
 *     summary: Get a list of reviews
 *     description: Get a list of reviews optionally filtered by carID
 *     tags: [Review]
 *     parameters:
 *       - in: query
 *         name: carID
 *         schema:
 *           type: string
 *         description: ID of the car for which to retrieve reviews
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *             example:
 *               reviews: [
 *                 {
 *                   id: "61493e1a793fa62b78e8c52a",
 *                   hygeine: 4.5,
 *                   carCondition: 3.2,
 *                   service: 2.8,
 *                   comment: "Great car and service!",
 *                   matchID: "61493e1a793fa62b78e8c527",
 *                   reviewerID: "61493e1a793fa62b78e8c528",
 *                   carID: "61493e1a793fa62b78e8c529",
 *                   createdAt: "2023-04-22T00:00:00.000Z",
 *                   updatedAt: "2023-04-22T00:00:00.000Z"
 *                 }
 *               ]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server error occurred"
 *
 * /review/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Get a review by ID
 *     tags: [Review] 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *             example:
 *               review:
 *                 id: "61493e1a793fa62b78e8c52a"
 *                 hygeine: 4.5
 *                 carCondition: 3.2
 *                 service: 2.8
 *                 comment: "Great car and service!"
 *                 matchID: "61493e1a793fa62b78e8c527"
 *                 reviewerID: "61493e1a793fa62b78e8c528"
 *                 carID: "61493e1a793fa62b78e8c529"
 *                 createdAt: "2023-04-22T00:00:00.000Z"
 *                 updatedAt: "2023-04-22T00:00:00.000Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Server error occurred"
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
  .post(authenticateUser.required, createReview);
router.route("/review/:id").get(authenticateUser.required, getReviewInfo);

export default router;
