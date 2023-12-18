import express from "express";
import authRoutes from "#routes/auth";

// prettier-ignore
const router = express.Router()
  .use("/auth", authRoutes);

export default router;
