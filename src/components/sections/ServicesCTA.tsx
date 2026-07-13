import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesCTA() {
  return (
    <section className="bg-[#101A2D] relative w-full overflow-hidden py-32 z-10">
      {/* Soft radial ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle,_rgba(79,140,255,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Top Icon */}
          <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,140,255,0.2)] mb-8 border border-accent/20">
            <Rocket size={36} className="text-accent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Let's Build Something Exceptional Together
          </h2>
          
          <p className="text-[#C7D2E4] text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you're launching your first product, scaling an existing platform, or modernizing a legacy system — we have the engineering depth and strategic clarity to make it happen, on time and on budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3.5 bg-accent text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 transition-all shadow-[0_4px_15px_rgba(79,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(79,140,255,0.5)] w-full sm:w-auto flex justify-center hover:-translate-y-0.5"
            >
              Book a Free Strategy Call
            </Link>
            
            <Link 
              to="/portfolio"
              className="px-8 py-3.5 bg-white/5 text-white border border-white/10 font-bold text-[14px] rounded-xl hover:bg-white/10 hover:border-white/30 transition-all w-full sm:w-auto flex justify-center shadow-sm hover:-translate-y-0.5"
            >
              View Our Work
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
