import ProjektuebernahmePage from "./pages/ProjektuebernahmePage.tsx";
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
import SolardachziegelPage from './pages/SolardachziegelPage';
import KomplettsetsPage from './pages/KomplettsetsPage';
import SolarpflichtPage from './pages/SolarpflichtPage';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import EinspeiseverguetungPage from './pages/EinspeiseverguetungPage';
import BalkonkraftwerkSpeicherPage from './pages/BalkonkraftwerkSpeicherPage';
import WechselrichterVergleichPage from './pages/WechselrichterVergleichPage';
import NotFoundPage from './pages/NotFoundPage';

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

export function AppRoutes() {
  return (
    <>
      {/* Vercel Web Analytics 2-way tracking component */}
      <VercelAnalytics />
      
      {/* Reliable anchor scroll listener */}
      <ScrollToHash />

      {/* Global interactive widgets: Scroll to top & PV-Fachberater Chat */}
      <GlobalWidgets />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ertragsrechner" element={<ErtragsrechnerPage />} />
        <Route path="/anlagen-vergleich" element={<SystemDecoderPage />} />
        <Route path="/anlagenvergleich" element={<Navigate to="/anlagen-vergleich" replace />} />
        <Route path="/system-decoder" element={<Navigate to="/anlagen-vergleich" replace />} />
        <Route path="/hardware-katalog" element={<HardwareKatalogPage />} />
        <Route path="/rechner" element={<ErtragsrechnerPage />} />
        <Route path="/decoder" element={<Navigate to="/anlagen-vergleich" replace />} />
        <Route path="/katalog" element={<Navigate to="/hardware-katalog" replace />} />
        <Route path="/hardware" element={<Navigate to="/hardware-katalog" replace />} />
        <Route path="/rechner-embed" element={<EmbedCalculator />} />
        <Route path="/balkonkraftwerk" element={<BalkonkraftwerkPage />} />
        <Route path="/batteriepass" element={<BatteriepassPage />} />
        <Route path="/technologie" element={<TechnologiePage />} />
        
        {/* Spezial-Cluster für weitergeleitete Domains */}
        <Route path="/solardachziegel" element={<SolardachziegelPage />} />
        <Route path="/pvdachziegel" element={<Navigate to="/solardachziegel" replace />} />
        <Route path="/pvziegel" element={<Navigate to="/solardachziegel" replace />} />

        <Route path="/komplettsets" element={<KomplettsetsPage />} />
        <Route path="/pvkomplettset" element={<Navigate to="/komplettsets" replace />} />
        <Route path="/pv-komplettset" element={<Navigate to="/komplettsets" replace />} />
        <Route path="/solarkomplettset" element={<Navigate to="/komplettsets" replace />} />
        <Route path="/balkonsolarset" element={<Navigate to="/komplettsets" replace />} />

        <Route path="/solarpflicht" element={<SolarpflichtPage />} />
        <Route path="/solarebaupflicht" element={<Navigate to="/solarpflicht" replace />} />
        <Route path="/solarspitzengesetz" element={<Navigate to="/solarpflicht" replace />} />
        <Route path="/solarreform" element={<Navigate to="/solarpflicht" replace />} />
        <Route path="/solarfoerderprogramm" element={<Navigate to="/solarpflicht" replace />} />

        {/* Neue SEO-Seiten */}
        <Route path="/einspeiseverguetung" element={<EinspeiseverguetungPage />} />
        <Route path="/einspeisevergütung" element={<Navigate to="/einspeiseverguetung" replace />} />
        <Route path="/balkonkraftwerk-speicher" element={<BalkonkraftwerkSpeicherPage />} />
        <Route path="/balkonspeicher" element={<Navigate to="/balkonkraftwerk-speicher" replace />} />
        <Route path="/wechselrichter-vergleich" element={<WechselrichterVergleichPage />} />
        <Route path="/wechselrichter" element={<Navigate to="/wechselrichter-vergleich" replace />} />
        <Route path="/mikrowechselrichter" element={<Navigate to="/wechselrichter-vergleich" replace />} />

        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/projektuebernahme" element={<ProjektuebernahmePage />} />
</Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
