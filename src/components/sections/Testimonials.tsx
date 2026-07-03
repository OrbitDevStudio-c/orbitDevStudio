import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'Finova',
    text: 'OrbitDevStudio delivered beyond our expectations. Their architectural decisions and technical expertise helped us scale our platform effortlessly.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'James Anderson',
    role: 'Founder',
    company: 'NexGen',
    text: 'Professional, reliable, and highly skilled. They didn’t just write code; they understood our product vision and turned it into a world-class experience.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'Product Head',
    company: 'HealthPlus',
    text: 'Outstanding communication and delivery. The team’s dedication to quality and performance is unmatched in the industry.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'CEO',
    company: 'ShopSphere',
    text: 'Their engineering quality and design sense elevated our platform to the next level, resulting in a 40% increase in conversion rates.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Director',
    company: 'MedSync',
    text: 'A truly premium agency experience. They are fast, responsive, and incredibly talented. We consider them an extension of our own team.',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-14 text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] block mb-3">Client Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">What our partners say</h2>
        </div>
        
        <div className="relative group">
          {/* Slider Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-900 z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-accent hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-900 z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-accent hidden md:flex"
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
                className="min-w-[320px] md:min-w-[380px] snap-center card-white p-8 flex flex-col justify-between"
              >
                <div>
                  <Quote size={32} className="text-accent/20 mb-4" />
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 font-light">"{t.text}"</p>
                </div>
                
                <div className="border-t border-gray-100 pt-5 mt-auto">
                  <div className="flex text-amber-400 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" loading="lazy" />
                    <div>
                      <h4 className="text-primary text-sm font-bold">{t.name}</h4>
                      <p className="text-gray-500 text-[11px] font-medium">{t.role}, {t.company}</p>
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
