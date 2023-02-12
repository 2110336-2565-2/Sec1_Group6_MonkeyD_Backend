import express from "express";
import {
  createUser,
  login,
  getNavbarInfo,
  updateRole,
} from "../controllers/user.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/user").post(createUser);
router.route("/user/login").post(login);
router.route("/user/navbar").get(auth.required, getNavbarInfo);
router.route("/user").patch(updateRole);

export default router;
