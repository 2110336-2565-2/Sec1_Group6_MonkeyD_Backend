import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: ".env"});
const frontend_port = process.env.FRONTEND_PORT;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://monkey-d-frontend.vercel.app",
    "https://monkeydcar.website",
  ],
  credentials: true,
  methods: "POST, OPTIONS, GET, PUT, DELETE, PATCH",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "user_id",
    "car_id",
    "renter_id",
    "lessor_id",
    "match_id",
    "username",
  ],
  exposedHeaders: [
    "user_id",
    "car_id",
    "renter_id",
    "lessor_id",
    "match_id",
    "username",
  ],
  optionsSuccessStatus: 200,
};

export const customCORS = cors(corsOptions);
