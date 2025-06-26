import React from 'react';

const skillCategories = [
  {
    title: 'Digital Skills',
    color: '#eaf0ff',
    dot: '#5b7fff',
    skills: [
      { name: 'Basic Computer Skills', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Internet Navigation', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Digital Safety', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Online Communication', lessons: 'Video lessons', practice: 'Practice tasks' },
    ],
    text: '#1a237e',
    practice: '#2563eb',
  },
  {
    title: 'Communication',
    color: '#eafff2',
    dot: '#4ade80',
    skills: [
      { name: 'Public Speaking', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'English Conversation', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Presentation Skills', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Writing Skills', lessons: 'Video lessons', practice: 'Practice tasks' },
    ],
    text: '#166534',
    practice: '#22c55e',
  },
  {
    title: 'Technical Skills',
    color: '#f3eaff',
    dot: '#a259ec',
    skills: [
      { name: 'Basic Coding', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Web Design', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Mobile App Basics', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Digital Marketing', lessons: 'Video lessons', practice: 'Practice tasks' },
    ],
    text: '#7c3aed',
    practice: '#a259ec',
  },
  {
    title: 'Traditional Crafts',
    color: '#ffeaf3',
    dot: '#f24e1e',
    skills: [
      { name: 'Tailoring & Embroidery', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Handicrafts', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Jewelry Making', lessons: 'Video lessons', practice: 'Practice tasks' },
      { name: 'Pottery & Art', lessons: 'Video lessons', practice: 'Practice tasks' },
    ],
    text: '#be185d',
    practice: '#f24e1e',
  },
];

const certificates = [
  'Digital Marketing Certificate',
  'Basic Coding Certificate',
  'Communication Skills Certificate',
  'Entrepreneurship Certificate',
];

const Skills = () => (
  <div className="skills-root" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
    <div className="skills-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', textAlign: 'center', marginBottom: 8 }}>Skill Development Programs</h1>
      <p style={{ color: '#444', textAlign: 'center', fontSize: 18, marginBottom: 36 }}>
        Build practical skills that open doors to new opportunities and help you create a sustainable livelihood.
      </p>
      {skillCategories.map((cat, idx) => (
        <section key={cat.title} className="skills-section" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '2rem 1.5rem', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#222', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: cat.dot }}></span> {cat.title}
          </h2>
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>
            {cat.skills.map(skill => (
              <div
                key={skill.name}
                className="skills-card skills-hover"
                style={{ background: cat.color, borderRadius: 14, padding: '1.2em 1em', color: cat.text, fontWeight: 600, fontSize: 18, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 90, boxShadow: '0 1px 4px rgba(162,89,255,0.04)', transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s' }}
              >
                <div style={{ fontWeight: 700, fontSize: 19, color: cat.text }}>{skill.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: cat.text, fontWeight: 400, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span role="img" aria-label="video">🎬</span> {skill.lessons}
                  </span>
                  <span style={{ color: cat.practice, fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span role="img" aria-label="practice">📝</span> {skill.practice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      {/* Certification Programs */}
      <section className="skills-cert" style={{ background: '#f3fff8', borderRadius: 18, boxShadow: '0 2px 8px rgba(34,197,94,0.08)', padding: '2rem 1.5rem', margin: '0 auto', maxWidth: 900, textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', marginBottom: 12 }}>Certification Programs</h2>
        <p style={{ color: '#444', fontSize: 16, marginBottom: 18 }}>
          Complete skill tracks and earn certificates to showcase your abilities to potential employers or clients.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {certificates.map(cert => (
            <span
              key={cert}
              className="skills-cert-badge skills-hover"
              style={{ background: '#fff', color: '#111', borderRadius: 22, padding: '8px 18px', fontWeight: 600, fontSize: 16, boxShadow: '0 1px 4px rgba(34,197,94,0.08)', border: '1.5px solid #e0e0e0', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s' }}
            >
              {cert}
            </span>
          ))}
        </div>
      </section>
    </div>
    <style>{`
      .skills-hover {
        transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
      }
      .skills-card.skills-hover:hover {
        box-shadow: 0 6px 24px 0 rgba(162, 89, 255, 0.18);
        transform: scale(1.04);
        background: #f3e7fa !important;
        cursor: pointer;
      }
      .skills-cert-badge.skills-hover:hover {
        box-shadow: 0 2px 12px rgba(34,197,94,0.13);
        background: #eafff2 !important;
        transform: scale(1.06);
      }
    `}</style>
  </div>
);

export default Skills; 