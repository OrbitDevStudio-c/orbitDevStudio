import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndustriesCTA() {
  return (
    <section className="relative w-full overflow-hidden py-32 z-10">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center card-dark rounded-[32px] p-12 md:p-20 hover:-translate-y-2 transition-all duration-500 w-full"
        >
          {/* Top Icon */}
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-8">
            <Rocket size={28} className="text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to Disrupt Your Industry?
          </h2>
          
          <p className="text-slate-400 text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you need a high-end architectural portfolio, a scalable e-commerce platform, or a secure medical portal — our team is ready to engineer a solution tailored to your exact market demands.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3.5 bg-accent text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 transition-colors shadow-md w-full sm:w-auto flex justify-center"
            >
              Book a Strategy Call
            </Link>
            
            <Link 
              to="/portfolio"
              className="px-8 py-3.5 bg-white/5 text-white border border-white/10 font-bold text-[14px] rounded-xl hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto flex justify-center shadow-sm"
            >
              View Our Work
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
