import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: ".env"});
const frontend_port = process.env.FRONTEND_PORT;

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
  methods: "POST, OPTIONS, GET, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "user_id"],
  exposedHeaders: ["user_id"],
};

export const customCORS = cors(corsOptions);
