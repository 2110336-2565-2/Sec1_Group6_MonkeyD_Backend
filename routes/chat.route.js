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
