/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API for managing notifications
 *
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - text
 *         - userID
 *       properties:
 *         text:
 *           type: string
 *           description: Notification message
 *         userID:
 *           type: string
 *           description: ID of the user for whom the notification is intended
 *         isRead:
 *           type: boolean
 *           description: Whether the notification has been read or not
 *       example:
 *         text: "New message from John"
 *         userID: "613be5c05a0a132b5db0de45"
 *         isRead: false
 */

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Create a new notification
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notification:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     required: true
 *                   userID:
 *                     type: string
 *                     required: true
 *             example:
 *               notification:
 *                 text: You have a new message
 *                 userID: 611dd7396ce7481168ef0f91
 *     responses:
 *       200:
 *         description: A JSON object containing the newly created notification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notification:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     userID:
 *                       type: string
 *                     isRead:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *             example:
 *               notification:
 *                 text: You have a new message
 *                 userID: 611dd7396ce7481168ef0f91
 *                 isRead: false
 *                 createdAt: 2023-04-23T16:20:00.000Z
 *                 updatedAt: 2023-04-23T16:20:00.000Z
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
 * /notification:
 *   get:
 *     summary: Get all notifications for a user
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve notifications for
 *     responses:
 *       200:
 *         description: A JSON object containing an array of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                       userID:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *             example:
 *               notifications:
 *                 - text: You have a new message
 *                   userID: 611dd7396ce7481168ef0f91
 *                   isRead: false
 *                   createdAt: 2023-04-23T16:20:00.000Z
 *                   updatedAt: 2023-04-23T16:20:00.000Z
 *                 - text: You have a new friend request
 *                   userID: 611dd7396ce7481168ef0f91
 *                   isRead: true
 *                   createdAt: 2023-04-23T16:22:00.000Z
 *                   updatedAt: 2023-04-23T16:22:00.000Z
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
 * /notification:
 *   patch:
 *     summary: Mark all notifications as read for a user.
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         description: The ID of the user whose notifications are being marked as read.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Read!
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
 * /notification/have-noti:
 *   get:
 *     summary: Check if a user has unread notifications.
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         description: The ID of the user whose notifications are being checked.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a boolean indicating whether the user has unread notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasUnreadNotifications:
 *                   type: boolean
 *                   example: true
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
import {
  createNotification,
  getNotifications,
  readNotifications,
  haveNotifications,
} from "../controllers/notification.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/notification")
  .post(authenticateUser.required, createNotification)
  .get(authenticateUser.required, getNotifications)
  .patch(authenticateUser.required, readNotifications);
router
  .route("/notification/have-noti")
  .get(authenticateUser.required, haveNotifications);

export default router;
