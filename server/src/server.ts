import express from "express";
import mongoose from "mongoose";
import { taskRoutes } from "./tasks/task.router.js";
import cors from "cors";
import { dashboardRoutes } from "./dashboard/dashboard.router.js";
import { authMiddleware } from "./auth/auth.middleware.js";
import { meetingRoutes } from "./meetings/meetings.router.js";
import { NotFoundError, UnauthorizedError } from "./auth/errors.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

await mongoose
  .connect("mongodb://localhost:27017/meetingbot")
  .then((_conn) => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MeetingBot API" });
});

app.get("/die/any", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/die/auth", (req, res) => {
  throw new UnauthorizedError("auth error");
});

app.get("/die/404", (req, res) => {
  throw new NotFoundError("somthing missing");
});

app.use("/api/meetings", authMiddleware, meetingRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);

    if (err instanceof UnauthorizedError) {
      res.status(401).json({ message: err.message });
      return;
    }

    res
      .status(500)
      .json({ message: "An unexpected error occurred", error: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
