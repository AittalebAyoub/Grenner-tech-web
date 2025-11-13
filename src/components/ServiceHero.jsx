import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const ServiceHero = ({ serviceData }) => {
  
  const title = serviceData?.titre || 'Détail du Service';
  const breadcrumbLabel = serviceData?.titre || 'Service'; 
  
  // NOTE : Nous avons retiré la logique d'URL statique et la prop 'style' JSX
  // C'EST VOTRE CSS QUI GÈRE LE BACKGROUND MAINTENANT :
  // .service-hero { background: linear-gradient(..., url('/public/Serre.jpg') ...); }
  
  return (
    <section 
      className="service-hero"
      // ⭐️ ATTENTION : L'attribut 'style' a été retiré ici !
    >
      {/* L'overlay doit rester pour assombrir le background */}
      <div className="service-hero-overlay"></div> 
      
      <div className="service-hero-content">
        <div className="service-breadcrumb">
          <Link to="/">Accueil</Link>
          <FaChevronRight className="breadcrumb-icon" />
          
          <Link to="/#services">Nos Solutions</Link> 
          
        </div>
        
        {/* Titre dynamique conservé */}
        <h1 className="service-hero-title">{title}</h1>
      </div>
    </section>
  );
};

export default ServiceHero;