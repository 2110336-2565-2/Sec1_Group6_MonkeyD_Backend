import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
  methods: "POST, OPTIONS, GET, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "user_id"],
  exposedHeaders: ["user_id"],
};

export const customCORS = cors(corsOptions);
