import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import PortfolioHero from '../components/sections/PortfolioHero';

// Below-fold sections lazy loaded
const PortfolioGrid = lazy(() => import('../components/sections/PortfolioGrid'));

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
        <PortfolioGrid />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/portfolio')!;

export default function Portfolio() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <PortfolioHero />
        <DeferredSections />
      </div>
    </>
  );
}
