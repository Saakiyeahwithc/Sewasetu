import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["jobseeker", "admin", "employer"],
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
