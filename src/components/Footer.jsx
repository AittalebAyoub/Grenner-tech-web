import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
    const { locale } = useLanguage();
    const [email, setEmail] = useState('');

    const translations = {
        fr: {
            description: 'Nous croyons fermement que l\'avenir de l\'agriculture repose sur l\'innovation et l\'optimisation des ressources.',
            explore: 'Explorer',
            about: 'À propos',
            services: 'Nos Services',
            blogs: 'Nos Blogs',
            partners: 'Nos Partenaires',
            contact: 'Contactez-nous',
            contactTitle: 'Contact',
            address: 'BUREAU A208 CITÉ DE L\'INNOVATION SOUS MASSA OUD ZIZ AGADIR 80000, MAROC',
            copyright: 'Tous droits réservés 2024 par GrennerTech',
            terms: 'Conditions d\'utilisation',
            privacy: 'Politique de confidentialité'
        },
        en: {
            description: 'We firmly believe that the future of agriculture relies on innovation and resource optimization.',
            explore: 'Explore',
            about: 'About',
            services: 'Our Services',
            blogs: 'Our Blogs',
            partners: 'Our Partners',
            contact: 'Contact Us',
            contactTitle: 'Contact',
            address: 'OFFICE A208 INNOVATION CITY UNDER MASSA OUD ZIZ AGADIR 80000, MOROCCO',
            copyright: 'All Copyright 2024 by GrennerTech',
            terms: 'Terms of Use',
            privacy: 'Privacy Policy'
        },
        ar: {
            description: 'نؤمن بشدة أن مستقبل الزراعة يعتمد على الابتكار وتحسين الموارد.',
            explore: 'استكشف',
            about: 'من نحن',
            services: 'خدماتنا',
            blogs: 'مدوناتنا',
            partners: 'شركاؤنا',
            contact: 'اتصل بنا',
            contactTitle: 'اتصال',
            address: 'مكتب A208 مدينة الابتكار تحت ماسة وادي زيز أكادير 80000، المغرب',
            copyright: 'جميع الحقوق محفوظة 2024 بواسطة جرينر تك',
            terms: 'شروط الاستخدام',
            privacy: 'سياسة الخصوصية'
        }
    };

    const t = translations[locale];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <footer className={`footer ${locale === 'ar' ? 'rtl' : ''}`}>
            <div className="container">
                <div className="footer-content">
                    {/* Left Section */}
                    <div className="footer-section footer-left">
                        <div className="footer-logo">
                            <Link to="/">
                                <img src="/Logo-h-white.png" alt="Logo GrennerTech" />
                            </Link>
                        </div>
                        <p className="footer-description">
                            {t.description}
                        </p>
                    </div>

                    {/* Explore Column */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">{t.explore}</h4>
                        <ul className="footer-links">
                            <li><Link to="/#about">{t.about}</Link></li>
                            <li><Link to="/#solutions">{t.services}</Link></li>
                            <li><Link to="/#blogs">{t.blogs}</Link></li>
                            <li><Link to="/#partners">{t.partners}</Link></li>
                            <li><Link to="/#contact">{t.contact}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">{t.contactTitle}</h4>
                        <div className="footer-contact-info">
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <span>+212 650 678 781</span>
                            </div>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <span>contact.greenertech@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>{t.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {t.copyright}</p>
                        <div className="footer-bottom-links">
                            <Link to="/#terms">{t.terms}</Link>
                            <span>|</span>
                            <Link to="/#privacy">{t.privacy}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;