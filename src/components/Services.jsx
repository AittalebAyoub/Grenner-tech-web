import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

// Définir l'URL de base de l'API Strapi
const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;
const Services = () => {
  // 1. Définition des états pour les données, le chargement et les erreurs
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect pour lancer la requête API au montage du composant
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch(`${API_BASE_URL}/services?populate=*`);
        
        // Vérification de la réponse HTTP
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const jsonResponse = await response.json();
        
        // La liste des services se trouve dans le champ 'data' de la réponse
        setServices(jsonResponse.data);
      } catch (err) {
        // Gérer les erreurs (ex: problème de réseau, CORS, mauvaise URL)
        console.error("Erreur de récupération des services:", err);
        setError("Impossible de charger les services. Veuillez vérifier l'API.");
      } finally {
        // Mettre fin à l'état de chargement
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []); // [] = s'exécute seulement une fois (au montage)

  // 3. Affichage des états de chargement et d'erreur
  if (isLoading) {
    return (
      <section className="services">
        <div className="container">
          <p>Chargement des solutions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="services">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  // 4. Rendu des services une fois chargés
  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <span className="services-label">Nos solutions</span>
          <h2 className="services-title">Ce que nous offrons</h2>
        </div>

        <div className="services-grid">
          {services.map(service => (
            // Utiliser service.id et service.slug (si vous voulez une URL propre)
            <Link 
              key={service.id} 
              to={`/service/${service.documentId}`} // Utilisation du slug pour une URL plus propre
              className="service-card-link"
            >
              <div className="service-card">
                <div className="service-image">
                  {/* ACCÈS AUX DONNÉES DE STRAPI */}
                  <img 
                    // Chemin d'accès: service.image_cover.url
                    src={service.image_cover ? service.image_cover.url : '/placeholder.jpg'} 
                    alt={service.titre} 
                  />
                </div>
                
                <div className="service-body">
                  <h3 className="service-title">
                    {/* service.titre */}
                    {service.titre}
                    <FaArrowRight className="service-arrow" />
                  </h3>
                  
                  <p className="service-description">
                    {/* service.description */}
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