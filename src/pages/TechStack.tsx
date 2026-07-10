import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TechHero from '../components/sections/TechHero';

// Below-fold sections lazy loaded
const TechLayers = lazy(() => import('../components/sections/TechLayers'));
const TechWhyUs = lazy(() => import('../components/sections/TechWhyUs'));
const TechDelivery = lazy(() => import('../components/sections/TechDelivery'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <TechLayers />
        <TechWhyUs />
        <TechDelivery />
      </div>
    </Suspense>
  );
}

export default function TechStack() {
  return (
    <>
      <Helmet>
        <title>Technologies | OrbitDevStudio</title>
        <meta name="description" content="The cutting-edge engineering stack we use to build highly scalable digital products." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/tech" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/tech" />
        <meta property="og:title" content="Technologies | OrbitDevStudio" />
        <meta property="og:description" content="The cutting-edge engineering stack we use to build highly scalable digital products." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/tech" />
        <meta name="twitter:title" content="Technologies | OrbitDevStudio" />
        <meta name="twitter:description" content="The cutting-edge engineering stack we use to build highly scalable digital products." />
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
                "name": "Technologies",
                "item": "https://orbitdevstudios.vercel.app/tech"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">
        <TechHero />
        <DeferredSections />
      </div>
    </>
  );
}
