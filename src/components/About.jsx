import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  const benefits = [
    "Assurent une agriculture durable et respectueuse de l'écosystème.",
    'Améliorent la productivité et la qualité des récoltes.',
    'Garantissent une gestion optimale et économe des ressources hydriques.'
  ];

  return (
    <section className="about" id = "about">
      <div className="container">
        <div className="about-content">
          {/* Image Section */}
          <div className="about-image-wrapper">
            <img 
              src="/CONCEPT 2.png" 
              alt="Agriculture"
              className="about-image"
            />
          </div>

          {/* Text Section */}
          <div className="about-text">
            <span className="about-label">Qui sommes-nous ?</span>
            
            <h2 className="about-title">
              Votre partenaire de croissance sur le Terrain
            </h2>
            
            <p className="about-description">
              Greener Tech est une entreprise spécialisée en agriculture, dédiée à la recherche et au développement de solutions innovantes pour le secteur.
            </p>
            
            <p className="about-description">
Notre mission est d'être votre partenaire sur le terrain, en combinant l'expertise agronomique et la technologie de pointe pour des outils qui :            </p>
            {/* Benefits List */}
            <div className="about-benefits">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;