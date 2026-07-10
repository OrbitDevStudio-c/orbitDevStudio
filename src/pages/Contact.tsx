import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { Suspense, lazy, useEffect, useState } from 'react';
import ContactHero from '../components/sections/ContactHero';

// Below-fold sections lazy loaded
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
        <HireForm />
      </div>
    </Suspense>
  );
}

const meta = getRouteMeta('/contact')!;

export default function Contact() {
  return (
    <>
      <SEO {...meta} />
      
      <div className="relative min-h-screen bg-navy">
        <ContactHero />
        <DeferredSections />
      </div>
    </>
  );
}
