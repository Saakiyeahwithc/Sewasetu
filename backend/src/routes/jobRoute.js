import {
  createJob,
  getJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  toggleCloseJob,
  getJobsEmployer,
} from "../controller/jobController.js";

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createJob);
router.get("/get", authenticateToken, getAllJobs);
router.get("/get-jobs-employer", authenticateToken, getJobsEmployer);
router.delete("/delete/:id", authenticateToken, deleteJob);
router.get("/get/:id", authenticateToken, getJobById);
router.put("/update/:id", authenticateToken, updateJob);
router.put("/toggle-close/:id", authenticateToken, toggleCloseJob);

export default router;
