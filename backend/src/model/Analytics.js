
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalJobsPosted: { type: Number, default: 0 },
    totalApplicationsRecieved: { type: Number, default: 0 },
    totalHired: { type: Number, default: 0 },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
