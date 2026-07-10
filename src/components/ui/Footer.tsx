import { Link } from "react-router-dom";
import { quickLinks, serviceLinks, socialLinks } from "../../data/navigation";

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const socialIconMap = {
  email: MailIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export default function Footer() {
  return (
    <footer className="section-dark relative mt-0 border-t border-white/10 overflow-hidden">
      {/* Glow Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Logo */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_15px_rgba(79,140,255,0.15)] group-hover:scale-105">
                <img
                  src="/companylogo.webp"
                  alt="OrbitDevStudio Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <span className="text-2xl font-semibold text-white tracking-tight">
                Orbit
                <span className="font-normal text-gray-400 group-hover:text-white transition-colors duration-300">
                  DevStudios
                </span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting premium digital experiences and innovative software
              solutions for tomorrow&apos;s leading brands.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3.5 text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="relative inline-block hover:text-white transition-colors group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-6">
              Services
            </h4>

            <ul className="space-y-3.5 text-sm text-gray-400">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="relative inline-block hover:text-white transition-colors group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-6">
              Connect
            </h4>

            <ul className="space-y-4 text-sm text-gray-400">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform as keyof typeof socialIconMap];

                return (
                  <li
                    key={link.platform}
                    className="flex items-center gap-3 group w-fit"
                  >
                    <span className="text-accent transition-all duration-300 group-hover:text-white group-hover:scale-110">
                      {Icon && <Icon />}
                    </span>

                    <a
                      href={link.url}
                      target={link.platform !== "email" ? "_blank" : undefined}
                      rel={
                        link.platform !== "email"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} OrbitDevStudio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}