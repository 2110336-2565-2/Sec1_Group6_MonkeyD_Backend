import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
  getMyCar,
  deleteCar,
  getNumberOfRentals,
} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(auth.required, createCars)
  .patch(auth.required, toggleRented)
  .delete(auth.required, deleteCar);
router.route("/car/:id").get(getCarInfo);
router.route("/car/number-of-retal/:id").get(auth.required, getNumberOfRentals);
router.route("/car/me/:username").get(auth.required, getMyCar);

export default router;
