import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken" // Import jwt
import authRoutes from "./routes/authRoutes.js"
import mentorRoutes from "./routes/mentorRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Serve uploaded files
app.use("/uploads", express.static("uploads"))

// Connect to MongoDB
console.log("🔄 Connecting to MongoDB Atlas...")
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully!")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
  })

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      })
    }

    req.user = user
    next()
  })
}

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/mentor", authenticateToken, mentorRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "🎉 Backend server is running!",
    status: "success",
    availableRoutes: [
      "POST /api/auth/signup/user - Create user account",
      "POST /api/auth/signup/mentor - Submit mentor application",
      "POST /api/auth/signin - Login to account",
      "GET /api/auth/profile - Get user profile",
      "GET /api/mentor/dashboard - Mentor dashboard",
      "GET /api/mentor/courses - Mentor courses",
      "POST /api/mentor/courses - Create course",
      "GET /api/mentor/materials - Study materials",
      "POST /api/mentor/materials - Upload material",
      "GET /api/mentor/posts - Forum posts",
      "POST /api/mentor/posts - Create post",
      "GET /api/mentor/connection-requests - Connection requests",
    ],
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📋 Mentor Dashboard available at: http://localhost:${PORT}/api/mentor/dashboard`)
})
