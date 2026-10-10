import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import { SITE_URL } from '../config/site';

const HomeTrustedBy = lazy(() => import('../components/sections/HomeTrustedBy'));
const HomeServices = lazy(() => import('../components/sections/HomeServices'));
const HomeWhyOrbit = lazy(() => import('../components/sections/HomeWhyOrbit'));
const StoryStats = lazy(() => import('../components/sections/StoryStats'));
const TechStackMarquee = lazy(() => import('../components/sections/TechStackMarquee'));
const FeaturedProjects = lazy(() => import('../components/sections/FeaturedProjects'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));

function DeferredHomeSections() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as any;
    if ('requestIdleCallback' in win) {
      const handle = win.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => win.cancelIdleCallback(handle);
    } else {
      const id = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(id);
    }
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <StoryStats />
      <HomeTrustedBy />
      <HomeServices />
      <FeaturedProjects />
      <HomeWhyOrbit />
      <TechStackMarquee />
      <Testimonials />
    </Suspense>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Orbit Dev Studios | Websites, Web Apps & E-commerce Built for Growth</title>
        <meta name="description" content="Orbit Dev Studios designs and builds fast, conversion-focused websites, web applications, UI/UX and e-commerce platforms for growing businesses." />
        <link rel="canonical" href={`${SITE_URL}/`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content="Orbit Dev Studios | Websites, Web Apps & E-commerce Built for Growth" />
        <meta property="og:description" content="Orbit Dev Studios designs and builds fast, conversion-focused websites, web applications, UI/UX and e-commerce platforms for growing businesses." />
        <meta property="og:image" content={`${SITE_URL}/companylogo-social.webp`} />
        <meta property="og:site_name" content="OrbitDevStudio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_URL}/`} />
        <meta name="twitter:title" content="Orbit Dev Studios | Websites, Web Apps & E-commerce Built for Growth" />
        <meta name="twitter:description" content="Orbit Dev Studios designs and builds fast, conversion-focused websites, web applications, UI/UX and e-commerce platforms for growing businesses." />
        <meta name="twitter:image" content={`${SITE_URL}/companylogo-social.webp`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                "name": "Orbit Dev Studios",
                "url": `${SITE_URL}/`,
                "logo": `${SITE_URL}/companylogo.webp`,
                "email": "orbitdevstudios@gmail.com",
                "sameAs": [
                  "https://instagram.com/orbitdevstudio",
                  "https://www.linkedin.com/company/orbitdevstudio-tech"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "email": "orbitdevstudios@gmail.com",
                  "url": `${SITE_URL}/hire`
                }
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": `${SITE_URL}/`,
                "name": "OrbitDevStudio",
                "publisher": {
                  "@id": `${SITE_URL}/#organization`
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <main className="w-full">
        <Hero />
        <DeferredHomeSections />
      </main>
    </>
  );
}
