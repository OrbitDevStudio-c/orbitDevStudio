import { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ContactHero from '../components/sections/ContactHero';

// Below-fold sections lazy loaded
const HireForm = lazy(() => import('../components/sections/HireForm'));

function DeferredSections() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <div className="section-white">
        <HireForm />
      </div>
    </Suspense>
  );
}

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | OrbitDevStudio</title>
        <meta name="description" content="Get in touch with OrbitDevStudio to discuss your next big digital product." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/contact" />
        <meta property="og:title" content="Contact Us | OrbitDevStudio" />
        <meta property="og:description" content="Get in touch with OrbitDevStudio to discuss your next big digital product." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/contact" />
        <meta name="twitter:title" content="Contact Us | OrbitDevStudio" />
        <meta name="twitter:description" content="Get in touch with OrbitDevStudio to discuss your next big digital product." />
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
                "name": "Contact",
                "item": "https://orbitdevstudios.vercel.app/contact"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="relative min-h-screen bg-navy">
        <ContactHero />
        <DeferredSections />
      </div>
    </>
  );
}
