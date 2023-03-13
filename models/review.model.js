import mongoose from "mongoose";
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

ReviewSchema.methods.toCarDetailJSON = function () {
  //console.log(this.createdAt);
  const options = {day: "numeric", month: "long", year: "numeric"};

  return {
    _id: this._id,
    hygeine: this.hygeine,
    carCondition: this.carCondition,
    service: this.service,
    comment: this.comment,
    reviewerID: this.reviewerID._id,
    reviewer: this.reviewerID.username,
    reviewerImg: this.reviewerID.image,
    rating: (this.carCondition + this.service + this.hygeine) / 3,
    createdAt: this.createdAt.toLocaleDateString("en-US", options),
  };
};

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
