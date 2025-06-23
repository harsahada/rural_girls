import React from 'react';
import logo from './assets/react.svg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src={logo} alt="Logo" width="40" height="40" className="rounded-circle border border-2" />
          <span className="fw-bold" style={{background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>SheRise</span>
        </a>
        <button className="btn btn-light ms-3" title="Toggle theme">🌙</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">♡ Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">📖 E-Learning</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">🧑‍🤝‍🧑 Mentorship</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">🎯 Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">💬 Community</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">🛒 Marketplace</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">🎁 Business</a>
            </li>
          </ul>
          <button className="btn px-4 py-2 fw-semibold ms-lg-3 mt-2 mt-lg-0" style={{background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)', color: '#fff', borderRadius: '16px', border: 'none'}}>Join Free</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 