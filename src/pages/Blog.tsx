import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | OrbitDevStudio</title>
        <meta name="description" content="Insights, engineering stories, and industry updates from the technical minds at OrbitDevStudio." />
        <link rel="canonical" href="https://orbitdevstudios.vercel.app/blog" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdevstudios.vercel.app/blog" />
        <meta property="og:title" content="Blog | OrbitDevStudio" />
        <meta property="og:description" content="Insights, engineering stories, and industry updates from the technical minds at OrbitDevStudio." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://orbitdevstudios.vercel.app/blog" />
        <meta name="twitter:title" content="Blog | OrbitDevStudio" />
        <meta name="twitter:description" content="Insights, engineering stories, and industry updates from the technical minds at OrbitDevStudio." />
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
                "name": "Blog",
                "item": "https://orbitdevstudios.vercel.app/blog"
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
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Blog</h1>
        <p className="text-[#C7D2E4]">Content coming soon...</p>
      </motion.div>
    </>
  );
}
