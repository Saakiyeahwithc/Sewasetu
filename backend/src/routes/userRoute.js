import {
  getAllUsers,
  getUserById,
  updatedUser,
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
router.put("/:id", authenticateToken, updatedUser);
router.get("/profile", authenticateToken, getCurrentUserProfile);
router.put("/profile", authenticateToken, updateProfile);

//Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/:id", getPublicProfile);

export default router;
