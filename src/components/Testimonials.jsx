import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      title: 'Bringing Food Production Back To Cities',
      image: '/irigation.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
    },
    {
      id: 2,
      title: 'The Future of Farming: Smart Irrigation Solutions',
      image: '/malade.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
    },
    {
      id: 3,
      title: 'Agronomy and Relation to Other Sciences',
      image: '/sol.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>Actualités et articles</h2>
        
        <div className="carousel">
          <div className="carousel-content">
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button onClick={prevSlide} className="carousel-btn">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="carousel-btn">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <button className="cta-button-secondary">Voir tous les articles</button>
      </div>
    </section>
  );
};

export default Testimonials;