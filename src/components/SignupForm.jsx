import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import './SignupForm.css';

// Indian states and union territories
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const ages = Array.from({ length: 83 }, (_, i) => i + 18);
// Major Indian languages
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

export default function SignupForm({ onCancel }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form unified-signup-form">
        <h2 className="text-2xl font-bold" style={{ gridColumn: 'span 2', marginBottom: '0.5rem' }}>Join SheRise</h2>
        <div className="signup-row-2col">
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
            />
          </div>
        </div>
        <div className="signup-row-2col">
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
        </div>
        <div>
          <label className="signup-label">Location (State) *</label>
          <select
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="signup-input"
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
          >
            <option value="">Select Age</option>
            {ages.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label className="signup-label">Preferred Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="signup-input"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang} ({lang === 'English' ? 'English' : 'Indian'})</option>
            ))}
          </select>
        </div>
        <fieldset style={{ gridColumn: 'span 2', border: 'none', padding: 0, margin: 0, maxHeight: 140, overflowY: 'auto' }}>
          <legend className="signup-label" style={{ fontWeight: 600, marginBottom: 8 }}>Areas of Interest (Select up to 5)</legend>
          <div className="interests-grid">
            {interests.map((interest) => (
              <label key={interest} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
        </fieldset>
        <div style={{ gridColumn: 'span 2', fontSize: 13, color: '#888', marginBottom: 8 }}>
          Selected: {formData.interests.length}/5
        </div>
        <button
          type="submit"
          className="signup-button"
          style={{
            background: 'linear-gradient(90deg, #a259c6 0%, #5d5fef 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 18,
            marginTop: 8,
            marginBottom: 8
          }}
        >
          Create Account
        </button>
        <div style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: 15, marginBottom: 8 }}>
          Already have an account?{' '}
          <a href="#" style={{ color: '#a259c6', fontWeight: 600, textDecoration: 'none' }}>Sign In</a>
        </div>
        <div style={{ gridColumn: 'span 2', background: '#f3f4f6', color: '#222', borderRadius: 8, padding: 12, fontSize: 13, textAlign: 'center' }}>
          By creating an account, you agree to our <a href="#" style={{ color: '#5d5fef', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: '#5d5fef', textDecoration: 'underline' }}>Privacy Policy</a>. Your information will be kept secure and used only to enhance your learning experience.
        </div>
      </form>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
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
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}