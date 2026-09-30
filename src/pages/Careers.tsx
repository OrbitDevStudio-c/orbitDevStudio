import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CareersHero from '../components/sections/CareersHero';

// Below-fold sections lazy loaded
const CareersBenefits = lazy(() => import('../components/sections/CareersBenefits'));
const CareersOpenings = lazy(() => import('../components/sections/CareersOpenings'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <CareersBenefits />
        <CareersOpenings />
      </div>
    </Suspense>
  );
}

export default function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | OrbitDevStudio</title>
        <meta name="description" content="Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/careers" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/careers" />
        <meta property="og:title" content="Careers | OrbitDevStudio" />
        <meta property="og:description" content="Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/careers" />
        <meta name="twitter:title" content="Careers | OrbitDevStudio" />
        <meta name="twitter:description" content="Join OrbitDevStudio and help us build the future of digital products. Explore our open roles and benefits." />
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
                "name": "Careers",
                "item": "https://orbitdevstudios.vercel.app/careers"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">

        {/* Shared gradient definition for careers-page icons */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="careers-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#050b2e" />
              <stop offset="55%" stopColor="#1677ff" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
        </svg>

        <CareersHero />

        <DeferredSections />
      </div>
    </>
  );
}
