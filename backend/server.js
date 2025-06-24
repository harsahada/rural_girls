import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" })) // Increased limit for larger forms
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

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

// Routes
app.use("/api/auth", authRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "🎉 Backend server is running!",
    status: "success",
    availableRoutes: [
      "POST /api/auth/signup/user - Create user account",
      "POST /api/auth/signup/mentor - Submit mentor application",
      "POST /api/auth/signin - Login to account",
      "GET /api/auth/profile - Get user profile (requires token)",
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

app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log('📍 Route:', r.route.path)
    }
  })
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📋 Available routes:`)
  console.log(`   POST http://localhost:${PORT}/api/auth/signup/user`)
  console.log(`   POST http://localhost:${PORT}/api/auth/signup/mentor`)
  console.log(`   POST http://localhost:${PORT}/api/auth/signin`)
  console.log(`   GET  http://localhost:${PORT}/api/auth/profile`)
})
