// API Helper Functions - UPDATED VERSION
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls with better error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log(`🔄 Making API call to: ${API_BASE_URL}${endpoint}`);
    console.log('📤 Request data:', options.body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log(`📥 Response status: ${response.status}`);

    const data = await response.json();
    console.log('📥 Response data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ API call error:', error);
    return {
      success: false,
      message: 'Network error. Please check if your backend server is running on http://localhost:5000',
    };
  }
};

// User signup
export const signupUser = async (userData) => {
  console.log('👤 Signing up user:', userData.email);
  return await apiCall('/auth/signup/user', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Mentor signup
export const signupMentor = async (mentorData) => {
  console.log('👨‍🏫 Signing up mentor:', mentorData.email);
  return await apiCall('/auth/signup/mentor', {
    method: 'POST',
    body: JSON.stringify(mentorData),
  });
};

// Sign in
export const signin = async (email, password) => {
  console.log('🔐 Signing in user:', email);
  return await apiCall('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// Get user profile
export const getUserProfile = async (token) => {
  return await apiCall('/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Store token in localStorage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('authToken');
};