import React from 'react';
import { FaCheck, FaTwitter } from 'react-icons/fa';

const ServiceContent = ({ serviceId }) => {
  // Données avec 3 images
  const servicesContentData = {
    1: {
      title: 'Agriculture Products',
      mainImage: '/ficelle.jpg',
      secondaryImage1: '/sol.png',
      secondaryImage2: '/recolte.jpg',
      description: 'Neque porro est dolorem ipsum quasi quod inventore veritatem et quasi architecto beatae vitae dicta sunt explicabile. Aeithet pori locu quis enim ue sed efficitur lapos qua sed sit amet finibus eros.',
      quote: 'Biophilia is the idea that humans possess an innate tendency to seek connections with nature. The term translates When an unhonored primer took a galiey of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      additionalText: 'Neque porro est dolorem ipsum quasi quod inventore veritatem et quasi architecto beatae vitae dicta sunt explicabile. Aetiles pori locu quis enim ue sed efficitur lapos qua sed sit amet finibus eros.',
      stats: [
        { label: 'Compostable', value: '100 %', color: '#4BAF47' },
        { label: 'de temps', value: '-80%', color: '#FFB800' },
        { label: 'Compostable', value: '100 %', color: '#4BAF47' }
      ],
      benefits: [
        {
          title: 'Zéro Plastique',
          description: '100% naturala et compostable. La ferme peut être laissée du sol pour être régalé du être où ultimates directement avec les résidus végétaux.'
        },
        {
          title: 'Naturel et Biodégradable',
          description: '100% naturala et compostable. La ferme peut être laissée du sol pour être régalé du être où ultimates directement avec les résidus végétaux.'
        }
      ]
    },
    2: {
      title: 'Sustainable Farming',
      mainImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
      secondaryImage1: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=400&h=250&fit=crop',
      secondaryImage2: 'https://images.unsplash.com/photo-1500382017468-f049863256f0?w=400&h=250&fit=crop',
      description: 'Découvrez nos solutions durables pour l\'agriculture moderne. Nous nous engageons à fournir des produits respectueux de l\'environnement.',
      quote: 'La durabilité n\'est pas seulement une tendance, c\'est une nécessité. Ensemble, nous pouvons créer un avenir meilleur pour les générations futures.',
      additionalText: 'Nos méthodes de culture durable réduisent l\'impact environnemental tout en maintenant une productivité élevée.',
      stats: [
        { label: 'Économies d\'eau', value: '50 %', color: '#4BAF47' },
        { label: 'Réduction CO2', value: '-60%', color: '#FFB800' },
        { label: 'Rendement', value: '95 %', color: '#4BAF47' }
      ],
      benefits: [
        {
          title: 'Efficacité Énergétique',
          description: 'Réduisez votre consommation énergétique de 50% avec nos technologies innovantes.'
        },
        {
          title: 'Protection de l\'Environnement',
          description: 'Préservez les ressources naturelles pour les générations futures avec nos pratiques durables.'
        }
      ]
    },
    3: {
      title: 'Smart Irrigation',
      mainImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=600&h=400&fit=crop',
      secondaryImage1: 'https://images.unsplash.com/photo-1500382017468-f049863256f0?w=400&h=250&fit=crop',
      secondaryImage2: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop',
      description: 'L\'irrigation intelligente au service de votre exploitation. Optimisez votre consommation d\'eau et augmentez vos rendements.',
      quote: 'L\'eau est notre ressource la plus précieuse. Avec notre système d\'irrigation intelligente, vous économisez de l\'eau tout en augmentant vos récoltes.',
      additionalText: 'Notre technologie IoT vous permet de contrôler votre irrigation en temps réel depuis votre téléphone.',
      stats: [
        { label: 'Économies d\'eau', value: '70 %', color: '#4BAF47' },
        { label: 'Réduction des coûts', value: '-45%', color: '#FFB800' },
        { label: 'Augmentation rendement', value: '40 %', color: '#4BAF47' }
      ],
      benefits: [
        {
          title: 'Contrôle à Distance',
          description: 'Gérez votre système d\'irrigation via une application mobile intuitive et pratique.'
        },
        {
          title: 'Économies Substantielles',
          description: 'Réduisez votre consommation d\'eau et vos coûts d\'exploitation grâce à l\'IA et aux capteurs.'
        }
      ]
    }
  };

  const content = servicesContentData[serviceId] || servicesContentData[1];

  return (
    <section className="service-content">
      <div className="container">
        <div className="service-content-wrapper">
          {/* Image - Full Width */}
{/* Section d'images - 1 Gauche, 2 Droite */}
<div className="service-images-section">
  {/* Image Principale à Gauche */}
  <div className="service-image-left">
    <img 
      src={content.mainImage}
      alt={`${content.title} - Main Image`}
    />
  </div>

  {/* Images Secondaires à Droite */}
  <div className="service-images-right">
    {/* Première Image Secondaire */}
    <div className="service-image-right">
      <img 
        src={content.secondaryImage1}
        alt={`${content.title} - Secondary Image 1`}
      />
    </div>
    {/* Deuxième Image Secondaire */}
    <div className="service-image-right">
      <img 
        src={content.secondaryImage2}
        alt={`${content.title} - Secondary Image 2`}
      />
    </div>
  </div>
</div>

          {/* Content + Stats Layout */}
          <div className="service-content-with-stats">
            {/* Left Side - Text Content (70%) */}
            <div className="service-content-left">
              <h2 className="service-content-title">{content.title}</h2>
              
              <p className="service-content-description">
                {content.description}
              </p>

              <div className="service-content-quote">
                <p>
                  <strong>{content.quote.split('. ')[0]}.</strong> {content.quote.split('. ').slice(1).join('. ')}
                </p>
              </div>

              <p className="service-content-description">
                {content.additionalText}
              </p>
            </div>

            {/* Right Side - Stats Vertical (30%) */}
            <div className="service-content-right">
              <div className="service-stats">
                {content.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-bar-top" style={{ backgroundColor: stat.color }}></div>
                    <div className="stat-header">
                      <FaTwitter className="stat-icon" />
                      <div className="stat-content">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits - Full Width */}
          <div className="service-benefits">
            <h3 className="benefits-title">Bénéfices</h3>
            
            {content.benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <FaCheck className="benefit-check" />
                <div className="benefit-content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;