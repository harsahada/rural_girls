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

const Home = () => {
  return (
    <div className="sr-home-root">
      {/* Hero Section */}
      <section className="sr-hero" aria-label="Hero">
        <h1>
          Empowering Rural Girls Through Education & Opportunity <span role="img" aria-label="sparkles">✨</span>
        </h1>
        <p>
          Access quality education, connect with mentors, develop skills, and start your entrepreneurial journey - all in your native language.
        </p>
        <div className="sr-hero-btns">
          <button className="sr-btn sr-btn-join">🌞 Join Free Today</button>
          <button className="sr-btn sr-btn-signin">🔑 Sign In</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="sr-stats" aria-label="Platform statistics">
        {stats.map(stat => (
          <div key={stat.label} className="sr-stat-card">
            <div className="sr-stat-value">{stat.value}</div>
            <div className="sr-stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="sr-features" aria-label="Platform features">
        {features.map(feature => (
          <div key={feature.title} className="sr-feature-card">
            <div>
              <div className="sr-feature-title" style={{ color: feature.color }}>{feature.title}</div>
              <div className="sr-feature-desc">{feature.description}</div>
            </div>
            <button className="sr-btn" style={{ background: feature.color }}>{feature.button}</button>
          </div>
        ))}
      </section>

      <style>{`
        .sr-home-root {
          min-height: 100vh;
          background: linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%);
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          color: #2d2940;
          display: flex;
          flex-direction: column;
          padding-bottom: 48px;
        }
        .sr-hero {
          min-height: 38vh;
          background: linear-gradient(90deg, #e75480 0%, #a259ec 100%);
          border-radius: 24px;
          padding: 2.5rem 1.5rem 2rem 1.5rem;
          margin: 32px auto 36px auto;
          color: #fff;
          text-align: center;
          max-width: 900px;
          box-shadow: 0 2px 16px rgba(162,89,255,0.08);
        }
        .sr-hero h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .sr-hero p {
          font-size: 1.15rem;
          margin-bottom: 28px;
          color: #f8f8f8;
        }
        .sr-hero-btns {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .sr-btn {
          font-weight: 600;
          border: none;
          border-radius: 12px;
          padding: 0.8em 2em;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(162,89,255,0.08);
          transition: background 0.2s, color 0.2s;
        }
        .sr-btn-join {
          background: #fffbe6;
          color: #e75480;
        }
        .sr-btn-signin {
          background: rgba(255,255,255,0.18);
          color: #fff;
        }
        .sr-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .sr-stat-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(162,89,255,0.08);
          padding: 1.2em 2.2em;
          min-width: 140px;
          text-align: center;
          margin: 8px;
        }
        .sr-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #a259ec;
          margin-bottom: 4px;
        }
        .sr-stat-label {
          font-size: 15px;
          color: #444;
        }
        .sr-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 48px;
        }
        .sr-feature-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 8px rgba(162,89,255,0.08);
          padding: 2em 1.5em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
        }
        .sr-feature-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .sr-feature-desc {
          font-size: 15px;
          color: #444;
          margin-bottom: 18px;
        }
        @media (max-width: 600px) {
          .sr-hero {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            font-size: 1rem;
          }
          .sr-hero h1 {
            font-size: 1.3rem;
          }
          .sr-stats {
            gap: 12px;
          }
          .sr-feature-card {
            padding: 1em 0.5em;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;