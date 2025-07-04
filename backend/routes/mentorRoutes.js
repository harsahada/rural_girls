import express from "express"
import Course from "../models/Course.js"
import Post from "../models/Post.js"
import ConnectionRequest from "../models/ConnectionRequest.js"
import StudyMaterial from "../models/StudyMaterial.js"
import upload from "../middleware/upload.js"

const router = express.Router()

// Middleware to check if user is a mentor
const requireMentor = (req, res, next) => {
  if (req.user.role !== "mentor") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Mentor role required.",
    })
  }
  next()
}

// 📊 DASHBOARD OVERVIEW
router.get("/dashboard", requireMentor, async (req, res) => {
  try {
    const mentorId = req.user.userId

    // Get dashboard statistics
    const [courses, posts, connectionRequests, studyMaterials] = await Promise.all([
      Course.find({ mentor: mentorId }),
      Post.find({ author: mentorId }),
      ConnectionRequest.find({ to: mentorId, status: "pending" }),
      StudyMaterial.find({ uploadedBy: mentorId }),
    ])

    // Calculate engagement metrics
    const totalViews =
      courses.reduce((sum, course) => sum + course.views, 0) + posts.reduce((sum, post) => sum + post.views, 0)

    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledUsers.length, 0)

    res.json({
      success: true,
      data: {
        overview: {
          totalCourses: courses.length,
          publishedCourses: courses.filter((c) => c.isPublished).length,
          totalPosts: posts.length,
          pendingRequests: connectionRequests.length,
          totalMaterials: studyMaterials.length,
          totalViews,
          totalEnrollments,
        },
        recentActivity: {
          recentCourses: courses.slice(-3),
          recentPosts: posts.slice(-3),
          recentRequests: connectionRequests.slice(-5),
        },
      },
    })
  } catch (error) {
    console.error("❌ Dashboard error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    })
  }
})

// 📚 COURSE MANAGEMENT

// Get all mentor's courses
router.get("/courses", requireMentor, async (req, res) => {
  try {
    const courses = await Course.find({ mentor: req.user.userId })
      .populate("enrolledUsers.user", "fullName email")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      courses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    })
  }
})

// Create new course
router.post("/courses", requireMentor, upload.single("courseVideo"), async (req, res) => {
  try {
    const { title, description, category, difficulty, duration, language } = req.body

    const courseData = {
      title,
      description,
      category,
      difficulty,
      duration,
      language: language || "English",
      mentor: req.user.userId,
    }

    // Add video if uploaded
    if (req.file) {
      courseData.videoUrl = req.file.filename
    }

    const course = new Course(courseData)
    await course.save()

    res.status(201).json({
      success: true,
      message: "Course created successfully!",
      course,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
})

// Update course
router.put("/courses/:courseId", requireMentor, async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.courseId,
      mentor: req.user.userId,
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    Object.assign(course, req.body)
    await course.save()

    res.json({
      success: true,
      message: "Course updated successfully!",
      course,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    })
  }
})

// Delete course
router.delete("/courses/:courseId", requireMentor, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.courseId,
      mentor: req.user.userId,
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    res.json({
      success: true,
      message: "Course deleted successfully!",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    })
  }
})

// 📖 STUDY MATERIALS

// Get all mentor's study materials
router.get("/materials", requireMentor, async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ uploadedBy: req.user.userId }).sort({ createdAt: -1 })

    res.json({
      success: true,
      materials,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch materials",
      error: error.message,
    })
  }
})

// Upload study material
router.post("/materials", requireMentor, upload.single("materialFile"), async (req, res) => {
  try {
    const { title, description, category, type, difficulty, language, tags, isPublic } = req.body

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      })
    }

    const material = new StudyMaterial({
      title,
      description,
      category,
      type,
      difficulty,
      language: language || "English",
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      isPublic: isPublic !== "false",
      fileUrl: req.file.filename,
      fileName: req.file.originalname,
      fileSize: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedBy: req.user.userId,
    })

    await material.save()

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully!",
      material,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to upload material",
      error: error.message,
    })
  }
})

// 💬 COMMUNITY FORUM

// Get all mentor's posts
router.get("/posts", requireMentor, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
      .populate("author", "fullName role")
      .populate("comments.author", "fullName role")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    })
  }
})

// Create new post
router.post("/posts", requireMentor, upload.array("attachments", 5), async (req, res) => {
  try {
    const { title, content, category, tags, isPinned } = req.body

    const postData = {
      title,
      content,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      author: req.user.userId,
      authorRole: "mentor",
      isPinned: isPinned === "true",
    }

    // Add attachments if uploaded
    if (req.files && req.files.length > 0) {
      postData.attachments = req.files.map((file) => ({
        name: file.originalname,
        fileUrl: file.filename,
        fileType: file.mimetype.split("/")[0], // image, application, etc.
      }))
    }

    const post = new Post(postData)
    await post.save()

    // Populate author info for response
    await post.populate("author", "fullName role")

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    })
  }
})

// 📨 CONNECTION REQUESTS

// Get all connection requests for mentor
router.get("/connection-requests", requireMentor, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({ to: req.user.userId })
      .populate("from", "fullName email role state age")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      requests,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch connection requests",
      error: error.message,
    })
  }
})

// Respond to connection request
router.put("/connection-requests/:requestId", requireMentor, async (req, res) => {
  try {
    const { status, responseMessage } = req.body

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'accepted' or 'rejected'",
      })
    }

    const request = await ConnectionRequest.findOne({
      _id: req.params.requestId,
      to: req.user.userId,
    })

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Connection request not found",
      })
    }

    request.status = status
    request.responseMessage = responseMessage || ""
    request.respondedAt = new Date()

    await request.save()

    // Populate user info for response
    await request.populate("from", "fullName email")

    res.json({
      success: true,
      message: `Connection request ${status} successfully!`,
      request,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to respond to connection request",
      error: error.message,
    })
  }
})

export default router
