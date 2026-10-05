import express from "express";
import cors from "cors";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";

import connectDB from "./config/database.js";
import { auth } from "./lib/auth.js";

const app = express();

const PORT = process.env.PORT || 5000;

await connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Better Auth handler MUST come before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});