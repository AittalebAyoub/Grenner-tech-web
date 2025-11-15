// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Partners from '../components/Partners';
import Services from '../components/Services';
import Articles from '../components/Articles';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="home-content">
      <Hero />
      <About />
      <Partners />
      <Services />
      <Articles />
      <Contact />
    </div>
  );
};

export default Home;