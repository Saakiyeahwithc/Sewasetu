import Job from "../model/Job.js";
import Application from "../model/Application.js";

export const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};
export const getEmployerAnalytics = async (req, res) => {
  try {
    console.log("Analytics API called - User:", req.user);

    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const companyId = req.user._id;
    console.log("Company ID:", companyId);
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);
    const prev7Days = new Date(now);
    prev7Days.setDate(now.getDate() - 14);

    //Counts
    console.log("Fetching active jobs count...");
    const totalActiveJobs = await Job.countDocuments({
      company: companyId,
      isClosed: false,
    });
    console.log("Total active jobs:", totalActiveJobs);

    console.log("Fetching jobs for company...");
    const jobs = await Job.find({ company: companyId }).select("_id").lean();
    const jobIds = jobs.map((job) => job._id);
    console.log("Job IDs found:", jobIds.length);

    // If no jobs exist, return default values
    if (jobIds.length === 0) {
      return res.json({
        counts: {
          totalActiveJobs: 0,
          totalApplications: 0,
          totalHired: 0,
          trends: {
            activeJobs: 0,
            totalApplications: 0,
            totalHired: 0,
          },
        },
        data: {
          recentJobs: [],
          recentApplications: [],
        },
      });
    }

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const totalHired = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    //== trends ==

    //Active jobs post trend
    const activeJobsLast7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: last7Days, $lte: now },
    });

    const activeJobsPrev7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: prev7Days, $lte: last7Days },
    });

    const activeJobTrend = getTrend(activeJobsLast7, activeJobsPrev7);

    //Application Trend
    const applicationsLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7Days, $lte: now },
    });

    const applicationPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });

    const applicantTrend = getTrend(applicationsLast7, applicationPrev7);

    //Hired application trend
    const hiredLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: last7Days, $lte: now },
    });

    const hiredPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });

    const hiredTrend = getTrend(hiredLast7, hiredPrev7);

    //==Data==
    const recentJobs = await Job.find({ company: companyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title location type createdAt isClosed");

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("applicant", "name email avatar")
      .populate("job", "title");

    res.json({
      counts: {
        totalActiveJobs,
        totalApplications,
        totalHired,
        trends: {
          activeJobs: activeJobTrend,
          totalApplications: applicantTrend,
          totalHired: hiredTrend,
        },
      },
      data: {
        recentJobs,
        recentApplications,
      },
    });
  } catch (err) {
    console.error("Analytics error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
      user: req.user ? { id: req.user._id, role: req.user.role } : "No user",
    });
    res
      .status(500)
      .json({ message: "Failed to fetch analytics", error: err.message });
  }
};
