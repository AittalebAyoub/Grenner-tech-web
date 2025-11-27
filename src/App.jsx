import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToAnchor from './components/ScrollToAnchor'; 
import Home from './pages/Home'; // Nouveau composant Home
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';
import './styles/App.css';
import Chat from './components/Chat';


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
      <Chat />
    </Router>
  );
}

export default App;