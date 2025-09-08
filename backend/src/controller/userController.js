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
    const user = await User.findById(req.params._id);
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

export const updatedUser = async (req, res) => {
  try {
    const id = req.params._id;
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
    const user = await User.findByIdAndDelete(req.params._id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: `No users with id ${req.params._id} found`,
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
      message: `Error occured while deleting the data of user ${req.params._id}`,
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  console.log("=== UPDATE PROFILE ENDPOINT CALLED ===");
  console.log("Request headers:", req.headers);
  console.log(
    "Request user:",
    req.user
      ? { id: req.user._id, email: req.user.email, role: req.user.role }
      : "No user"
  );
  console.log("Received updateProfile payload:", req.body); // Log request body for debugging

  try {
    if (!req.user) {
      console.log("❌ No authenticated user found");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const {
      name,
      avatar,
      companyDescription,
      resume,
      companyName,
      companyLogo,
    } = req.body;

    console.log("Extracted fields:", {
      name,
      avatar,
      resume,
      companyDescription,
      companyName,
      companyLogo,
    });

    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("❌ User not found with ID:", req.user._id);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("✅ Found user:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });

    if (name !== undefined && name !== null) {
      if (typeof name !== "string" || name.trim() === "") {
        console.log("❌ Invalid name:", name);
        return res
          .status(400)
          .json({ message: "Name must be a non-empty string" });
      }
      user.name = name.trim();
      console.log("Updated name to:", name.trim());
    }

    if (avatar !== undefined) {
      user.avatar = avatar || "";
      console.log("Updated avatar to:", avatar);
    }

    if (resume !== undefined) {
      user.resume = resume || "";
      console.log("Updated resume to:", resume);
    }

    if (user.role === "employer") {
      if (companyDescription !== undefined) {
        user.companyDescription = companyDescription || "";
        console.log("Updated companyDescription to:", companyDescription);
      }
      if (companyName !== undefined) {
        user.companyName = companyName || "";
        console.log("Updated companyName to:", companyName);
      }
      if (companyLogo !== undefined) {
        user.companyLogo = companyLogo || "";
        console.log("Updated companyLogo to:", companyLogo);
      }
    }

    console.log("Attempting to save user...");
    // Save the modified user document
    const updatedUser = await user.save();

    console.log("✅ User updated successfully");
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      avatar: updatedUser.avatar || "",
      role: updatedUser.role,
      companyDescription: updatedUser.companyDescription || "",
      companyName: updatedUser.companyName || "",
      resume: updatedUser.resume || "",
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("❌ Error during updateProfile:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      console.error("Validation errors:", validationErrors);
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    return res.status(500).json({
      message: error.message,
      errorName: error.name,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
    const user = await User.findById(req.params._idid).select("-password");

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
