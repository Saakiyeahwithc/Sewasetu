import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPublicProfile,
  deleteResume,
  updateProfile
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

//protected routes
router.post("/resume", authenticateToken, deleteResume);
router.put("/:id", authenticateToken, updateUser);
router.post("/profile", authenticateToken, updateProfile)

//Public routes
router.post("/register", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/:id", getPublicProfile);

export default router;
