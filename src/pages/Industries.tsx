import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
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

const meta = getRouteMeta('/industries')!;

export default function Industries() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy overflow-hidden">
        
        <IndustriesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
