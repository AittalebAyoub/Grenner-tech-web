import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

import Partners from '../components/Partners';
import Contact from '../components/Contact';
import ServiceHero from '../components/ServiceHero';
import ServiceContent from '../components/ServiceContent';
import VideoComponent from '../components/VideoComponent';

const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

const ServiceDetail = () => {
  const { id } = useParams();
  const { locale } = useLanguage();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const translations = {
    fr: {
      loading: 'Chargement du détail du service...',
      error: 'Impossible de charger le détail de ce service.',
      notFound: 'Service non trouvé',
      missingId: 'ID de service ou URL de l\'API manquant.'
    },
    en: {
      loading: 'Loading service details...',
      error: 'Unable to load service details.',
      notFound: 'Service not found',
      missingId: 'Service ID or API URL missing.'
    },
    ar: {
      loading: 'جاري تحميل تفاصيل الخدمة...',
      error: 'تعذر تحميل تفاصيل الخدمة.',
      notFound: 'الخدمة غير موجودة',
      missingId: 'معرف الخدمة أو عنوان URL الخاص بـ API مفقود.'
    }
  };

  const t = translations[locale];

  useEffect(() => {
    if (!id || !API_BASE_URL) {
      setError(t.missingId);
      setIsLoading(false);
      return;
    }

    async function fetchServiceDetail() {
      try {
        // Ajouter le paramètre locale à l'API
        const endpoint = `${API_BASE_URL}/services/${id}?populate=*&locale=${locale}`;
        console.log("Tentative de requête vers :", endpoint);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}. Service non trouvé.`);
        }

        const jsonResponse = await response.json();
        setService(jsonResponse.data);

      } catch (err) {
        console.error("Erreur lors de la récupération du détail du service:", err);
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServiceDetail();
  }, [id, locale]); // Recharger quand la langue change

  if (isLoading) {
    return (
      <div className={`service-detail-page ${locale === 'ar' ? 'rtl' : ''}`}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>{t.loading}</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`service-detail-page ${locale === 'ar' ? 'rtl' : ''}`}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>{translations[locale].error}</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className={`service-detail-page ${locale === 'ar' ? 'rtl' : ''}`}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>{t.notFound}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`service-detail-page ${locale === 'ar' ? 'rtl' : ''}`}>
      <ServiceHero serviceData={service} /> 
      <ServiceContent serviceData={service} />
      {service.video && <VideoComponent serviceData={service} />}
      <Contact />
      <Partners />
    </div>
  );
};

export default ServiceDetail;