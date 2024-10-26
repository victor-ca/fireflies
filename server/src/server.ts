import express from "express";
import mongoose from "mongoose";
import { taskRoutes } from "./tasks/task.router.js";
import cors from "cors";
import { dashboardRoutes } from "./dashboard/dashboard.router.js";
import { authMiddleware } from "./auth/auth.middleware.js";
import { meetingRoutes } from "./meetings/meetings.router.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

await mongoose
  .connect("mongodb://localhost:27017/meetingbot")
  .then((conn) => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MeetingBot API" });
});

app.use("/api/meetings", authMiddleware, meetingRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
