import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
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
  .post(createMatch);
// .post(auth.required, createMatch);
router.route("/match/status").get(getMatchStatuses);
router.route("/match/admin").get(getMatchesBySearch);
router.route("/match/:id").get(authenticateUser.required, getMatchInfo);
router.route("/match/me/:id").get(authenticateUser.required, getMyBookings);
router
  .route("/match/cancel-reservation")
  .patch(authenticateUser.required, cancelReserevation);

// router.route("/match/status").patch(toggleStatus);
router.route("/match/status").patch(authenticateUser.required, toggleStatus);
// router.route("/match/complete").patch(authenticateUser.required, matchComplete);
router.route("/match/complete").patch(matchComplete);
export default router;
