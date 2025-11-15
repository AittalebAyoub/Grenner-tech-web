import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Définir l'URL de base de l'API Strapi.
const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;
const BLOG_API_ENDPOINT = `${API_BASE_URL}/blogs?populate=*`;

const Articles = () => {
    // ... (Définition des états et fonctions formatDate, useEffect restent identiques) ...
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const itemsPerPage = 3; 

    const formatDate = (dateString) => {
        if (!dateString) return 'Date inconnue';
        try {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
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
    }, []); 

    // --- LOGIQUE DU CARROUSEL ---
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


    // --- 4. Rendu des états de chargement et d'erreur ---
    if (isLoading || error || totalArticles === 0) {
        // Rendu simplifié pour ne pas répéter les blocs de code précédents
        return (
            <section className="blog">
                <div className="container">
                    {isLoading && <p>Chargement des articles...</p>}
                    {error && <div className="error-box"><h2 className="error-title">Erreur</h2><p className="error-message">{error}</p></div>}
                    {!isLoading && !error && totalArticles === 0 && <p>Aucun article de blog n'est disponible pour le moment.</p>}
                </div>
            </section>
        );
    }


    // --- 5. Rendu principal ---
    return (
        <section className="blog"  id = "blogs">
            <div className="container">
                <div className="blog-header">
                    <span className="blog-label">Nos blogs</span>
                    <h2 className="blog-title">Actualités et articles</h2>
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
                            
                            const attr = article ;
                            
                            if (!attr) return null;

                            const keyId = article.id;
                            const slug =  attr.documentId 

                            
                            // 1. image_coverture est un ARRAY, nous prenons le premier élément (l'objet image)
                            const imageObject = attr.image_coverture && attr.image_coverture[0]; 
                            
                            // 2. Nous accédons directement à l'URL de l'objet image
                            const imageUrl = imageObject?.url || '/placeholder.jpg';

                            // 3. Si l'URL est relative, on ajoute l'API_BASE_URL (mais ici, elle est absolue)
                            const finalImageUrl = imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`;
                            
                            // **********************************************

                            return (
                                <Link 
                                    key={keyId} 
                                    to={`/blog/${slug}`} 
                                    className="blog-card-link"
                                >
                                    <div className="blog-card">
                                        <div className="blog-image-wrapper">
                                            <img 
                                                src={finalImageUrl} // Utilisation de finalImageUrl
                                                alt={attr.titre} 
                                            />
                                            <span className="blog-date-badge">
                                                {formatDate(attr.date_publication)}
                                            </span>
                                        </div>

                                        <div className="blog-card-content">
                                            <div className="blog-meta">
                                                <span className="blog-author">
                                                    <FaUser /> {attr.auteur || 'Inconnu'}
                                                </span>
                                                <span className="blog-read-time">
                                                    <FaClock /> {attr.temps_lecture} min de lecture
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
                    <Link to="/blogs" className="blog-view-all">Voir tous les articles</Link>
                </div>
            </div>
        </section>
    );
};

export default Articles;