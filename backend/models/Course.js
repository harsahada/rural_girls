import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
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
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: String, // e.g., "2 hours", "1 week", "3 months"
      required: [true, "Course duration is required"],
    },
    language: {
      type: String,
      default: "English",
    },

    // Course content
    videoUrl: String, // URL to video file
    materials: [
      {
        name: String,
        fileUrl: String,
        fileType: String, // pdf, doc, image, etc.
      },
    ],

    // Course structure
    modules: [
      {
        title: String,
        description: String,
        videoUrl: String,
        materials: [String], // Array of file URLs
        order: Number,
      },
    ],

    // Metadata
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    enrolledUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: Number,
          default: 0, // Percentage completed
        },
      },
    ],

    // Engagement metrics
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
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Calculate average rating
courseSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0)
  return (sum / this.ratings.length).toFixed(1)
})

export default mongoose.model("Course", courseSchema)
