import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const About = () => {
  const benefits = [
    'Suspe ndisse suscept sagittis leo',
    'Etium estibulum dignissim posuere',
    'Lorem ipsum on the tend to repeat'
  ];

  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          {/* Image Section */}
          <div className="about-image-wrapper">
            <img 
              src="/about-gt.png" 
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
              There are many variations of passaa of lorem available, but the majority have suffered alteration.
            </p>
            
            <p className="about-description">
              There are many variations of passages of lorem available but the majority have suffered alteration in some form by injected humor or random word which don't look even.
            </p>

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