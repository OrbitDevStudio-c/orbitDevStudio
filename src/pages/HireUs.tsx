import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import HireHero from '../components/sections/HireHero';

// Below-fold sections lazy loaded
const HireProcess = lazy(() => import('../components/sections/HireProcess'));
const HireModels = lazy(() => import('../components/sections/HireModels'));
const HireWhyUs = lazy(() => import('../components/sections/HireWhyUs'));
const HireSkills = lazy(() => import('../components/sections/HireSkills'));
const HireForm = lazy(() => import('../components/sections/HireForm'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const win = window as any;
    if ('requestIdleCallback' in win) {
      const handle = win.requestIdleCallback(() => setShow(true), { timeout: 2000 });
      return () => win.cancelIdleCallback(handle);
    } else {
      const id = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(id);
    }
  }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-grid">
        <HireProcess />
        <HireModels />
        <HireWhyUs />
        <HireSkills />
        <HireForm />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/hire')!;

export default function HireUs() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <HireHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
