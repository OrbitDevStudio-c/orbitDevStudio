import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

const StoryStats = lazy(() => import('../components/sections/StoryStats'));
const TechStackMarquee = lazy(() => import('../components/sections/TechStackMarquee'));
const FeaturedProjects = lazy(() => import('../components/sections/FeaturedProjects'));
const ProcessTimeline = lazy(() => import('../components/sections/ProcessTimeline'));
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
      <TechStackMarquee />
      <FeaturedProjects />
      <ProcessTimeline />
      <Testimonials />
    </Suspense>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>OrbitDevStudio | Premium Digital Agency & Software Engineering</title>
        <meta name="description" content="OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow's leading enterprises." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/" />
        <meta property="og:title" content="OrbitDevStudio | Premium Digital Agency & Software Engineering" />
        <meta property="og:description" content="OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow's leading enterprises." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />
        <meta property="og:site_name" content="OrbitDevStudio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/" />
        <meta name="twitter:title" content="OrbitDevStudio | Premium Digital Agency & Software Engineering" />
        <meta name="twitter:description" content="OrbitDevStudio - Engineering premium software solutions, breathtaking aesthetics, and scalable architectures for tomorrow's leading enterprises." />
        <meta name="twitter:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://orbitdevstudios.vercel.app/#organization",
                "name": "OrbitDevStudio",
                "url": "https://orbitdevstudios.vercel.app/",
                "logo": "https://orbitdevstudios.vercel.app/companylogo.webp",
                "sameAs": []
              },
              {
                "@type": "WebSite",
                "@id": "https://orbitdevstudios.vercel.app/#website",
                "url": "https://orbitdevstudios.vercel.app/",
                "name": "OrbitDevStudio",
                "publisher": {
                  "@id": "https://orbitdevstudios.vercel.app/#organization"
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
