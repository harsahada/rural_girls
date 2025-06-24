import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"


//load evn vab from env filr
dotenv.config()

//create express app
const app = express()
const PORT = process.env.PORT || 5000

//middle ware to run before routes
app.use(cors()) // allow fronted to connect 
app.use(express.json()) //understnad the jsone data

//connect to mongodb altas
console.log("🔄 Connecting to MongoDB Atlas...")
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully!")
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error)
})

// Basic route to test if server works
app.get("/", (req, res) => {
    res.json({
      message: "🎉 Backend server is running!",
      status: "success",
      time: new Date().toLocaleString(),
    })
  })

  // Test route for your frontend
app.get("/api/test", (req, res) => {
    res.json({
      message: "API is working!",
      data: ["item1", "item2", "item3"],
    })
  })

  // Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📱 Test your API at: http://localhost:${PORT}/api/test`)
  })