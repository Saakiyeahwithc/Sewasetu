import SavedJob from "../model/SavedJob.js";

//Save a Job
export const saveJob = async (req, res) => {
  try {
    const exists = await SavedJob.findOne({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    if (exists) return req.status(400).json({ message: "Job already saved" });

    const saved = await SavedJob.create({
      job: req.params.jobId,
      jobSeeker: req.user._id,
    });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save job", error: err.message });
  }
};

//Unsave a Job
export const unsaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      job: req.params.jobId,
      jobseeker: req.user._id,
    });
    res.json({ message: "Job removed from the saved list" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove job", error: err.message });
  }
};

//Get saved jobs from current user
export const getMySavedJob = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ jobseeker: req.user._id }).populate(
      {
        path: "job",
        populate: {
          path: "company",
          select: " name companyName",
        },
      }
    );
    res.json(savedJobs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch saved job", error: err.message });
  }
};
