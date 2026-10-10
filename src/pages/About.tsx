import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import AboutHero from '../components/sections/AboutHero';
import { usePricingScrollTo } from '../components/sections/PricingScroll';

// Below-fold sections lazy loaded
const AboutStory = lazy(() => import('../components/sections/AboutStory'));
const AboutStats = lazy(() => import('../components/sections/AboutStats'));
const AboutValues = lazy(() => import('../components/sections/AboutValues'));
const AboutMission = lazy(() => import('../components/sections/AboutMission'));
const AboutProcess = lazy(() => import('../components/sections/AboutProcess'));
const HomeFinalCTA = lazy(() => import('../components/sections/HomeFinalCTA'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <AboutStory />
      </div>

      <AboutMission />
      <AboutStats />

      <div className="section-white">
        <AboutValues />
      </div>

      <AboutProcess />
      <HomeFinalCTA location="about" />
    </Suspense>
  );
}

export default function About() {
  // Deep links such as /about#process: the target section is lazy loaded after a short delay,
  // so retry until it has rendered (and after ScrollToTop has reset the page).
  const { hash } = useLocation();
  const scrollTo = usePricingScrollTo();
  useEffect(() => {
    const id = decodeURIComponent(hash.replace('#', ''));
    if (!id) return;
    let attempts = 0;
    const t = window.setInterval(() => {
      if (scrollTo(id) || ++attempts > 40) window.clearInterval(t);
    }, 100);
    return () => window.clearInterval(t);
  }, [hash, scrollTo]);

  return (
    <>
      <Helmet>
        <title>About Us | Orbit Dev Studios</title>
        <meta name="description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
        <link rel="canonical" href="https://orbit-dev-studio.vercel.app/about" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbit-dev-studio.vercel.app/about" />
        <meta property="og:title" content="About Us | Orbit Dev Studios" />
        <meta property="og:description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
        <meta property="og:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbit-dev-studio.vercel.app/about" />
        <meta name="twitter:title" content="About Us | Orbit Dev Studios" />
        <meta name="twitter:description" content="Learn about OrbitDevStudio, our origin story, and the core values that drive our engineering excellence." />
        <meta name="twitter:image" content="https://orbit-dev-studio.vercel.app/companylogo-social.webp" />

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
                "item": "https://orbit-dev-studio.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://orbit-dev-studio.vercel.app/about"
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
