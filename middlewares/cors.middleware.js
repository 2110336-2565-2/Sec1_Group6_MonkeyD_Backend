import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: ".env"});
const frontend_port = process.env.FRONTEND_PORT;

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
  methods: "POST, OPTIONS, GET, PUT, DELETE, PATCH",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "user_id",
    "car_id",
    "renter_id",
    "lessor_id",
    "username",
  ],
  exposedHeaders: ["user_id", "car_id", "renter_id", "lessor_id", "username"],
};

export const customCORS = cors(corsOptions);
