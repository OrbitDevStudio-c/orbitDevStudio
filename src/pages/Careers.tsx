import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CareersHero from '../components/sections/CareersHero';

// Below-fold sections lazy loaded
const CareersBenefits = lazy(() => import('../components/sections/CareersBenefits'));
const CareersOpenings = lazy(() => import('../components/sections/CareersOpenings'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <CareersBenefits />
        <CareersOpenings />
      </div>
    </Suspense>
  );
}

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | OrbitDevStudio</title>
        <meta name="description" content="Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <CareersHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
