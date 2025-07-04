import mongoose from "mongoose"

const businessSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Handicrafts & Art",
        "Agriculture & Farming",
        "Food & Catering",
        "Technology & Services",
        "Fashion & Textiles",
        "Health & Beauty",
        "Education & Training",
        "Other",
      ],
      default: "Other",
    },
    proofDocument: {
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      path: String,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedByRole: {
      type: String,
      enum: ["user", "mentor"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
businessSchema.index({
  businessName: "text",
  description: "text",
  category: "text",
  location: "text",
})

const Business = mongoose.model("Business", businessSchema)

export default Business
