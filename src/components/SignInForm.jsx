import React, { useState } from 'react';
import './SignInForm.css';

const SignInForm = ({ onSignIn, onSignUp, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignIn) onSignIn(email, password);
  };

  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>Password *</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <div className="signup-link">
          Don't have an account?{' '}
          <span onClick={onSignUp} className="link">Sign Up</span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button
            type="button"
            onClick={onClose}
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
      </div>
    </div>
  );
};

export default SignInForm; 