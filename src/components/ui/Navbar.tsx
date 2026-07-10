import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

const navItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Technologies', path: '/tech' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Hire Us', path: '/hire' },
];

const mobileNavItems = navItems;

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const py = useTransform(scrollY, [0, 100], ['0.875rem', '0.5rem']);
  const navStyle = useMemo(
    () => ({
      backgroundColor: 'transparent',
    }),
    []
  );

  const logoText = 'text-white';
  const logoSubText = 'text-slate-400';

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 80);
    });
  }, [scrollY]);

  // Handle focus behavior when mobile menu is opened/closed
  useEffect(() => {
    if (mobileOpen) {
      const focusTimer = setTimeout(() => {
        if (firstLinkRef.current) {
          firstLinkRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(focusTimer);
    } else {
      if (toggleButtonRef.current) {
        toggleButtonRef.current.focus();
      }
    }
  }, [mobileOpen]);

  // Focus trap inside the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        if (!containerRef.current) return;
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-x-0 top-0 z-40 flex justify-center"
        style={navStyle}
      >
        <motion.div
          className="w-full"
          animate={{
            backgroundColor: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'rgba(10, 10, 12, 0)',
            backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
            boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 0 rgba(0,0,0,0)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255,255,255,0)',
            borderWidth: scrolled ? 1 : 0,
            borderStyle: scrolled ? 'solid' : 'none',
            borderRadius: 0,
            transform: scrolled ? 'translateY(-2px)' : 'translateY(0px)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <motion.div className="flex items-center justify-between gap-3 px-3 py-2 md:px-4 md:py-2" style={{ paddingTop: py as any, paddingBottom: py as any }}>
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
              <CompanyLogo size="xs" className="block lg:hidden" />
              <CompanyLogo size="xs" className="hidden lg:block" />
              <div className="flex flex-col leading-tight">
                <span className={`text-sm font-semibold tracking-tight ${logoText}`}>Orbit</span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${logoSubText}`}>DevStudios</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const baseText = 'text-white/80 hover:text-white hover:bg-white/5';
                const baseBg = isActive ? 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]' : baseText;
 
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`group relative rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${baseBg}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <button
              ref={toggleButtonRef}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent border-white/10 bg-white/10 text-white hover:bg-white/20"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              ref={containerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] bg-[#141416] border-l border-white/5 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <CompanyLogo size="xs" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold tracking-tight text-white">Orbit</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">DevStudios</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-white/20 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-8 flex flex-col gap-2.5 overflow-y-auto">
                {mobileNavItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 + 0.1 }}
                    >
                      <Link
                        to={item.path}
                        ref={index === 0 ? firstLinkRef : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-[14px] font-semibold transition-all duration-200 ${isActive
                          ? item.path === '/about'
                            ? 'bg-purple-500/10 border-purple-500/25 text-purple-400 hover:bg-purple-500/20'
                            : 'bg-accent/10 border-accent/25 text-accent hover:bg-accent/20'
                          : 'bg-white/[0.02] border-white/5 text-white/90 hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
                          }`}
                      >
                        <span>{item.label}</span>
                        <span className={`text-[9px] font-mono tracking-wider ${isActive
                          ? item.path === '/about'
                            ? 'text-purple-400'
                            : 'text-accent'
                          : 'text-slate-500'
                          }`}>0{index + 1}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-accent py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-accent/10 hover:bg-accent/90 transition-all duration-200"
                >
                  Contact Us
                </Link>
                <div className="text-center">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Orbit DevStudio</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
