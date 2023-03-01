import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const MatchSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: ["Pending", "Cancelled", "Rented", "Complete"],
      default: "Pending",
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
      required: [true, "can't be blank"],
    },
    lessorID: {
      type: mongoose.ObjectId,
      required: [true, "can't be blank"],
    },
    carID: {
      type: mongoose.ObjectId,
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
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
  };
};

const Match = mongoose.model("Match", MatchSchema);
export default Match;
