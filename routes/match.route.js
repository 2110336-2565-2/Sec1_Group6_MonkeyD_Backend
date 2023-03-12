import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createMatch,
  getMatches,
  getMatchInfo,
  getMyBooking,
} from "../controllers/match.controller.js";
const router = express.Router();

router
  .route("/match")
  .get(auth.required, getMatches)
  .post(auth.required, createMatch);
router.route("/match/:id").get(auth.required, getMatchInfo);
router.route("/match/me/:id").get(auth.required, getMyBooking);

export default router;
