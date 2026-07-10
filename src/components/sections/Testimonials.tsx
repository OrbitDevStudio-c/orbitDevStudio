import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useRef, useState } from 'react';
import { testimonials } from '../../data/testimonials';


function TestimonialAvatar({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('');

  if (error || !src) {
    return (
      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-accent/20 text-accent font-bold text-sm shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setError(true)}
      className="w-12 h-12 rounded-full border border-white/10 object-cover shrink-0"
      loading="lazy"
      width={48}
      height={48}
    />
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-grid py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-14 text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">Client Stories</span>
          <h2 className="text-h2 text-white tracking-tight">What our partners say</h2>
        </div>
        
        <div className="relative group">
          {/* Slider Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-accent hidden md:flex border border-white/15 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-accent hidden md:flex border border-white/15 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x hide-scrollbar pb-10 pt-4 px-4 -mx-4"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[85vw] max-w-[320px] md:w-auto md:min-w-[380px] shrink-0 snap-center card-dark p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <Quote size={32} className="text-accent/20 mb-4" />
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-normal">"{t.text}"</p>
                </div>
                
                <div className="border-t border-white/10 pt-5 mt-auto">
                  <div className="flex text-amber-400 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i <= t.rating ? "currentColor" : "none"} 
                        className={i <= t.rating ? "" : "text-white/10"} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <TestimonialAvatar src={t.avatar} name={t.name} />
                    <div>
                      <h4 className="text-white text-sm font-bold">{t.name}</h4>
                      <p className="text-slate-400 text-[11px] font-medium">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
