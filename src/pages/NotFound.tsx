import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | OrbitDevStudio</title>
        <meta name="description" content="The page you are looking for does not exist on OrbitDevStudio." />
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 Page Not Found | OrbitDevStudio" />
        <meta property="og:description" content="The page you are looking for does not exist on OrbitDevStudio." />
        <meta property="og:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 Page Not Found | OrbitDevStudio" />
        <meta name="twitter:description" content="The page you are looking for does not exist on OrbitDevStudio." />
        <meta name="twitter:image" content="https://orbitdevstudios.vercel.app/companylogo-social.webp" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-24 px-6 md:px-12 lg:px-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">NotFound</h1>
        <p className="text-gray-400">Content coming soon...</p>
      </motion.div>
    </>
  );
}
