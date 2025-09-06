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

router.get("/", authenticateToken, getJobs);
router.post("/create", authenticateToken, createJob);
router.get("/get", authenticateToken, getAllJobs);
router.get("/get-jobs-employer", authenticateToken, getJobsEmployer);
router.delete("/delete/:id", authenticateToken, deleteJob);
router.get("/get/:id", (req, res, next) => {
  console.log("Job details route hit with ID:", req.params.id);
  next();
}, authenticateToken, getJobById);
router.put("/update/:id", authenticateToken, updateJob);
router.put(
  "/toggle-close/:id",
  (req, res, next) => {
    console.log("Toggle close route hit with ID:", req.params.id);
    next();
  },
  authenticateToken,
  toggleCloseJob
);

export default router;
