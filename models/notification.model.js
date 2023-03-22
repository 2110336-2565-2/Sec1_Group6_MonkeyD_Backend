import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const NotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "can't be blank"],
    },
    images: {
        type: [String],
        validate: (v) => Array.isArray(v) && v.length > 0,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "can't be blank"],
    },
  },

  {timestamps: true}
);

NotificationSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    text: this.text,
    images: this.images,
    userID: this.userID,
  };
};


const Notification = mongoose.model("Notification", ReviewSchema);
export default Notification;
