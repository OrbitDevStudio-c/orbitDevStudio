import { motion } from 'framer-motion';

export default function AboutStory() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col max-w-xl"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F8CFF] uppercase block mb-3">
              OUR ORIGIN STORY
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1B3675] mb-8 leading-tight">
              Built by engineers, for forward-thinking businesses.
            </h2>
            
            <div className="w-16 h-1.5 bg-[#1B3675] mb-10 rounded-full" />
            
            <div className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
              <p>
                OrbitDevStudio was founded on a simple premise: businesses shouldn't have to choose between fast delivery and robust, scalable architecture. In an industry flooded with rushed templates and fragile codebases, we set out to build digital products that last.
              </p>
              <p>
                What started as a small team of passionate senior engineers has grown into a premier development studio. Over the years, we've helped startups scale to millions of users, modernized legacy enterprise systems, and launched high-converting digital storefronts.
              </p>
              <p>
                Our philosophy is rooted in engineering excellence and radical transparency. We believe in writing clean code, maintaining open lines of communication, and treating every client's product as if it were our own.
              </p>
            </div>
          </motion.div>

          {/* Right: Images Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] md:h-[600px] w-full"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />
            
            {/* Main large image */}
            <div className="absolute right-0 top-0 w-3/4 h-[80%] rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="OrbitDevStudio team collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Secondary overlapping image */}
            <div className="absolute left-0 bottom-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(27,54,117,0.3)] z-20 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" 
                alt="Developer writing code" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Element */}
            <div className="absolute right-[10%] bottom-[15%] z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1B3675] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                50+
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1B3675]">Global Experts</span>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">In-house</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
