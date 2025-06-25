import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// Define what a User looks like in our database
const userSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // User Role
    role: {
      type: String,
      enum: ["user", "mentor"],
      required: true,
    },

    // User-specific fields
    state: {
      type: String,
      required: function () {
        return this.role === "user"
      },
    },
    age: {
      type: Number,
      required: function () {
        return this.role === "user"
      },
    },
    language: {
      type: String,
    },

    // Mentor-specific fields
    phone: {
      type: String,
      required: function () {
        return this.role === "mentor"
      },
    },
    jobTitle: {
      type: String,
      required: function () {
        return this.role === "mentor"
      },
    },
    experience: {
      type: String,
      required: function () {
        return this.role === "mentor"
      },
    },
    industry: String,
    goals: {
      type: String,
      required: function () {
        return this.role === "mentor"
      },
    },
    qualificationProof: {
      type: String,
      required: function () {
        return this.role === "mentor"
      },
    },
    hoursPerMonth: String,
    meetingFrequency: String,
    duration: String,
    menteePreferences: String,
    accommodations: String,

    // Common fields
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "user"
      }, // Users auto-approved, mentors need approval
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

export default mongoose.model("User", userSchema)
