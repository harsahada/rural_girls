// API Helper Functions - UPDATED FOR FILE UPLOADS
const API_BASE_URL = "http://localhost:5000/api"

// Helper function for regular API calls (JSON)
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log(`🔄 Making API call to: ${API_BASE_URL}${endpoint}`)
    console.log("📤 Request data:", options.body)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    console.log(`📥 Response status: ${response.status}`)

    const data = await response.json()
    console.log("📥 Response data:", data)

    return data
  } catch (error) {
    console.error("❌ API call error:", error)
    return {
      success: false,
      message: "Network error. Please check if your backend server is running on http://localhost:5000",
    }
  }
}

// Helper function for file upload API calls (FormData)
const apiCallWithFile = async (endpoint, formData) => {
  try {
    console.log(`🔄 Making file upload API call to: ${API_BASE_URL}${endpoint}`)
    console.log("📤 FormData entries:")
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData, // Don't set Content-Type header - browser will set it automatically for FormData
    })

    console.log(`📥 Response status: ${response.status}`)

    const data = await response.json()
    console.log("📥 Response data:", data)

    return data
  } catch (error) {
    console.error("❌ File upload API call error:", error)
    return {
      success: false,
      message: "Network error. Please check if your backend server is running on http://localhost:5000",
    }
  }
}

// User signup (no file upload)
export const signupUser = async (userData) => {
  console.log("👤 Signing up user:", userData.email)
  return await apiCall("/auth/signup/user", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

// Mentor signup (no file upload needed)
export const signupMentor = async (mentorData) => {
  console.log("👨‍🏫 Signing up mentor:", mentorData.email)
  console.log("📤 Sending mentor data:", mentorData)

  // Send as JSON instead of FormData since we're not uploading files
  return await apiCall("/auth/signup/mentor", {
    method: "POST",
    body: JSON.stringify(mentorData),
  })
}

// Sign in (no file upload)
export const signin = async (email, password) => {
  console.log("🔐 Signing in user:", email)
  return await apiCall("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

// Get user profile
export const getUserProfile = async (token) => {
  return await apiCall("/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Store token in localStorage
export const saveToken = (token) => {
  localStorage.setItem("authToken", token)
}

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("authToken")
}

// Remove token
export const removeToken = () => {
  localStorage.removeItem("authToken")
}
