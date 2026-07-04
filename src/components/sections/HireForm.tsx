import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HireForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="hire-form" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Sidebar */}
          <div className="lg:w-[400px] bg-gradient-to-br from-[#2E5BE5] to-[#1B3675] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F8CFF] opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
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
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#1B3675] transition-all duration-300">
                    <Mail size={20} className="text-white group-hover:text-[#1B3675] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-1">Email Us</p>
                    <a href="mailto:orbitdevstudio@zohomail.in" className="text-white font-semibold group-hover:text-blue-200 transition-colors">
                      orbitdevstudio@zohomail.in
                    </a>
                  </div>
                </div>
                
                {/* Note: Visit Us and Call Us removed per user request */}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex-1 p-10 md:p-14 bg-white relative">
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B3675]">Inquiry Sent!</h3>
                <p className="text-slate-500 max-w-sm">
                  Thank you for reaching out. Our technical consultants will get back to you shortly.
                </p>
                <button 
                  onClick={() => {
                    setFormStatus('idle');
                    setDetails('');
                    setPhone('');
                  }}
                  className="mt-6 px-6 py-2 border border-[#4F8CFF] text-[#4F8CFF] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50"
                    />
                  </div>
                  
                  {/* Email Address */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select 
                        className="w-24 px-2 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50 text-slate-700"
                      >
                        <option value="+91">IND +91</option>
                        <option value="+44">UK +44</option>
                        <option value="+1">US +1</option>
                        <option value="+61">AUS +61</option>
                      </select>
                      <input 
                        type="text" 
                        id="phone" 
                        required
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setPhone(val);
                        }}
                        pattern="\d{10}"
                        title="Please enter exactly 10 digits"
                        placeholder="00000 00000"
                        className="flex-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Interested Service */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Interested Service
                    </label>
                    <select 
                      id="service" 
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50 text-slate-700"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="full-stack">Full-Stack Team</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label htmlFor="details" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Project Details
                    </label>
                    <span className={`text-[10px] font-bold ${details.length < 50 || details.length > 300 ? 'text-red-400' : 'text-emerald-500'}`}>
                      {details.length} / 300
                    </span>
                  </div>
                  <textarea 
                    id="details" 
                    required
                    rows={5}
                    minLength={50}
                    maxLength={300}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us about your project or requirements (min 50 characters)..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4F8CFF] focus:ring-1 focus:ring-[#4F8CFF] transition-all bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="mt-4 w-full bg-[#1B3675] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#152A5A] transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
