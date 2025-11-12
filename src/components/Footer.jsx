import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Greenman</h3>
              <p>Cultivating a sustainable future for agriculture and the planet.</p>
              <div className="social-icons">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaInstagram /></a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Entreprise</h4>
              <ul>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Carrières</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Produits</h4>
              <ul>
                <li><a href="#">Solutions agricoles</a></li>
                <li><a href="#">Consulting</a></li>
                <li><a href="#">Formation</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@greenman.com</p>
              <p>Tél: +33 1 23 45 67 89</p>
              <p>Adresse: 123 rue de l'Agriculture<br/>75000 Paris, France</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 Greenman. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;