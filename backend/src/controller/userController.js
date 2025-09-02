import User from "../model/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
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
      messaage: "Error occured during the process.",
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
    const id = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!id) {
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
    const { name, avatar, jobTitle, jobDescription, resume } = req.body;
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
      });

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    //If employer allow updating info
    if (user.role === "employer") {
      user.jobTitle = jobTitle || user.jobTitle;
      user.jobDescription = jobDescription || user.jobDescription;
    }
    await user.save;

    res.json({
      _id: user_id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      jobTitle: user.jobTitle,
      jobDescription: user.jobDescription,
      resume: user.resume || "",
    });
  } catch (err) {
    res.status(500).json({
      message: "err.message",
    });
  }
};

//delete resume (Jobseeker only)

export const deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    //extract file name form url
    const fileName = resumeUrl?.split("/")?.pop();

    const user = User.findById(req.user._id);
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
      message: "err.message",
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
    res.status(500).json({ message: "err.message" });
  }
};
