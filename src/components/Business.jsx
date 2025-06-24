import React from 'react';

const planningTools = [
  { name: 'Business Plan Templates', icon: '📄', link: '#' },
  { name: 'Market Research Guides', icon: '📄', link: '#' },
  { name: 'Financial Planning Worksheets', icon: '📄', link: '#' },
  { name: 'Legal Requirements Checklist', icon: '📄', link: '#' },
];

const fundingSupport = [
  { name: 'Microfinance Organizations', icon: '💰', link: '#' },
  { name: 'Government Schemes', icon: '💰', link: '#' },
  { name: 'NGO Support Programs', icon: '💰', link: '#' },
  { name: 'Crowdfunding Platforms', icon: '💰', link: '#' },
];

const businessIdeas = [
  { name: 'Tailoring & Fashion', investment: 'Low', potential: 'High' },
  { name: 'Handicrafts & Art', investment: 'Low', potential: 'Medium' },
  { name: 'Food Processing', investment: 'Medium', potential: 'High' },
  { name: 'Online Services', investment: 'Low', potential: 'High' },
  { name: 'Agricultural Products', investment: 'Medium', potential: 'Medium' },
  { name: 'Tourism & Hospitality', investment: 'Medium', potential: 'High' },
];

const successStories = [
  {
    quote: 'I started my tailoring business with just ₹5,000. Now I employ 5 other women from my village!',
    author: 'Sunita, Rajasthan',
    link: '#',
  },
  {
    quote: 'The digital marketing course helped me sell my handicrafts online. My monthly income has tripled!',
    author: 'Kavitha, Karnataka',
    link: '#',
  },
];

const Business = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', textAlign: 'center', marginBottom: 8 }}>Start Your Business Journey</h1>
      <p style={{ color: '#444', textAlign: 'center', fontSize: 18, marginBottom: 36 }}>
        Access comprehensive business resources, funding information, and practical tools to turn your ideas into successful ventures.
      </p>
      {/* Planning Tools & Funding */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(162,89,255,0.08)', padding: '28px 24px' }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#5d5fef', fontSize: 22 }}>🧰</span> Business Planning Tools
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {planningTools.map((tool, i) => (
              <a key={tool.name} href={tool.link} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#eaf0ff', borderRadius: 10, padding: '14px 16px', color: '#5d5fef', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'background 0.18s' }} className="business-tool-link">
                <span style={{ fontSize: 20 }}>{tool.icon}</span> {tool.name}
              </a>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(162,89,255,0.08)', padding: '28px 24px' }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#22c55e', fontSize: 22 }}>⭐</span> Funding & Support
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {fundingSupport.map((item, i) => (
              <a key={item.name} href={item.link} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#eaffea', borderRadius: 10, padding: '14px 16px', color: '#22c55e', fontWeight: 600, fontSize: 16, textDecoration: 'none', transition: 'background 0.18s' }} className="business-funding-link">
                <span style={{ fontSize: 20 }}>{item.icon}</span> {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Popular Business Ideas */}
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(162,89,255,0.08)', padding: '28px 24px', marginBottom: 36 }}>
        <div style={{ fontWeight: 700, fontSize: 19, color: '#222', marginBottom: 18 }}>Popular Business Ideas for Rural Areas</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {businessIdeas.map((idea, i) => (
            <div key={idea.name} className="business-idea-card" style={{ flex: '1 1 260px', minWidth: 220, background: '#f7eaff', borderRadius: 12, padding: '18px 16px', color: '#a259ff', fontWeight: 600, fontSize: 17, marginBottom: 8, transition: 'background 0.18s, box-shadow 0.18s' }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{idea.name}</div>
              <div style={{ fontWeight: 400, fontSize: 15 }}>Investment: {idea.investment}</div>
              <div style={{ fontWeight: 400, fontSize: 15 }}>Potential: {idea.potential}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Stories */}
      <div style={{ background: '#fff0fa', borderRadius: 18, boxShadow: '0 2px 12px rgba(162,89,255,0.06)', padding: '28px 24px', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 19, color: '#222', marginBottom: 18 }}>Success Stories</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {successStories.map((story, i) => (
            <div key={i} style={{ flex: '1 1 340px', minWidth: 260, background: '#fff', borderRadius: 12, padding: '18px 16px', color: '#444', fontStyle: 'italic', fontSize: 17, marginBottom: 8, boxShadow: '0 1px 6px rgba(162,89,255,0.04)' }}>
              <div style={{ marginBottom: 10 }}>&quot;{story.quote}&quot;</div>
              <a href={story.link} style={{ color: '#a259ff', fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>- {story.author}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`
      .business-tool-link:hover {
        background: #dbeafe !important;
        color: #3b82f6 !important;
      }
      .business-funding-link:hover {
        background: #d1fae5 !important;
        color: #16a34a !important;
      }
      .business-idea-card:hover {
        background: #ede9fe !important;
        box-shadow: 0 4px 16px rgba(162,89,255,0.10);
      }
    `}</style>
  </div>
);

export default Business; 