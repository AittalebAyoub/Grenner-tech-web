import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ServiceHero = ({ serviceData }) => {
  const { locale } = useLanguage();
  
  const translations = {
    fr: {
      home: 'Accueil',
      solutions: 'Nos Solutions'
    },
    en: {
      home: 'Home',
      solutions: 'Our Solutions'
    },
    ar: {
      home: 'الرئيسية',
      solutions: 'حلولنا'
    }
  };

  const t = translations[locale];
  const title = serviceData?.titre || t.solutions;
  
  return (
    <section className={`service-hero ${locale === 'ar' ? 'rtl' : ''}`}>
      <div className="service-hero-overlay"></div> 
      
      <div className="service-hero-content">
        <div className="service-breadcrumb">
          <Link to="/">{t.home}</Link>
          <FaChevronRight className="breadcrumb-icon" />
          <Link to="/#solutions">{t.solutions}</Link> 
        </div>
        
        <h1 className="service-hero-title">{title}</h1>
      </div>
    </section>
  );
};

export default ServiceHero;