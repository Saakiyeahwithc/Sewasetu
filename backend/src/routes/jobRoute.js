import {
  createJob,
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

router.route("/").post(authenticateToken, createJob).get(getAllJobs);
router.route("/get-jobs-employer").get(authenticateToken, getJobsEmployer);
router
  .route("/:id")
  .get(getJobById)
  .put(authenticateToken, updateJob)
  .delete(authenticateToken, deleteJob);
router.put("/:id/toggle-close", authenticateToken, toggleCloseJob);

export default router;
