import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Clock, X, CheckCircle2, Briefcase } from 'lucide-react';

const positions = [
  {
    id: 1,
    title: 'SEO Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Learn and execute search engine optimization strategies, conduct keyword research, and optimize content for maximum visibility.'
  },
  {
    id: 2,
    title: 'UI/UX Intern',
    department: 'Design',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Assist in creating user-centered designs, wireframes, and prototypes while learning modern UI/UX principles and tools.'
  },
  {
    id: 3,
    title: 'MERN Stack Intern',
    department: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Work alongside senior engineers building full-stack web applications using MongoDB, Express, React, and Node.js.'
  },
  {
    id: 4,
    title: 'Content Creator Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Internship',
    experience: '0-6 months',
    description: 'Help craft engaging written and visual content for social media, blogs, and marketing campaigns to build our brand presence.'
  }
];

export default function CareersOpenings() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const closeForm = () => {
    setSelectedJob(null);
    setTimeout(() => setFormStatus('idle'), 300);
  };

  return (
    <section id="open-positions" className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
            CURRENT OPENINGS
          </span>
          <h2 className="text-h2 text-white mb-6">
            Find your next role.
          </h2>
          <p className="text-[15px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Don't see a role that fits exactly? We're always open to meeting talented people. Send your resume to <a href="mailto:orbitdevstudios@gmail.com" className="text-accent font-semibold hover:underline">orbitdevstudios@gmail.com</a>.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {positions.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group card-dark p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded-full border border-accent/20">
                    {job.department}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {job.type}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} />
                    {job.experience}
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                  {job.description}
                </p>
              </div>

              <div className="shrink-0 md:ml-8">
                <button 
                  onClick={() => setSelectedJob(job.title)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white transition-all group-hover:bg-accent group-hover:text-slate-950 group-hover:border-accent cursor-pointer"
                >
                  Apply Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-2xl font-bold text-white">Apply for {selectedJob}</h3>
                  <p className="text-sm text-slate-400 mt-1">Please fill in your details below.</p>
                </div>
                <button 
                  onClick={closeForm}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 overflow-y-auto">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Application Submitted!</h4>
                    <p className="text-slate-400 max-w-sm mx-auto mb-8">
                      Thank you for applying to OrbitDevStudio. Our hiring team will review your application and get back to you soon.
                    </p>
                    <button 
                      onClick={closeForm}
                      className="px-8 py-3 bg-accent text-slate-950 rounded-lg font-semibold hover:bg-accent/90 transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Full Name *</label>
                        <input type="text" name="name" required placeholder="John Doe" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Email Address *</label>
                        <input type="email" name="email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" placeholder="john@example.com" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Phone Number *</label>
                        <input type="tel" name="phone" required pattern="\d{10}" title="Please enter exactly 10 digits" placeholder="00000 00000" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Current Position</label>
                        <input type="text" name="currentPosition" placeholder="e.g. Student, Freelancer" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Current / Expected CTC</label>
                        <input type="text" name="ctc" placeholder="e.g. 3 LPA" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Experience in Industry *</label>
                        <select name="experience" required className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white">
                          <option value="" className="bg-slate-900 text-white">Select experience</option>
                          <option value="0-6 months" className="bg-slate-900 text-white">0-6 months</option>
                          <option value="6-12 months" className="bg-slate-900 text-white">6-12 months</option>
                          <option value="1-2 years" className="bg-slate-900 text-white">1-2 years</option>
                          <option value="2+ years" className="bg-slate-900 text-white">2+ years</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Resume / CV *</label>
                        <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[13px] file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Portfolio / LinkedIn URL</label>
                        <input type="url" name="portfolio" placeholder="https://..." className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Cover Letter / Note</label>
                      <textarea rows={4} placeholder="Why are you a good fit for this role?" className="px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-accent bg-white/5 text-white resize-none"></textarea>
                    </div>

                    <div className="mt-4 pt-6 border-t border-white/10 flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={closeForm}
                        className="px-6 py-3 text-slate-400 font-semibold hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="bg-accent text-slate-950 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {formStatus === 'submitting' ? (
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
