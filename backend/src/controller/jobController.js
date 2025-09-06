import Job from "../model/Job.js";
import User from "../model/User.js";
import Application from "../model/Application.js";
import SavedJob from "../model/SavedJob.js";

export const getJobs = async (req, res) => {
  const { keyword, location, category, type, minSalary, maxSalary, userId } =
    req.query;

  const query = {
    isClosed: false,
    ...(keyword && { title: { $regex: keyword, $options: "i" } }),
    ...(location && { location: { $regex: location, $options: "i" } }),
    ...(category && { category }),
    ...(type && { type }),
  };

  if (minSalary || maxSalary) {
    query.$and = [];

    if (minSalary) {
      query.$and.push({ salaryMax: { $gte: Number(minSalary) } });
    }

    if (maxSalary) {
      query.$and.push({ salaryMin: { $lte: Number(maxSalary) } });
    }

    if (query.$and.length === 0) {
      delete query.$and;
    }
  }

  try {
    const jobs = await Job.find(query).populate("company", "name companyName");

    let savedJobIds = [];
    let appliedJobsStatusMap = {};

    if (userId) {
      //savedJobs
      const savedJob = await SavedJob.find({ jobseeker: userId }).select("job");
      savedJobIds = savedJob.map((s) => String(s.job));

      //Appliactions
      const applications = await Application.find({
        applicant: userId,
      }).select("job status");
      applications.forEach((app) => {
        appliedJobsStatusMap[String(app.job)] = app.status;
      });
    }

    //Add isSaved and applicationStatus to each job
    const jobsWithExtras = jobs.map((job) => {
      const jobIdStr = String(job._id);
      return {
        ...job.toObject(),
        isSaved: savedJobIds.includes(jobIdStr),
        applicationStatus: appliedJobsStatusMap[jobIdStr] || null,
      };
    });
    res.json(jobsWithExtras);
  } catch (err) {
    res.status(500).json({
      message: err.message,
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
    console.log("getJobById called with params:", req.params);
    console.log("Job ID:", req.params.id);
    console.log("User ID:", req.user?._id);

    const jobId = req.params.id;
    
    // Validate job ID format
    if (!jobId || jobId.length !== 24) {
      console.log("Invalid job ID format:", jobId);
      return res.status(400).json({
        status: false,
        message: "Invalid job ID format.",
      });
    }

    const userId = req.user._id;
    const job = await Job.findById(jobId);
    
    if (!job) {
      console.log("Job not found with ID:", jobId);
      return res.status(404).json({
        status: false,
        message: "No jobs found.",
      });
    }

    console.log("Job found:", job.title);

    let applicationStatus = null;
    if (userId) {
      try {
        const application = await Application.findOne({
          job: job._id,
          applicant: userId,
        }).select("status");

        if (application) {
          applicationStatus = application.status;
        }
        console.log("Application status:", applicationStatus);
      } catch (appError) {
        console.error("Error fetching application status:", appError);
        // Continue without application status rather than failing
      }
    }

    console.log("Sending job details response");
    res.json({
      ...job.toObject(),
      applicationStatus,
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    console.error("Error stack:", error.stack);
    console.error("Error name:", error.name);
    res.status(500).json({
      status: false,
      message: "Error occurred while fetching job details",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No jobs found.",
      });
    }
    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
      });
    }
    await job.deleteOne();
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
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job)
      return res.status(404).json({
        status: false,
        message: "No jobs found.",
      });

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this job",
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

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can post jobs",
      });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get jobs for logged in users (Employers can see posted jobs)
export const getJobsEmployer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;

    if (role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    //Get all jobs posted by employer
    const jobs = await Job.find({ company: userId })
      .populate("company", "name companyName ")
      .lean(); //makes jobs plain js objects so we can add new feilds

    //count applications for each job
    const jobsWithAppicationCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          job: job._id,
        });
        return {
          ...job,
          applicationCount,
        };
      })
    );

    res.status(200).json(jobsWithAppicationCounts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const toggleCloseJob = async (req, res) => {
  try {
    console.log("Toggle close job called with ID:", req.params.id);
    console.log("User:", req.user?._id);

    const job = await Job.findById(req.params.id);
    if (!job) {
      console.log("Job not found with ID:", req.params.id);
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.company.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to close this job" });
    }

    job.isClosed = !job.isClosed;
    await job.save();

    console.log("Job status toggled successfully:", job.isClosed);
    res.json({
      message: `Job ${job.isClosed ? "closed" : "opened"} successfully`,
      job,
    });
  } catch (err) {
    console.error("Error in toggleCloseJob:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};
