import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useScrollReveal } from './hooks/useScrollReveal';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';

// Core Public Feature Sections
import Hero from './features/hero/Hero';
import About from './features/about/About';
import Skills from './features/skills/Skills';
import Experience from './features/experience/Experience';
import Projects from './features/projects/Projects';
import Certifications from './features/certifications/Certifications';
import Testimonials from './features/testimonials/Testimonials';
import Contact from './features/contact/Contact';

// Code-Split Overlays & Heavy Modals (Loaded On-Demand for Blazing Fast Initial Load)
const AdminModal = lazy(() => import('./features/admin/AdminModal'));
const TerminalDrawer = lazy(() => import('./features/terminal/TerminalDrawer'));
const ResumeModal = lazy(() => import('./features/resume/ResumeModal'));

function MainContent() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { setIsAdminOpen } = usePortfolio();

  // Scroll reveal animations observer
  useScrollReveal();

  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
      if (path === '/sami' || hash === '#sami' || hash === '#/sami') {
        setIsAdminOpen(true);
      }
    };

    handleRouteCheck();

    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, [setIsAdminOpen]);

  return (
    <div className="app-container relative min-h-screen bg-[#06080e] selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Dynamic Ambient Background Elements - Bound to Fixed Viewport to Prevent Bottom Overflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-grid-mesh" />
        <div className="aurora-orb aurora-orb-primary w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] -top-24 -left-24" />
        <div className="aurora-orb aurora-orb-secondary w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] top-[40%] -right-28" />
        <div className="aurora-orb aurora-orb-primary w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bottom-0 left-[20%] opacity-10" />
      </div>

      {/* Main UI Layer with Clean Flex Sticky Footer Guarantee */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating UX Enhancements */}
      <BackToTop />

      {/* Global Modals & Fixed Overlays with Suspense Lazy Loading */}
      <Suspense fallback={null}>
        <AdminModal />
        <TerminalDrawer />
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}
