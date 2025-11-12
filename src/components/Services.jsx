import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: '/ficelle.jpg'
    },
    {
      id: 2,
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: '/robot.jpg'
    },
    {
      id: 3,
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: 'machine.png'
    }
  ];

  return (
    <section className="services" id = "solutions">
      <div className="container">
        <div className="services-header">
          <span className="services-label">Nos solutions</span>
          <h2 className="services-title">Ce que nous offrons</h2>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              
              <div className="service-body">
                <h3 className="service-title">
                  {service.title}
                  <FaArrowRight className="service-arrow" />
                </h3>
                
                <p className="service-description">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;