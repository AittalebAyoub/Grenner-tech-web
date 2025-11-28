import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToAnchor from './components/ScrollToAnchor'; 
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';
import './styles/App.css';
import Chat from './components/Chat';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToAnchor /> 
        
        <div className="App">
          <Header /> 
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </main>
          
          <Footer /> 
        </div>
        <Chat />
      </Router>
    </LanguageProvider>
  );
}

export default App;