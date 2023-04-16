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
