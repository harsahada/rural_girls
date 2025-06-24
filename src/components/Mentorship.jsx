import React from 'react';

const mentors = [
  {
    name: 'Dr. Priya Sharma',
    avatar: '👩‍🏫',
    expertise: 'Education & Career Guidance',
    experience: '15+ years',
    languages: ['Hindi', 'English'],
    color: '#3b82f6',
  },
  {
    name: 'Kavita Patel',
    avatar: '👩‍💼',
    expertise: 'Entrepreneurship & Business',
    experience: '12+ years',
    languages: ['Gujarati', 'Hindi', 'English'],
    color: '#3b82f6',
  },
  {
    name: 'Meera Reddy',
    avatar: '👩‍💻',
    expertise: 'Technology & Digital Skills',
    experience: '10+ years',
    languages: ['Telugu', 'English'],
    color: '#3b82f6',
  },
];

const steps = [
  {
    title: 'Choose Your Mentor',
    desc: 'Browse mentor profiles and select based on your interests and goals',
  },
  {
    title: 'Schedule Sessions',
    desc: 'Book convenient time slots for one-on-one guidance sessions',
  },
  {
    title: 'Grow & Learn',
    desc: 'Receive personalized advice and track your progress over time',
  },
];

const Mentorship = () => (
  <div className="mentorship-root" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
    <div className="mentorship-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', textAlign: 'center', marginBottom: 8 }}>Connect with Mentors</h1>
      <p style={{ color: '#444', textAlign: 'center', fontSize: 18, marginBottom: 36 }}>
        Get personalized guidance from experienced professionals who understand your journey and can help you achieve your goals.
      </p>
      {/* Mentor Cards */}
      <div className="mentorship-mentors" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
        {mentors.map((mentor, idx) => (
          <div
            key={mentor.name}
            className="mentorship-card mentorship-hover"
            style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 4px 24px 0 rgba(162,89,255,0.10)',
              padding: '32px 28px 24px 28px',
              minWidth: 320,
              maxWidth: 340,
              flex: '1 1 320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 16,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 10 }}>{mentor.avatar}</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 4, textAlign: 'center' }}>{mentor.name}</div>
            <div style={{ color: '#444', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>{mentor.expertise}</div>
            <div style={{ color: '#2563eb', fontWeight: 500, fontSize: 15, marginBottom: 8, cursor: 'pointer' }}>{mentor.experience}</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 4 }}>Languages:</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {mentor.languages.map(lang => (
                <span key={lang} style={{ background: '#f3f4f6', color: '#222', borderRadius: 6, padding: '2px 10px', fontSize: 14, fontWeight: 500 }}>{lang}</span>
              ))}
            </div>
            <button
              className="mentorship-connect-btn mentorship-hover"
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '0.9em 0',
                width: '100%',
                fontWeight: 600,
                fontSize: 18,
                marginTop: 8,
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
              }}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
      {/* How Mentorship Works */}
      <div className="mentorship-how" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '2rem 1.5rem', margin: '0 auto', maxWidth: 900, textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#222', marginBottom: 24 }}>How Mentorship Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          {steps.map((step, idx) => (
            <div key={step.title} style={{ flex: '1 1 220px', minWidth: 180, maxWidth: 260, marginBottom: 12 }}>
              <div style={{ background: '#f3f4f6', color: '#2563eb', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, margin: '0 auto 10px auto' }}>{idx + 1}</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#222', marginBottom: 6 }}>{step.title}</div>
              <div style={{ color: '#444', fontSize: 15 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`
      .mentorship-hover {
        transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
      }
      .mentorship-card.mentorship-hover:hover {
        box-shadow: 0 8px 32px 0 rgba(59,130,246,0.18);
        transform: scale(1.04);
        background: #f0f7ff;
        cursor: pointer;
      }
      .mentorship-connect-btn.mentorship-hover:hover {
        background: #2563eb;
        box-shadow: 0 4px 16px 0 rgba(59,130,246,0.18);
        transform: scale(1.03);
      }
    `}</style>
  </div>
);

export default Mentorship; 