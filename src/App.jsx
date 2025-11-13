import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import Services from './components/Services';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
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
          }
        />
        
        {/* Service Detail Page */}
        <Route path="/service/:id" element={<ServiceDetail />} />

        {/* Blog Detail Page */}
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;