import { useMemo } from 'react';
import { techStack } from '../../data/techStack';


const marqueeKeyframes = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.333%); }
  }
`;

export default function TechStackMarquee() {
  const items = useMemo(() => [...techStack, ...techStack, ...techStack], []);

  return (
    <section className="section-grid py-10 overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
          Technologies we work with
        </p>
      </div>

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#060B1A] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#060B1A] to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden group">
        <div 
          className="flex gap-10 px-4 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {items.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors cursor-default shrink-0"
            >
              <tech.Icon size={18} />
              <span className="text-sm font-medium tracking-wide">{tech.name}</span>
              {idx < items.length - 1 && (
                <span className="text-white/25 ml-4 text-xs select-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{marqueeKeyframes}</style>
    </section>
  );
}
