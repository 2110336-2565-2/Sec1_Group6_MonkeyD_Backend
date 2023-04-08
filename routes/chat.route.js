import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {createChat} from "../controllers/chat.controller.js";
const router = express.Router();

// router.route("/chat").post(authenticateUser.required, createChat);
router.route("/chat").post(createChat);

export default router;
