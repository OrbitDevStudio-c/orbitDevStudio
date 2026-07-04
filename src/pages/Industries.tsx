import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import IndustriesHero from '../components/sections/IndustriesHero';

// Below-fold sections lazy loaded
const IndustriesGrid = lazy(() => import('../components/sections/IndustriesGrid'));
const IndustriesShowcase = lazy(() => import('../components/sections/IndustriesShowcase'));
const IndustriesStory = lazy(() => import('../components/sections/IndustriesStory'));
const IndustriesTechClusters = lazy(() => import('../components/sections/IndustriesTechClusters'));
const IndustriesWhyUs = lazy(() => import('../components/sections/IndustriesWhyUs'));
const IndustriesFAQ = lazy(() => import('../components/sections/IndustriesFAQ'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <IndustriesGrid />
        <IndustriesShowcase />
        <IndustriesStory />
        <IndustriesTechClusters />
        <IndustriesWhyUs />
        <IndustriesFAQ />
      </div>
    </Suspense>
  );
}

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries | OrbitDevStudio</title>
        <meta name="description" content="Custom digital solutions tailored for various industries." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white overflow-hidden">
        
        <IndustriesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
