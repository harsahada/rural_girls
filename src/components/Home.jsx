import React from 'react';

const stats = [
  { label: 'Courses Available', value: '500+' },
  { label: 'Expert Mentors', value: '200+' },
  { label: 'Girls Empowered', value: '5000+' },
  { label: 'Languages', value: '15+' },
];

const features = [
  {
    title: 'Localized E-Learning',
    description: 'Access courses in your native language covering school subjects, digital literacy, and essential life skills.',
    button: 'Explore Courses →',
    color: '#1da1f2',
  },
  {
    title: 'Mentor Connection',
    description: 'Get personalized guidance from experienced mentors for education, career, and entrepreneurship.',
    button: 'Find Mentors →',
    color: '#22c55e',
  },
  {
    title: 'Skill Development',
    description: 'Learn practical skills from communication and coding to traditional crafts and handicrafts.',
    button: 'Develop Skills →',
    color: '#a259ec',
  },
  {
    title: 'Community Forum',
    description: 'Connect with peers, share experiences, ask questions, and build a supportive network.',
    button: 'Join Community →',
    color: '#f24e1e',
  },
  {
    title: 'Business Marketplace',
    description: 'Showcase your business, connect with customers, and discover other women-owned enterprises.',
    button: 'Explore Marketplace →',
    color: '#a259ec',
  },
  {
    title: 'Entrepreneurship',
    description: 'Access business toolkits, templates, and microfinance information to start your own venture.',
    button: 'Start Business →',
    color: '#f24e1e',
  },
];

const Home = ({ isDarkMode }) => {
  return (
    <div style={{
      width: '100%',
      // maxWidth: 1200,
      margin: '0 auto',
      // padding: '32px 0',
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(120deg, #18162a 0%, #232046 100%)'
        : 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)',
      color: isDarkMode ? '#f3f3f3' : '#222',
    }}>
      {/* Hero Section */}
      <section style={{
        background: isDarkMode
          ? 'linear-gradient(90deg, #232046 0%, #3a2066 100%)'
          : 'linear-gradient(90deg, #e75480 0%, #a259ec 100%)',
        borderRadius: 24,
        padding: '2.5rem 1.5rem',
        marginBottom: 36,
        color: isDarkMode ? '#fff' : '#fff',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 12 }}>
          Empowering Rural Girls Through Education & Opportunity <span role="img" aria-label="sparkles">✨</span>
        </h1>
        <p style={{ fontSize: '1.15rem', marginBottom: 28, color: isDarkMode ? '#e0e0e0' : '#f8f8f8' }}>
          Access quality education, connect with mentors, develop skills, and start your entrepreneurial journey - all in your native language.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
          <button style={{ background: isDarkMode ? '#232046' : '#fffbe6', color: '#e75480', fontWeight: 600, border: 'none', borderRadius: 12, padding: '0.8em 2em', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }}>🌞 Join Free Today</button>
          <button style={{ background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.18)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 12, padding: '0.8em 2em', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }}>🔑 Sign In</button>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
        {stats.map((stat, idx) => (
          <div key={stat.label} style={{
            background: isDarkMode ? '#232046' : '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(162,89,255,0.08)',
            padding: '1.2em 2.2em',
            minWidth: 160,
            textAlign: 'center',
            margin: 8,
            color: isDarkMode ? '#f3f3f3' : '#444',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#a259ec', marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 15 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
        {features.map((feature, idx) => (
          <div key={feature.title} style={{
            background: isDarkMode ? '#232046' : '#fff',
            borderRadius: 18,
            boxShadow: '0 2px 8px rgba(162,89,255,0.08)',
            padding: '2em 1.5em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 200,
            color: isDarkMode ? '#f3f3f3' : '#444',
          }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: feature.color, marginBottom: 8 }}>{feature.title}</div>
              <div style={{ fontSize: 15, marginBottom: 18 }}>{feature.description}</div>
            </div>
            <button style={{ background: feature.color, color: '#fff', border: 'none', borderRadius: 10, padding: '0.7em 1.4em', fontWeight: 600, fontSize: 15, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 8 }}> {feature.button}</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home; 