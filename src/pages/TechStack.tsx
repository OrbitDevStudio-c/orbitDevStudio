import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import TechHero from '../components/sections/TechHero';

// Below-fold sections lazy loaded
const TechLayers = lazy(() => import('../components/sections/TechLayers'));
const TechWhyUs = lazy(() => import('../components/sections/TechWhyUs'));
const TechDelivery = lazy(() => import('../components/sections/TechDelivery'));

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
        <TechLayers />
        <TechWhyUs />
        <TechDelivery />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/tech')!;

export default function TechStack() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <TechHero />
        <DeferredSections />
      </div>
    </>
  );
}
