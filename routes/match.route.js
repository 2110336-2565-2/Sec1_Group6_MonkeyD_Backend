import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createMatch,
  getMatches,
  getMatchInfo,
} from "../controllers/match.controller.js";
const router = express.Router();

router
  .route("/match")
  .get(auth.required, getMatches)
  .post(auth.required, createMatch);
router.route("/match/:id").get(auth.required, getMatchInfo);

export default router;
