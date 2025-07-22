import {
  getAllJobs,
  getJobsById,
  postJob,
} from "../controller/jobController.js";

import express from "express";

const router = express.Router();

router.post("/", postJob);
router.get("/", getAllJobs);
router.get("/:id", getJobsById);

export default router;
