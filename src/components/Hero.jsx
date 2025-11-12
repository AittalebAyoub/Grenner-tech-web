import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      
      <div className="hero-circle-decoration"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Cultiver l'avenir, <span className="hero-highlight">durablement.</span>
        </h1>
        
        <p className="hero-subtitle">
          Nous développons les solutions qui vous aident à produire plus, avec moins de ressources. 
          Optimisez chaque hectare de votre exploitation.
        </p>
        
        <button className="hero-cta">
          Découvrez nos solutions
        </button>
      </div>
    </section>
  );
};

export default Hero;