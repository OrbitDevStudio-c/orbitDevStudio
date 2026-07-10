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
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/about" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/about" />
        <meta property="og:title" content="About Us | OrbitDevStudio" />
        <meta property="og:description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/about" />
        <meta name="twitter:title" content="About Us | OrbitDevStudio" />
        <meta name="twitter:description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
        <meta name="twitter:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* JSON-LD Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://orbitdevstudios.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://orbitdevstudios.vercel.app/about"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">
        <AboutHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
