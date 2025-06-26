import { useState } from "react";
import UserSignupForm from "./UserSignupForm.jsx";
import MentorSignupForm from "./MentorSignupForm.jsx";

export default function SignupForm({ onCancel, onSignIn }) {
  const [step, setStep] = useState('welcome'); // 'welcome', 'user', 'mentor'

  return (
    <div className="signup-container" style={{ maxWidth: 700,  borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', padding: '2.5rem 2rem', position: 'relative' }}>
      {step === 'welcome' && (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, color: '#18181b' }}>Welcome to Our Platform</h1>
          <div style={{ color: '#555', fontSize: 20, marginBottom: 32 }}>Choose how you'd like to join or access our platform</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18, color: '#222' }}>New to our platform? Sign Up</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 36 }}>
            <button
              style={{
                background: '#2563eb',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
                border: 'none',
                borderRadius: 14,
                padding: '1em 2.5em',
                boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                outline: 'none',
                minWidth: 220,
              }}
              onClick={() => setStep('mentor')}
            >
              Sign Up as Mentor
            </button>
            <button
              style={{
                background: 'linear-gradient(90deg, #a259c6 0%, #5d5fef 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
                border: 'none',
                borderRadius: 14,
                padding: '1em 2.5em',
                boxShadow: '0 4px 16px rgba(162,89,236,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                outline: 'none',
                minWidth: 220,
              }}
              onClick={() => setStep('user')}
            >
              Sign Up as User
            </button>
          </div>
          <hr style={{ margin: '36px 0', border: 'none', borderTop: '1.5px solid #e5e7eb' }} />
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18, color: '#222' }}>Already have an account? Sign In</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
            <button
              style={{
                background: '#16a34a',
                color: '#fff',
                fontWeight: 700,
                fontSize: 20,
                border: 'none',
                borderRadius: 14,
                padding: '0.9em 3em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 2px 8px rgba(22,163,74,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                outline: 'none',
                minWidth: 180,
                justifyContent: 'center',
              }}
              onClick={() => { if (onSignIn) onSignIn(); }}
            >
              <span role="img" aria-label="Lock" style={{ fontSize: 22 }}>🔒</span> Sign In
            </button>
          </div>
        </div>
      )}
      {step === 'mentor' && (
        <MentorSignupForm onCancel={onCancel} onSignIn={onSignIn} />
      )}
      {step === 'user' && (
        <UserSignupForm onCancel={onCancel} onSignIn={onSignIn} />
      )}
    </div>
  );
}
