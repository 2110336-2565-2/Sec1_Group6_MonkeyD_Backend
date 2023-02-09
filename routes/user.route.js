import express from "express";
import {
  createUser,
  login,
  getNavbarInfo,
} from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/user", auth.required, function (req, res, next) {
//   res.send("get user");
// });

// router.put("/user", auth.required, function (req, res, next) {
//   res.send("update");
// });

router.route("/user").post(createUser);
router.route("/user/login").post(login);
router.route("/user/navbar").get(getNavbarInfo);

export default router;
