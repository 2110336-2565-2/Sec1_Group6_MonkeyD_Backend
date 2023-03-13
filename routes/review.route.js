import express from "express";
import auth from "../middlewares/jwt.middleware.js";
import {
  createReview,
  getReviews,
  getReviewInfo,
} from "../controllers/review.controllers.js";
const router = express.Router();

router
  .route("/review")
  // .get(auth.required, getReviews)
  .get(getReviews)
  .post(auth.required, createReview);
router.route("/review/:id").get(auth.required, getReviewInfo);

export default router;
