import SEO from '../components/ui/SEO';
import { getRouteMeta } from '../config/routes';
import { motion } from 'framer-motion';

const meta = getRouteMeta('/terms')!;

export default function Terms() {
  return (
    <>
      <SEO {...meta} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-24 px-6 md:px-12 lg:px-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Terms</h1>
        <p className="text-gray-400">Content coming soon...</p>
      </motion.div>
    </>
  );
}
