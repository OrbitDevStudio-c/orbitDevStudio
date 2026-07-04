import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PortfolioHero from '../components/sections/PortfolioHero';

// Below-fold sections lazy loaded
const PortfolioGrid = lazy(() => import('../components/sections/PortfolioGrid'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <PortfolioGrid />
      </div>
    </Suspense>
  );
}

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | OrbitDevStudio</title>
        <meta name="description" content="OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <PortfolioHero />
        <DeferredSections />
      </div>
    </>
  );
}
