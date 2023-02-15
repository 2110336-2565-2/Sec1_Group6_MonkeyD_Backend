import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/car").get(getCars);
router.route("/car").post(auth.required, createCars);
router.route("/car/:id").get(getCarInfo);
router.route("/car").patch(auth.required, toggleRented);

export default router;
