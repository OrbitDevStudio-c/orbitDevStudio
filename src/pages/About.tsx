import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import AboutHero from '../components/sections/AboutHero';

// Below-fold sections lazy loaded
const AboutStory = lazy(() => import('../components/sections/AboutStory'));
const AboutStats = lazy(() => import('../components/sections/AboutStats'));
const AboutValues = lazy(() => import('../components/sections/AboutValues'));

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
        <AboutStory />
      </div>
      
      <AboutStats />
      
      <div className="section-grid">
        <AboutValues />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/about')!;

export default function About() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <AboutHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
