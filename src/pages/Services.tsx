import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import ServicesHero from '../components/sections/ServicesHero';

// Below-fold sections lazy loaded
const ServicesGrid = lazy(() => import('../components/sections/ServicesGrid'));
const ServicesDomains = lazy(() => import('../components/sections/ServicesDomains'));
const ServicesProcess = lazy(() => import('../components/sections/ServicesProcess'));
const ServicesTechnologies = lazy(() => import('../components/sections/ServicesTechnologies'));
const ServicesCTA = lazy(() => import('../components/sections/ServicesCTA'));

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
      {/* The rest of the page uses the graph-paper grid lines background */}
      <div className="section-grid">
        <ServicesGrid />
        <ServicesDomains />
        <ServicesProcess />
        <ServicesTechnologies />
        <ServicesCTA />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/services')!;

export default function Services() {
  return (
    <>
      <SEO {...meta} />
      
      {/* Root container overrides dark theme */}
      <div className="relative min-h-screen bg-navy">
        
        {/* Galaxy Blue Hero Section (Contains confined particles) */}
        <ServicesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
