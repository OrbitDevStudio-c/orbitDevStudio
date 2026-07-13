import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function ContactHero() {
  return (
    <section className="bg-[#0B1220] relative w-full min-h-[70vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F8CFF]/[0.08] blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A266A]/20 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#7C5CFF]/[0.08] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-white max-w-3xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase">Contact Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-bold tracking-tight leading-[1.1] mb-8 text-white">
            Let's build something <br className="hidden sm:block" /> incredible together.
          </h1>

          <p className="text-base sm:text-[16px] text-[#C7D2E4] leading-relaxed font-light mb-16 max-w-xl mx-auto">
            Whether you have a fully formed project or just an idea on a napkin, our team is ready to help you navigate the digital landscape. Reach out today.
          </p>
        </motion.div>

        {/* Floating Quick Info Card */}
        <div className="flex justify-center w-full mt-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="bg-[#0B1220] backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col items-center gap-5 hover:border-white/10 transition-all duration-300 w-full max-w-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(79,140,255,0.1)] shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
           >
             <div className="w-16 h-16 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center border border-white/5">
               <Mail className="text-[#4F8CFF]" size={28} />
             </div>
             <div className="text-center">
               <h3 className="font-bold text-white text-lg mb-1">Email Us</h3>
               <p className="text-sm text-[#94A3B8]">orbitdevstudios@gmail.com</p>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
