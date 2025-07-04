import mongoose from "mongoose"

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Material title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Material description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Material category is required"],
      enum: [
        "Business",
        "Arts & Crafts",
        "Agriculture",
        "Health & Wellness",
        "Communication Skills",
        "Digital Marketing",
        "Tailoring & Fashion",
        "Cooking & Food Processing",
        "Technology",
        "Education",
        "Other",
      ],
    },
    type: {
      type: String,
      enum: ["PDF", "Video", "Audio", "Document", "Presentation", "Image", "Link"],
      required: true,
    },

    // File information
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileName: String,
    fileSize: String, // e.g., "2.5 MB"

    // Content metadata
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    language: {
      type: String,
      default: "English",
    },
    tags: [String],

    // Author
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Access control
    isPublic: {
      type: Boolean,
      default: true,
    },
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Engagement
    downloads: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("StudyMaterial", studyMaterialSchema)
