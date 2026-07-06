import { Link } from 'react-router-dom';


const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

export default function Footer() {
  return (
    <footer className="section-dark relative mt-0 border-t border-white/10 overflow-hidden">
      {/* Glow Accent Line at Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 text-left">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8 justify-items-start">
          
          {/* Col 1 - Logo & Description */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_15px_rgba(79,140,255,0.15)] group-hover:scale-105">
                <img src="/companylogo-96.png" alt="OrbitDevStudio Logo" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <span className="text-2xl font-semibold text-white tracking-tight">
                Orbit<span className="font-light text-gray-400 transition-colors duration-300 group-hover:text-accent">DevStudio</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting premium digital experiences and innovative software solutions for tomorrow's leading brands.
            </p>
          </div>
          
          {/* Col 2 - Quick Links */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wider text-xs uppercase text-slate-200">Quick Links</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors relative group inline-block">About Us<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors relative group inline-block">Our Work<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors relative group inline-block">Careers<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>
          
          {/* Col 3 - Services */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wider text-xs uppercase text-slate-200">Services</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Web Development<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Mobile Apps<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">AI Solutions<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Cloud Architecture<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>
          
          {/* Col 4 - Connect */}
          <div className="col-span-2 sm:col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wider text-xs uppercase text-slate-200">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 group/link w-fit">
                <span className="text-accent mt-0.5 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:text-white"><MailIcon /></span>
                <a href="mailto:orbitdevstudios@gmail.com" className="hover:text-white transition-colors leading-relaxed">orbitdevstudios@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 group/link w-fit">
                <span className="text-accent mt-0.5 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:text-white"><InstagramIcon /></span>
                <a href="https://instagram.com/orbitdevstudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">@orbitdevstudio</a>
              </li>
              <li className="flex items-center gap-3 group/link w-fit">
                <span className="text-accent mt-0.5 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:text-white"><LinkedinIcon /></span>
                <a href="https://linkedin.com/company/orbitdevstudio-c" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">orbitdevstudio-c</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 relative gap-6">
          <p className="order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} OrbitDevStudio. All rights reserved.
          </p>
          <div className="order-1 md:order-2 flex flex-wrap items-center justify-center md:justify-end gap-6 font-medium w-full md:w-auto">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all cursor-pointer shadow-md shadow-black/10"
              aria-label="Back to top"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
