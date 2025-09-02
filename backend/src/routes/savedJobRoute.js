import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  saveJob,
  unsaveJob,
  getMySavedJob,
} from "../controller/savedJobController.js";

router.post("/:jobId", authenticateToken, saveJob);
router.delete("/:jobId", authenticateToken, unsaveJob);
router.get("/my", authenticateToken, getMySavedJob);

export default router;
