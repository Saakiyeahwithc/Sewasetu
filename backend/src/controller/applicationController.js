import Application from "../model/Application.js";

import Job from "../model/Job.js";

//Apply to job
export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can apply" });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: req.user.resume,
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};

//Get logged-in users application
export const getMyApplication = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location type")
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};

//Get all applicants for a Job (for employer)
export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById({ applicant: req.params._id });
    if (!job || job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view applicants" });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("job", "title company locaiton type")
      .populate("applicant", "name email avatar resume");

    res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};

//Get applications by Id (jobseeker or employer)
export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params._id)
      .populate("job", "title")
      .populate("applicant", "name email avatar resume");

    if (!app)
      return res
        .status(404)
        .json({ message: "Application not found.", id: req.params.id });
    const isOwner =
      app.applicant._id.toString() === req.user._id.toString() ||
      app.job.company.toString() === req.user._id.toSring();

    if (!isOwner) {
      return res.status(403).json({
        message: "Not authorized to view this application",
      });
    }
    res.json(app);
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};

//update application status(Employer)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findById(req.params._id.populate("job"));

    if (!app || app.job.company.toString() !== req.user._id.toSring()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }
    app.status = status;
    await app.save();
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};
