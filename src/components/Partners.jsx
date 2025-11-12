import React from 'react';

const Partners = () => {
  const partners = [
    { name: 'WHEAT', logo: 'https://via.placeholder.com/150x60?text=WHEAT' },
    { name: 'agro', logo: 'https://via.placeholder.com/150x60?text=agro' },
    { name: 'Find', logo: 'https://via.placeholder.com/150x60?text=Find' },
    { name: 'Green Rices', logo: 'https://via.placeholder.com/150x60?text=Green+Rices' },
    { name: 'AGRIC', logo: 'https://via.placeholder.com/150x60?text=AGRIC' },
  ];

  return (
    <section className="partners">
      <div className="container">
        <h2 className="partners-title">Nos Partenaires</h2>
        
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;