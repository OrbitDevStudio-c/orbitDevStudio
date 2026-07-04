import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TechHero from '../components/sections/TechHero';

// Below-fold sections lazy loaded
const TechLayers = lazy(() => import('../components/sections/TechLayers'));
const TechWhyUs = lazy(() => import('../components/sections/TechWhyUs'));
const TechDelivery = lazy(() => import('../components/sections/TechDelivery'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <TechLayers />
        <TechWhyUs />
        <TechDelivery />
      </div>
    </Suspense>
  );
}

export default function TechStack() {
  return (
    <>
      <Helmet>
        <title>Technologies | OrbitDevStudio</title>
        <meta name="description" content="The cutting-edge engineering stack we use to build highly scalable digital products." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <TechHero />
        <DeferredSections />
      </div>
    </>
  );
}
