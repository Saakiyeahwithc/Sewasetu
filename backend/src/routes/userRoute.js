import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPublicProfile,
  deleteResume,
  updateProfile,
  getCurrentUserProfile,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

//protected routes
router.post("/resume", authenticateToken, deleteResume);
router.put("/:id", authenticateToken, updateUser);
router.get("/profile", authenticateToken, getCurrentUserProfile);
router.put(
  "/profile",
  (req, res, next) => {
    console.log("Profile update route hit");
    console.log("Request body:", req.body);
    next();
  },
  authenticateToken,
  updateProfile
);

//Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/:id", getPublicProfile);

export default router;
