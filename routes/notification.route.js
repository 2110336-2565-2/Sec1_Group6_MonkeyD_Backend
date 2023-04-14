/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API for managing notifications
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         userID:
 *           type: string
 *         isRead:
 *           type: boolean
 *       required:
 *         - text
 *         - userID
 *
 * /notification:
 *   post:
 *     summary: Create a new notification.
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Returns the newly created notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Invalid or missing parameters in the request.
 *
 *   get:
 *     summary: Get all notifications.
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Returns all notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized request.
 *
 *   patch:
 *     summary: Update the read status of notifications.
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationIDs:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - notificationIDs
 *     responses:
 *       200:
 *         description: Returns a message confirming the read status update.
 *       400:
 *         description: Invalid or missing parameters in the request.
 *
 * /notification/have-noti:
 *   get:
 *     summary: Check if there are any unread notifications.
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Returns true if there are unread notifications, false otherwise.
 *       401:
 *         description: Unauthorized request.
 */

import express from "express";
import {
  createNotification,
  getNotifications,
  readNotifications,
  haveNotifications,
} from "../controllers/notification.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";
// import {
// } from "../controllers/notification.controller.js";
const router = express.Router();

router
  .route("/notification")
  .post(createNotification)
  .get(getNotifications)
  .patch(readNotifications);
router.route("/notification/have-noti").get(haveNotifications);

export default router;
