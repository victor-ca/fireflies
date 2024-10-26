import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { getDashboardDataByUserId } from "./getDashboardDataByUserId.js";

const router = express.Router();

router.get("/", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId!;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const dashboardData = await getDashboardDataByUserId(userId);
  res.json(dashboardData);
});

export { router as dashboardRoutes };
