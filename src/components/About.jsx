import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { locale } = useLanguage();

  const translations = {
    fr: {
      label: 'Qui sommes-nous ?',
      title: 'Votre partenaire de croissance sur le Terrain',
      description1: 'Greener Tech est une entreprise spécialisée en agriculture, dédiée à la recherche et au développement de solutions innovantes pour le secteur.',
      description2: 'Notre mission est d\'être votre partenaire sur le terrain, en combinant l\'expertise agronomique et la technologie de pointe pour des outils qui :',
      benefits: [
        'Assurent une agriculture durable et respectueuse de l\'écosystème.',
        'Améliorent la productivité et la qualité des récoltes.',
        'Garantissent une gestion optimale et économe des ressources hydriques.'
      ]
    },
    en: {
      label: 'About us',
      title: 'Your growth partner in the Field',
      description1: 'Greener Tech is a company specialized in agriculture, dedicated to research and development of innovative solutions for the sector.',
      description2: 'Our mission is to be your partner in the field, combining agronomic expertise and cutting-edge technology for tools that:',
      benefits: [
        'Ensure sustainable and ecosystem-friendly agriculture.',
        'Improve productivity and crop quality.',
        'Guarantee optimal and economical management of water resources.'
      ]
    },
    ar: {
      label: 'من نحن؟',
      title: 'شريكك في النمو على الأرض',
      description1: 'جرينر تك هي شركة متخصصة في الزراعة، مكرسة للبحث والتطوير في الحلول المبتكرة للقطاع.',
      description2: 'مهمتنا هي أن نكون شريكك في الميدان، من خلال الجمع بين الخبرة الزراعية والتكنولوجيا المتطورة لأدوات:',
      benefits: [
        'تضمن زراعة مستدامة ومحترمة للنظام البيئي.',
        'تحسن الإنتاجية وجودة المحاصيل.',
        'تضمن إدارة مثلى واقتصادية للموارد المائية.'
      ]
    }
  };

  const t = translations[locale];

  return (
    <section className={`about ${locale === 'ar' ? 'rtl' : ''}`} id="about">
      <div className="container">
        <div className="about-content">
          {/* Image Section */}
          <div className="about-image-wrapper">
            <img 
              src="/CONCEPT 2.png" 
              alt="Agriculture"
              className="about-image"
            />
          </div>

          {/* Text Section */}
          <div className="about-text">
            <span className="about-label">{t.label}</span>
            
            <h2 className="about-title">
              {t.title}
            </h2>
            
            <p className="about-description">
              {t.description1}
            </p>
            
            <p className="about-description">
              {t.description2}
            </p>

            {/* Benefits List */}
            <div className="about-benefits">
              {t.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;