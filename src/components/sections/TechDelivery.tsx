import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building, LineChart, Users, Check, LayoutTemplate, MonitorSmartphone, Code2, Cloud, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const scaleCards = [
  {
    icon: Building,
    title: 'Enterprise Solutions',
    description: 'We architect secure, compliant, and highly scalable platforms that integrate seamlessly with your existing enterprise systems, reduce operational friction, and support organizational growth without compromising governance.'
  },
  {
    icon: LineChart,
    title: 'Growth-Stage Businesses',
    description: 'Launch revenue-generating digital products fast. We help growing businesses move from concept to production with modern UX, marketing automation, and analytics-ready infrastructure.'
  },
  {
    icon: Users,
    title: 'End-User Experiences',
    description: 'We put your users at the center of every design and engineering decision — building experiences that are intuitive, inclusive, and engaging enough to drive long-term loyalty and retention.'
  }
];

const operatingModel = [
  {
    title: 'Uncompromising Code Quality',
    description: 'Every line of code passes through rigorous architecture reviews, automated test suites, and manual QA gates. We enforce coding standards, conduct peer reviews, and run performance benchmarks before any release reaches production — ensuring stability you can depend on.'
  },
  {
    title: 'Full Delivery Transparency',
    description: 'Track progress in real-time. From sprint planning to deployment, our transparent dashboards and direct communication channels keep you informed.'
  },
  {
    title: 'Adaptive Delivery Model',
    description: 'Our agile methodology means we adapt to changing market conditions and user feedback without disrupting the overall product timeline.'
  },
  {
    title: 'Cost-Efficient Engineering',
    description: 'We optimize infrastructure and automate redundant tasks to ensure your budget is spent on high-impact features, not maintenance.'
  }
];

export default function TechDelivery() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 lg:gap-20">
        
        {/* Top Section: Who We Build For */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#0B1736] rounded-[2rem] p-8 md:p-12 lg:p-16 text-white shadow-xl"
        >
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-3">
              WHO WE BUILD FOR
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
              Tailored technology solutions for every business scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {scaleCards.map((card, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-6">
                  <card.icon size={20} className="text-blue-300" />
                </div>
                <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                <p className="text-sm text-blue-100/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white hover:text-blue-300 transition-colors">
            GET FREE QUOTE <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Middle Section: Full-Stack Delivery */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2E5BE5] uppercase block mb-3">
              FULL-STACK DELIVERY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-6 max-w-lg">
              End-to-end execution across every discipline.
            </h2>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-8 max-w-lg">
              From UX strategy and front-end engineering to cloud infrastructure and security compliance, we cover every layer of your product so your team can focus on growth — not firefighting.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2E5BE5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 shadow-md"
            >
              Get Free Quote
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-[#0B1736] rounded-[2rem] p-8 lg:p-10 shadow-2xl border border-white/5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-8">
                TECHNOLOGIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: LayoutTemplate, label: 'UX & Design' },
                  { icon: MonitorSmartphone, label: 'Web Development' },
                  { icon: Code2, label: 'API Engineering' },
                  { icon: Cloud, label: 'Cloud Infrastructure' },
                  { icon: Shield, label: 'Security & Compliance' },
                  { icon: Zap, label: 'Performance & Scale' }
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <tech.icon size={16} className="text-blue-300" />
                    </div>
                    <span className="text-sm font-medium text-white">{tech.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#122350] rounded-xl p-5 border border-white/10 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Check size={20} className="text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 tracking-wider">360° DELIVERY VISIBILITY</h4>
                  <p className="text-xs text-blue-100/70">Full transparency across design, engineering, and deployment.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Operating Model */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch mt-12 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2E5BE5] uppercase block mb-3">
              OUR DELIVERY APPROACH
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-6">
              A proven operating model built for clarity and results
            </h2>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-10">
              Every engagement at OrbitDevStudio follows a disciplined four-pillar model — quality, transparency, adaptability, and value — so your product ships on schedule, on budget, and above expectations.
            </p>

            <div className="flex flex-col relative">
              {/* Connecting vertical line */}
              <div className="absolute left-4 top-4 bottom-8 w-px bg-slate-200 z-0" />
              
              {operatingModel.map((item, i) => (
                <div 
                  key={i} 
                  className="flex gap-6 relative z-10 mb-6 last:mb-0 group cursor-pointer"
                  onClick={() => setActiveStep(i)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors duration-300 ${activeStep === i ? 'bg-[#0B1736] text-white' : 'bg-white border border-slate-200 text-slate-500 group-hover:border-[#2E5BE5] group-hover:text-[#2E5BE5]'}`}>
                    {i + 1}
                  </div>
                  <div className={`pt-1 transition-all duration-300 w-full ${activeStep === i ? 'bg-slate-50 p-5 rounded-2xl border border-slate-100 -mt-4 shadow-sm' : ''}`}>
                    <h3 className={`text-base font-bold mb-1 transition-colors ${activeStep === i ? 'text-[#0f172a]' : 'text-slate-600 group-hover:text-[#0f172a]'}`}>
                      {item.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{ height: activeStep === i ? 'auto' : 0, opacity: activeStep === i ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-slate-500 leading-relaxed mt-2 pb-1 pr-4">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-end lg:mb-12" 
          >
            <div className="w-full aspect-square md:aspect-auto md:h-[100%] bg-gradient-to-br from-[#2E5BE5] to-[#4F8CFF] rounded-[2rem] shadow-2xl shadow-blue-500/20 flex items-center justify-center p-12 relative overflow-hidden group">
               {/* Abstract background */}
               <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,rgba(255,255,255,.03)_0_1px,transparent_1px_20px)] opacity-10 mix-blend-overlay" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
               
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeStep}
                   initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -10, 0] }}
                   exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                   transition={{ duration: 0.4, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                   className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                 >
                   {activeStep === 0 && (
                     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                        <path d="M50 5 L90 20 L90 50 C90 75 50 95 50 95 C50 95 10 75 10 50 L10 20 L50 5 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        <path d="M50 12 L82 24 L82 48 C82 68 50 85 50 85 C50 85 18 68 18 48 L18 24 L50 12 Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M35 45 L45 55 L65 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   )}
                   
                   {activeStep === 1 && (
                     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                        <path d="M10 50 C30 20 70 20 90 50 C70 80 30 80 10 50 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <circle cx="50" cy="50" r="18" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="3" />
                        <circle cx="50" cy="50" r="8" fill="white" />
                        <path d="M50 15 L50 35 M50 65 L50 85 M15 50 L35 50 M65 50 L85 50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
                     </svg>
                   )}

                   {activeStep === 2 && (
                     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                        <path d="M25 50 C25 35 45 35 50 50 C55 65 75 65 75 50 C75 35 55 35 50 50 C45 65 25 65 25 50 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                        <circle cx="25" cy="50" r="12" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
                        <circle cx="75" cy="50" r="12" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
                        <circle cx="50" cy="50" r="8" fill="white" />
                     </svg>
                   )}

                   {activeStep === 3 && (
                     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                        <rect x="20" y="55" width="16" height="30" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <rect x="42" y="40" width="16" height="45" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                        <rect x="64" y="20" width="16" height="65" rx="4" fill="white" stroke="white" strokeWidth="2" />
                        <path d="M15 65 L45 35 L55 45 L85 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M70 15 L85 15 L85 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   )}
                 </motion.div>
               </AnimatePresence>
            </div>
            
            {/* PER USER REQUEST: Whitespace preserved here */}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
