/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         matchID:
 *           type: string
 *           description: The ID of the match associated with the chat room.
 *         allowedUsers:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the users allowed to access the chat room.
 *       required:
 *         - matchID
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
 *         text:
 *           type: string
 *         user:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - chatId
 *         - text
 *         - user
 *         - createdAt
 */
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API endpoints for managing chat rooms
 *
 * /chat:
 *   post:
 *     summary: Create a new chat room
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRoom'
 *     responses:
 *       201:
 *         description: Returns the newly created chat room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatRoom'
 *       400:
 *         description: Invalid or missing parameters in the request.
 */


import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {createChat} from "../controllers/chat.controller.js";
const router = express.Router();

// router.route("/chat").post(authenticateUser.required, createChat);
router.route("/chat").post(createChat);

export default router;
