import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

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
  const [scrolled, setScrolled] = useState(false);

  const py = useTransform(scrollY, [0, 100], ['0.875rem', '0.5rem']);
  const navStyle = useMemo(
    () => ({
      backgroundColor: 'transparent',
    }),
    []
  );

  const useDarkText = scrolled;
  const logoText = useDarkText ? 'text-slate-950' : 'text-white';
  const logoSubText = useDarkText ? 'text-slate-500' : 'text-slate-400';

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 80);
    });
  }, [scrollY]);

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
            backgroundColor: scrolled ? '#ffffff' : 'rgba(255,255,255,0)',
            boxShadow: scrolled ? '0 22px 70px rgba(15, 23, 42, 0.12)' : '0 0 rgba(0,0,0,0)',
            borderColor: scrolled ? '#E5E7EB' : 'rgba(255,255,255,0)',
            borderWidth: scrolled ? 1 : 0,
            borderStyle: scrolled ? 'solid' : 'none',
            borderRadius: 0,
            transform: scrolled ? 'translateY(-6px)' : 'translateY(0px)',
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
                <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${logoSubText}`}>DevStudio</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const baseText = scrolled ? 'text-slate-950' : 'text-white';
                const baseBg = isActive ? (scrolled ? 'bg-accent/10 text-accent shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]' : 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]') : baseText;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`group relative rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${baseBg}`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-1/2 bottom-2 block h-px w-0 -translate-x-1/2 bg-accent transition-all duration-200 ${isActive ? 'w-6' : 'group-hover:w-6'}`}
                    />
                  </Link>
                );
              })}

              <Link
                to="/about"
                className="ml-2 rounded-full bg-accent px-4 py-1.5 text-[13px] font-semibold text-slate-950 shadow-lg shadow-accent/20 transition duration-200 hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                About Us
              </Link>
            </div>

            <button
              className={`lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${scrolled ? 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200' : 'border-white/10 bg-white/10 text-white hover:bg-white/20'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-3xl flex items-start justify-center py-8 px-4 lg:hidden"
        >
          <div className="w-full max-w-md space-y-8 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-lg shadow-cyan-500/15">
                  <CompanyLogo size="sm" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Orbit DevStudio</p>
                  <p className="text-base font-semibold text-white">Mobile Menu</p>
                </div>
              </div>

              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-4 text-lg font-semibold text-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.8)] transition hover:border-accent hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-semibold text-slate-950 shadow-xl shadow-accent/30 transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
