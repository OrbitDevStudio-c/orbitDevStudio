import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { projects } from '../../data/projects';

const find = (slug: string) => projects.find((p) => p.slug === slug);
const desktopProject = find('knowledgevoice');
const phoneProject = find('navnidhi-trading');

const chipClass =
  'absolute z-30 flex items-center gap-2 rounded-xl border border-white/10 bg-[#101A2D]/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md light:border-slate-200 light:bg-white light:shadow-[0_10px_30px_rgba(15,23,42,0.08)]';

/** Work hero: real project screenshots in overlapping browser and phone frames. */
export default function WorkFigure() {
  const desktopShot = desktopProject?.screenshot;
  const phoneShot = phoneProject?.screenshot;

  return (
    <>
      {/* Browser window */}
      <div className="absolute right-1.5 top-8 w-[86%] max-w-[400px]">
        <motion.div
          style={{ rotate: 2 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="overflow-hidden rounded-xl border border-white/10 bg-[#0E1728] shadow-[0_20px_60px_rgba(0,0,0,0.5)] light:border-slate-200 light:shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="flex h-7 items-center gap-1.5 bg-[#1E2A4A] px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F36B6B]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F6B73C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#52C854]" />
            <span className="ml-3 flex h-4 w-1/2 items-center rounded-full bg-white/10 px-2.5 text-[9px] text-white/60">
              {desktopProject?.title}
            </span>
          </div>
          {desktopShot ? (
            <img
              src={desktopShot.src}
              alt=""
              width={desktopShot.width}
              height={desktopShot.height}
              loading="eager"
              decoding="async"
              className="block h-auto w-full"
            />
          ) : (
            <div className="aspect-[2/1] w-full bg-[#E8F0FE]" />
          )}
        </motion.div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-1 left-[5%] z-20 w-[30%] max-w-[128px]">
        <motion.div
          style={{ rotate: -6 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="rounded-[1.4rem] border border-white/15 bg-[#0B1220] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] light:border-slate-300 light:shadow-[0_20px_50px_rgba(15,23,42,0.22)]"
        >
          <div className="relative aspect-[9/18] overflow-hidden rounded-[1rem] bg-black">
            <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/85" />
            {phoneShot && (
              <img
                src={phoneShot.src}
                alt=""
                width={phoneShot.width}
                height={phoneShot.height}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-left-top"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Live chip */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className={`${chipClass} left-0 top-0 px-3 py-1.5`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#52C854] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#52C854]" />
        </span>
        <span className="text-[11px] font-semibold text-white/90 light:text-slate-800">Live products</span>
      </motion.div>

      {/* Case study chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className={`${chipClass} bottom-3 right-1 py-2 pl-2 pr-3`}
      >
        <span className="brand-icon-wrap flex h-8 w-8 items-center justify-center rounded-lg">
          <BookOpen size={15} className="brand-icon" />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold text-white/90 light:text-slate-800">Case study</span>
          <span className="text-[9px] text-white/50 light:text-slate-500">{desktopProject?.title}</span>
        </span>
      </motion.div>

      {/* Decorative stars */}
      <div className="absolute bottom-[20%] left-[40%] text-[#F6B73C] light:text-[#B45309]">✦</div>
      <div className="absolute right-[30%] top-0 text-sm text-white/30 light:text-slate-900/30">✦</div>
      <div className="absolute bottom-0 left-[46%] text-xl text-white/40 light:text-slate-900/40">✦</div>
    </>
  );
}
