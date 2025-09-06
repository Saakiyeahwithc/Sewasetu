import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authenticateToken = async (req, res, next) => {
  try {
    console.log("Auth middleware called for:", req.originalUrl);

    // Check for token in cookies first, then Authorization header
    let token = req.cookies.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      console.log("Auth header:", authHeader ? "Present" : "Missing");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      console.log("No token found");
      return res.status(401).json({
        status: false,
        message: "Please login to continue",
      });
    }

    console.log("Token found, verifying...");
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = await User.findById(decoded.id).select("-password");
    console.log(
      "User authenticated:",
      req.user ? req.user._id : "No user found"
    );
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};

export const checkRole = (...allowedRole) => {
  return async (req, res, next) => {
    if (!allowedRole.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }
    next();
  };
};
