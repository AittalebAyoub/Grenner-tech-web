import React, { useState, useEffect } from 'react';

// Fonction utilitaire pour extraire l'URL de l'image (non nécessaire ici car l'URL est absolue, mais bonne pratique)
// Cette fonction peut être mise dans un fichier utilitaire séparé si elle est utilisée ailleurs.
const getLogoUrl = (logoObject) => {
    // Dans votre cas, l'URL est directement sous logo.url et est absolue (https://...)
    return logoObject?.url || '/placeholder.jpg'; 
};

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupération de l'URL de base de l'API depuis les variables d'environnement
    const API_URL = process.env.REACT_APP_STRAPI_API_URL;
    const ENDPOINT = '/partenaires?populate=*';

    useEffect(() => {
        const fetchPartners = async () => {
            if (!API_URL) {
                setError("L'URL de l'API (REACT_APP_STRAPI_API_URL) n'est pas définie.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}${ENDPOINT}`);
                
                if (!response.ok) {
                    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // Extraction des données utiles du tableau 'data'
                const formattedPartners = data.data.map(item => ({
                    id: item.id,
                    name: item.nom,
                    logoUrl: getLogoUrl(item.logo), // Utilisation de l'URL absolue du logo
                    website: item.site_web,
                }));
                console.log("Nombre de partners reçus:", formattedPartners.length);
                setPartners(formattedPartners);

            } catch (err) {
                console.error("Erreur lors de la récupération des partenaires:", err);
                setError("Impossible de charger les partenaires. Veuillez vérifier l'API.");
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, [API_URL]); // S'exécute uniquement au montage du composant et si API_URL change

    // Gestion des états de chargement/erreur
    if (loading) {
        // Optionnel: peut retourner un simple squelette de chargement si vous le souhaitez
        return (
            <section className="partners">
                <div className="container">
                    <h2 className="partners-title">Nos Partenaires</h2>
                    <div style={{ textAlign: 'center' }}>Chargement des partenaires...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="partners">
                <div className="container">
                    <h2 className="partners-title">Nos Partenaires</h2>
                    <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
                </div>
            </section>
        );
    }
    
    // Si la liste est vide après le chargement réussi
    if (partners.length === 0) {
        return (
            <section className="partners">
                <div className="container">
                    <h2 className="partners-title">Nos Partenaires</h2>
                    <div style={{ textAlign: 'center' }}>Aucun partenaire trouvé pour le moment.</div>
                </div>
            </section>
        );
    }


    // Dupliquez les partenaires pour l'animation de défilement CSS infini (nécessite au moins un double)
    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="partners" id="partners">
            <div className="container">
                <h2 className="partners-title">Nos Partenaires</h2>
                
                <div className="partners-carousel-wrapper"> 
                    <div className="partners-grid">
                        {duplicatedPartners.map((partner, index) => (
                            <a 
                                key={index} 
                                href={partner.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="partner-logo"
                                title={`Visiter le site de ${partner.name}`}
                            >
                                {/* L'attribut src utilise l'URL récupérée de l'API */}
                                <img 
                                    src={partner.logoUrl} 
                                    alt={`Logo de ${partner.name}`} 
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