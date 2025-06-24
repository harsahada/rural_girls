import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => (
  <footer className="footer-root" style={{ background: '#2d2940', color: '#fff', marginTop: 48, padding: '48px 0 0 0', borderRadius: '0 0 32px 32px', boxShadow: '0 -2px 16px rgba(0,0,0,0.04)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32, padding: '0 24px' }}>
      {/* SheRise */}
      <div style={{ flex: '1 1 220px', minWidth: 220, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)', borderRadius: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}><Globe size={22} color="#fff" /></span>
          <span style={{ fontWeight: 700, fontSize: 20, background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SheRise</span>
        </div>
        <div style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.6 }}>
          Empowering rural girls through accessible education, mentorship, and entrepreneurship opportunities. ✨
        </div>
      </div>
      {/* Resources */}
      <div style={{ flex: '1 1 180px', minWidth: 180, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>📚</span> Resources
        </div>
        <ul style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0 }}>
          <li className="footer-link">Help Center</li>
          <li className="footer-link">Community Guidelines</li>
          <li className="footer-link">Privacy Policy</li>
          <li className="footer-link">Terms of Service</li>
        </ul>
      </div>
      {/* Support */}
      <div style={{ flex: '1 1 180px', minWidth: 180, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🤝</span> Support
        </div>
        <ul style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0 }}>
          <li className="footer-link">Contact Us</li>
          <li className="footer-link">Technical Support</li>
          <li className="footer-link">Feedback</li>
          <li className="footer-link">Report Issue</li>
        </ul>
      </div>
      {/* Connect */}
      <div style={{ flex: '1 1 220px', minWidth: 220, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🌐</span> Connect
        </div>
        <ul style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0 }}>
          <li>🗺️ Available in 15+ Indian languages</li>
          <li>⚡ Optimized for low-bandwidth areas</li>
          <li style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span className="footer-social fb">FB</span>
            <span className="footer-social tw">TW</span>
            <span className="footer-social in">IN</span>
          </li>
        </ul>
      </div>
    </div>
    <div style={{ borderTop: '1px solid #3a3456', margin: '0 auto', marginTop: 24, maxWidth: 1200 }} />
    <div style={{ textAlign: 'center', color: '#e0e0e0', fontSize: 15, padding: '18px 0 24px 0' }}>
      © 2025 SheRise Platform. Made with <span style={{ color: '#e75480', fontWeight: 700 }}>❤️</span> for rural girls across India. <span role="img" aria-label="sparkles">✨</span>
    </div>
    <style>{`
      .footer-link {
        cursor: pointer;
        transition: color 0.2s;
      }
      .footer-link:hover {
        color: #a259ec;
        text-decoration: underline;
      }
      .footer-social {
        border-radius: 8px;
        padding: 2px 12px;
        font-weight: 700;
        font-size: 15px;
        color: #fff;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
        display: inline-block;
      }
      .footer-social.fb {
        background: linear-gradient(90deg, #f24e1e 0%, #a259ff 100%);
      }
      .footer-social.tw {
        background: linear-gradient(90deg, #a259ff 0%, #1da1f2 100%);
      }
      .footer-social.in {
        background: linear-gradient(90deg, #1da1f2 0%, #22c55e 100%);
      }
      .footer-social:hover {
        transform: scale(1.08);
        filter: brightness(1.15);
      }
    `}</style>
  </footer>
);

export default Footer; 