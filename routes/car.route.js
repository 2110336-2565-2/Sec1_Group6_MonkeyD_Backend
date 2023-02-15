import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(auth.required, createCars)
  .patch(auth.required, toggleRented);
router.route("/car/:id").get(getCarInfo);

export default router;
