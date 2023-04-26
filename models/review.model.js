import mongoose from "mongoose";
import {getImageUrl} from "../utils/gcs.utils.js";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const ReviewSchema = new mongoose.Schema(
  {
    hygeine: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "can't be blank"],
    },
    carCondition: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "can't be blank"],
    },
    service: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "can't be blank"],
    },
    comment: {
      type: String,
    },
    matchID: {
      type: mongoose.ObjectId,
      required: [true, "can't be blank"],
      unique: true,
    },
    reviewerID: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "can't be blank"],
    },
    carID: {
      type: mongoose.ObjectId,
      ref: "Car",
      required: [true, "can't be blank"],
    },
  },

  {timestamps: true}
);

ReviewSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    hygeine: this.hygeine,
    carCondition: this.carCondition,
    service: this.service,
    comment: this.comment,
    matchID: this.matchID,
    carID: this.carID,
    reviewerID: this.reviewerID,
  };
};

ReviewSchema.methods.toCarDetailJSON = async function () {
  const options = {day: "numeric", month: "long", year: "numeric"};
  let imageUrl;
  if (this.reviewerID.image.startsWith("https://lh3.googleusercontent.com")) {
    imageUrl = this.reviewerID.image;
  } else {
    imageUrl = await getImageUrl(
      process.env.GCS_PROFILE_BUCKET,
      null,
      this.reviewerID.image
    );
  }
  return {
    _id: this._id,
    hygeine: this.hygeine,
    carCondition: this.carCondition,
    service: this.service,
    comment: this.comment,
    reviewerID: this.reviewerID._id,
    reviewer: this.reviewerID.username,
    reviewerImg: imageUrl,
    rating: (this.carCondition + this.service + this.hygeine) / 3,
    createdAt: this.createdAt.toLocaleDateString("en-US", options),
  };
};

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
