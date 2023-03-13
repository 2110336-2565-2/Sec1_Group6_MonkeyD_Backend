import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
  getMyCar,
  deleteCar,
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
router.route("/car/me/:username").get(getMyCar);

export default router;
