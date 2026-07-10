import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | OrbitDevStudio</title>
        <meta name="description" content="Read our privacy policy to understand how we protect your personal and project data at OrbitDevStudio." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/privacy-policy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | OrbitDevStudio" />
        <meta property="og:description" content="Read our privacy policy to understand how we protect your personal and project data at OrbitDevStudio." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/privacy-policy" />
        <meta name="twitter:title" content="Privacy Policy | OrbitDevStudio" />
        <meta name="twitter:description" content="Read our privacy policy to understand how we protect your personal and project data at OrbitDevStudio." />
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
                "name": "Privacy Policy",
                "item": "https://orbitdevstudios.vercel.app/privacy-policy"
              }
            ]
          })}
        </script>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-24 px-6 md:px-12 lg:px-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">PrivacyPolicy</h1>
        <p className="text-gray-400">Content coming soon...</p>
      </motion.div>
    </>
  );
}
