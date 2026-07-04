import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesHero from '../components/sections/ServicesHero';

// Below-fold sections lazy loaded
const ServicesGrid = lazy(() => import('../components/sections/ServicesGrid'));
const ServicesDomains = lazy(() => import('../components/sections/ServicesDomains'));
const ServicesProcess = lazy(() => import('../components/sections/ServicesProcess'));
const ServicesTechnologies = lazy(() => import('../components/sections/ServicesTechnologies'));
const ServicesCTA = lazy(() => import('../components/sections/ServicesCTA'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      {/* The rest of the page uses the graph-paper grid lines background */}
      <div className="section-white">
        <ServicesGrid />
        <ServicesDomains />
        <ServicesProcess />
        <ServicesTechnologies />
        <ServicesCTA />
      </div>
    </Suspense>
  );
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | OrbitDevStudio</title>
        <meta name="description" content="End-to-End Digital Services Engineered for Growth" />
      </Helmet>
      
      {/* Root container overrides dark theme */}
      <div className="relative min-h-screen bg-white">
        
        {/* Galaxy Blue Hero Section (Contains confined particles) */}
        <ServicesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
