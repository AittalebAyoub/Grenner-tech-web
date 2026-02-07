import React, { useState } from 'react';
// ⚠️ Importer Link de react-router-dom pour la navigation interne
import { Link } from 'react-router-dom'; 
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
                            {/* Utiliser Link pour le logo qui mène à l'accueil */}
                            <Link to="/">
                                <img src="/Logo-h-white.svg" alt="Logo GrennerTech" />
                            </Link>
                        </div>
                        <p className="footer-description">
                            Nous croyons fermement que l'avenir de l'agriculture repose sur l'innovation et l'optimisation des ressources.
                        </p>
                    </div>

                    {/* Explore Column */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Explore</h4>
                        <ul className="footer-links">
                            {/* ⚠️ Remplacement des <a> par des <Link to="/#ancre"> pour naviguer vers l'accueil puis vers la section */}
                            <li><Link to="/#about">About</Link></li>
                            <li><Link to="/#solutions">Our Services</Link></li>
                            <li><Link to="/#blogs">Our Blogs</Link></li>
                            <li><Link to="/#partners">Our Partners</Link></li>
                            <li><Link to="/#contact">Contact US</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Contact</h4>
                        <div className="footer-contact-info">
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <span>+212 650 678 781</span>
                            </div>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <span>contact@greenertech.co</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>BUREAU A208 CITÉ DE L'INNOVATION SOUS MASSA OUD ZIZ AGADIR 80000, MAROC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; All Copyright 2025 by GreenerTech</p>
                        <div className="footer-bottom-links">
                            {/* Les liens de politique peuvent aussi être des liens d'ancre ou de route si vous les avez créés */}
                            <Link to="/#terms">Terms of Use</Link>
                            <span>|</span>
                            <Link to="/#privacy">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;