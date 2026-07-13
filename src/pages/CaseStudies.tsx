import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Case Studies | OrbitDevStudio</title>
        <meta name="description" content="Read our detailed case studies showcasing how OrbitDevStudio engineers high-impact software solutions." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/case-studies" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/case-studies" />
        <meta property="og:title" content="Case Studies | OrbitDevStudio" />
        <meta property="og:description" content="Read our detailed case studies showcasing how OrbitDevStudio engineers high-impact software solutions." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/case-studies" />
        <meta name="twitter:title" content="Case Studies | OrbitDevStudio" />
        <meta name="twitter:description" content="Read our detailed case studies showcasing how OrbitDevStudio engineers high-impact software solutions." />
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
                "name": "Case Studies",
                "item": "https://orbitdevstudios.vercel.app/case-studies"
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
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">CaseStudies</h1>
        <p className="text-[#C7D2E4]">Content coming soon...</p>
      </motion.div>
    </>
  );
}
