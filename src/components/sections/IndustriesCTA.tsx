import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndustriesCTA() {
  return (
    <section className="bg-navy-soft relative w-full overflow-hidden py-32 z-10">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center bg-white rounded-[32px] p-12 md:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 w-full"
        >
          {/* Top Icon */}
          <div className="w-16 h-16 bg-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-8">
            <Rocket size={28} className="text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] tracking-tight mb-6">
            Ready to Disrupt Your Industry?
          </h2>
          
          <p className="text-slate-500 text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you need a high-end architectural portfolio, a scalable e-commerce platform, or a secure medical portal — our team is ready to engineer a solution tailored to your exact market demands.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3.5 bg-[#1d4ed8] text-white font-bold text-[14px] rounded-xl hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto flex justify-center"
            >
              Book a Strategy Call
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
