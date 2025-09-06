import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

// signing the jwt token
const signAndSendToken = (user, statusCode, res) => {
  // Ensure expiresIn is in the correct format for JWT (number for seconds or string for timespan)
  const expiresIn = process.env.JWT_EXPIRES_IN
    ? isNaN(process.env.JWT_EXPIRES_IN)
      ? process.env.JWT_EXPIRES_IN
      : parseInt(process.env.JWT_EXPIRES_IN)
    : 604800; // 7 days in seconds as fallback

  const token = jwt.sign({ id: user._id }, process.env.KEY, {
    expiresIn: expiresIn,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "strict",
  };

  // passwords should not show up even if its hashed
  user.password = undefined;

  res
    .status(statusCode)
    .cookie("jwt", token, cookieOptions) // sending jwt token via cookie
    .json({
      status: "success",
      message: `Welcome ${user.name || user.email}!`,
      token,
      data: {
        user,
      },
    });
};

//Logging in users
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.KEY,
      { expiresIn: 3600 } // 1 hour in seconds
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 36000000),
      secure: process.env.NODE_ENV === "production",
    });

    const { password: pass, ...remData } = user._doc;
    return res.status(200).json({
      status: true,
      message: "Login successfull",
      data: token,
      user: remData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Login unsuccessfull",
      error: error.message,
    });
  }
};

//Register New user
export const register = async (req, res) => {
  try {
    console.log("Registration request received:", req.body); // Debug log
    const { name, email, password, role, avatar } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
        missing: {
          name: !name,
          email: !email,
          password: !password,
        },
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Creating user with data:", {
      name,
      email,
      role: role || "jobseeker",
      avatar: avatar || "",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      avatar: avatar || "",
      role: role || "jobseeker",
    });

    console.log("User created successfully:", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }); // Debug log

    // Use signAndSendToken to send consistent response with token
    signAndSendToken(user, 201, res);
  } catch (err) {
    console.error("Registration error:", err); // Debug log
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });

    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
        error: "Duplicate email",
      });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(
        (error) => error.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
