import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PortfolioHero from '../components/sections/PortfolioHero';

// Below-fold sections lazy loaded
const PortfolioGrid = lazy(() => import('../components/sections/PortfolioGrid'));
const PortfolioCTA = lazy(() => import('../components/sections/PortfolioCTA'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <PortfolioGrid />
      </div>
      <PortfolioCTA />
    </Suspense>
  );
}

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | OrbitDevStudio</title>
        <meta name="description" content="OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/portfolio" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/portfolio" />
        <meta property="og:title" content="Portfolio | OrbitDevStudio" />
        <meta property="og:description" content="OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/portfolio" />
        <meta name="twitter:title" content="Portfolio | OrbitDevStudio" />
        <meta name="twitter:description" content="OrbitDevStudio - Digital excellence in action. Explore our portfolio of premium web experiences." />
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
                "name": "Portfolio",
                "item": "https://orbitdevstudios.vercel.app/portfolio"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">

        {/* Shared gradient definition for portfolio icons */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="portfolio-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#050b2e" />
              <stop offset="55%" stopColor="#1677ff" />
              <stop offset="100%" stopColor="#00d9ff" />
            </linearGradient>
          </defs>
        </svg>

        <PortfolioHero />
        <DeferredSections />
      </div>
    </>
  );
}
