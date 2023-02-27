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
  };
};

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
