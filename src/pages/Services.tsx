import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesHero from '../components/sections/ServicesHero';

// Below-fold sections lazy loaded
const ServicesGrid = lazy(() => import('../components/sections/ServicesGrid'));
const ServicesDomains = lazy(() => import('../components/sections/ServicesDomains'));
const ServicesProcess = lazy(() => import('../components/sections/ServicesProcess'));
const ServicesTechnologies = lazy(() => import('../components/sections/ServicesTechnologies'));
const ServicesCTA = lazy(() => import('../components/sections/ServicesCTA'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      {/* The rest of the page uses the graph-paper grid lines background */}
      <div className="section-white">
        <ServicesGrid />
        <ServicesDomains />
        <ServicesProcess />
        <ServicesTechnologies />
        <ServicesCTA />
      </div>
    </Suspense>
  );
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | OrbitDevStudio</title>
        <meta name="description" content="End-to-End Digital Services Engineered for Growth" />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/services" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/services" />
        <meta property="og:title" content="Services | OrbitDevStudio" />
        <meta property="og:description" content="End-to-End Digital Services Engineered for Growth" />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/services" />
        <meta name="twitter:title" content="Services | OrbitDevStudio" />
        <meta name="twitter:description" content="End-to-End Digital Services Engineered for Growth" />
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
                "name": "Services",
                "item": "https://orbitdevstudios.vercel.app/services"
              }
            ]
          })}
        </script>
      </Helmet>
      
      {/* Root container overrides dark theme */}
      <div className="relative min-h-screen bg-navy">
        
        {/* Galaxy Blue Hero Section (Contains confined particles) */}
        <ServicesHero />
        
        <DeferredSections />

      </div>
    </>
  );
}
