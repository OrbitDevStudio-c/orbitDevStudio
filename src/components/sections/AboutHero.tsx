import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Small ambient particle field, local to this section — saturated blue/cyan/purple
// dots read against both a dark navy and a white background, unlike the shared
// ServiceParticles canvas (white/screen-blend particles vanish on a light surface).
const particles = [
  { top: '14%', left: '10%', size: 3, color: 'rgba(22,119,255,0.55)', duration: 4.5, delay: 0 },
  { top: '22%', left: '82%', size: 2, color: 'rgba(0,217,255,0.5)', duration: 5.2, delay: 0.6 },
  { top: '65%', left: '6%', size: 2, color: 'rgba(0,217,255,0.45)', duration: 4.8, delay: 1.1 },
  { top: '78%', left: '90%', size: 3, color: 'rgba(22,119,255,0.5)', duration: 5.6, delay: 0.3 },
  { top: '8%', left: '45%', size: 2, color: 'rgba(108,43,255,0.4)', duration: 5, delay: 1.4 },
  { top: '40%', left: '92%', size: 2, color: 'rgba(22,119,255,0.4)', duration: 4.6, delay: 0.8 },
  { top: '52%', left: '18%', size: 2, color: 'rgba(0,217,255,0.4)', duration: 5.4, delay: 1.8 },
  { top: '30%', left: '4%', size: 2, color: 'rgba(108,43,255,0.35)', duration: 4.9, delay: 0.4 },
  { top: '88%', left: '38%', size: 2, color: 'rgba(22,119,255,0.45)', duration: 5.1, delay: 1.2 },
  { top: '5%', left: '70%', size: 2, color: 'rgba(0,217,255,0.4)', duration: 4.7, delay: 2 },
];

const networkLines = [
  { top: '20%', left: '8%', width: '220px', rotate: '18deg' },
  { top: '70%', left: '62%', width: '260px', rotate: '-12deg' },
  { top: '40%', left: '30%', width: '180px', rotate: '6deg' },
];

const serverBars = [
  { h: 'h-28', bg: 'rgba(148,163,184,0.14)', border: 'rgba(148,163,184,0.26)', shadow: 'none', lift: false },
  { h: 'h-36', bg: 'rgba(22,119,255,0.16)', border: 'rgba(22,119,255,0.38)', shadow: '0 0 26px rgba(22,119,255,0.28)', lift: true },
  { h: 'h-20', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)', shadow: 'none', lift: false },
  { h: 'h-32', bg: 'rgba(0,217,255,0.14)', border: 'rgba(0,217,255,0.32)', shadow: '0 0 22px rgba(0,217,255,0.24)', lift: false },
  { h: 'h-24', bg: 'rgba(148,163,184,0.14)', border: 'rgba(148,163,184,0.26)', shadow: 'none', lift: false },
];

export default function AboutHero() {
  return (
    <section className="bg-navy-soft relative w-full pt-28 pb-16 overflow-hidden">
      {/* Ambient particle / network atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80 light:opacity-45">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              animation: `dot-glow ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
        {networkLines.map((l, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: l.top,
              left: l.left,
              width: l.width,
              transform: `rotate(${l.rotate})`,
              background: 'linear-gradient(90deg, transparent, rgba(100,116,139,0.18), transparent)',
            }}
          />
        ))}
      </div>

      {/* Decorative radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1677ff]/[0.1] via-transparent to-transparent opacity-[0.38] light:opacity-[0.5]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#6c2bff]/[0.15] via-transparent to-transparent light:from-[#6c2bff]/[0.08]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] light:bg-accent/[0.05] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-white light:text-slate-900 max-w-4xl"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-6"
            style={{
              background: 'var(--rt-pill-bg-2)',
              border: '1px solid rgba(100,116,139,0.28)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--rt-cyan)', boxShadow: '0 0 6px var(--rt-cyan)', animation: 'dot-glow 2.4s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 light:text-slate-900/90 uppercase">Who We Are</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] mb-5">
            Engineering digital <br className="hidden sm:block" /> <span className="text-gradient">futures</span> since 2023.
          </h1>

          <p className="text-[15px] sm:text-base text-[#C7D2E4] leading-relaxed mb-8 max-w-2xl mx-auto">
            OrbitDevStudio is a premium software engineering agency dedicated to transforming ambitious ideas into scalable, high-performance digital realities. We don't just write code; we build the foundational technology that powers next-generation businesses.
          </p>

          <Link
            to="/portfolio"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-[15px] font-semibold"
          >
            See Our Work
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Decorative graphic element below text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-4xl h-[160px] mt-10 rounded-t-[2.5rem] backdrop-blur-xl relative overflow-hidden flex items-end justify-center pb-6"
          style={{
            background: 'linear-gradient(to top, var(--rt-glass-tint-strong), var(--rt-glass-tint))',
            borderTop: '1px solid var(--rt-glass-border)',
            borderLeft: '1px solid var(--rt-glass-border)',
            borderRight: '1px solid var(--rt-glass-border)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(148,163,184,0.09) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, rgba(148,163,184,0.09) 0 1px, transparent 1px 20px)',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent rounded-full blur-[100px] opacity-30 light:opacity-20" />
          <div className="relative z-10 flex gap-3">
            {serverBars.map((bar, i) => (
              <div
                key={i}
                className={`w-12 ${bar.h} rounded-t-lg backdrop-blur-md ${bar.lift ? '-translate-y-3' : ''}`}
                style={{
                  background: bar.bg,
                  borderTop: `1px solid ${bar.border}`,
                  borderLeft: `1px solid ${bar.border}`,
                  borderRight: `1px solid ${bar.border}`,
                  boxShadow: bar.shadow,
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
