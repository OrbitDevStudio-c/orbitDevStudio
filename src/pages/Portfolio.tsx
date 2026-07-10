import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PortfolioHero from '../components/sections/PortfolioHero';

// Below-fold sections lazy loaded
const PortfolioGrid = lazy(() => import('../components/sections/PortfolioGrid'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <PortfolioGrid />
      </div>
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
        <PortfolioHero />
        <DeferredSections />
      </div>
    </>
  );
}
