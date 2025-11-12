import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Left Section */}
          <div className="footer-section footer-left">
          <div className="footer-logo">
              <img src="/Logo-h-white.png" alt="Logo GrennerTech" />
          </div>
            <p className="footer-description">
              There are many variations of passages of lorem ipsum available, but the majority suffered.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaPinterest /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="footer-section">
            <h4 className="footer-section-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#blogs">Our Blogs</a></li>
              <li><a href="#partners">Our Partners</a></li>
              <li><a href="#contact">Contact US</a></li>
            </ul>
          </div>

          {/* News Column */}
          <div className="footer-section">
            <h4 className="footer-section-title">News</h4>
            <div className="footer-news">
              <div className="news-item">
                <h5>Bringing Food Production Back To Cities</h5>
                <span className="news-date">July 5, 2022</span>
              </div>
              <div className="news-item">
                <h5>The Future of Farming, Smart Irrigation Solutions</h5>
                <span className="news-date">July 5, 2022</span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="footer-section">
            <h4 className="footer-section-title">Contact</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+66 888 0000</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>hello@panycompany.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>90 brooklyn golden street line New york, USA</span>
              </div>
            </div>

            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <FaEnvelope />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; All Copyright 2024 by GrennerTech</p>
            <div className="footer-bottom-links">
              <a href="#terms">Terms of Use</a>
              <span>|</span>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;