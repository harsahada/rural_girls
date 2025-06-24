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
        style={{
          maxWidth: 420,
          width: '95vw',
          padding: '2.5rem 2rem 2rem 2rem',
          borderRadius: 20,
          margin: '0 auto',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          background: 'rgba(255,255,255,0.97)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
      >
        <h2 id="signin-title" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'grid', gap: '1.1rem' }}>
          <label htmlFor="signin-email" style={{ fontWeight: 500, color: '#3a2066', fontSize: 16 }}>Email Address *</label>
          <input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Email Address"
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 16,
              background: '#fafaff',
            }}
          />
          <label htmlFor="signin-password" style={{ fontWeight: 500, color: '#3a2066', fontSize: 16 }}>Password *</label>
          <div className="password-input-wrapper" style={{ position: 'relative', width: '100%' }}>
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-label="Password"
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 16,
                background: '#fafaff',
              }}
            />
            <button
              type="button"
              className="toggle-password"
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: 18,
                color: '#a259ec',
                cursor: 'pointer',
                padding: 0,
              }}
              tabIndex={0}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div aria-live="polite" style={{ color: '#e75480', minHeight: 22, fontSize: 15, marginTop: 2 }}>{error}</div>
          <button
            type="submit"
            className="signin-btn"
            style={{
              width: '100%',
              padding: '0.8rem 0',
              marginTop: '0.5rem',
              background: 'linear-gradient(90deg, #e75480 0%, #a259ec 100%)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(162, 89, 236, 0.08)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            Sign In
          </button>
        </form>
        <div className="signup-link" style={{ marginTop: 18, textAlign: 'center', fontSize: 16 }}>
          Don't have an account?{' '}
          <span onClick={onSignUp} className="link" style={{ color: '#a259ec', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Sign Up</span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
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
      </div>
    </div>
  );
};

export default SignInForm; 