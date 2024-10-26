import express from "express";
import mongoose from "mongoose";
import { taskRoutes } from "./tasks/task.router.js";
import cors from "cors";
import { dashboardRoutes } from "./dashboard/dashboard.router.js";
import { authMiddleware } from "./auth/auth.middleware.js";
import { meetingRoutes } from "./meetings/meetings.router.js";
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT ?? 3000;

await mongoose
  .connect("mongodb://localhost:27017/meetingbot")
  .then((conn) => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// Example usage:
// app.post('/api/example', validate([
//   body('username').isString().notEmpty(),
//   body('email').isEmail(),
// ]), (req, res) => {
//   // Your route handler
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MeetingBot API" });
});

app.use("/api/meetings", authMiddleware, meetingRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
