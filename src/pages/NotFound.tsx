import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        className="bg-navy-deep relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Ambient glow, consistent with the rest of the site's dark heroes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-8"
            style={{
              background: 'var(--rt-pill-bg-2)',
              border: '1px solid rgba(100,116,139,0.28)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <Compass size={13} className="text-[var(--rt-cyan)]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 light:text-slate-900/90 uppercase">Lost in Orbit</span>
          </div>

          <h1 className="text-7xl sm:text-8xl font-black tracking-tight leading-none mb-4 text-gradient">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-900 tracking-tight mb-4">
            This page drifted out of orbit.
          </h2>

          <p className="text-[#C7D2E4] text-[15px] leading-relaxed mb-10 max-w-md">
            The page you're looking for doesn't exist, moved, or never launched. Let's get you back on course.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm w-full sm:w-auto"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm text-white light:text-slate-900 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all w-full sm:w-auto"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
