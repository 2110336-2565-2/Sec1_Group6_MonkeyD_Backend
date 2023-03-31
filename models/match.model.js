import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const MatchSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: [
        "Unverified renter",
        "Wait for payment",
        "Cancelled",
        "Rented",
        "Completed",
      ],
      //default: "Unverified renter",
    },
    pickupLocation: {
      type: String,
      required: [true, "can't be blank"],
    },
    returnLocation: {
      type: String,
      required: [true, "can't be blank"],
    },
    pickUpDateTime: {
      type: Date,
      required: [true, "can't be blank"],
    },
    returnDateTime: {
      type: Date,
      required: [true, "can't be blank"],
    },
    renterID: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "can't be blank"],
      index: true,
    },
    lessorID: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "can't be blank"],
    },
    carID: {
      type: mongoose.ObjectId,
      ref: "Car",
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    isReview: {
      type: Boolean,
      required: [true, "can't be blank"],
      default: false,
    },
  },

  {timestamps: true}
);

MatchSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    carID: this.carID,
    lessorID: this.lessorID,
    renterID: this.renterID,
    status: this.status,
    pickupLocation: this.pickupLocation,
    pickUpDateTime: this.pickUpDateTime,
    returnLocation: this.returnLocation,
    returnDateTime: this.returnDateTime,
    price: this.price,
    status: this.status,
    isReview: this.isReview,
  };
};

MatchSchema.methods.toMyBookingJSON = function () {
  return {
    _id: this._id,
    car: this.carID,
    lessorID: this.lessorID,
    renterID: this.renterID,
    status: this.status,
    pickupLocation: this.pickupLocation,
    pickUpDateTime: this.pickUpDateTime,
    returnLocation: this.returnLocation,
    returnDateTime: this.returnDateTime,
    price: this.price,
    isReview: this.isReview,
  };
};

const Match = mongoose.model("Match", MatchSchema);
export default Match;
