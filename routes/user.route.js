import express from "express";
import {createUser, login, AddInform, ViewInfo} from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/user", auth.required, function (req, res, next) {
//   res.send("get user");
// });

// router.put("/user", auth.required, function (req, res, next) {
//   res.send("update");
// });

router.route("/user").post(createUser);
router.route("/user/login").post(login);
router.route("/user").patch(AddInform);
router.route("/user").get(ViewInfo);
export default router;