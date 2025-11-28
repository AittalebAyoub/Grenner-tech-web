import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { locale } = useLanguage();

  const translations = {
    fr: {
      title: 'Cultiver l\'avenir,',
      titleHighlight: 'durablement.',
      subtitle: 'Nous développons les solutions qui vous aident à produire plus, avec moins de ressources. Optimisez chaque hectare de votre exploitation.',
      cta: 'Découvrez nos solutions'
    },
    en: {
      title: 'Cultivating the future,',
      titleHighlight: 'sustainably.',
      subtitle: 'We develop solutions that help you produce more with fewer resources. Optimize every hectare of your farm.',
      cta: 'Discover our solutions'
    },
    ar: {
      title: 'زراعة المستقبل،',
      titleHighlight: 'بشكل مستدام.',
      subtitle: 'نطور الحلول التي تساعدك على إنتاج المزيد بموارد أقل. قم بتحسين كل هكتار من استغلالك.',
      cta: 'اكتشف حلولنا'
    }
  };

  const t = translations[locale];

  return (
    <section className={`hero ${locale === 'ar' ? 'rtl' : ''}`} id="accueil">
      <div className="hero-overlay"></div>
      
      <div className="hero-circle-decoration"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          {t.title} <span className="hero-highlight">{t.titleHighlight}</span>
        </h1>
        
        <p className="hero-subtitle">
          {t.subtitle}
        </p>
        
        <a href="#solutions" className="hero-cta">{t.cta}</a>
      </div>
    </section>
  );
};

export default Hero;