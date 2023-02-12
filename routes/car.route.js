import express from "express";
import {createCars, getCars, getCarInfo} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/car").post(auth.required, createCars);
router.route("/car").get(auth.required, getCars);
router.route("/car/:id").get(auth.required, getCarInfo);

export default router;
