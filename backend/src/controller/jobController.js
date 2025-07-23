import Job from "../model/job.js";

export const postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(200).json({
      status: true,
      message: "Job registered successfully.",
      data: savedJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const job = await Job.find();
    res.status(200).json({
      status: true,
      message: "Jobs fetched successfully.",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "err occured! No jobs found",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.length === 0) {
      return res.satus(404).json({
        status: false,
        message: "No jobs found.",
      });
    }
    res.status(200).json({
      status: true,
      message: "job fetched successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job || job.length === 0) {
      return res.satus(404).json({
        status: false,
        message: "No jobs found.",
      });
    }
    res.status(200).json({
      status: true,
      message: "job deleted successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id);
    if (!job || job.length === 0) {
      return res.satus(404).json({
        status: false,
        message: "No jobs found.",
      });
    }
    res.status(200).json({
      status: true,
      message: "job updated successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};
