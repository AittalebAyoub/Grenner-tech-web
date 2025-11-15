import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaMapMarkerAlt, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Fonction pour fermer le menu mobile lors d'un clic sur un lien
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            {/* Top Bar */}
            <div className="header-topbar">
                <div className="container">
                    <div className="topbar-content">
                        <div className="topbar-info">
                            <span className="info-item">
                                <FaMapMarkerAlt className="icon" />
                                Bureau A208 cité de l'innovation sous massa oud ziz agadir 80000, maroc
                            </span>
                            <span className="info-divider">|</span>
                            <span className="info-item">
                                <FaEnvelope className="icon" />
                                contact.grennertech@gmail.com
                            </span>
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
                            {/* Utiliser Link pour naviguer vers la page d'accueil en cliquant sur le logo */}
                            <Link to="/" onClick={handleLinkClick}>
                                <img src="/Logo-GT.png" alt="Greenman" />
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                            {/* Utilisation de Link pour naviguer vers la page d'accueil (/) puis vers l'ancre (#section) */}
                            <Link to="/#accueil" onClick={handleLinkClick}>Accueil</Link>
                            <Link to="/#about" onClick={handleLinkClick}>Qui sommes-nous ?</Link>
                            <Link to="#solutions" onClick={handleLinkClick}>Nos solutions</Link>
                            <Link to="/#blogs" onClick={handleLinkClick}>Nos blogs</Link>
                            <Link to="/#contact" onClick={handleLinkClick}>Contactez-nous</Link>
                        </nav>

                        {/* Actions */}
                        <div className="header-actions">
                            <button 
                                className="menu-toggle"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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