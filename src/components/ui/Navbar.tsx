import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Technologies', path: '/tech' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Hire Us', path: '/hire' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const bgOpacity = useTransform(scrollY, [0, 80], [0.3, 0.6]);
  const blur = useTransform(scrollY, [0, 80], [12, 20]);
  const py = useTransform(scrollY, [0, 100], ['0.875rem', '0.5rem']);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
      >
        <motion.div
          className="w-full max-w-6xl px-5 md:px-6 rounded-2xl flex items-center justify-between border border-white/[0.08]"
          // Apply dynamic glass effect and padding together
          style={{
            paddingTop: py,
            paddingBottom: py,
            backgroundColor: `rgba(6, 11, 26, 0.55)`,
            backdropFilter: `blur(16px)`,
            WebkitBackdropFilter: `blur(16px)`,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10 transition-all group-hover:border-white/20 group-hover:bg-white/15">
              <img src="/companylogo.png" alt="OrbitDevStudio" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight hidden sm:block">
              Orbit<span className="font-light text-gray-400">DevStudio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors rounded-lg ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-4' : 'w-0 group-hover:w-4'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to="/about"
              className="ml-3 px-5 py-2 text-[13px] font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 lg:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-light text-white hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-white text-gray-900 font-semibold text-lg"
          >
            About Us
          </Link>
        </motion.div>
      )}
    </>
  );
}
