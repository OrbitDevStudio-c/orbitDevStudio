import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import ServiceParticles from './ServiceParticles';

export default function ContactHero() {
  return (
    <section className="relative w-full min-h-[70vh] bg-gradient-to-br from-[#152A5A] to-[#132E7B] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Confined particle background */}
      <ServiceParticles />
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F8CFF]/20 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1B3675]/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-white max-w-3xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">Contact Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight leading-[1.1] mb-6">
            Let's build something <br className="hidden sm:block" /> incredible together.
          </h1>

          <p className="text-base sm:text-[15px] text-white/70 leading-relaxed font-light mb-12 max-w-xl mx-auto">
            Whether you have a fully formed project or just an idea on a napkin, our team is ready to help you navigate the digital landscape. Reach out today.
          </p>
        </motion.div>

        {/* Floating Quick Info Card */}
        <div className="flex justify-center w-full mt-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors w-full max-w-sm"
           >
             <div className="w-16 h-16 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center border border-[#4F8CFF]/30">
               <Mail className="text-[#4F8CFF]" size={28} />
             </div>
             <div className="text-center">
               <h3 className="font-bold text-white text-lg mb-1">Email Us</h3>
               <p className="text-sm text-white/70">orbitdevstudios@gmail.com</p>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
