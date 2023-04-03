import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const NotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "can't be blank"],
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "can't be blank"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },

  {timestamps: true}
);

NotificationSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    text: this.text,
    userID: this.userID,
    isRead: this.isRead,
    createdAt: this.createdAt,
  };
};

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
