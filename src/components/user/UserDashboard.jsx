import React from 'react';

const sectionStyle = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 4px 24px 0 rgba(162,89,255,0.10)',
  padding: '2rem 1.5rem',
  marginBottom: 32,
  transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s',
};

const UserDashboard = ({ user }) => {
  return (
    <div className="user-dashboard-root" style={{ minHeight: '80vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '40px 0' }}>
      <div className="user-dashboard-container" style={{ maxWidth: 950, margin: '0 auto', padding: '0 16px' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 38, color: '#a259ec', background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px rgba(162,89,255,0.10)', padding: 10 }}>👩‍🎓</span>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 900, color: '#222', margin: 0, letterSpacing: '-1px' }}>
            Welcome, {user?.fullName || 'User'}!
          </h1>
        </div>
        <div style={{ color: '#555', fontSize: 19, marginBottom: 36, fontWeight: 500 }}>
          This is your personalized dashboard. Here you can track your learning, connect with mentors, and engage with the community.
        </div>
        {/* Profile Summary */}
        <div className="user-dashboard-section" style={sectionStyle}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#5d5fef', marginBottom: 18, letterSpacing: '-0.5px' }}>Profile Summary</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontWeight: 600, color: '#222' }}>Name:</div>
              <div>{user?.fullName}</div>
            </div>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontWeight: 600, color: '#222' }}>Email:</div>
              <div>{user?.email}</div>
            </div>
            {user?.state && (
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 600, color: '#222' }}>State:</div>
                <div>{user.state}</div>
              </div>
            )}
            {user?.age && (
              <div style={{ minWidth: 120 }}>
                <div style={{ fontWeight: 600, color: '#222' }}>Age:</div>
                <div>{user.age}</div>
              </div>
            )}
            {user?.language && (
              <div style={{ minWidth: 120 }}>
                <div style={{ fontWeight: 600, color: '#222' }}>Language:</div>
                <div>{user.language}</div>
              </div>
            )}
          </div>
        </div>
        {/* My Courses */}
        <div className="user-dashboard-section" style={sectionStyle}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a259ec', marginBottom: 14 }}>My Courses</h2>
          <div style={{ color: '#666', fontSize: 16 }}>You are not enrolled in any courses yet. <span style={{ color: '#5d5fef', fontWeight: 500, cursor: 'pointer' }}>Explore our E-Learning section</span> to get started!</div>
        </div>
        {/* My Mentors */}
        <div className="user-dashboard-section" style={sectionStyle}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3b82f6', marginBottom: 14 }}>My Mentors</h2>
          <div style={{ color: '#666', fontSize: 16 }}>You have not connected with any mentors yet. <span style={{ color: '#3b82f6', fontWeight: 500, cursor: 'pointer' }}>Visit the Mentorship section</span> to find a mentor.</div>
        </div>
        {/* Community Activity */}
        <div className="user-dashboard-section" style={sectionStyle}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16a34a', marginBottom: 14 }}>Community Activity</h2>
          <div style={{ color: '#666', fontSize: 16 }}>No recent activity. <span style={{ color: '#16a34a', fontWeight: 500, cursor: 'pointer' }}>Join the Community</span> to participate in discussions and events!</div>
        </div>
      </div>
      <style>{`
        .user-dashboard-section {
          transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
        }
        .user-dashboard-section:hover {
          box-shadow: 0 8px 32px 0 rgba(162,89,255,0.18);
          transform: scale(1.02);
          background: #f0f7ff;
        }
        @media (max-width: 700px) {
          .user-dashboard-container {
            padding: 0 2px;
          }
          .user-dashboard-section {
            padding: 1.2rem 0.7rem;
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard; 