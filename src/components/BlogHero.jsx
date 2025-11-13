import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const ServiceHero = ({ title="The Future of Farming, Smart Irrigation Solutions", breadcrumbLabel = "NOS BLOGS" }) => {
  return (
    <section className="service-hero">
      <div className="service-hero-overlay"></div>
      
      <div className="service-hero-content">
        <div className="service-breadcrumb">
          <Link to="/">Acceuil</Link>
          <FaChevronRight className="breadcrumb-icon" />
          <span>{breadcrumbLabel}</span>
        </div>
        
        <h1 className="service-hero-title">{title}</h1>
      </div>
    </section>
  );
};

export default ServiceHero;