import "dotenv/config";

import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import postRoutes from "./routes/postRoutes.js";

import commentRoutes from "./routes/commentRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";

// DATABASE
connectDB();

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thought-nest-blush.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("ThoughtNest API Running");
});

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/ai", aiRoutes);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});