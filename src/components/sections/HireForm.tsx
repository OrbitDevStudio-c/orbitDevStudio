import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { COUNTRY_CODES } from '../../utils/countryCodes';
import CompanyLogo from '../ui/CompanyLogo';

export default function HireForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [detailsTouched, setDetailsTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    // EmailJS Honeypot Spam Protection
    const honeypot = formData.get('website_url');
    if (honeypot) {
      console.warn('Spam submission detected via honeypot.');
      // Silently succeed to trick bots
      setToast({
        type: 'success',
        message: "Thank you! Your inquiry has been sent successfully. We'll get back to you within 24 hours."
      });
      form.reset();
      setPhone('');
      setDetails('');
      setDetailsTouched(false);
      return;
    }

    setFormStatus('submitting');
    
    // Extract full phone number (country code + number)
    const countryCode = formData.get('countryCode');
    const fullPhone = `${countryCode} ${phone}`;

    const templateParams = {
      from_name: formData.get('name'),
      reply_to: formData.get('email'),
      phone: fullPhone,
      service: formData.get('service'),
      message: details,
    };

    try {
      // NOTE: For full production security, the EmailJS dashboard's allowed-domains setting
      // should also be restricted to the production domain: https://orbit-dev-studio.vercel.app
      
      // 1. Send Contact Form details to OrbitDevStudio
      await emailjs.send(
        'service_3icvteb',
        'template_4l22qnf',
        templateParams,
        'Jsq6GMdkOWnsEaGIS'
      );

      // 2. Send Auto Reply to Client
      await emailjs.send(
        'service_3icvteb',
        'template_b56pwdk',
        templateParams,
        'Jsq6GMdkOWnsEaGIS'
      );

      // Success logic
      setFormStatus('idle');
      form.reset();
      setPhone('');
      setDetails('');
      setDetailsTouched(false);
      
      setToast({
        type: 'success',
        message: "Thank you! Your inquiry has been sent successfully. We'll get back to you within 24 hours."
      });
      setTimeout(() => setToast(null), 6000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('idle');
      setToast({
        type: 'error',
        message: "Failed to send inquiry. Please try again or email us directly."
      });
      setTimeout(() => setToast(null), 6000);
    }
  };

  return (
    <section id="hire-form" className="bg-[#101A2D] py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="bg-[#0B1220] rounded-[1.5rem] lg:rounded-[2rem] border border-white/5 flex flex-col lg:flex-row overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          
          {/* Custom Toast Overlay */}
          <AnimatePresence>
            {toast && (
              <motion.div 
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -20, x: '-50%' }}
                role={toast.type === 'success' ? 'status' : 'alert'}
                aria-live={toast.type === 'success' ? 'polite' : 'assertive'}
                className={`absolute top-6 left-1/2 z-50 px-6 py-3.5 rounded-full shadow-xl border flex items-center gap-3 backdrop-blur-md font-semibold text-sm w-[90%] md:w-auto text-center justify-center
                  ${toast.type === 'success' 
                    ? 'bg-emerald-500/90 border-emerald-400 text-white' 
                    : 'bg-red-500/90 border-red-400 text-white'
                  }`}
              >
                {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Sidebar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-[480px] bg-gradient-to-br from-[#162137] via-[#0E1627] to-[#0A101C] p-8 md:p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F8CFF] opacity-[0.06] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F8CFF] opacity-[0.05] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            {/* Tiny floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#4F8CFF]/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.1, 0.6, 0.1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* TOP BRANDING */}
              <div className="flex flex-col items-center mt-2 mb-10 w-full">
                <div className="flex items-center gap-4 justify-center">
                  <CompanyLogo size="xs" />
                  <div className="text-3xl md:text-[42px] font-bold leading-none tracking-tight flex items-center">
                    <span className="text-white">Orbit</span>
                    <span className="text-[#A7B3C8]">DevStudios</span>
                  </div>
                </div>
                
                <p className="text-[19px] text-[#A5B4D4] font-medium text-center tracking-wide mt-6">
                  Engineering Digital Products That Scale
                </p>
                
                {/* DIVIDER */}
                <div className="mt-12 w-full flex justify-center">
                  <motion.div 
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#4F8CFF] to-transparent"
                    style={{ boxShadow: '0 0 12px 1px rgba(79, 140, 255, 0.5)' }}
                  />
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-5 leading-[1.05] tracking-tight text-white">
                  Hire Us For Your <br className="hidden lg:block"/> Next Project
                </h2>
                <p className="text-[#C7D2E4] leading-[1.8] text-[16px] font-light max-w-[420px]">
                  Have a specific project in mind or need dedicated talent? Fill out the form and our technical consultants will reach out to you within 24 hours.
                </p>
              </div>

              {/* CONTACT INFO */}
              <div className="flex flex-col gap-4 mt-auto">
                {/* Card 1: Email */}
                <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#4F8CFF]/15 group-hover:border-[#4F8CFF]/30 transition-all duration-300">
                    <Mail size={18} className="text-[#4F8CFF] md:w-5 md:h-5" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 w-full">
                    <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#94A3B8] uppercase mb-1">Email</p>
                    <a href="mailto:orbitdevstudios@gmail.com" className="text-[13px] sm:text-[15px] text-white font-medium group-hover:text-[#4F8CFF] transition-colors break-all">
                      orbitdevstudios@gmail.com
                    </a>
                  </div>
                </div>

                {/* Card 2: Location */}
                <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#4F8CFF]/15 group-hover:border-[#4F8CFF]/30 transition-all duration-300">
                    <MapPin size={18} className="text-[#4F8CFF] md:w-5 md:h-5" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 w-full">
                    <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#94A3B8] uppercase mb-1">Location</p>
                    <p className="text-[13px] sm:text-[15px] text-white font-medium truncate">
                      Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>

          {/* Right Form */}
          <div className="flex-1 p-6 md:p-10 lg:p-14 bg-transparent relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
              {/* Honeypot field for spam protection */}
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  name="website_url" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] placeholder:text-slate-500"
                  />
                </div>
                
                {/* Email Address */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] placeholder:text-slate-500"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="phone" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Phone Number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-2">
                    <select 
                      name="countryCode"
                      className="w-full sm:w-[120px] px-3 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] cursor-pointer"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}`} value={c.code} className="bg-[#101A2D] text-white py-2">
                          {c.country} {c.code}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      id="phone" 
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 10) setPhone(val);
                      }}
                      pattern="\d{10}"
                      title="Please enter exactly 10 digits"
                      placeholder="00000 00000"
                      className="flex-1 w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Interested Service */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="service" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Interested Service
                  </label>
                  <select 
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#101A2D] text-white">Select a service</option>
                    <option value="web" className="bg-[#101A2D] text-white">Web Development</option>
                    <option value="mobile" className="bg-[#101A2D] text-white">Mobile Development</option>
                    <option value="full-stack" className="bg-[#101A2D] text-white">Full-Stack Team</option>
                    <option value="uiux" className="bg-[#101A2D] text-white">UI/UX Design</option>
                    <option value="other" className="bg-[#101A2D] text-white">Other / Not Sure</option>
                  </select>
                </div>

                {/* Project Budget */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="budget" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Project Budget
                  </label>
                  <select 
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#101A2D] text-white">Select budget range</option>
                    <option value="10k-25k" className="bg-[#101A2D] text-white">$10k - $25k</option>
                    <option value="25k-50k" className="bg-[#101A2D] text-white">$25k - $50k</option>
                    <option value="50k-100k" className="bg-[#101A2D] text-white">$50k - $100k</option>
                    <option value="100k+" className="bg-[#101A2D] text-white">$100k+</option>
                    <option value="undecided" className="bg-[#101A2D] text-white">Undecided / TBD</option>
                  </select>
                </div>

                {/* Expected Timeline */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="timeline" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Expected Timeline
                  </label>
                  <select 
                    id="timeline"
                    name="timeline"
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#101A2D] text-white">Select timeline</option>
                    <option value="immediate" className="bg-[#101A2D] text-white">Immediate start</option>
                    <option value="1-3-months" className="bg-[#101A2D] text-white">Within 1-3 months</option>
                    <option value="3-6-months" className="bg-[#101A2D] text-white">3-6 months</option>
                    <option value="flexible" className="bg-[#101A2D] text-white">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="flex justify-between items-end">
                  <label htmlFor="details" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Project Details
                  </label>
                  <span className={`text-[10px] font-bold ${
                    !detailsTouched 
                      ? 'text-slate-400' 
                      : (details.length < 50 || details.length > 300 ? 'text-red-400' : 'text-emerald-500')
                  }`}>
                    {details.length} / 300
                  </span>
                </div>
                <textarea 
                  id="details" 
                  name="message"
                  required
                  minLength={50}
                  maxLength={300}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  onBlur={() => setDetailsTouched(true)}
                  placeholder="Tell us about your project or requirements (min 50 characters)..."
                  className="w-full px-4 sm:px-5 py-4 h-[200px] sm:h-[240px] rounded-xl border border-white/10 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-white/[0.04] text-white hover:bg-white/[0.06] resize-none placeholder:text-slate-500"
                ></textarea>
              </div>

              {/* Security Note */}
              <div className="flex justify-center mt-2">
                <p className="text-[11px] text-slate-500">
                  Locked and secured with enterprise-grade encryption. We never share your data.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="mt-4 w-full bg-accent text-slate-950 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-[0_4px_15px_rgba(79,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,140,255,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {formStatus === 'submitting' ? (
                  <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>
              
              {/* Trust Row */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium tracking-wide">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium tracking-wide">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>NDA Available</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium tracking-wide">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Enterprise Secure</span>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
