import React from 'react';
import {
  Globe,
  Moon,
  Heart,
  BookOpen,
  Users,
  Target,
  MessageCircle,
  ShoppingCart,
  Briefcase,
  LogIn,
  UserPlus
} from 'lucide-react';

const Navbar = ({ onJoinFree }) => {
  return (
    <header className="navbar" role="banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #a259ff 0%, #5d5fef 100%)', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="SheRise logo">
          <Globe color="#fff" size={26} />
        </div>
        <div className="navbar-title" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span className="navbar-brand" style={{ fontWeight: 'bold', fontSize: '1.3rem', background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SheRise</span>
          <span className="navbar-subtitle" style={{ fontSize: '0.85rem', color: '#888', marginTop: -2 }}>Empowering<br />Rural Girls ✨</span>
        </div>
        <button className="navbar-theme-btn" title="Toggle theme" aria-label="Toggle theme" style={{ marginLeft: 16, background: '#f3f3f3', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Moon size={20} />
        </button>
      </div>
      <nav aria-label="Main navigation" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
          <li className="navbar-menu-item active" style={{ background: 'linear-gradient(90deg, #a259ff 0%, #5d5fef 100%)', color: '#fff', borderRadius: 24, padding: '0.5em 1.6em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }} aria-current="page">
              <Heart size={18} /> Home
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} /> E-Learning
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} /> Mentorship
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Target size={18} /> Skills
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageCircle size={18} /> Community
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShoppingCart size={18} /> Marketplace
            </a>
          </li>
          <li className="navbar-menu-item">
            <a href="#" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Briefcase size={18} /> Business
            </a>
          </li>
        </ul>
      </nav>
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#444', fontWeight: 500, fontSize: 16, textDecoration: 'none' }} aria-label="Sign In">
          <LogIn size={18} /> Sign In
        </a>
        <button className="navbar-join-btn" onClick={onJoinFree} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)', color: '#fff', border: 'none', borderRadius: 16, padding: '0.6em 1.4em', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(162,89,255,0.08)' }} aria-label="Join Free">
          <UserPlus size={18} /> Join <span style={{ fontWeight: 400 }}>Free</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar; 