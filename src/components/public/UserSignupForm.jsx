import { useState } from "react";
import { signupUser, saveToken } from '../api.js';
import { Eye, EyeOff } from "lucide-react";
import './SignupForm.css';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const ages = Array.from({ length: 83 }, (_, i) => i + 18);
const languages = [
  "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili", "Santali", "Kashmiri", "Nepali", "Konkani", "Sindhi", "Dogri", "Manipuri", "Bodo", "Santhali"
];
const interests = [
  "Business",
  "Arts & Crafts",
  "Agriculture",
  "Health & Wellness",
  "Communication Skills",
  "Digital Marketing",
  "Tailoring & Fashion",
  "Cooking & Food Processing",
  "Technology",
  "Education"
];

export default function UserSignupForm({ onCancel, onSignIn }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    age: "",
    language: "",
    interests: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userError, setUserError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "interests") {
      const updated = checked
        ? [...formData.interests, value]
        : formData.interests.filter((i) => i !== value);
      if (updated.length <= 5) {
        setFormData({ ...formData, interests: updated });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateUser = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.state || !formData.age) {
      return 'Please fill in all required fields.';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    if (formData.interests.length > 5) {
      return 'Select up to 5 interests.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateUser();
    setUserError(err);
    
    if (!err) {
      try {
        console.log('🚀 Starting user signup process...');
        console.log('📝 Form data:', formData);
        
        // Show loading state
        setUserError('Creating your account...');
        
        // Prepare data for API
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          state: formData.state,
          age: parseInt(formData.age),
          language: formData.language,
          interests: formData.interests,
        };
        
        console.log('📤 Sending to API:', userData);
        
        // Call backend API
        const response = await signupUser(userData);
        
        console.log('📥 API Response:', response);
  
        if (response.success) {
          // Save token for automatic login
          saveToken(response.token);
          
          // Show success message
          alert(`Welcome ${response.user.fullName}! Your account has been created successfully.`);
          
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            state: "",
            age: "",
            language: "",
            interests: [],
          });
          
          // Clear error
          setUserError('');
          
        } else {
          console.error('❌ Signup failed:', response.message);
          setUserError(response.message || 'Failed to create account');
        }
      } catch (error) {
        console.error('❌ Signup error:', error);
        setUserError('Something went wrong. Please check if the backend server is running.');
      }
    }
  };
          
  return (
    <div style={{ maxWidth: 440, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)', padding: '2.5rem 2rem', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 18, color: '#18181b' }}>Create Your Account</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="signup-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="signup-input"
              placeholder="Enter your full name"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            />
          </div>
          <div>
            <label className="signup-label">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
              placeholder="Enter your email"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <label className="signup-label">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              placeholder="Enter your password"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              style={{ position: 'absolute', right: 12, top: 38, cursor: 'pointer' }}
              tabIndex={0}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <label className="signup-label">Confirm Password *</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
              placeholder="Confirm your password"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            />
            <span
              onClick={() => setShowConfirmPassword((v) => !v)}
              style={{ position: 'absolute', right: 12, top: 38, cursor: 'pointer' }}
              tabIndex={0}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <div>
            <label className="signup-label">Location (State) *</label>
            <select
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="signup-input"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="signup-label">Age *</label>
            <select
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              className="signup-input"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            >
              <option value="">Select Age</option>
              {ages.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="signup-label">Preferred Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="signup-input"
              style={{ borderRadius: 10, fontSize: 16, padding: '0.7rem 1rem' }}
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang} ({lang === 'English' ? 'English' : 'Indian'})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="signup-label" style={{ fontWeight: 600, marginBottom: 8 }}>Areas of Interest (Select up to 5)</label>
            <div className="interests-grid" style={{ maxHeight: 120, overflowY: 'auto', borderRadius: 8, background: '#f6f8fa', padding: 8 }}>
              {interests.map((interest) => (
                <label key={interest} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15 }}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                    disabled={
                      !formData.interests.includes(interest) && formData.interests.length >= 5
                    }
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Selected: {formData.interests.length}/5</div>
          </div>
          {userError && <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{userError}</div>}
          <button
            type="submit"
            className="signup-button"
            style={{
              background: 'linear-gradient(90deg, #a259c6 0%, #5d5fef 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              marginTop: 8,
              marginBottom: 8,
              borderRadius: 10,
              width: '100%',
              padding: '1em 0',
              boxShadow: '0 2px 8px rgba(162,89,236,0.10)',
              transition: 'background 0.2s',
            }}
          >
            Create Account
          </button>
          <div style={{ textAlign: 'center', fontSize: 15, marginBottom: 8 }}>
            Already have an account?{' '}
            <a href="#" style={{ color: '#a259c6', fontWeight: 600, textDecoration: 'none' }} onClick={e => { e.preventDefault(); if (onSignIn) onSignIn(); }}>Sign In</a>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                background: '#f3f4f6',
                color: '#444',
                border: '1.5px solid #e5e7eb',
                borderRadius: 8,
                padding: '0.6em 2.2em',
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                margin: '0 auto',
                display: 'block',
                minWidth: 120,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
              }}
            >
              Cancel
            </button>
          </div>
          <div style={{ background: '#f3f4f6', color: '#222', borderRadius: 8, padding: 12, fontSize: 13, textAlign: 'center', marginTop: 8 }}>
            By creating an account, you agree to our <a href="#" style={{ color: '#5d5fef', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: '#5d5fef', textDecoration: 'underline' }}>Privacy Policy</a>. Your information will be kept secure and used only to enhance your learning experience.
          </div>
        </div>
      </form>
    </div>
  );
} 