import React from 'react';
import {
  Globe,
  Heart,
  BookOpen,
  Users,
  Target,
  MessageCircle,
  ShoppingCart,
  Briefcase,
  UserPlus
} from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = ({ onJoinFree, onELearning, onHome, onMentorship, onSkills, onCommunity, onMarketplace, onBusiness, activePage }) => {
  const menuItems = [
    { label: 'Home', icon: <Heart size={16} />, onClick: onHome, key: 'home' },
    { label: 'E-Learning', icon: <BookOpen size={16} />, onClick: onELearning, key: 'elearning' },
    { label: 'Mentorship', icon: <Users size={16} />, onClick: onMentorship, key: 'mentorship' },
    { label: 'Skills', icon: <Target size={16} />, onClick: onSkills, key: 'skills' },
    { label: 'Community', icon: <MessageCircle size={16} />, onClick: onCommunity, key: 'community' },
    { label: 'Marketplace', icon: <ShoppingCart size={16} />, onClick: onMarketplace, key: 'marketplace' },
    { label: 'Business', icon: <Briefcase size={16} />, onClick: onBusiness, key: 'business' },
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        <div className="navbar-logo" aria-label="SheRise logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </div>
        <span className="navbar-brand">SheRise</span>
      </div>
      
      <nav aria-label="Main navigation" className="navbar-nav">
        <ul className="navbar-menu">
          {menuItems.map(item => (
            <li key={item.key}>
              <a
                href="#"
                onClick={item.onClick}
                className={`navbar-menu-item ${activePage === item.key ? 'active' : ''}`}
                aria-current={activePage === item.key ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
            </a>
          </li>
          ))}
        </ul>
      </nav>
      
      <div className="navbar-actions">
        <button className="navbar-join-btn" onClick={onJoinFree} aria-label="Join Free">
          <UserPlus size={16} />
          <span>Join Free</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar; 