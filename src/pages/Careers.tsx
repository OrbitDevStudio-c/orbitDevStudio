import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import CareersHero from '../components/sections/CareersHero';

// Below-fold sections lazy loaded
const CareersBenefits = lazy(() => import('../components/sections/CareersBenefits'));
const CareersOpenings = lazy(() => import('../components/sections/CareersOpenings'));

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
        <CareersBenefits />
        <CareersOpenings />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/careers')!;

export default function Careers() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <CareersHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
