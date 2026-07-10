import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
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

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries | OrbitDevStudio</title>
        <meta name="description" content="Custom digital solutions tailored for various industries." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/industries" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/industries" />
        <meta property="og:title" content="Industries | OrbitDevStudio" />
        <meta property="og:description" content="Custom digital solutions tailored for various industries." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/industries" />
        <meta name="twitter:title" content="Industries | OrbitDevStudio" />
        <meta name="twitter:description" content="Custom digital solutions tailored for various industries." />
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
                "name": "Industries",
                "item": "https://orbitdevstudios.vercel.app/industries"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy overflow-hidden">
        
        <IndustriesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
