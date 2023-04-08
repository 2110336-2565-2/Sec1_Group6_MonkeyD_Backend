import express from "express";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {
  createReview,
  getReviews,
  getReviewInfo,
} from "../controllers/review.controllers.js";
const router = express.Router();

router
  .route("/review")
  .get(getReviews)
  // .post(createReview);
  // .get(auth.required, getReviews)
  .post(authenticateUser.required, createReview);
router.route("/review/:id").get(authenticateUser.required, getReviewInfo);

export default router;
