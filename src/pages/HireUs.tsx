import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HireHero from '../components/sections/HireHero';

// Below-fold sections lazy loaded
const HireProcess = lazy(() => import('../components/sections/HireProcess'));
const HireModels = lazy(() => import('../components/sections/HireModels'));
const HireWhyUs = lazy(() => import('../components/sections/HireWhyUs'));
const HireSkills = lazy(() => import('../components/sections/HireSkills'));
const HireForm = lazy(() => import('../components/sections/HireForm'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <HireProcess />
        <HireModels />
        <HireWhyUs />
        <HireSkills />
        <HireForm />
      </div>
    </Suspense>
  );
}

export default function HireUs() {
  return (
    <>
      <Helmet>
        <title>Hire Dedicated Talent | OrbitDevStudio</title>
        <meta name="description" content="Augment your team with elite engineering talent. Flexible hiring models tailored for your project." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <HireHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
