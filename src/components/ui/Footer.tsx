import { Link } from 'react-router-dom';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default function Footer() {
  return (
    <footer className="section-dark relative mt-0 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 transition-all group-hover:border-white/20 group-hover:bg-white/10">
                <img src="/companylogo.png" alt="OrbitDevStudio Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-2xl font-semibold text-white tracking-tight">
                Orbit<span className="font-light text-gray-400">DevStudio</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting premium digital experiences and innovative software solutions for tomorrow's leading brands.
            </p>
          </div>
          
          {/* Col 2 */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm">Quick Links</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors relative group inline-block">About Us<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors relative group inline-block">Our Work<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors relative group inline-block">Careers<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors relative group inline-block">Insights<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>
          
          {/* Col 3 */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm">Services</h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Web Development<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Mobile Apps<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">AI Solutions<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors relative group inline-block">Cloud Architecture<span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>
          
          {/* Col 4 */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="text-accent mt-0.5"><MailIcon /></span>
                <a href="mailto:orbitdevstudio@zohomail.in" className="hover:text-white transition-colors leading-relaxed">orbitdevstudio@zohomail.in</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent mt-0.5"><InstagramIcon /></span>
                <a href="https://instagram.com/orbitdevstudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">@orbitdevstudio</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent mt-0.5"><LinkedinIcon /></span>
                <a href="https://linkedin.com/company/orbitdevstudio-c" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">orbitdevstudio-c</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 relative">
          <p>© {new Date().getFullYear()} OrbitDevStudio. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0 font-medium">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/10 ml-2"
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
