import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import VercelAnalytics from './components/VercelAnalytics';
import ScrollToHash from './components/ScrollToHash';
import ScrollToTop from './components/ScrollToTop';
import SolarChat from './components/SolarChat';
import Home from './pages/Home';
import ErtragsrechnerPage from './pages/ErtragsrechnerPage';
import SystemDecoderPage from './pages/SystemDecoderPage';
import HardwareKatalogPage from './pages/HardwareKatalogPage';
import EmbedCalculator from './pages/EmbedCalculator';
import BalkonkraftwerkPage from './pages/BalkonkraftwerkPage';
import BatteriepassPage from './pages/BatteriepassPage';
import TechnologiePage from './pages/TechnologiePage';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';

function GlobalWidgets() {
  const location = useLocation();
  if (location.pathname === '/rechner-embed') {
    return null;
  }
  return (
    <>
      <ScrollToTop />
      <SolarChat />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Vercel Web Analytics 2-way tracking component */}
      <VercelAnalytics />
      
      {/* Reliable anchor scroll listener */}
      <ScrollToHash />

      {/* Global interactive widgets: Scroll to top & PV-Fachberater Chat */}
      <GlobalWidgets />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ertragsrechner" element={<ErtragsrechnerPage />} />
        <Route path="/system-decoder" element={<SystemDecoderPage />} />
        <Route path="/hardware-katalog" element={<HardwareKatalogPage />} />
        <Route path="/rechner" element={<Navigate to="/ertragsrechner" replace />} />
        <Route path="/decoder" element={<Navigate to="/system-decoder" replace />} />
        <Route path="/katalog" element={<Navigate to="/hardware-katalog" replace />} />
        <Route path="/hardware" element={<Navigate to="/hardware-katalog" replace />} />
        <Route path="/rechner-embed" element={<EmbedCalculator />} />
        <Route path="/balkonkraftwerk" element={<BalkonkraftwerkPage />} />
        <Route path="/batteriepass" element={<BatteriepassPage />} />
        <Route path="/technologie" element={<TechnologiePage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
