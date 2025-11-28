import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

const Articles = () => {
    const { locale } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const itemsPerPage = 3;

    const translations = {
        fr: {
            label: 'Nos blogs',
            title: 'Actualités et articles',
            loading: 'Chargement des articles...',
            noArticles: 'Aucun article de blog n\'est disponible pour le moment.',
            viewAll: 'Voir tous les articles',
            errorTitle: 'Erreur',
            readTime: 'min de lecture',
            author: 'Inconnu'
        },
        en: {
            label: 'Our blogs',
            title: 'News and articles',
            loading: 'Loading articles...',
            noArticles: 'No blog articles are available at the moment.',
            viewAll: 'View all articles',
            errorTitle: 'Error',
            readTime: 'min read',
            author: 'Unknown'
        },
        ar: {
            label: 'مدوناتنا',
            title: 'الأخبار والمقالات',
            loading: 'جاري تحميل المقالات...',
            noArticles: 'لا توجد مقالات متاحة في الوقت الحالي.',
            viewAll: 'عرض جميع المقالات',
            errorTitle: 'خطأ',
            readTime: 'دقيقة قراءة',
            author: 'غير معروف'
        }
    };

    const t = translations[locale];

    const formatDate = (dateString) => {
        if (!dateString) return t.loading;
        try {
            const localeMap = {
                fr: 'fr-FR',
                en: 'en-US',
                ar: 'ar-MA'
            };
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Date(dateString).toLocaleDateString(localeMap[locale], options);
        } catch (e) {
             return 'Date invalide';
        }
    };

    useEffect(() => {
        if (!API_BASE_URL) {
            setError("Erreur de configuration: REACT_APP_STRAPI_API_URL n'est pas défini.");
            setIsLoading(false);
            return;
        }

        async function fetchBlogs() {
            try {
                // Ajouter le paramètre locale à l'API
                const BLOG_API_ENDPOINT = `${API_BASE_URL}/blogs?populate=*&locale=${locale}`;
                const response = await fetch(BLOG_API_ENDPOINT);
                
                if (!response.ok) {
                    const statusText = response.statusText || 'Erreur inconnue';
                    throw new Error(`Erreur HTTP ${response.status} (${statusText}). 
                                    Vérifiez l'URL de l'API et les permissions Strapi.`);
                }

                const jsonResponse = await response.json();
                
                if (jsonResponse.data) {
                    setArticles(jsonResponse.data);
                } else {
                    setArticles([]);
                }
            } catch (err) {
                console.error("Erreur de récupération des articles:", err);
                setError(err.message || "Impossible de charger les articles. Problème de réseau/CORS.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchBlogs();
    }, [locale]); // Recharger quand la langue change

    const totalArticles = articles.length;
    const maxIndex = totalArticles > itemsPerPage ? totalArticles - itemsPerPage : 0; 
    
    const visibleArticles = articles.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            return newIndex < 0 ? maxIndex : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            return newIndex > maxIndex ? 0 : newIndex;
        });
    };

    if (isLoading || error || totalArticles === 0) {
        return (
            <section className={`blog ${locale === 'ar' ? 'rtl' : ''}`} id="blogs">
                <div className="container">
                    {isLoading && <p>{t.loading}</p>}
                    {error && (
                        <div className="error-box">
                            <h2 className="error-title">{t.errorTitle}</h2>
                            <p className="error-message">{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && totalArticles === 0 && <p>{t.noArticles}</p>}
                </div>
            </section>
        );
    }

    return (
        <section className={`blog ${locale === 'ar' ? 'rtl' : ''}`} id="blogs">
            <div className="container">
                <div className="blog-header">
                    <span className="blog-label">{t.label}</span>
                    <h2 className="blog-title">{t.title}</h2>
                </div>

                <div className="blog-carousel-wrapper">
                    {totalArticles > itemsPerPage && (
                        <>
                            <button className="carousel-arrow prev-arrow" onClick={handlePrev}>
                                <FaChevronLeft />
                            </button>
                            <button className="carousel-arrow next-arrow" onClick={handleNext}>
                                <FaChevronRight />
                            </button>
                        </>
                    )}

                    <div className="blog-grid">
                        {visibleArticles.map((article) => {
                            const attr = article;
                            if (!attr) return null;

                            const keyId = article.id;
                            const slug = attr.documentId;
                            
                            const imageObject = attr.image_coverture && attr.image_coverture[0]; 
                            const imageUrl = imageObject?.url || '/placeholder.jpg';
                            const finalImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`;

                            return (
                                <Link 
                                    key={keyId} 
                                    to={`/blog/${slug}`} 
                                    className="blog-card-link"
                                >
                                    <div className="blog-card">
                                        <div className="blog-image-wrapper">
                                            <img 
                                                src={finalImageUrl}
                                                alt={attr.titre} 
                                            />
                                            <span className="blog-date-badge">
                                                {formatDate(attr.date_publication)}
                                            </span>
                                        </div>

                                        <div className="blog-card-content">
                                            <div className="blog-meta">
                                                <span className="blog-author">
                                                    <FaUser /> {attr.auteur || t.author}
                                                </span>
                                                <span className="blog-read-time">
                                                    <FaClock /> {attr.temps_lecture} {t.readTime}
                                                </span>
                                            </div>

                                            <h3 className="blog-article-title">{attr.titre}</h3>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="blog-footer">
                    <Link to="/blogs" className="blog-view-all">{t.viewAll}</Link>
                </div>
            </div>
        </section>
    );
};

export default Articles;