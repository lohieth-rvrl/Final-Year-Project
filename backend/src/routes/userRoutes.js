import { Router } from "express";
const router = Router();
import auth from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authrizeRoles } from "../middlewares/roleMiddleware.js";
import users from "../controllers/userController.js";
import User from "../models/userModel.js";

const { verifyToken } = authMiddleware;

// ========================
// ROLE-BASED ACCESS ROUTES
// ========================

// User access
router.get(
  "/user",
  verifyToken,
  authrizeRoles("user", "admin", "tester", "instructor"),
  (req, res) => {
    res.status(200).json({ message: "User access granted" });
  }
);

// Instructor access
router.get(
  "/instructor",
  verifyToken,
  authrizeRoles("instructor", "admin", "tester"),
  (req, res) => {
    res.status(200).json({ message: "Instructor access granted" });
  }
);

// Admin access
router.get(
  "/admin",
  verifyToken,
  authrizeRoles("admin", "tester"),
  (req, res) => {
    res.status(200).json({ message: "Admin access granted" });
  }
);

// ========================
// USER MANAGEMENT ROUTES
// ========================
router.get("/users", users.getAllUsers);
router.delete("/delete/:id", users.deleteUser);

// ========================
// FETCH INSTRUCTORS ONLY
// ========================
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).sort({ name: 1 });
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching instructors", error: err.message });
  }
});

export default router;
