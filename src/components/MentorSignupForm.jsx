import { useState } from "react";
import './SignupForm.css';
import { signupMentor } from './api.js';


const mentorInitial = {
  fullName: '',
  phoneticName: '',
  email: '',
  phone: '',
  jobTitle: '',
  experience: '',
  industry: '',
  mentoringExperience: '',
  mentoringSkills: '',
  developmentSkills: '',
  goals: '',
  hoursPerMonth: '',
  meetingFrequency: '',
  duration: '',
  menteePreferences: '',
  accommodations: '',
  terms: false,
  commitment: false,
  signature: '',
  signatureDate: '',
};

const sectionStyle = (bg, border, color) => ({
  background: bg,
  borderRadius: 14,
  padding: 24,
  marginBottom: 28,
  border: border || 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  color: color || 'inherit',
});

const iconStyle = { fontSize: 24, marginRight: 10, verticalAlign: 'middle' };

export default function MentorSignupForm({ onCancel, onSignIn }) {
  const [mentorData, setMentorData] = useState(mentorInitial);
  const [mentorErrors, setMentorErrors] = useState({});
  const [mentorSuccess, setMentorSuccess] = useState('');

  const handleMentorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMentorData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateMentor = () => {
    // Only check fields that actually exist in your form and are required
    const required = ['fullName', 'email', 'phone', 'jobTitle', 'experience', 'mentoringSkills', 'goals', 'terms', 'commitment'];
    const errors = {};
    
    required.forEach(field => {
      if (field === 'terms' || field === 'commitment') {
        // For checkboxes, check if they're true
        if (!mentorData[field]) {
          errors[field] = 'Required';
        }
      } else {
        // For text fields, check if they exist and aren't empty
        if (!mentorData[field] || (typeof mentorData[field] === 'string' && mentorData[field].trim() === '')) {
          errors[field] = 'Required';
        }
      }
    });
    
    // Email format validation
    if (mentorData.email && !/^\S+@\S+\.\S+$/.test(mentorData.email)) {
      errors.email = 'Invalid email';
    }
    
    // Phone format validation (basic)
    if (mentorData.phone && !/^\+?\d{7,15}$/.test(mentorData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Invalid phone';
    }
    
    console.log('🔍 Validation errors:', errors); // Debug log
    return errors;
  };

  const handleMentorSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Mentor form submitted!');
    
    setMentorSuccess('');
    const errors = validateMentor();
    console.log('🔍 Validation result:', errors);
    
    setMentorErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        console.log('✅ Validation passed, submitting to API...');
        
        // Show loading state
        setMentorSuccess('Submitting your application...');
        
        const mentorPayload = {
          fullName: mentorData.fullName,
          phoneticName: mentorData.phoneticName,
          email: mentorData.email,
          phone: mentorData.phone,
          jobTitle: mentorData.jobTitle,
          experience: mentorData.experience,
          industry: mentorData.industry,
          mentoringExperience: mentorData.mentoringExperience,
          mentoringSkills: mentorData.mentoringSkills,
          developmentSkills: mentorData.developmentSkills,
          goals: mentorData.goals,
          hoursPerMonth: mentorData.hoursPerMonth || '',
          meetingFrequency: mentorData.meetingFrequency || '',
          duration: mentorData.duration || '',
          menteePreferences: mentorData.menteePreferences || '',
          accommodations: mentorData.accommodations || '',
          signature: mentorData.signature || 'Digital Signature',
          signatureDate: new Date().toISOString().split('T')[0],
        };
        
        console.log('📤 Sending mentor data:', mentorPayload);
        
        // Call backend API
        const response = await signupMentor(mentorPayload);
        
        console.log('📥 API Response:', response);
  
        if (response.success) {
          setMentorSuccess(response.message);
          
          // Reset form
          setMentorData({ ...mentorInitial, signatureDate: new Date().toISOString().split('T')[0] });
          
          // Clear errors
          setMentorErrors({});
          
        } else {
          console.error('❌ API Error:', response.message);
          setMentorSuccess('');
          setMentorErrors({ general: response.message || 'Failed to submit application' });
        }
      } catch (error) {
        console.error('❌ Mentor signup error:', error);
        setMentorSuccess('');
        setMentorErrors({ general: 'Something went wrong. Please try again.' });
      }
    } else {
      console.log('❌ Validation failed, not submitting');
    }
  };

  
  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: 8 }}>
      <form onSubmit={handleMentorSubmit} className="mentor-signup-form" style={{ width: '100%' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: 6 }}>Mentor Sign-Up Form</h2>
        <div style={{ textAlign: 'center', color: '#555', fontSize: 18, marginBottom: 18 }}>
          Join our mentorship program and help shape the next generation of professionals
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <a href="#" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'underline', fontSize: 16 }} onClick={e => { e.preventDefault(); if (onCancel) onCancel(); }}>
            &larr; Back to selection
          </a>
        </div>
        {mentorSuccess && <div style={{ color: 'green', textAlign: 'center', marginBottom: 16, fontSize: 18, fontWeight: 600 }}>{mentorSuccess}</div>}
        {/* Contact Information */}
        <section style={sectionStyle('#eaf1fb', 'none', '#1d4ed8')}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle} role="img" aria-label="Contact">✉️</span>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#1d4ed8' }}>Contact Information</span>
          </div>
          <div className="signup-row-2col">
            <div>
              <label className="signup-label">Full Name *</label>
              <input type="text" name="fullName" value={mentorData.fullName} onChange={handleMentorChange} className="signup-input" required />
              {mentorErrors.fullName && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.fullName}</span>}
            </div>
            <div>
              <label className="signup-label">Email Address *</label>
              <input type="email" name="email" value={mentorData.email} onChange={handleMentorChange} className="signup-input" required />
              {mentorErrors.email && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.email}</span>}
            </div>
            <div>
              <label className="signup-label">Phone Number *</label>
              <input type="tel" name="phone" value={mentorData.phone} onChange={handleMentorChange} className="signup-input" required />
              {mentorErrors.phone && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.phone}</span>}
            </div>
          </div>
        </section>
        {/* Professional Background */}
        <section style={sectionStyle('#eafbee', 'none', '#059669')}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle} role="img" aria-label="Professional">💼</span>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#059669' }}>Professional Background</span>
          </div>
          <div className="signup-row-2col">
            <div>
              <label className="signup-label">Current Job Role/Title *</label>
              <input type="text" name="jobTitle" value={mentorData.jobTitle} onChange={handleMentorChange} className="signup-input" required />
              {mentorErrors.jobTitle && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.jobTitle}</span>}
            </div>
            <div>
              <label className="signup-label">Years of Experience *</label>
              <select name="experience" value={mentorData.experience} onChange={handleMentorChange} className="signup-input" required>
                <option value="">Select years of experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="16-20">16-20 years</option>
                <option value="20+">20+ years</option>
              </select>
              {mentorErrors.experience && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.experience}</span>}
            </div>
            <div>
              <label className="signup-label">Industry/Discipline (optional)</label>
              <input type="text" name="industry" value={mentorData.industry} onChange={handleMentorChange} className="signup-input"  />
              {mentorErrors.industry && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.industry}</span>}
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="signup-label">Previous Mentoring Experience</label>
              <textarea name="mentoringExperience" value={mentorData.mentoringExperience} onChange={handleMentorChange} className="signup-input" rows={2} placeholder="Describe any previous mentoring experience..." />
            </div>
          </div>
        </section>
        {/* Skills and Interests */}
        <section style={sectionStyle('#f6f0fd', 'none', '#7c3aed')}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle} role="img" aria-label="Skills">⭐</span>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#7c3aed' }}>Skills and Interests</span>
          </div>
          <div>
            <label className="signup-label">Skills You Can Mentor Others On *</label>
            <textarea name="mentoringSkills" value={mentorData.mentoringSkills} onChange={handleMentorChange} className="signup-input" rows={2} required placeholder="List the skills and expertise you can share with mentees..." />
            {mentorErrors.mentoringSkills && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.mentoringSkills}</span>}
          </div>
          <div>
            <label className="signup-label">Goals for Participating in the Program *</label>
            <textarea name="goals" value={mentorData.goals} onChange={handleMentorChange} className="signup-input" rows={2} required placeholder="What do you hope to achieve through this mentorship program?" />
            {mentorErrors.goals && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.goals}</span>}
          </div>
        </section>
        {/* Consent and Agreement */}
        <section style={sectionStyle('#fee2e2', 'none', '#dc2626')}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle} role="img" aria-label="Consent">📝</span>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#dc2626' }}>Consent and Agreement</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <input type="checkbox" name="terms" checked={mentorData.terms} onChange={handleMentorChange} required />
              <span className="signup-label" style={{ fontWeight: 400 }}>I agree to the terms and conditions of the mentorship program, including confidentiality agreements and program guidelines. *</span>
            </label>
            {mentorErrors.terms && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.terms}</span>}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <input type="checkbox" name="commitment" checked={mentorData.commitment} onChange={handleMentorChange} required />
              <span className="signup-label" style={{ fontWeight: 400 }}>I commit to fulfilling my mentoring responsibilities for the duration specified above. *</span>
            </label>
            {mentorErrors.commitment && <span style={{ color: 'red', fontSize: 13 }}>{mentorErrors.commitment}</span>}
          </div>
        </section>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18, marginBottom: 8 }}>
          <button
            type="submit"
            className="signup-button"
            style={{
              background: '#2563eb',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 10,
              minWidth: 260,
              padding: '1em 0',
              boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              margin: '0 auto',
              display: 'block',
              transition: 'background 0.2s',
            }}
          >
            Submit Mentor Application
          </button>
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
        <div style={{ textAlign: 'center', fontSize: 15, marginTop: 8 }}>
          Already have an account?{' '}
          <a href="#" style={{ color: '#a259c6', fontWeight: 600, textDecoration: 'none' }} onClick={e => { e.preventDefault(); if (onSignIn) onSignIn(); }}>Sign In</a>
        </div>
      </form>
    </div>
  );
} 