import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown, Building2, Workflow, Briefcase, CircleHelp, ShieldCheck } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import { techStackPages } from '../../data/techStacks';
import { industries, industryPath } from '../../data/industries';
import { useTheme } from '../../context/ThemeContext';

const aboutItems = [
  { label: 'About Us', path: '/about', desc: 'Who we are and why we started.', icon: Building2 },
  { label: 'How We Work', path: '/about#process', desc: 'Seven clear steps from idea to launch.', icon: Workflow },
  { label: 'Careers', path: '/careers', desc: 'Join a small team that ships.', icon: Briefcase },
  { label: 'FAQ', path: '/faq', desc: 'Straight answers to common questions.', icon: CircleHelp },
  { label: 'Security & Privacy', path: '/security', desc: 'How we protect your data and code.', icon: ShieldCheck },
];

const techItems = techStackPages.map(({ navLabel, slug, navDesc, icon }) => ({
  label: navLabel,
  path: `/tech/${slug}`,
  desc: navDesc,
  icon,
}));

const industryItems = industries.map(({ label, slug, navDesc, icon }) => ({
  label,
  path: industryPath(slug),
  desc: navDesc,
  icon,
}));

type NavChild = (typeof aboutItems)[number];
type NavItem = {
  label: string;
  path: string;
  children?: NavChild[];
  /** Dropdown header label (links to `path`). */
  heading?: string;
  /** Dropdown grid columns; single-column menus get a narrower panel. */
  columns?: 1 | 2;
};

const navItems: NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/portfolio' },
  { label: 'Industries', path: '/industries', children: industryItems, heading: 'Industries', columns: 2 },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Technology', path: '/tech', children: techItems, heading: 'Technology', columns: 1 },
  { label: 'About', path: '/about', children: aboutItems, heading: 'Company', columns: 2 },
  { label: 'Blog', path: '/blog' },
];

const mobileNavItems = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/portfolio' },
  { label: 'Industries', path: '/industries' },
  ...industryItems.map(({ label, path }) => ({ label, path })),
  { label: 'Pricing', path: '/pricing' },
  { label: 'Technologies', path: '/tech' },
  ...techItems.map(({ label, path }) => ({ label, path })),
  ...aboutItems.map(({ label, path }) => ({ label, path })),
  { label: 'Blog', path: '/blog' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms' },
];

const isActivePath = (pathname: string, path: string, hash = '') => {
  const [base, anchor] = path.split('#');
  if (anchor) return pathname === base && hash === `#${anchor}`;
  return (
    pathname === base ||
    pathname.startsWith(`${base}/`) ||
    (base === '/portfolio' && pathname.startsWith('/case-studies/'))
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuCloseTimer = useRef<number | undefined>(undefined);
  const menuTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const openMenuNow = (label: string) => {
    window.clearTimeout(menuCloseTimer.current);
    setOpenMenu(label);
  };
  const closeMenuSoon = () => {
    window.clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => () => window.clearTimeout(menuCloseTimer.current), []);

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

  const isLight = theme === 'light';
  const logoText = 'text-white light:text-slate-900';
  const logoSubText = 'text-slate-400';

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 80);
    });
  }, [scrollY]);

  // Handle focus behavior when mobile menu is opened/closed
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const focusTimer = setTimeout(() => {
        if (firstLinkRef.current) {
          firstLinkRef.current.focus();
        }
      }, 50);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(focusTimer);
      };
    } else {
      document.body.style.overflow = '';
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
            backgroundColor: scrolled
              ? (isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(11, 18, 32, 0.85)')
              : (isLight ? 'rgba(255, 255, 255, 0)' : 'rgba(11, 18, 32, 0)'),
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            boxShadow: scrolled
              ? (isLight ? '0 10px 30px rgba(15, 23, 42, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.4)')
              : '0 0 rgba(0,0,0,0)',
            borderColor: scrolled
              ? (isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.05)')
              : 'rgba(255,255,255,0)',
            borderWidth: scrolled ? 1 : 0,
            borderStyle: scrolled ? 'solid' : 'none',
            borderRadius: 0,
            transform: scrolled ? 'translateY(-2px)' : 'translateY(0px)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
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

            <div className="relative hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = item.children
                  ? isActivePath(location.pathname, item.path) || item.children.some((child) => isActivePath(location.pathname, child.path))
                  : isActivePath(location.pathname, item.path);
                const baseText = 'text-white/80 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-white/5 transition-all';
                const baseBg = isActive ? 'bg-white/10 text-white light:text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] drop-shadow-[0_0_20px_rgba(22,119,255,0.4)] backdrop-blur-xl' : baseText;

                if (item.children) {
                  const isOpen = openMenu === item.label;
                  const menuId = `${item.label.toLowerCase()}-menu`;
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => openMenuNow(item.label)}
                      onMouseLeave={closeMenuSoon}
                      onBlur={(e) => {
                        if (isOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape' && isOpen) {
                          setOpenMenu(null);
                          menuTriggerRefs.current[item.label]?.focus();
                        }
                      }}
                    >
                      <button
                        ref={(el) => { menuTriggerRefs.current[item.label] = el; }}
                        type="button"
                        onClick={() => setOpenMenu((open) => (open === item.label ? null : item.label))}
                        aria-expanded={isOpen}
                        aria-controls={menuId}
                        className={`group relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${isOpen && !isActive ? 'bg-white/5 text-white light:text-slate-900' : baseBg}`}
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${item.columns === 1 ? 'w-[min(480px,calc(100vw-2rem))]' : 'w-[min(640px,calc(100vw-2rem))]'}`}>
                            <motion.div
                              id={menuId}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                              className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] light:border-slate-200 light:bg-white light:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                            >
                              <Link
                                to={item.path}
                                className="group/head mb-4 inline-flex items-center gap-1.5 px-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 transition-colors hover:text-white light:text-slate-500 light:hover:text-slate-900 focus:outline-none focus-visible:text-accent"
                              >
                                {item.heading ?? item.label}
                                <ArrowRight size={12} className="transition-transform group-hover/head:translate-x-0.5" />
                              </Link>
                              <ul className={`grid gap-1 ${item.columns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                {item.children.map((child) => {
                                  const Icon = child.icon;
                                  const childActive = isActivePath(location.pathname, child.path, location.hash);
                                  return (
                                    <li key={child.label}>
                                      <Link
                                        to={child.path}
                                        aria-current={childActive ? 'page' : undefined}
                                        className="group/item flex items-start gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.04] light:hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                      >
                                        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${childActive ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/10 bg-white/[0.03] text-slate-300 group-hover/item:border-accent/30 group-hover/item:text-accent light:border-slate-200 light:bg-slate-50 light:text-slate-500'}`}>
                                          <Icon size={18} strokeWidth={1.75} />
                                        </span>
                                        <span className="pt-0.5">
                                          <span className={`block text-[14px] font-semibold ${childActive ? 'text-accent' : 'text-white light:text-slate-900'}`}>{child.label}</span>
                                          <span className="mt-0.5 block text-[13px] leading-snug text-slate-400 light:text-slate-500">{child.desc}</span>
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

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

            <div className="flex items-center gap-2">
              <Link
                to="/hire"
                data-track="start_project"
                data-track-location="navbar"
                className="btn-primary group hidden lg:inline-flex !min-h-0 h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold"
              >
                Start Your Project
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent border-white/10 bg-white/10 text-white light:text-slate-700 hover:bg-white/20"
                aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <button
                ref={toggleButtonRef}
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent border-white/10 bg-white/10 text-white light:text-slate-700 hover:bg-white/20"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
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
              className="fixed inset-0 z-50 bg-[#0B1220]/80 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              ref={containerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] bg-[#0C1220] border-l border-white/5 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <CompanyLogo size="xs" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold tracking-tight text-white light:text-slate-900">Orbit</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">DevStudios</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white light:text-slate-700 transition hover:bg-white/10 hover:border-white/20 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-8 flex flex-col gap-2.5 overflow-y-auto">
                {mobileNavItems.map((item, index) => {
                  const isActive = isActivePath(location.pathname, item.path, location.hash);
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
                          ? 'bg-accent/10 border-accent/25 text-accent'
                          : 'bg-white/[0.02] border-white/5 text-white/90 light:text-slate-700 hover:border-white/10 hover:bg-white/[0.04] hover:text-white light:hover:text-slate-900'
                          }`}
                      >
                        <span>{item.label}</span>
                        <span className={`text-[9px] font-mono tracking-wider ${isActive ? 'text-accent' : 'text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <Link
                  to="/hire"
                  onClick={() => setMobileOpen(false)}
                  data-track="start_project"
                  data-track-location="mobile-menu"
                  className="btn-primary flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-all duration-200"
                >
                  Start Your Project
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
