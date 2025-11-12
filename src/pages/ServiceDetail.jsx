import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import ServiceHero from '../components/ServiceHero';
import ServiceContent from '../components/ServiceContent';
import VideoComponent from '../components/VideoComponent';


const ServiceDetail = () => {
  const { id } = useParams();

  const servicesData = {
    1: {
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop'
    },
    2: {
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=1200&h=600&fit=crop'
    },
    3: {
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop'
    }
  };

  const service = servicesData[id];

  if (!service) {
    return <div>Service non trouvé</div>;
  }

  return (
    <div className="service-detail-page">
      <Header />
      <ServiceHero />
      <ServiceContent />
      <VideoComponent />
      <Contact />
      <Partners />
      <Footer />
    </div>
  );
};

export default ServiceDetail;