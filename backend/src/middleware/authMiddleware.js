import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // Check for token in cookies first, then Authorization header
    let token = req.cookies.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login to continue",
      });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token expired",
      });
    }

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
