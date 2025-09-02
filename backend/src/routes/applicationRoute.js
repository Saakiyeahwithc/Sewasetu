import express from "express";

import {
  applyToJob,
  getMyApplication,
  getApplicantsForJob,
  getApplicationById,
  updateStatus,
} from "../controller/applicationController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:jobId", authenticateToken, applyToJob);
router.get("/my", authenticateToken, getMyApplication);
router.get("/job/:jobId", authenticateToken, getApplicantsForJob);
router.get("/:id", authenticateToken, getApplicationById);
router.put("/:id/status", authenticateToken, updateStatus);

export default router;
