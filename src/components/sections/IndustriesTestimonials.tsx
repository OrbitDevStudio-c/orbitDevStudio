import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    designation: "Chief Medical Officer",
    company: "HealthSync Providers",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    quote: "OrbitDevStudio didn't just build a portal; they completely re-engineered our clinical workflow. The HIPAA-compliant infrastructure they delivered reduced patient wait times by 40% and has run with literally zero downtime since launch.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    designation: "VP of Digital Commerce",
    company: "Aura Retail",
    industry: "E-Commerce",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    quote: "We were losing millions to a slow, monolithic backend. OrbitDevStudio migrated us to a headless Next.js architecture in record time. Our Black Friday traffic spiked by 300% and the servers didn't even flinch. Absolutely world-class engineering.",
    rating: 5,
  }
];

export default function IndustriesTestimonials() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto w-full relative z-10 text-white">
      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Don't just take our word for it.
        </h2>
      </div>

      <div className="flex flex-col gap-12">
        {testimonials.map((testi, index) => (
          <motion.div
            key={testi.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            className="group relative card-dark rounded-[32px] p-8 md:p-12 transition-shadow duration-500 flex flex-col md:flex-row gap-10 md:gap-16 items-center"
          >
            
            {/* Left: Portrait */}
            <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={testi.image} 
                  alt={testi.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={192}
                  height={192}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#1E2A4A] rounded-full flex items-center justify-center text-white shadow-lg z-20 group-hover:scale-110 transition-transform duration-500 delay-100">
                <Quote size={24} fill="currentColor" />
              </div>
              
              {/* Decorative abstract shape behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-[#1E2A4A]/[0.03] blur-2xl z-0" />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col flex-grow text-center md:text-left">
              
              <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-[#F6B73C]" fill="currentColor" />
                ))}
              </div>

              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8 tracking-tight">
                "{testi.quote}"
              </p>

              <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-[17px] font-bold text-white tracking-tight">{testi.name}</h4>
                  <p className="text-[14px] text-slate-400 font-medium">
                    {testi.designation} at <span className="text-accent">{testi.company}</span>
                  </p>
                </div>
                
                <div className="inline-flex px-3 py-1 bg-white/5 rounded-lg text-slate-300 text-[11px] font-bold tracking-wider uppercase border border-white/10">
                  {testi.industry}
                </div>
              </div>

            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
