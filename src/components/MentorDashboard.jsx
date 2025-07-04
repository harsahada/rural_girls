"use client"

import { useState, useEffect } from "react"
import { BookOpen, Users, MessageSquare, FileText, Plus, Eye, Heart, TrendingUp } from "lucide-react"
import "./MentorDashboard.css"

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/mentor/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="mentor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Mentor Dashboard</h1>
          <p>Manage your courses, content, and community</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button
          className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <TrendingUp size={20} />
          Overview
        </button>
        <button
          className={`nav-tab ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <BookOpen size={20} />
          Courses
        </button>
        <button
          className={`nav-tab ${activeTab === "materials" ? "active" : ""}`}
          onClick={() => setActiveTab("materials")}
        >
          <FileText size={20} />
          Study Materials
        </button>
        <button className={`nav-tab ${activeTab === "forum" ? "active" : ""}`} onClick={() => setActiveTab("forum")}>
          <MessageSquare size={20} />
          Community Forum
        </button>
        <button
          className={`nav-tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          <Users size={20} />
          Connection Requests
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === "overview" && <OverviewTab data={dashboardData} />}
        {activeTab === "courses" && <CoursesTab />}
        {activeTab === "materials" && <MaterialsTab />}
        {activeTab === "forum" && <ForumTab />}
        {activeTab === "requests" && <RequestsTab />}
      </main>
    </div>
  )
}

// Overview Tab Component
const OverviewTab = ({ data }) => {
  if (!data) return <div>Loading overview...</div>

  const { overview, recentActivity } = data

  return (
    <div className="overview-tab">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon courses">
            <BookOpen size={24} />
          </div>
          <div className="stat-content">
            <h3>{overview.totalCourses}</h3>
            <p>Total Courses</p>
            <span className="stat-detail">{overview.publishedCourses} published</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>{overview.totalPosts}</h3>
            <p>Forum Posts</p>
            <span className="stat-detail">Community engagement</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon requests">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{overview.pendingRequests}</h3>
            <p>Pending Requests</p>
            <span className="stat-detail">Awaiting response</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon materials">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{overview.totalMaterials}</h3>
            <p>Study Materials</p>
            <span className="stat-detail">Shared resources</span>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="engagement-section">
        <h2>Engagement Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <Eye size={20} />
            <div>
              <h4>{overview.totalViews}</h4>
              <p>Total Views</p>
            </div>
          </div>
          <div className="metric-card">
            <Users size={20} />
            <div>
              <h4>{overview.totalEnrollments}</h4>
              <p>Course Enrollments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>

        {recentActivity.recentCourses.length > 0 && (
          <div className="activity-section">
            <h3>Latest Courses</h3>
            <div className="activity-list">
              {recentActivity.recentCourses.map((course) => (
                <div key={course._id} className="activity-item">
                  <BookOpen size={16} />
                  <div>
                    <p className="activity-title">{course.title}</p>
                    <p className="activity-meta">
                      {course.category} • {course.enrolledUsers.length} enrolled
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentActivity.recentRequests.length > 0 && (
          <div className="activity-section">
            <h3>Recent Connection Requests</h3>
            <div className="activity-list">
              {recentActivity.recentRequests.map((request) => (
                <div key={request._id} className="activity-item">
                  <Users size={16} />
                  <div>
                    <p className="activity-title">New connection request</p>
                    <p className="activity-meta">
                      {request.requestType} • {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Courses Tab Component
const CoursesTab = () => {
  const [courses, setCourses] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/mentor/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="courses-tab">
      <div className="tab-header">
        <h2>My Courses</h2>
        <button className="create-btn" onClick={() => setShowCreateForm(true)}>
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      {showCreateForm && (
        <CreateCourseForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false)
            fetchCourses()
          }}
        />
      )}

      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} onUpdate={fetchCourses} />
          ))}
          {courses.length === 0 && (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No courses yet</h3>
              <p>Create your first course to start sharing knowledge!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Course Card Component
const CourseCard = ({ course, onUpdate }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.title}</h3>
        <span className={`status ${course.isPublished ? "published" : "draft"}`}>
          {course.isPublished ? "Published" : "Draft"}
        </span>
      </div>

      <p className="course-description">{course.description}</p>

      <div className="course-meta">
        <span className="category">{course.category}</span>
        <span className="difficulty">{course.difficulty}</span>
        <span className="duration">{course.duration}</span>
      </div>

      <div className="course-stats">
        <div className="stat">
          <Users size={16} />
          <span>{course.enrolledUsers.length} enrolled</span>
        </div>
        <div className="stat">
          <Eye size={16} />
          <span>{course.views} views</span>
        </div>
        <div className="stat">
          <Heart size={16} />
          <span>{course.likes.length} likes</span>
        </div>
      </div>

      <div className="course-actions">
        <button className="btn-secondary">Edit</button>
        <button className="btn-primary">View</button>
      </div>
    </div>
  )
}

// Create Course Form Component
const CreateCourseForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    language: "English",
  })
  const [videoFile, setVideoFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("authToken")
      const formDataToSend = new FormData()

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key])
      })

      if (videoFile) {
        formDataToSend.append("courseVideo", videoFile)
      }

      const response = await fetch("/api/mentor/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.success) {
        alert("Course created successfully!")
        onSuccess()
      } else {
        alert(data.message || "Failed to create course")
      }
    } catch (error) {
      console.error("Failed to create course:", error)
      alert("Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create New Course</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Course Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Business">Business</option>
                <option value="Arts & Crafts">Arts & Crafts</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Communication Skills">Communication Skills</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Tailoring & Fashion">Tailoring & Fashion</option>
                <option value="Cooking & Food Processing">Cooking & Food Processing</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                placeholder="e.g., 2 hours, 1 week"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Language</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Course Video (Optional)</label>
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Materials Tab Component (placeholder)
const MaterialsTab = () => {
  return (
    <div className="materials-tab">
      <div className="tab-header">
        <h2>Study Materials</h2>
        <button className="create-btn">
          <Plus size={20} />
          Upload Material
        </button>
      </div>
      <p>Study materials management coming soon...</p>
    </div>
  )
}

// Forum Tab Component (placeholder)
const ForumTab = () => {
  return (
    <div className="forum-tab">
      <div className="tab-header">
        <h2>Community Forum</h2>
        <button className="create-btn">
          <Plus size={20} />
          Create Post
        </button>
      </div>
      <p>Community forum management coming soon...</p>
    </div>
  )
}

// Requests Tab Component (placeholder)
const RequestsTab = () => {
  return (
    <div className="requests-tab">
      <h2>Connection Requests</h2>
      <p>Connection requests management coming soon...</p>
    </div>
  )
}

export default MentorDashboard
