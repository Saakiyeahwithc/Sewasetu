import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Remote", "Full-Time", "Part-Time"],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    isClosed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let Job;
try {
  Job = mongoose.model("Job");
} catch (error) {
  Job = mongoose.model("Job", jobSchema);
}

export default Job;
