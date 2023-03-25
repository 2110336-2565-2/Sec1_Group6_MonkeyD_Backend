import express from "express";
import { createNotification, getNotifications, readNotifications, haveNotifications } from "../controllers/notification.controller.js";
import auth from "../middlewares/jwt.middleware.js";
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
