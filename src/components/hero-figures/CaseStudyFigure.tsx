import { motion } from 'framer-motion';
import { TECH_CHIP_COLORS, type Project } from '../../data/projects';
import ProjectPreview from '../case-studies/ProjectPreview';

/** Fixed chip slots around the browser frame (up to three technologies). */
const TECH_SLOTS = [
  { className: 'left-0 top-[12%]', distance: -10, duration: 4, delay: 0 },
  { className: 'right-0 top-0', distance: 8, duration: 5, delay: 1 },
  { className: 'left-[5%] bottom-[3%]', distance: -8, duration: 4.5, delay: 0.5 },
];

/** Case study hero: the project's real screenshot (or logo) in a browser frame, with its tech as floating chips. */
export default function CaseStudyFigure({ project }: { project: Project }) {
  const techs = project.technologies.slice(0, TECH_SLOTS.length);

  return (
    <>
      <div className="absolute right-[2%] top-1/2 z-10 w-[88%] -translate-y-1/2 sm:w-[420px]">
        <ProjectPreview project={project} priority decorative />
      </div>

      {techs.map((tech, i) => {
        const slot = TECH_SLOTS[i];
        return (
          <motion.div
            key={tech}
            animate={{ y: [0, slot.distance, 0] }}
            transition={{ duration: slot.duration, repeat: Infinity, ease: 'easeInOut', delay: slot.delay }}
            className={`absolute z-20 rounded-xl border border-white/10 bg-[#16213B] p-1.5 shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.12)] ${slot.className}`}
          >
            <span className={`chip-${TECH_CHIP_COLORS[i % TECH_CHIP_COLORS.length]} whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold`}>
              <span className="chip-dot" />
              {tech}
            </span>
          </motion.div>
        );
      })}

      {/* Live status chip */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        className="absolute bottom-[8%] right-0 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#16213B] px-3 py-1.5 shadow-xl light:bg-white light:shadow-[0_10px_25px_rgba(15,23,42,0.12)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#52C854] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52C854]" />
        </span>
        <span className="text-[11px] font-semibold text-white light:text-slate-900">Live</span>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute -left-2 bottom-[30%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute left-[40%] -top-3 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute -bottom-3 right-[30%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
