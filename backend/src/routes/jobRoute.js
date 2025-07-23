import {
  deleteJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controller/jobController.js";

import express from "express";

const router = express.Router();

router.post("/", postJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob);

export default router;
