import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createMatch,
  getMatches,
  getMatchInfo,
  getMyBookings,
  cancelReserevation,
  getMatchStatuses,
  toggleStatus,
} from "../controllers/match.controller.js";
const router = express.Router();

router
  .route("/match")
  .get(auth.required, getMatches)
  .post(auth.required, createMatch);
router.route("/match/status").get(getMatchStatuses);
router.route("/match/:id").get(auth.required, getMatchInfo);
router.route("/match/me/:id").get(auth.required, getMyBookings);
router
  .route("/match/cancel-reservation")
  .patch(auth.required, cancelReserevation);
router.route("/match/status").patch(toggleStatus);
// router.route("/match/status").patch(auth.required, toggleStatus);
export default router;
