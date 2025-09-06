import express from "express";

import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEmployerAnalytics } from "../controller/analyticsController.js";

const router = express.Router();

// Add logging middleware for this route
router.use((req, res, next) => {
  console.log(`Analytics route hit: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/overview", authenticateToken, getEmployerAnalytics);

export default router;
