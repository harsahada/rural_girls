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

const Navbar = ({ onJoinFree, onSignIn, onELearning, onHome, onMentorship, onSkills, onCommunity, onMarketplace, onBusiness, activePage }) => {
  const menuItems = [
    { label: 'Home', icon: <Heart size={18} />, onClick: onHome, key: 'home' },
    { label: 'E-Learning', icon: <BookOpen size={18} />, onClick: onELearning, key: 'elearning' },
    { label: 'Mentorship', icon: <Users size={18} />, onClick: onMentorship, key: 'mentorship' },
    { label: 'Skills', icon: <Target size={18} />, onClick: onSkills, key: 'skills' },
    { label: 'Community', icon: <MessageCircle size={18} />, onClick: onCommunity, key: 'community' },
    { label: 'Marketplace', icon: <ShoppingCart size={18} />, onClick: onMarketplace, key: 'marketplace' },
    { label: 'Business', icon: <Briefcase size={18} />, onClick: onBusiness, key: 'business' },
  ];
  return (
    <header className="navbar" role="banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'sticky', top: 0, zIndex: 100 ,backgroundColor:'#adda3f' }}>
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
          {menuItems.map(item => (
            <li
              key={item.key}
              className={`navbar-menu-item${activePage === item.key ? ' navbar-menu-item-active' : ''}`}
              style={activePage === item.key ? {
                background: 'linear-gradient(90deg, #a259ff 0%, #5d5fef 100%)',
                color: '#fff',
                borderRadius: 24,
                padding: '0.5em 1.6em',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(162,89,255,0.08)',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
              } : {}}
            >
              <a
                href="#"
                onClick={item.onClick}
                style={{
                  color: activePage === item.key ? '#fff' : '#444',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  transition: 'color 0.2s',
                }}
                aria-current={activePage === item.key ? 'page' : undefined}
              >
                {item.icon} {item.label}
            </a>
          </li>
          ))}
        </ul>
      </nav>
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="#" onClick={onSignIn} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#444', fontWeight: 500, fontSize: 16, textDecoration: 'none' }} aria-label="Sign In">
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