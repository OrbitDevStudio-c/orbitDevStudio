import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesCTA() {
  return (
    <section className="relative w-full overflow-hidden py-32 z-10">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Top Icon */}
          <div className="w-16 h-16 bg-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-8">
            <Rocket size={28} className="text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[white] tracking-tight mb-6">
            Let's Build Something Exceptional Together
          </h2>
          
          <p className="text-slate-500 text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you're launching your first product, scaling an existing platform, or modernizing a legacy system — we have the engineering depth and strategic clarity to make it happen, on time and on budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3.5 bg-[#1d4ed8] text-white font-bold text-[14px] rounded-xl hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto flex justify-center"
            >
              Book a Free Strategy Call
            </Link>
            
            <Link 
              to="/portfolio"
              className="px-8 py-3.5 bg-white text-[#0f172a] border border-slate-200 font-bold text-[14px] rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto flex justify-center shadow-sm"
            >
              View Our Work
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
