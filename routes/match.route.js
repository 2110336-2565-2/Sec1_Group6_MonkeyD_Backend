import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createMatch,
  getMatches,
  getMatchInfo,
  getMyBooking,
  cancelReserevation,
} from "../controllers/match.controller.js";
const router = express.Router();

router
  .route("/match")
  .get(auth.required, getMatches)
  .post(auth.required, createMatch);
router.route("/match/:id").get(auth.required, getMatchInfo);
router.route("/match/me/:id").get(auth.required, getMyBooking);
// router.route("/match/cancel-reservation").patch(auth.required, cancelReserevation);
router.route("/match/cancel-reservation").patch(cancelReserevation);
export default router;
