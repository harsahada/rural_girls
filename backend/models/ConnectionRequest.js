import mongoose from "mongoose"

const connectionRequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    requestType: {
      type: String,
      enum: ["mentorship", "collaboration", "general"],
      default: "mentorship",
    },

    // Response from mentor
    responseMessage: {
      type: String,
      maxlength: [500, "Response message cannot exceed 500 characters"],
    },
    respondedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Prevent duplicate requests
connectionRequestSchema.index({ from: 1, to: 1 }, { unique: true })

export default mongoose.model("ConnectionRequest", connectionRequestSchema)
