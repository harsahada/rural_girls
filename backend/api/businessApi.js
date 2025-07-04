const API_BASE_URL = "http://localhost:5000"

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken")
}

// Create business
export const createBusiness = async (businessData) => {
  try {
    const formData = new FormData()

    // Append all form fields
    Object.keys(businessData).forEach((key) => {
      if (key === "proofDocument" && businessData[key]) {
        formData.append(key, businessData[key])
      } else if (key !== "proofDocument") {
        formData.append(key, businessData[key])
      }
    })

    const response = await fetch(`${API_BASE_URL}/api/businesses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Create business error:", error)
    throw error
  }
}

// Get all businesses
export const getBusinesses = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams()

    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key] !== "All Categories" && filters[key] !== "All Locations") {
        queryParams.append(key, filters[key])
      }
    })

    const response = await fetch(`${API_BASE_URL}/api/businesses?${queryParams}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Get businesses error:", error)
    throw error
  }
}

// Get single business
export const getBusiness = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/businesses/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Get business error:", error)
    throw error
  }
}

// Update business
export const updateBusiness = async (id, businessData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/businesses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(businessData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Update business error:", error)
    throw error
  }
}

// Delete business
export const deleteBusiness = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/businesses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Delete business error:", error)
    throw error
  }
}

// Get categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/businesses/meta/categories`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Get categories error:", error)
    throw error
  }
}

// Get locations
export const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/businesses/meta/locations`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("❌ Get locations error:", error)
    throw error
  }
}
