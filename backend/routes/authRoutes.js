import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Create new user
    const user = new User({ name, email, password })
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    })
  } catch (error) {
    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    })
  }
})

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: "Login successful",
      user,
      token,
    })
  } catch (error) {
    res.status(400).json({
      message: "Login failed",
      error: error.message,
    })
  }
})

export default router
