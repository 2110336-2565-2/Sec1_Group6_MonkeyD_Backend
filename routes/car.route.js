import express from "express";
import {createCars, getCars} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/car").post(auth.required, createCars);
router.route("/car").get(auth.required, getCars);

export default router;
