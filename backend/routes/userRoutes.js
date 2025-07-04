import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// 📝 USER SIGN UP ROUTE
router.post("/signup/user", async (req, res) => {
  try {
    console.log("📝 User signup attempt:", req.body.email)

    const { fullName, email, password, state, age, language, interests } = req.body

    // Validate required fields
    if (!fullName || !email || !password || !state || !age) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: fullName, email, password, state, age",
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password,
      role: "user",
      state,
      age: Number.parseInt(age),
      language: language || "",
      interests: interests || [],
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id)

    console.log("✅ User created successfully:", user.email)

    res.status(201).json({
      success: true,
      message: "User account created successfully!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        state: user.state,
        age: user.age,
        language: user.language,
        interests: user.interests,
      },
      token,
    })
  } catch (error) {
    console.error("❌ User signup error:", error.message)
    res.status(400).json({
      success: false,
      message: "Failed to create user account",
      error: error.message,
    })
  }
})

// 👨‍🏫 MENTOR SIGN UP ROUTE
router.post("/signup/mentor", async (req, res) => {
  try {
    console.log("👨‍🏫 Mentor signup attempt:", req.body.email)

    const {
      fullName,
      email,
      phone,
      jobTitle,
      experience,
      goals,
      hoursPerMonth,
      meetingFrequency,
      duration,
      menteePreferences,
      signature,
      signatureDate,
    } = req.body

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "jobTitle", "experience", "goals"]
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    // Create temporary password for mentor (they'll set it later)
    const tempPassword = Math.random().toString(36).slice(-8)

    // Create new mentor
    const mentor = new User({
      fullName,
      email,
      password: tempPassword, // Temporary password
      role: "mentor",
      phone,
      jobTitle,
      experience,
      goals,
      hoursPerMonth: hoursPerMonth || "",
      meetingFrequency: meetingFrequency || "",
      duration: duration || "",
      menteePreferences: menteePreferences || "",
      signature: signature || "",
      signatureDate: signatureDate || new Date().toISOString().split("T")[0],
      isApproved: false, // Mentors need approval
    })

    await mentor.save()

    console.log("✅ Mentor account created successfully:", mentor.email)

    res.status(201).json({
      success: true,
      message: "Mentor application submitted successfully! We will review your application and contact you soon.",
      mentor: {
        id: mentor._id,
        fullName: mentor.fullName,
        email: mentor.email,
        role: mentor.role,
        jobTitle: mentor.jobTitle,
        experience: mentor.experience,
        isApproved: mentor.isApproved,
      },
      note: "You will receive login credentials via email once your application is approved.",
    })
  } catch (error) {
    console.error("❌ Mentor signup error:", error.message)
    res.status(400).json({
      success: false,
      message: "Failed to create mentor account",
      error: error.message,
    })
  }
})

// 🔐 SIGN IN ROUTE (for both users and mentors)
router.post("/signin", async (req, res) => {
  try {
    console.log("🔐 Sign in attempt:", req.body.email)

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Reinstate mentor approval check in login
    if (user.role === "mentor" && !user.isApproved) {
      return res.status(401).json({
        success: false,
        message: "Your mentor application is still under review. Please wait for approval.",
      })
    }

    // Generate token
    const token = generateToken(user._id)

    console.log("✅ User signed in successfully:", user.email)

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
      token,
    })
  } catch (error) {
    console.error("❌ Sign in error:", error.message)
    res.status(400).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
})

// 👤 GET USER PROFILE
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    })
  }
})

// Middleware to check authentication
function authenticateToken(req, res, next) {
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

export default router
