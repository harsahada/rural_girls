import React, { useState } from 'react';

const forumCategories = [
  { id: 'general', name: 'General Discussion', desc: 'Share your thoughts and connect with others', members: 1250 },
  { id: 'education', name: 'Education Support', desc: 'Get help with studies and academic questions', members: 890 },
  { id: 'skills', name: 'Skill Development', desc: 'Discuss learning new skills and career growth', members: 670 },
  { id: 'business', name: 'Entrepreneurship', desc: 'Share business ideas and startup experiences', members: 430 },
  { id: 'success', name: 'Success Stories', desc: 'Celebrate achievements and inspire others', members: 320 },
];

const activeMembers = [
  { name: 'Lakshmi P.', location: 'Kerala', status: 'online', avatar: '👩' },
  { name: 'Radha M.', location: 'Gujarat', status: 'online', avatar: '👧' },
  { name: 'Sunita K.', location: 'Punjab', status: 'away', avatar: '👩' },
  { name: 'Deepika S.', location: 'Odisha', status: 'online', avatar: '👧' },
];

const forumMessages = {
  general: [
    {
      id: 1,
      user: 'Priya K.',
      avatar: '👩',
      time: '2 hours ago',
      message: "Hello everyone! I just joined the platform and I'm so excited to learn and connect with all of you. Any tips for someone just starting out?",
      likes: 12,
      replies: 3,
      location: 'Karnataka',
    },
    {
      id: 2,
      user: 'Anjali S.',
      avatar: '👧',
      time: '4 hours ago',
      message: 'I successfully completed my first digital marketing course! Thank you to everyone who encouraged me. Now looking forward to starting my online business.',
      likes: 28,
      replies: 7,
      location: 'Rajasthan',
    },
    {
      id: 3,
      user: 'Meera R.',
      avatar: '👩',
      time: '6 hours ago',
      message: 'Does anyone know about government schemes for rural women entrepreneurs? I want to start a tailoring unit in my village.',
      likes: 15,
      replies: 9,
      location: 'Tamil Nadu',
    },
  ],
};

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const [language, setLanguage] = useState('English');

  return (
    <div className="community-root" style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8e1f4 0%, #f3e7fa 100%)', padding: '32px 0' }}>
      <div className="community-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222', textAlign: 'center', marginBottom: 8 }}>Community Forum</h1>
        <p style={{ color: '#444', textAlign: 'center', fontSize: 18, marginBottom: 36 }}>
          Connect with fellow learners, share experiences, ask questions, and support each other on your journey to empowerment.
        </p>
        <div className="community-main" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ flex: 2, minWidth: 0 }}>
            {/* Forum Categories */}
            <div className="community-tabs" style={{ display: 'flex', gap: 18, marginBottom: 28, flexWrap: 'wrap' }}>
              {forumCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`community-tab${selectedCategory === cat.id ? ' community-tab-active' : ''}`}
                  style={{
                    background: selectedCategory === cat.id ? '#eaf0ff' : '#fff',
                    border: selectedCategory === cat.id ? '2px solid #5b7fff' : '2px solid #e0e0e0',
                    color: '#222',
                    borderRadius: 16,
                    padding: '18px 28px',
                    fontWeight: 600,
                    fontSize: 17,
                    boxShadow: selectedCategory === cat.id ? '0 2px 12px rgba(91,127,255,0.08)' : 'none',
                    cursor: 'pointer',
                    minWidth: 220,
                    transition: 'all 0.18s',
                  }}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{cat.name}</div>
                  <div style={{ fontWeight: 400, fontSize: 15, color: '#444', margin: '2px 0 6px 0' }}>{cat.desc}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#5b7fff' }}>{cat.members} members</div>
                </button>
              ))}
            </div>
            {/* Message Input */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '24px 20px', marginBottom: 32, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, marginTop: 4 }}>🧑‍🎓</div>
              <div style={{ flex: 1 }}>
                <textarea
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder={`Share something with the ${forumCategories.find(c => c.id === selectedCategory)?.name} community...`}
                  style={{ width: '100%', minHeight: 60, border: 'none', outline: 'none', fontSize: 17, fontFamily: 'inherit', resize: 'vertical', background: '#f8f8fa', borderRadius: 8, padding: 12, marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <select value={language} onChange={e => setLanguage(e.target.value)} style={{ fontSize: 15, borderRadius: 6, padding: '4px 12px', border: '1.5px solid #e0e0e0', background: '#fff', color: '#3a2066', fontWeight: 500 }}>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                  <button className="community-post-btn" style={{ marginLeft: 'auto', background: 'linear-gradient(90deg, #a259ff 0%, #5d5fef 100%)', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7em 2.2em', fontWeight: 600, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(162,89,255,0.08)', transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s' }}>Post</button>
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="community-messages" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {(forumMessages[selectedCategory] || forumMessages.general).map(msg => (
                <div key={msg.id} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '22px 20px', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 32, marginTop: 4 }}>{msg.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 17 }}>{msg.user}</span>
                      <span style={{ background: '#f3f4f6', color: '#444', borderRadius: 6, padding: '2px 10px', fontSize: 14, fontWeight: 500 }}>{msg.location}</span>
                      <span style={{ color: '#888', fontSize: 14 }}>{msg.time}</span>
                    </div>
                    <div style={{ color: '#444', fontSize: 16, marginBottom: 10 }}>{msg.message}</div>
                    <div style={{ display: 'flex', gap: 18, alignItems: 'center', color: '#888', fontSize: 15 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>👍 {msg.likes}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>↩️ {msg.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Load More */}
            <div style={{ textAlign: 'center', margin: '32px 0 0 0' }}>
              <button className="community-load-btn" style={{ background: '#f8f8fa', color: '#444', border: 'none', borderRadius: 12, padding: '14px 44px', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 1px 4px rgba(162,89,255,0.04)', transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s' }}>Load More Messages</button>
            </div>
          </div>
          {/* Sidebar */}
          <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Active Members */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(162,89,255,0.08)', padding: '22px 20px', marginBottom: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 19, color: '#222', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#22c55e', fontSize: 22 }}>🟢</span> Active Members
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeMembers.map(m => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{m.avatar}</span>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{m.name}</span>
                    <span style={{ color: '#888', fontSize: 15 }}>{m.location}</span>
                    <span style={{ color: m.status === 'online' ? '#22c55e' : '#facc15', fontSize: 16 }}>●</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Community Guidelines */}
            <div style={{ background: '#eaf0ff', borderRadius: 14, padding: '18px 16px', marginBottom: 0, border: '1.5px solid #b6c6f7' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 8 }}>Community Guidelines</div>
              <ul style={{ color: '#444', fontSize: 15, margin: 0, padding: '0 0 0 18px', lineHeight: 1.7 }}>
                <li>Be respectful and supportive</li>
                <li>Share knowledge freely</li>
                <li>Help others learn and grow</li>
                <li>Report inappropriate content</li>
                <li>Celebrate each other's success</li>
              </ul>
            </div>
            {/* Need Help */}
            <div style={{ background: '#ffeaf3', borderRadius: 14, padding: '18px 16px', border: '1.5px solid #f7b6d6' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#a259ec', marginBottom: 8 }}>Need Help?</div>
              <ul style={{ color: '#a259ec', fontSize: 15, margin: 0, padding: '0 0 0 18px', lineHeight: 1.7 }}>
                <li>📚 How to use the forum</li>
                <li>🔒 Privacy & Safety</li>
                <li>🌐 Language Support</li>
                <li>📞 Contact Moderators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .community-tab {
          transition: box-shadow 0.18s, border 0.18s, background 0.18s;
        }
        .community-tab:hover {
          border: 2px solid #a259ec !important;
          background: #f7eaff !important;
        }
        .community-tab-active {
          border: 2px solid #5b7fff !important;
          background: #eaf0ff !important;
        }
        .community-post-btn:hover {
          background: linear-gradient(90deg, #f24e1e 0%, #a259ff 100%) !important;
          color: #fff;
          transform: scale(1.04);
        }
        .community-load-btn:hover {
          background: #eaf0ff !important;
          color: #5b7fff;
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
};

export default Community; 