import User from "../model/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
export const registerUser = async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;
    const { email } = req.body;

    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "password not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...otherFields,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(200).json({
      status: true,
      message: "User registered successfully.",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occurred during the process.",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while updating",
      error: error.message,
    });
  }
};

// delete resume file
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: `No users with id ${req.params.id} found`,
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: `Error occured while deleting the data of user ${req.params.id}`,
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("Update profile called");
    console.log("User ID:", req.user?._id);
    console.log("Request body:", req.body);

    const { name, avatar, jobTitle, jobDescription, resume, companyName } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("User not found with ID:", req.user._id);
      return res.status(404).json({
        message: "User not found.",
      });
    }

    console.log("Found user:", user.name, "Role:", user.role);
    console.log("Existing user data:", {
      name: user.name,
      avatar: user.avatar,
      jobTitle: user.jobTitle,
      jobDescription: user.jobDescription,
      companyName: user.companyName,
      resume: user.resume,
    });

    // Update basic fields with validation
    try {
      if (name !== undefined && name !== null) {
        user.name = name;
        console.log("Updated name to:", name);
      }
      if (avatar !== undefined) {
        user.avatar = avatar;
        console.log("Updated avatar to:", avatar);
      }
      if (resume !== undefined) {
        user.resume = resume;
        console.log("Updated resume to:", resume);
      }

      // Update employer-specific fields
      if (user.role === "employer") {
        if (jobTitle !== undefined) {
          user.jobTitle = jobTitle;
          console.log("Updated jobTitle to:", jobTitle);
        }
        if (jobDescription !== undefined) {
          user.jobDescription = jobDescription || "";
          console.log("Updated jobDescription to:", jobDescription);
        }
        if (companyName !== undefined) {
          user.companyName = companyName || "";
          console.log("Updated companyName to:", companyName);
        }
      }

      console.log("About to save user...");
      console.log("User data before save:", {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        jobTitle: user.jobTitle,
        jobDescription: user.jobDescription,
        companyName: user.companyName,
        resume: user.resume,
      });

      // Use findByIdAndUpdate instead of save() to avoid potential schema issues
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: user.name,
          avatar: user.avatar || "",
          resume: user.resume || "",
          jobTitle: user.jobTitle || "",
          jobDescription: user.jobDescription || "",
          companyName: user.companyName || "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log("User updated successfully");

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        avatar: updatedUser.avatar || "",
        role: updatedUser.role,
        jobTitle: updatedUser.jobTitle || "",
        jobDescription: updatedUser.jobDescription || "",
        companyName: updatedUser.companyName || "",
        resume: updatedUser.resume || "",
        email: updatedUser.email,
      });
    } catch (saveError) {
      console.error("Error during save operation:", saveError);
      console.error("Save error details:", {
        name: saveError.name,
        message: saveError.message,
        stack: saveError.stack,
      });
      throw saveError;
    }
  } catch (err) {
    console.error("Error in updateProfile:", err);
    console.error("Error stack:", err.stack);
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    res.status(500).json({
      message: err.message,
      error: err.stack,
      errorName: err.name,
    });
  }
};

//delete resume (Jobseeker only)

export const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    //extract file name form url
    const fileName = resumeUrl?.split("/")?.pop();

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        message: "User not Found",
      });

    if (user.role !== "jobseeker")
      return res
        .status(403)
        .json({ message: "Only jobseeker can delete resune" });

    //Construct the full file path
    const filePath = path.join(__dirname, "../uploads", fileName);

    //check if the file exists and then delete
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath); //delete the file
    }

    //set the users  resume to empty string
    user.resume = "";
    await user.save();

    res.json({
      message: " Resume deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get user public profile

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not Found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user's profile
export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(404).json({ message: "User not Found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
