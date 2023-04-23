/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
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
 *         - isReview
 *       properties:
 *         status:
 *           type: string
 *           description: The status of the match, e.g. "Unverified renter", "Wait for payment", "Cancelled", "Rented", "Completed".
 *           enum: ["Unverified renter", "Wait for payment", "Cancelled", "Rented", "Completed"]
 *         pickupLocation:
 *           type: string
 *           description: The pickup location of the match.
 *         returnLocation:
 *           type: string
 *           description: The return location of the match.
 *         pickUpDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the match pickup.
 *         returnDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the match return.
 *         renterID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user renting the car.
 *           example: 6123fa64cc9ac57c5d937d90
 *         lessorID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user leasing the car.
 *           example: 6123fa64cc9ac57c5d937d91
 *         carID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the car being rented.
 *           example: 6123fa64cc9ac57c5d937d92
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: The price of the match in dollars.
 *         isReview:
 *           type: boolean
 *           description: Indicates whether a review has been left for the match.
 *           example: false
 *       example:
 *         status: "Unverified renter"
 *         pickupLocation: "123 Main St."
 *         returnLocation: "456 Oak St."
 *         pickUpDateTime: "2023-05-01T10:00:00Z"
 *         returnDateTime: "2023-05-05T16:30:00Z"
 *         renterID: "6123fa64cc9ac57c5d937d90"
 *         lessorID: "6123fa64cc9ac57c5d937d91"
 *         carID: "6123fa64cc9ac57c5d937d92"
 *         price: 250.00
 *         isReview: false
 */
/**
 * @swagger
 * tags:
 *   name: Match
 *   description: API for managing car rental matches.
 */ 
/**
 * @swagger
 * /match:
 *   post:
 *     summary: Create a new match
 *     description: Create a new match with the given data
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
 *               match:
 *                 $ref: '#/components/schemas/Match'
 *           example:
 *             match:
 *               carID: "61493e1a793fa62b78e8c529"
 *               lessorID: "61493e1a793fa62b78e8c52a"
 *               renterID: "61493e1a793fa62b78e8c52b"
 *               status: "pending"
 *               pickupLocation: "Los Angeles"
 *               pickUpDateTime: "2023-04-25T10:00:00.000Z"
 *               returnLocation: "San Francisco"
 *               returnDateTime: "2023-04-28T10:00:00.000Z"
 *               price: 500
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 match:
 *                   type: object
 *                   $ref: '#/components/schemas/Match'
 *             example:
 *               match:
 *                 id: "61493e1a793fa62b78e8c527"
 *                 carID: "61493e1a793fa62b78e8c529"
 *                 lessorID: "61493e1a793fa62b78e8c52a"
 *                 renterID: "61493e1a793fa62b78e8c52b"
 *                 status: "pending"
 *                 pickupLocation: "Los Angeles"
 *                 pickUpDateTime: "2023-04-25T10:00:00.000Z"
 *                 returnLocation: "San Francisco"
 *                 returnDateTime: "2023-04-28T10:00:00.000Z"
 *                 price: 500
 *                 createdAt: "2023-04-23T00:00:00.000Z"
 *                 updatedAt: "2023-04-23T00:00:00.000Z"
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
 *               error: "something already exists"
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
 * /match:
 *   get:
 *     summary: Get matches
 *     description: Retrieve matches based on the given query parameters
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the match
 *       - in: query
 *         name: carID
 *         schema:
 *           type: string
 *         description: ID of the car
 *       - in: query
 *         name: lessorID
 *         schema:
 *           type: string
 *         description: ID of the lessor
 *       - in: query
 *         name: renterID
 *         schema:
 *           type: string
 *         description: ID of the renter
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
 *                     type: object
 *                     $ref: '#/components/schemas/Match'
 *             example:
 *               matches:
 *                 - id: "61493e1a793fa62b78e8c527"
 *                   carID: "61493e1a793fa62b78e8c529"
 *                   lessorID: "61493e1a793fa62b78e8c52a"
 *                   renterID: "61493e1a793fa62b78e8c52b"
 *                   status: "pending"
 *                   pickupLocation: "Los Angeles"
 *                   pickUpDateTime: "2023-04-25T10:00:00.000Z"
 *                   returnLocation: "San Francisco"
 *                   returnDateTime: "2023-04-28T10:00:00.000Z"
 *                   price: 500
 *                   createdAt: "2023-04-23T00:00:00.000Z"
 *                   updatedAt: "2023-04-23T00:00:00.000Z"
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
 */
/**
 * @swagger
 * /match/{id}:
 *   get:
 *     summary: Get match info by ID
 *     description: Retrieve the match info for a specific match by ID
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the match
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 match:
 *                   type: object
 *                   $ref: '#/components/schemas/Match'
 *             example:
 *               match:
 *                 id: "61493e1a793fa62b78e8c527"
 *                 carID: "61493e1a793fa62b78e8c529"
 *                 lessorID: "61493e1a793fa62b78e8c52a"
 *                 renterID: "61493e1a793fa62b78e8c52b"
 *                 status: "pending"
 *                 pickupLocation: "Los Angeles"
 *                 pickUpDateTime: "2023-04-25T10:00:00.000Z"
 *                 returnLocation: "San Francisco"
 *                 returnDateTime: "2023-04-28T10:00:00.000Z"
 *                 price: 500
 *                 createdAt: "2023-04-23T00:00:00.000Z"
 *                 updatedAt: "2023-04-23T00:00:00.000Z"
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
 * /match/status:
 *   get:
 *     summary: Get match statuses
 *     description: Retrieve all possible match statuses
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               status: ["pending", "approved", "rejected"]
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
 * /match/me/{id}:
 *   get:
 *     summary: Retrieve all bookings made by a specific user
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to retrieve bookings for
 *         schema:
 *           type: string
 *           format: ObjectId
 *           example: 6123fa64cc9ac57c5d937d90
 *       - in: query
 *         name: status
 *         description: Array of booking status to filter by
 *         schema:
 *           type: string
 *           example: '["Rented", "Completed"]'
 *       - in: query
 *         name: carID
 *         description: Car ID to filter by
 *         schema:
 *           type: string
 *           format: ObjectId
 *           example: 6123fa64cc9ac57c5d937d92
 *       - in: query
 *         name: lessorID
 *         description: Lessor ID to filter by
 *         schema:
 *           type: string
 *           format: ObjectId
 *           example: 6123fa64cc9ac57c5d937d91
 *     responses:
 *       200:
 *         description: A list of bookings made by the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Match'
 *                   description: A list of bookings made by the specified user
 *                 count:
 *                   type: integer
 *                   description: The number of bookings made by the specified user
 *                   example: 2
 *             example:
 *               matches:
 *                 - status: "Rented"
 *                   pickupLocation: "123 Main St."
 *                   returnLocation: "456 Oak St."
 *                   pickUpDateTime: "2023-05-01T10:00:00Z"
 *                   returnDateTime: "2023-05-05T16:30:00Z"
 *                   renterID: "6123fa64cc9ac57c5d937d90"
 *                   lessorID: "6123fa64cc9ac57c5d937d91"
 *                   carID: "6123fa64cc9ac57c5d937d92"
 *                   price: 250.00
 *                   isReview: false
 *                   car_image: "https://example.com/image.jpg"
 *               count: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: Internal server error
 */
/**
 * @swagger
 * /match/cancel-reservation:
 *   patch:
 *     summary: Cancel a reservation by updating the match status and car availability.
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: match_id
 *         required: true
 *         description: The ID of the match to cancel.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A message indicating the booking has been cancelled.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cancel booking"
 *       404:
 *         description: The match or car cannot be found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cannot find match"
 *       500:
 *         description: An error occurred while updating the match or car.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /match/status:
 *   patch:
 *     summary: Change the status of a match.
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_id:
 *                 type: string
 *                 description: The ID of the match to modify.
 *               action:
 *                 type: string
 *                 enum: [Cancel, Paid, Completed]
 *                 description: The action to perform on the match.
 *             example:
 *               match_id: "60f04b1d68a9cf003ecde230"
 *               action: "Paid"
 *     responses:
 *       '200':
 *         description: Match status changed
 *         example:
 *           message: Match status changed
 *       '400':
 *         description: Invalid request body
 *         example:
 *           message: Invalid request body
 *       '404':
 *         description: Cannot find match/chat
 *         example:
 *           message: Cannot find match/chat
 *       '500':
 *         description: Internal server error
 *         example:
 *           message: Internal server error
 */
/**
 * @swagger
 * /match/admin:
 *   get:
 *     summary: Get matches by search
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     description: Returns matches based on the provided search query parameters. If no parameters are provided, returns all matches.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter matches by status.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for matches with specific usernames or license plates.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort the matches by date created, either "oldest date" or "newest date".
 *     responses:
 *       200:
 *         description: A list of matches that match the search parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the match.
 *                         example: 615ecf292ca1d57d1a7eef68
 *                       renterID:
 *                         type: string
 *                         description: The ID of the renter.
 *                         example: 615ecf292ca1d57d1a7eef68
 *                       lessorID:
 *                         type: string
 *                         description: The ID of the lessor.
 *                         example: 615ecf292ca1d57d1a7eef68
 *                       carID:
 *                         type: string
 *                         description: The ID of the car.
 *                         example: 615ecf292ca1d57d1a7eef68
 *                       status:
 *                         type: string
 *                         description: The status of the match.
 *                         example: Pending
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the match was created.
 *                         example: '2021-10-06T14:32:52.011Z'
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the match was last updated.
 *                         example: '2021-10-06T14:32:52.011Z'
 *                 count:
 *                   type: number
 *                   description: The number of matches returned.
 *                   example: 1
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /match/complete:
 *   patch:
 *     summary: Marks a match as completed and deletes associated chat rooms.
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
 *               match_id:
 *                 type: string
 *                 description: The ID of the match to complete.
 *                 example: "6107be1dc0b52d7c2d162f28"
 *     responses:
 *       "200":
 *         description: Match status changed and associated chat rooms deleted.
 *         content:
 *           application/json:
 *             example:
 *               message: "Match status changed and Chat deleted"
 *       "404":
 *         description: Cannot find match or chat rooms.
 *         content:
 *           application/json:
 *             example:
 *               message: "Cannot find match" 
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
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
  .get(authenticateUser.required, authorizeUser("admin"), getMatchesBySearch);
router.route("/match/:id").get(authenticateUser.required, getMatchInfo);
router.route("/match/me/:id").get(authenticateUser.required, getMyBookings);
router
  .route("/match/cancel-reservation")
  .patch(authenticateUser.required, cancelReserevation);

router.route("/match/status").patch(authenticateUser.required, toggleStatus);
router.route("/match/complete").patch(authenticateUser.required, matchComplete);

export default router;
