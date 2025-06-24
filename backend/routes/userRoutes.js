import express from "express"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all users (protected route)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("-password")
    res.json({
      message: "Users retrieved successfully",
      users,
      count: users.length,
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message,
    })
  }
})

// Get user profile (protected route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Profile retrieved successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve profile",
      error: error.message,
    })
  }
})

// Update user profile (protected route)
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body

    const user = await User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Profile updated successfully",
      user,
    })
  } catch (error) {
    res.status(400).json({
      message: "Failed to update profile",
      error: error.message,
    })
  }
})

export default router
