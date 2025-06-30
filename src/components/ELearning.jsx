import React, { useState } from 'react';

const schoolSubjects = [
  { name: 'Mathematics', lessons: '25+ lessons available' },
  { name: 'Science', lessons: '25+ lessons available' },
  { name: 'Social Studies', lessons: '25+ lessons available' },
  { name: 'Language Arts', lessons: '25+ lessons available' },
  { name: 'History', lessons: '25+ lessons available' },
  { name: 'Geography', lessons: '25+ lessons available' },
];

const digitalLiteracy = [
  { name: 'Computer Basics', lessons: '20 lessons', duration: '2 hours' },
  { name: 'Internet Safety', lessons: '15 lessons', duration: '1.5 hours' },
  { name: 'Digital Communication', lessons: '18 lessons', duration: '2.5 hours' },
  { name: 'Online Learning Tools', lessons: '12 lessons', duration: '1 hour' },
];

const lifeSkills = [
  { name: 'Health & Wellness', lessons: 'Interactive modules' },
  { name: 'Financial Literacy', lessons: 'Interactive modules' },
  { name: 'Time Management', lessons: 'Interactive modules' },
  { name: 'Leadership Skills', lessons: 'Interactive modules' },
  { name: 'Problem Solving', lessons: 'Interactive modules' },
  { name: 'Critical Thinking', lessons: 'Interactive modules' },
];

const languages = [
  { code: 'en', label: 'English (English)' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'bn', label: 'Bengali (বাংলা)' },
];

const ELearning = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <div className="elearn-root" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
      <div className="elearn-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2d2940' }}>E-Learning Courses</h1>
          <select
            value={selectedLang}
            onChange={e => setSelectedLang(e.target.value)}
            className="elearn-lang-select elearn-hover"
            style={{ fontSize: 16, padding: '8px 18px', borderRadius: 8, border: '1.5px solid #a259ec', background: '#fff', color: '#3a2066', fontWeight: 600, boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }}
            aria-label="Select language"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>

        {/* School Subjects */}
        <section className="elearn-section" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '2rem 1.5rem', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#3a2066', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span role="img" aria-label="book">📖</span> School Subjects
          </h2>
          <div className="elearn-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {schoolSubjects.map(subj => (
              <div key={subj.name} className="elearn-card elearn-hover" style={{ background: '#eaf0ff', borderRadius: 12, padding: '1.2em 1em', marginBottom: 0, color: '#1a237e', fontWeight: 600, fontSize: 17, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#1a237e', fontWeight: 600 }}>{subj.name}</span>
                <span style={{ color: '#3a2066', fontWeight: 400, fontSize: 14 }}>{subj.lessons}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Digital Literacy */}
        <section className="elearn-section" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '2rem 1.5rem', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1b5e20', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span role="img" aria-label="bolt">⚡</span> Digital Literacy
          </h2>
          <div className="elearn-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {digitalLiteracy.map(dl => (
              <div key={dl.name} className="elearn-card elearn-hover" style={{ background: '#eafff2', borderRadius: 12, padding: '1.2em 1em', color: '#1b5e20', fontWeight: 600, fontSize: 17, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#1b5e20', fontWeight: 600 }}>{dl.name}</span>
                <span style={{ color: '#388e3c', fontWeight: 400, fontSize: 14 }}>{dl.lessons}</span>
                <span style={{ color: '#388e3c', fontWeight: 400, fontSize: 13 }}>{dl.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Life Skills */}
        <section className="elearn-section" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '2rem 1.5rem', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#a259ec', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span role="img" aria-label="heart">💜</span> Life Skills
          </h2>
          <div className="elearn-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {lifeSkills.map(ls => (
              <div key={ls.name} className="elearn-card elearn-hover" style={{ background: '#f7eaff', borderRadius: 12, padding: '1.2em 1em', color: '#a259ec', fontWeight: 600, fontSize: 17, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#a259ec', fontWeight: 600 }}>{ls.name}</span>
                <span style={{ color: '#a259ec', fontWeight: 400, fontSize: 14 }}>{ls.lessons}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <style>{`
        .elearn-hover {
          transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
        }
        .elearn-card.elearn-hover:hover {
          box-shadow: 0 6px 24px 0 rgba(162, 89, 255, 0.18);
          transform: scale(1.04);
          background: #f3e7fa;
          cursor: pointer;
        }
        .elearn-lang-select.elearn-hover:hover {
          border-color: #e75480;
          background: #f7eaff;
        }
      `}</style>
    </div>
  );
};

export default ELearning; 