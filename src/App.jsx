import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Partners />
      <Services />
      <Articles />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;