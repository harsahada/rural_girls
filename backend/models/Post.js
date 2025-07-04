import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      maxlength: [5000, "Content cannot exceed 5000 characters"],
    },
    category: {
      type: String,
      required: [true, "Post category is required"],
      enum: ["Announcement", "Discussion", "Question", "Resource", "Success Story", "Tips & Tricks", "News", "Other"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Media attachments
    attachments: [
      {
        name: String,
        fileUrl: String,
        fileType: String, // image, pdf, doc, etc.
      },
    ],

    // Author information
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorRole: {
      type: String,
      enum: ["mentor", "user"],
      required: true,
    },

    // Engagement
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
          maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],

    // Visibility and status
    isPublished: {
      type: Boolean,
      default: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
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

// Index for better search performance
postSchema.index({ title: "text", content: "text", tags: "text" })

export default mongoose.model("Post", postSchema)
