import express from "express"
import multer from "multer"
import path from "path"
import Business from "../models/Business.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/business-proofs/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF and image files are allowed"))
    }
  },
})

// 📝 CREATE BUSINESS - POST /api/businesses
router.post("/", authenticateToken, upload.single("proofDocument"), async (req, res) => {
  try {
    console.log("📝 Creating new business:", req.body.businessName)

    const { businessName, ownerName, description, contactNumber, contactEmail, whatsappNumber, location, category } =
      req.body

    // Validate required fields
    const requiredFields = [
      "businessName",
      "ownerName",
      "description",
      "contactNumber",
      "contactEmail",
      "whatsappNumber",
      "location",
    ]
    const missingFields = requiredFields.filter((field) => !req.body[field])

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Business proof document is required",
      })
    }

    // Create new business
    const business = new Business({
      businessName,
      ownerName,
      description,
      contactNumber,
      contactEmail,
      whatsappNumber,
      location,
      category: category || "Other",
      proofDocument: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
      submittedBy: req.user.userId,
      submittedByRole: req.user.role || "user",
    })

    await business.save()

    console.log("✅ Business created successfully:", business.businessName)

    res.status(201).json({
      success: true,
      message: "Business added successfully! It's now visible in the marketplace!",
      business: {
        id: business._id,
        businessName: business.businessName,
        ownerName: business.ownerName,
        category: business.category,
        location: business.location,
      },
    })
  } catch (error) {
    console.error("❌ Business creation error:", error.message)
    res.status(400).json({
      success: false,
      message: "Failed to submit business",
      error: error.message,
    })
  }
})

// 📋 GET ALL BUSINESSES - GET /api/businesses
router.get("/", async (req, res) => {
  try {
    const { search, category, location, page = 1, limit = 10 } = req.query

    // Build filter object
    const filter = {
      isActive: true,
    }

    if (search) {
      filter.$text = { $search: search }
    }

    if (category && category !== "All Categories") {
      filter.category = category
    }

    if (location && location !== "All Locations") {
      filter.location = { $regex: location, $options: "i" }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get businesses with pagination
    const businesses = await Business.find(filter)
      .populate("submittedBy", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    // Get total count for pagination
    const total = await Business.countDocuments(filter)

    // Format businesses for frontend
    const formattedBusinesses = businesses.map((business) => ({
      id: business._id,
      name: business.businessName,
      category: business.category,
      categoryColor: getCategoryColor(business.category),
      rating: business.rating,
      reviews: business.reviewCount,
      description: business.description,
      location: business.location,
      owner: business.ownerName,
      phone: `tel:${business.contactNumber}`,
      whatsapp: `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}`,
      email: `mailto:${business.contactEmail}`,
      submittedBy: business.submittedBy?.fullName,
      submittedByRole: business.submittedByRole,
      createdAt: business.createdAt,
      views: business.views,
    }))

    res.json({
      success: true,
      businesses: formattedBusinesses,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("❌ Error fetching businesses:", error.message)
    res.status(500).json({
      success: false,
      message: "Failed to fetch businesses",
      error: error.message,
    })
  }
})

// 👁️ GET SINGLE BUSINESS - GET /api/businesses/:id
router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate("submittedBy", "fullName email")

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Increment view count
    business.views += 1
    await business.save()

    res.json({
      success: true,
      business,
    })
  } catch (error) {
    console.error("❌ Error fetching business:", error.message)
    res.status(500).json({
      success: false,
      message: "Failed to fetch business",
      error: error.message,
    })
  }
})

// 🔄 UPDATE BUSINESS - PUT /api/businesses/:id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Check if user owns this business
    if (business.submittedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own businesses",
      })
    }

    // Update business
    Object.assign(business, req.body)
    await business.save()

    res.json({
      success: true,
      message: "Business updated successfully",
      business,
    })
  } catch (error) {
    console.error("❌ Error updating business:", error.message)
    res.status(500).json({
      success: false,
      message: "Failed to update business",
      error: error.message,
    })
  }
})

// 🗑️ DELETE BUSINESS - DELETE /api/businesses/:id
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      })
    }

    // Check if user owns this business
    if (business.submittedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own businesses",
      })
    }

    // Soft delete - mark as inactive
    business.isActive = false
    await business.save()

    res.json({
      success: true,
      message: "Business deleted successfully",
    })
  } catch (error) {
    console.error("❌ Error deleting business:", error.message)
    res.status(500).json({
      success: false,
      message: "Failed to delete business",
      error: error.message,
    })
  }
})

// 📊 GET CATEGORIES - GET /api/businesses/categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Business.distinct("category", { isActive: true })
    res.json({
      success: true,
      categories: ["All Categories", ...categories],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    })
  }
})

// 📍 GET LOCATIONS - GET /api/businesses/locations
router.get("/meta/locations", async (req, res) => {
  try {
    const locations = await Business.distinct("location", { isActive: true })
    const states = [...new Set(locations.map((loc) => loc.split(",").pop().trim()))]
    res.json({
      success: true,
      locations: ["All Locations", ...states],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch locations",
    })
  }
})

// Helper function to get category colors
function getCategoryColor(category) {
  const colors = {
    "Handicrafts & Art": "#a259ff",
    "Agriculture & Farming": "#3bb273",
    "Food & Catering": "#f24e1e",
    "Technology & Services": "#0ea5e9",
    "Fashion & Textiles": "#ec4899",
    "Health & Beauty": "#f59e0b",
    "Education & Training": "#8b5cf6",
    Other: "#6b7280",
  }
  return colors[category] || "#6b7280"
}

export default router
