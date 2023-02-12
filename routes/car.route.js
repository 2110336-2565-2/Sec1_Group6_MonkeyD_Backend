import express from "express";
import {createCars, getCars, getCarInfo, toggleRented} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/car").get(getCars);
router.route("/car").post(auth.required, createCars);
router.route("/car").get(auth.required, getCars);
router.route("/car/:id").get(auth.required, getCarInfo);
router.route("/car").patch(auth.required, toggleRented);

export default router;
