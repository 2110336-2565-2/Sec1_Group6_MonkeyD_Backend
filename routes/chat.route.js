/**
 * @swagger
 * components:
 *   schemas:
 *     ChatRoom:
 *       type: object
 *       required:
 *         - matchID
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the chat room.
 *           example: "Room 1"
 *         matchID:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the match associated with the chat room.
 *           example: 6123fa64cc9ac57c5d937d8f
 *         allowedUsers:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: The IDs of the users allowed to access the chat room.
 *             example: [ "6123fa64cc9ac57c5d937d90", "6123fa64cc9ac57c5d937d91" ]
 *       example:
 *         name: "Room 1"
 *         matchID: 6123fa64cc9ac57c5d937d8f
 *         allowedUsers: [ "6123fa64cc9ac57c5d937d90", "6123fa64cc9ac57c5d937d91" ]
 *
 * @swagger
 * tags:
 *   name: Chat
 *   description: API for managing chat rooms
 */
/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Create a new chat room
 *     description: Create a new chat room with the given allowedUsers and matchID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allowedUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *               matchID:
 *                 type: string
 *             example:
 *               allowedUsers: ["613be5c05a0a132b5db0de45", "613be5c05a0a132b5db0de46"]
 *               matchID: "613be5c05a0a132b5db0de47"
 *     responses:
 *       201:
 *         description: Chat room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Chat created successfully."
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Invalid request body"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Server error occurred"
 */

/**
 * @swagger
 * /chat/noti:
 *   patch:
 *     summary: Toggle notification setting for a chat room
 *     description: Toggle notification setting for a chat room for a user with the given user_id
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: chat_id
 *         schema:
 *           type: string
 *         description: ID of the chat room for which to toggle notification setting
 *         required: true
 *       - in: header
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID of the user for which to toggle notification setting
 *         required: true
 *     responses:
 *       200:
 *         description: Notification setting toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Turn on notification for this chat"
 *       400:
 *         description: Invalid headers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Invalid headers"
 *       404:
 *         description: User not found or chat room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Cannot find user or chat room"
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
 *               error: "Server error occurred"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         chatId:
 *           type: string
 *           description: ID of the chat room this message belongs to.
 *         text:
 *           type: string
 *           description: Content of the message.
 *         user:
 *           type: string
 *           description: ID of the user who sent the message.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the message was created.
 *       example:
 *         chatId: "61493e1a793fa62b78e8c52a"
 *         text: "Hello world!"
 *         user: "61493e1a793fa62b78e8c528"
 *         createdAt: "2023-04-23T10:15:00.000Z"
 */

import express from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {createChat, toggleNotiChat} from "../controllers/chat.controller.js";
const router = express.Router();

router.route("/chat").post(authenticateUser.required, createChat);
router.route("/chat/noti").patch(authenticateUser.required, toggleNotiChat);
export default router;
