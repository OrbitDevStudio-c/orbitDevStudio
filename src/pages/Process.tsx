import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Process() {
  return (
    <>
      <Helmet>
        <title>Process & Engineering | OrbitDevStudio</title>
        <meta name="description" content="Discover our stage-by-stage engineering methodology designed to eliminate risk and deliver premium software systems." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/process" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/process" />
        <meta property="og:title" content="Process & Engineering | OrbitDevStudio" />
        <meta property="og:description" content="Discover our stage-by-stage engineering methodology designed to eliminate risk and deliver premium software systems." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/process" />
        <meta name="twitter:title" content="Process & Engineering | OrbitDevStudio" />
        <meta name="twitter:description" content="Discover our stage-by-stage engineering methodology designed to eliminate risk and deliver premium software systems." />
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
                "name": "Process",
                "item": "https://orbitdevstudios.vercel.app/process"
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
        className="min-h-screen pt-24 px-6 md:px-12 lg:px-24 bg-[#0B1220]"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Process</h1>
        <p className="text-[#C7D2E4]">Content coming soon...</p>
      </motion.div>
    </>
  );
}
