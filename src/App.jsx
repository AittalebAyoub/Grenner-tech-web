import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToAnchor from './components/ScrollToAnchor'; 
import Home from './pages/Home'; // Nouveau composant Home
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <ScrollToAnchor /> 
      
      <div className="App">
        <Header /> 
        
        <main>
          <Routes>
            {/* Page d'accueil : affiche toutes les sections avec IDs d'ancre */}
            <Route path="/" element={<Home />} /> 
            
            {/* Pages de détail */}
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
        
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;