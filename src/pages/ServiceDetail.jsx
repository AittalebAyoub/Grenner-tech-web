import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 

// Import des composants (conservés tels quels)
import Header from '../components/Header';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import ServiceHero from '../components/ServiceHero';
import ServiceContent from '../components/ServiceContent';
import VideoComponent from '../components/VideoComponent';

// Récupération de la variable d'environnement pour l'URL de base
const API_BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

const ServiceDetail = () => {
  // Récupère l'ID (documentId) depuis l'URL (ex: /service/tfth9qcphjwx1k1aj63x86tj)
  const { id } = useParams();

  // 1. Définition des états
  const [service, setService] = useState(null); // Pour stocker les données du service
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook pour la requête API
  useEffect(() => {
    // Vérification de l'ID et de l'URL de base
    if (!id || !API_BASE_URL) {
      setError("ID de service ou URL de l'API manquant.");
      setIsLoading(false);
      return;
    }

    async function fetchServiceDetail() {
      try {
        // Construction de l'URL complète avec le documentId
        const endpoint = `${API_BASE_URL}/services/${id}?populate=*`;
        console.log("Tentative de requête vers :", endpoint);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}. Service non trouvé.`);
        }

        const jsonResponse = await response.json();
        
        // La donnée du service est dans jsonResponse.data
        setService(jsonResponse.data);

      } catch (err) {
        console.error("Erreur lors de la récupération du détail du service:", err);
        setError("Impossible de charger le détail de ce service.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchServiceDetail();
  }, [id]); // Dépendance à 'id': relance la requête si l'ID dans l'URL change

  // 3. Gestion des états d'affichage

  if (isLoading) {
    return (
      <div className="service-detail-page">
      
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Chargement du détail du service...</h2>
        </div>
       
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-detail-page">
        
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Erreur</h2>
          <p>{error}</p>
        </div>
       
      </div>
    );
  }

  // Si service est null après chargement (par exemple, si l'ID n'existe pas)
  if (!service) {
    return (
      <div className="service-detail-page">
        
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Service non trouvé</h2>
        </div>
      
      </div>
    );
  }

  // 4. Rendu final : Passe les données du service aux sous-composants
  return (
    <div className="service-detail-page">
     
      
      {/* Passe l'objet 'service' complet à ServiceHero */}
      <ServiceHero serviceData={service} /> 
      
      {/* Passe l'objet 'service' complet à ServiceContent */}
      <ServiceContent serviceData={service} />
      
      {/* Vous pouvez passer des données spécifiques si besoin, ex: la vidéo */}
      {service.video && <VideoComponent serviceData={service} />}
      
      <Contact />
      <Partners />
      
    </div>
  );
};

export default ServiceDetail;