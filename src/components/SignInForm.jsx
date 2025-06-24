import React, { useState } from 'react';
import './SignInForm.css';

const validateEmail = (email) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const SignInForm = ({ onSignIn, onSignUp, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (onSignIn) onSignIn(email, password);
  };

  return (
    <div className="signin-modal-overlay">
      <div
        className="signin-modal signin-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
      >
        <h2 id="signin-title" className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <label htmlFor="signin-email" className="email-label">Email Address *</label>
          <div className="email-input-wrapper">
            <span className="email-icon" aria-hidden="true">📧</span>
            <input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-label="Email Address"
              className="email-input"
            />
          </div>
          <label htmlFor="signin-password" className="password-label">Password *</label>
          <div className="password-input-wrapper">
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-label="Password"
              className="password-input"
            />
            <button
              type="button"
              className="toggle-password"
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div aria-live="polite" className="signin-error">{error}</div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <div className="signup-link">
          Don't have an account?{' '}
          <span onClick={onSignUp} className="link">Sign Up</span>
        </div>
        <div className="cancel-btn-wrapper">
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm; 