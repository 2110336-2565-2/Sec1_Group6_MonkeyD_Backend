import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({path: ".env"});

const secret = process.env.JWT_SECRET;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    image: {
      type: String,
      default: "https://pic.onlinewebfonts.com/svg/img_264157.png",
    },
    owncars: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    isLesser: {
      type: Boolean,
      default: false,
    },
    rentedCount: {
      type: Number,
      default: 0,
    },
    rentedOutCount: {
      type: Number,
      default: 0,
    },
    hash: String,
    salt: String,
  },
  {timestamps: true}
);

UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    token: this.generateJWT(),
  };
};
UserSchema.methods.getIdJSON = function () {
  return {
    user_id: this._id,
  };
};

UserSchema.methods.getNavbarJSON = function () {
  return {
    image: this.image,
  };
};

const User = mongoose.model("User", UserSchema);
export default User;
