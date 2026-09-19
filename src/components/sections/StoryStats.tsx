import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
  dotColor: string;
  ringSize: number; // ring diameter, as % of the visual container
  ringSpeed: number; // seconds per rotation of the ring's accent arc
  pos: { top: string; left: string }; // fixed card position, % of container
  floatDuration: number;
  floatDelay: number;
}

const stats: Stat[] = [
  { label: 'Tech Stack', value: 15, suffix: '+', color: '#f59e0b', dotColor: '#fbbf24', ringSize: 46, ringSpeed: 46, pos: { top: '50%', left: '8%' }, floatDuration: 5, floatDelay: 0 },
  { label: 'Projects', value: 10, suffix: '+', color: '#3B6FE0', dotColor: '#93c5fd', ringSize: 62, ringSpeed: 58, pos: { top: '70%', left: '84%' }, floatDuration: 5.6, floatDelay: 0.5 },
  { label: 'Clients', value: 5, suffix: '+', color: '#a78bfa', dotColor: '#c4b5fd', ringSize: 78, ringSpeed: 70, pos: { top: '18%', left: '86%' }, floatDuration: 6.2, floatDelay: 1 },
  { label: 'Team', value: 10, suffix: '+', color: '#34d399', dotColor: '#6ee7b7', ringSize: 94, ringSpeed: 82, pos: { top: '2%', left: '58%' }, floatDuration: 5.3, floatDelay: 1.5 },
];

/* Count-up hook */
function useCountUp(target: number, inView: boolean, duration = 1.8) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let val = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      val += step;
      if (val >= target) { setDisplay(target); clearInterval(id); }
      else setDisplay(Math.floor(val));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return display;
}

/* Small particle dots orbiting a ring */
function RingDots({ color, count = 4, speed }: { color: string; count?: number; speed: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const delay = (angle / 360) * speed;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ animation: `orbit ${speed}s linear infinite`, animationDelay: `-${delay}s` }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[5px] h-[5px] rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 5px ${color}`,
                animation: `dot-glow ${2 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          </div>
        );
      })}
    </>
  );
}

/* Fixed-position statistic card — subtle entrance + gentle float, no orbiting */
function StatCard({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, inView, 1.6 + index * 0.2);
  return (
    <div
      className="absolute z-30"
      style={{ top: stat.pos.top, left: stat.pos.left, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 + index * 0.15, type: 'spring', stiffness: 180 }}
        whileHover={{ scale: 1.08 }}
      >
        <div
          style={{ animation: `card-float ${stat.floatDuration}s ease-in-out ${stat.floatDelay}s infinite` }}
        >
          <div
            className="relative px-4 py-3 flex flex-col items-center justify-center cursor-default min-w-[88px] rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--rt-pill-bg-1) 0%, var(--rt-pill-bg-2) 100%)',
              border: `1px solid ${stat.color}28`,
              boxShadow: `0 0 18px ${stat.color}14, 0 6px 20px rgba(15,23,42,0.12), inset 0 1px 0 var(--rt-pill-sheen)`,
            }}
          >
            {/* shimmer overlay */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${stat.color}12 50%, transparent 60%)`,
                backgroundSize: '200% 100%',
                animation: `card-shimmer ${4 + index}s ease-in-out infinite`,
              }}
            />
            {/* corner accent dot */}
            <span
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{
                background: stat.color,
                boxShadow: `0 0 6px ${stat.color}`,
                animation: `dot-glow ${2 + index * 0.3}s ease-in-out infinite`,
              }}
            />
            <span
              className="text-xl font-black tracking-tight"
              style={{ color: stat.color }}
            >
              {count}{stat.suffix}
            </span>
            <span className="text-[9px] text-slate-500 uppercase tracking-[0.18em] font-semibold mt-0.5">
              {stat.label}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StoryStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-navy-soft py-16 md:py-20 relative overflow-hidden">

      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(22,119,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-[10%] w-[360px] h-[360px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(108,43,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* ── Left: Orbital System ── */}
        <div className="relative w-full max-w-[480px] aspect-square mx-auto lg:mx-0">

          {/* Orbit rings */}
          {stats.map((stat, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: `${stat.ringSize}%`,
                height: `${stat.ringSize}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Base ring — restrained blue-gray, not per-stat color. Kept at a
                  steady opacity (rather than the breathing keyframe) since
                  animating it multiplies down to nearly invisible. */}
              <div className="absolute inset-0 rounded-full" style={{
                border: '1px solid rgba(100,116,139,0.22)',
              }} />

              {/* Slowly spinning accent arc — the only color on the ring itself */}
              <div className="absolute inset-0 rounded-full overflow-hidden" style={{
                background: `conic-gradient(from 0deg, ${stat.color}20 0deg, ${stat.color}08 50deg, transparent 85deg)`,
                animation: `ring-spin ${stat.ringSpeed}s linear infinite`,
                animationDelay: `${-i * 4}s`,
              }} />

              {/* Particle dots */}
              <RingDots color={stat.dotColor} count={3 + i} speed={22 + i * 9} />
            </div>
          ))}

          {/* ── Central Sun ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {/* outer corona halos */}
            {[1, 2, 3].map((n) => (
              <div key={n} className="absolute rounded-full" style={{
                inset: `-${n * 14}px`,
                background: `radial-gradient(circle, rgba(251,191,36,${0.12 - n * 0.03}) 0%, transparent 70%)`,
                animation: `orbit-glow-ring ${3 + n}s ease-in-out infinite`,
                animationDelay: `${n * 0.4}s`,
              }} />
            ))}
            {/* spinning corona texture */}
            <div className="absolute rounded-full" style={{
              inset: '-24px',
              background: 'conic-gradient(from 0deg, rgba(251,191,36,0.15) 0deg, transparent 60deg, rgba(251,146,60,0.12) 120deg, transparent 180deg, rgba(251,191,36,0.1) 240deg, transparent 300deg, rgba(251,146,60,0.14) 360deg)',
              animation: 'sun-rotate 14s linear infinite',
            }} />
            {/* main orb */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #fde68a, #f59e0b 40%, #ea580c)',
                animation: 'sun-pulse 4.5s ease-in-out infinite',
              }}
            >
              {/* highlight glint */}
              <div className="absolute top-2 left-2.5 w-4 h-3 rounded-full bg-white/30 blur-[4px]" />
            </motion.div>
          </div>

          {/* Fixed statistic cards */}
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}

        </div>

        {/* ── Right: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-5 h-px bg-accent" />
            Our Journey
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white light:text-slate-900 tracking-tight leading-tight mb-6">
            Built for teams that{' '}
            <span className="text-gradient">demand precision</span>
          </h2>

          <p className="text-slate-400 light:text-slate-600 text-base md:text-lg leading-relaxed mb-5">
            Every line of code we write is an investment in your product's longevity. We don't build throwaway prototypes — we engineer systems designed to handle real traffic, real users, and real growth.
          </p>

          <p className="text-slate-400 light:text-slate-600 text-base md:text-lg leading-relaxed mb-10">
            Our partnerships last years, not sprints. Because the best software is built by teams that understand your business deeply enough to anticipate what you'll need next.
          </p>

          {/* mini stat pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.06 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold cursor-default transition-colors"
                style={{
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}30`,
                  color: s.color,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                {s.value}{s.suffix} {s.label}
              </motion.div>
            ))}
          </div>

          <Link
            to="/about"
            className="group flex items-center gap-2.5 text-sm font-semibold text-white light:text-slate-900 hover:text-accent transition-colors"
          >
            Our Story
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
