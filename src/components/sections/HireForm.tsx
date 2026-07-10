import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { COUNTRY_CODES } from '../../utils/countryCodes';

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
    <section id="hire-form" className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="bg-slate-900 rounded-[2rem] border border-white/10 flex flex-col lg:flex-row overflow-hidden relative shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          
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
          <div className="lg:w-[400px] bg-gradient-to-br from-surfaceHighlight to-surface p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Hire Us For Your Next Project
              </h2>
              <p className="text-blue-100/90 leading-relaxed mb-12 text-sm md:text-base">
                Have a specific project in mind or need dedicated talent? Fill out the form and our technical consultants will reach out to you.
              </p>

              <div className="flex flex-col gap-8">
                {/* Email Section */}
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#1E2A4A] transition-all duration-300">
                    <Mail size={20} className="text-white group-hover:text-[#1E2A4A] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-1">Email Us</p>
                    <a href="mailto:orbitdevstudios@gmail.com" className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                      orbitdevstudios@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex-1 p-10 md:p-14 bg-transparent relative">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white"
                  />
                </div>
                
                {/* Email Address */}
                <div className="flex flex-col gap-2">
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
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select 
                      name="countryCode"
                      className="w-[110px] px-2 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white select-dark"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}`} value={c.code} className="bg-slate-900 text-white">
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
                      className="flex-1 w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white"
                    />
                  </div>
                </div>

                {/* Interested Service */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Interested Service
                  </label>
                  <select 
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white select-dark"
                  >
                    <option value="" disabled className="bg-slate-900 text-white">Select a service</option>
                    <option value="web" className="bg-slate-900 text-white">Web Development</option>
                    <option value="mobile" className="bg-slate-900 text-white">Mobile Development</option>
                    <option value="full-stack" className="bg-slate-900 text-white">Full-Stack Team</option>
                    <option value="uiux" className="bg-slate-900 text-white">UI/UX Design</option>
                    <option value="other" className="bg-slate-900 text-white">Other / Not Sure</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col gap-2">
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
                  rows={5}
                  minLength={50}
                  maxLength={300}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  onBlur={() => setDetailsTouched(true)}
                  placeholder="Tell us about your project or requirements (min 50 characters)..."
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all bg-white/5 text-white resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="mt-4 w-full bg-accent text-slate-950 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
              
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Locked and secured with enterprise-grade encryption. We never share your data.
              </p>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
