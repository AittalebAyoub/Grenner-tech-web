import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

// Fonction utilitaire pour extraire l'URL de l'image
const getLogoUrl = (logoObject) => {
    return logoObject?.url || '/placeholder.jpg'; 
};

const Partners = () => {
    const { locale } = useLanguage();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const translations = {
        fr: {
            title: 'Nos Partenaires',
            loading: 'Chargement des partenaires...',
            error: 'Impossible de charger les partenaires. Veuillez vérifier l\'API.',
            empty: 'Aucun partenaire trouvé pour le moment.',
            visitSite: 'Visiter le site de'
        },
        en: {
            title: 'Our Partners',
            loading: 'Loading partners...',
            error: 'Unable to load partners. Please check the API.',
            empty: 'No partners found at the moment.',
            visitSite: 'Visit the website of'
        },
        ar: {
            title: 'شركاؤنا',
            loading: 'جاري تحميل الشركاء...',
            error: 'تعذر تحميل الشركاء. يرجى التحقق من API.',
            empty: 'لم يتم العثور على شركاء في الوقت الحالي.',
            visitSite: 'زيارة موقع'
        }
    };

    const t = translations[locale];

    useEffect(() => {
        const fetchPartners = async () => {
            if (!API_BASE_URL) {
                setError(t.error);
                setLoading(false);
                return;
            }

            try {
                // Ajouter le paramètre locale à l'API
                const response = await fetch(`${API_BASE_URL}/partenaires?populate=*&locale=${locale}`);
                
                if (!response.ok) {
                    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // Extraction des données utiles du tableau 'data'
                const formattedPartners = data.data.map(item => ({
                    id: item.id,
                    name: item.nom,
                    logoUrl: getLogoUrl(item.logo),
                    website: item.site_web,
                }));

                setPartners(formattedPartners);

            } catch (err) {
                console.error("Erreur lors de la récupération des partenaires:", err);
                setError(t.error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, [API_BASE_URL, locale]); // Recharger quand la langue change

    // Gestion des états de chargement/erreur
    if (loading) {
        return (
            <section className={`partners ${locale === 'ar' ? 'rtl' : ''}`}>
                <div className="container">
                    <h2 className="partners-title">{t.title}</h2>
                    <div style={{ textAlign: 'center' }}>{t.loading}</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={`partners ${locale === 'ar' ? 'rtl' : ''}`}>
                <div className="container">
                    <h2 className="partners-title">{t.title}</h2>
                    <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
                </div>
            </section>
        );
    }
    
    // Si la liste est vide après le chargement réussi
    if (partners.length === 0) {
        return (
            <section className={`partners ${locale === 'ar' ? 'rtl' : ''}`}>
                <div className="container">
                    <h2 className="partners-title">{t.title}</h2>
                    <div style={{ textAlign: 'center' }}>{t.empty}</div>
                </div>
            </section>
        );
    }

    // Dupliquez les partenaires pour l'animation de défilement CSS infini
    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className={`partners ${locale === 'ar' ? 'rtl' : ''}`} id="partners">
            <div className="container">
                <h2 className="partners-title">{t.title}</h2>
                
                <div className="partners-carousel-wrapper"> 
                    <div className="partners-grid">
                        {duplicatedPartners.map((partner, index) => (
                            <a 
                                key={index} 
                                href={partner.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="partner-logo"
                                title={`${t.visitSite} ${partner.name}`}
                            >
                                <img 
                                    src={partner.logoUrl} 
                                    alt={`Logo ${partner.name}`} 
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;