import express from "express";

import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEmployerAnalytics } from "../controller/analyticsController.js";

const router = express.Router();

router.get("/overview", authenticateToken, getEmployerAnalytics);

export default router;
