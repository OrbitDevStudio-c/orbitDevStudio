import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/sections/AboutHero';

// Below-fold sections lazy loaded
const AboutStory = lazy(() => import('../components/sections/AboutStory'));
const AboutStats = lazy(() => import('../components/sections/AboutStats'));
const AboutValues = lazy(() => import('../components/sections/AboutValues'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <AboutStory />
      </div>
      
      <AboutStats />
      
      <div className="section-white">
        <AboutValues />
      </div>
    </Suspense>
  );
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | OrbitDevStudio</title>
        <meta name="description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <AboutHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
