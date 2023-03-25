import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const PaymentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: ["Pending", "Cancelled", "Completed"],
      default: "Pending",
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
    matchID: {
      type: mongoose.ObjectId,
      ref: "Match",
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
  },

  {timestamps: true}
);

PaymentSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    carID: this.carID,
    lessorID: this.lessorID,
    renterID: this.renterID,
    status: this.status,
    price: this.price,
    createdAt: this.createdAt,
  };
};

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
