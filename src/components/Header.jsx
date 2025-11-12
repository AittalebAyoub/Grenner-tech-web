import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="header-topbar">
        <div className="container">
          <div className="topbar-content">
            <div className="topbar-info">
              <span className="info-item">
                <FaMapMarkerAlt className="icon" />
                365 Business Center Brooklyn New York
              </span>
              <span className="info-divider">|</span>
              <span className="info-item">
                <FaEnvelope className="icon" />
                support@greenman.com
              </span>
            </div>
            <div className="topbar-social">
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <img src="/Logo-GT.png" alt="Greenman" />
            </div>

            {/* Navigation */}
            <nav className={`nav ${menuOpen ? 'active' : ''}`}>
              <a href="#accueil">Accueil</a>
              <a href="#about">Qui sommes-nous ?</a>
              <a href="#solutions">Nos solutions</a>
              <a href="#blogs">Nos blogs</a>
              <a href="#contact">Contactez-nous</a>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <button className="search-btn">
                <FaSearch />
              </button>
              <button 
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;