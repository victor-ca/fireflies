import express from "express";
import { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { useSecureTaskService } from "../service.setup.js";

export const router = express.Router();

router.get("/", async (req: AuthenticatedRequest, res) => {
  const secureTaskService = useSecureTaskService(req.userId);
  const tasks = await secureTaskService.findByUserId(req.userId!);
  res.json(tasks);
});

export { router as taskRoutes };
