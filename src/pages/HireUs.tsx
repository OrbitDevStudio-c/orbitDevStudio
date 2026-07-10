import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HireHero from '../components/sections/HireHero';

// Below-fold sections lazy loaded
const HireProcess = lazy(() => import('../components/sections/HireProcess'));
const HireModels = lazy(() => import('../components/sections/HireModels'));
const HireWhyUs = lazy(() => import('../components/sections/HireWhyUs'));
const HireSkills = lazy(() => import('../components/sections/HireSkills'));
const HireForm = lazy(() => import('../components/sections/HireForm'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <HireProcess />
        <HireModels />
        <HireWhyUs />
        <HireSkills />
        <HireForm />
      </div>
    </Suspense>
  );
}

export default function HireUs() {
  return (
    <>
      <Helmet>
        <title>Hire Dedicated Talent | OrbitDevStudio</title>
        <meta name="description" content="Augment your team with elite engineering talent. Flexible hiring models tailored for your project." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/hire" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/hire" />
        <meta property="og:title" content="Hire Dedicated Talent | OrbitDevStudio" />
        <meta property="og:description" content="Augment your team with elite engineering talent. Flexible hiring models tailored for your project." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/hire" />
        <meta name="twitter:title" content="Hire Dedicated Talent | OrbitDevStudio" />
        <meta name="twitter:description" content="Augment your team with elite engineering talent. Flexible hiring models tailored for your project." />
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
                "name": "Hire Dedicated Talent",
                "item": "https://orbitdevstudios.vercel.app/hire"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">
        <HireHero />
        
        <DeferredSections />
      </div>
    </>
  );
}
