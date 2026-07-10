import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Zap, CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Top 1% Talent Access',
    description: 'We rigorously vet our engineers for both technical brilliance and communication skills, ensuring you only work with the absolute best.'
  },
  {
    icon: Zap,
    title: 'Zero Onboarding Friction',
    description: 'Our developers integrate directly into your existing Slack, Jira, and daily standups. They operate as a true extension of your in-house team.'
  },
  {
    icon: Rocket,
    title: 'Scale on Demand',
    description: 'Need to accelerate a release? Easily ramp up your dedicated resources and scale back down when the heavy lifting is done.'
  },
  {
    icon: Shield,
    title: 'Risk-Free Engagement',
    description: 'If a developer isn\'t the perfect fit within the first two weeks, we will replace them immediately at no additional cost to you.'
  }
];

export default function HireWhyUs() {
  return (
    <section className="bg-navy-soft py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Images/Graphics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/[0.03] rounded-full blur-3xl -z-10" />
            
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="flex flex-col gap-6 pt-12">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5] group border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/80 to-transparent z-10" />
                  <img src="/developer-working.webp" alt="Developer working" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle2 className="text-white" size={20} />
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide">Vetted Experts</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5] group border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/80 to-transparent z-10" />
                  <img src="/team-collaboration.webp" alt="Team collaboration" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
                      <Zap className="text-white" size={20} />
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide">Rapid Deployment</span>
                  </div>
                </div>
              </div>

              {/* Center Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-white/15 p-5 rounded-2xl shadow-2xl z-30 flex items-center gap-4 animate-[bounce_4s_infinite]">
                 <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-2xl font-black text-white">10+</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Years Experience</p>
                    <p className="text-sm font-bold text-white">Building Software</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              THE ORBIT ADVANTAGE
            </span>
            <h2 className="text-h2 text-white mb-6 leading-tight">
              Why augment your team with us?
            </h2>
            <p className="text-[15px] text-slate-400 leading-relaxed mb-12">
              Hiring locally is slow, expensive, and risky. We eliminate the recruitment headache by providing instant access to a pre-vetted pool of senior engineering talent ready to push code on day one.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <benefit.icon size={22} className="text-slate-400 group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
