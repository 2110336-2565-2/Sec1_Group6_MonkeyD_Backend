import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: "POST, OPTIONS, GET, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const customCORS = cors(corsOptions);
