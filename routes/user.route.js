import express from "express";
import {
  carRented,
  createUser,
  login,
  getNavbarInfo,
} from "../controllers/user.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/user").post(createUser);
router.route("/user/login").post(login);
router.route("/user").patch(auth.required, carRented);
router.route("/user/navbar").get(auth.required, getNavbarInfo);

export default router;
