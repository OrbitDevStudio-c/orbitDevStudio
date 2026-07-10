import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiTypescript, SiPython } from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
import { useMemo } from 'react';

const techStack = [
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'Java', Icon: FaJava },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Express', Icon: SiExpress },
];

const marqueeKeyframes = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.333%); }
  }
`;

export default function TechStackMarquee() {
  const items = useMemo(() => [...techStack, ...techStack, ...techStack], []);

  return (
   <section className="py-10 overflow-hidden relative bg-[#0A0A0C] border-t border-b border-slate-800">
  {/* Background Glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-500/[0.06] blur-3xl" />
    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-500/[0.06] blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto px-6 mb-6 relative z-20">
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.2em] text-center">
      Technologies we work with
    </p>
  </div>

  {/* Left Fade */}
  <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

  {/* Right Fade */}
  <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

  <div className="flex overflow-hidden group relative z-20">
    <div
      className="flex gap-10 px-4 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]"
      style={{ width: "max-content" }}
    >
      {items.map((tech, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-all duration-300 cursor-default shrink-0"
        >
          <tech.Icon
            size={18}
            className="text-slate-500 group-hover:text-blue-400 transition-colors duration-300"
          />

          <span className="text-sm font-medium tracking-wide">
            {tech.name}
          </span>

          {idx < items.length - 1 && (
            <span className="text-slate-600 ml-4 text-xs select-none">•</span>
          )}
        </div>
      ))}
    </div>
  </div>

  <style>{marqueeKeyframes}</style>
</section>
  );
}
