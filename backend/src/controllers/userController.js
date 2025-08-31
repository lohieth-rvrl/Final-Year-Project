import User from "../models/userModel.js";

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// ✅ Get only instructors
const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).sort({ name: 1 });
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // Assuming user is attached to req via auth middleware
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllUsers,
  getUserById,
  getInstructors,
  deleteUser,
  getCurrentUser,
};
