import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ContactHero from '../components/sections/ContactHero';

// Below-fold sections lazy loaded
const HireForm = lazy(() => import('../components/sections/HireForm'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <HireForm />
      </div>
    </Suspense>
  );
}

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | OrbitDevStudio</title>
        <meta name="description" content="Get in touch with OrbitDevStudio to discuss your next big digital product." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <ContactHero />
        <DeferredSections />
      </div>
    </>
  );
}
