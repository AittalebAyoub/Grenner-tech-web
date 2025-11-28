import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

const Services = () => {
  const { locale } = useLanguage();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const translations = {
    fr: {
      label: 'Nos solutions',
      title: 'Ce que nous offrons',
      loading: 'Chargement des solutions...',
      error: 'Impossible de charger les services. Veuillez vérifier l\'API.'
    },
    en: {
      label: 'Our solutions',
      title: 'What we offer',
      loading: 'Loading solutions...',
      error: 'Unable to load services. Please check the API.'
    },
    ar: {
      label: 'حلولنا',
      title: 'ما نقدمه',
      loading: 'جاري تحميل الحلول...',
      error: 'تعذر تحميل الخدمات. يرجى التحقق من API.'
    }
  };

  const t = translations[locale];

  useEffect(() => {
    async function fetchServices() {
      try {
        // Ajouter le paramètre locale à l'API
        const response = await fetch(`${API_BASE_URL}/services?populate=*&locale=${locale}`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setServices(jsonResponse.data);
      } catch (err) {
        console.error("Erreur de récupération des services:", err);
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, [locale]); // Recharger quand la langue change

  if (isLoading) {
    return (
      <section className={`services ${locale === 'ar' ? 'rtl' : ''}`} id="solutions">
        <div className="container">
          <p>{t.loading}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`services ${locale === 'ar' ? 'rtl' : ''}`} id="solutions">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`services ${locale === 'ar' ? 'rtl' : ''}`} id="solutions">
      <div className="container">
        <div className="services-header">
          <span className="services-label">{t.label}</span>
          <h2 className="services-title">{t.title}</h2>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <Link 
              key={service.id} 
              to={`/service/${service.documentId}`}
              className="service-card-link"
            >
              <div className="service-card">
                <div className="service-image">
                  <img 
                    src={service.image_cover ? service.image_cover.url : '/placeholder.jpg'} 
                    alt={service.titre} 
                  />
                </div>
                
                <div className="service-body">
                  <h3 className="service-title">
                    {service.titre}
                    <FaArrowRight className="service-arrow" />
                  </h3>
                  
                  <p className="service-description">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;