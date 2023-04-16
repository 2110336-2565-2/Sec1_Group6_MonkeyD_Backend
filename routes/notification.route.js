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
