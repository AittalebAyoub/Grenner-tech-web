import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaMapMarkerAlt, FaEnvelope, FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { locale, changeLanguage } = useLanguage();

    // Traductions pour le header
    const translations = {
        fr: {
            home: 'Accueil',
            about: 'Qui sommes-nous ?',
            solutions: 'Nos solutions',
            blogs: 'Nos blogs',
            contact: 'Contactez-nous',
            address: 'Bureau A208 cité de l\'innovation sous massa oud ziz agadir 80000, maroc'
        },
        en: {
            home: 'Home',
            about: 'About us',
            solutions: 'Our solutions',
            blogs: 'Our blogs',
            contact: 'Contact us',
            address: 'Office A208 innovation city under massa oud ziz agadir 80000, morocco'
        },
        ar: {
            home: 'الرئيسية',
            about: 'من نحن؟',
            solutions: 'حلولنا',
            blogs: 'مدوناتنا',
            contact: 'اتصل بنا',
            address: 'مكتب A208 مدينة الابتكار تحت ماسة وادي زيز أكادير 80000، المغرب'
        }
    };

    const t = translations[locale];

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const handleLanguageChange = (newLocale) => {
        changeLanguage(newLocale);
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
                                {t.address}
                            </span>
                            <span className="info-divider">|</span>
                            <span className="info-item">
                                <FaEnvelope className="icon" />
                                contact.grennertech@gmail.com
                            </span>
                        </div>
                        
                        {/* Sélecteur de langue */}
                        <div className="language-selector">
                            <FaGlobe className="icon" />
                            <select 
                                value={locale} 
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="language-dropdown"
                            >
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <Link to="/" onClick={handleLinkClick}>
                                <img src="/Logo-GT.png" alt="Greenman" />
                            </Link>
                        </div>

                        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                            <Link to="/#accueil" onClick={handleLinkClick}>{t.home}</Link>
                            <Link to="/#about" onClick={handleLinkClick}>{t.about}</Link>
                            <Link to="#solutions" onClick={handleLinkClick}>{t.solutions}</Link>
                            <Link to="/#blogs" onClick={handleLinkClick}>{t.blogs}</Link>
                            <Link to="/#contact" onClick={handleLinkClick}>{t.contact}</Link>
                        </nav>

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