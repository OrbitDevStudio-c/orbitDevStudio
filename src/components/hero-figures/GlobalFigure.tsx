import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Globe, MessageSquare, Rocket } from 'lucide-react';
import FigureChip from './FigureChip';

/** Global Solutions hero: a latitude/longitude globe with an orbiting marker and a few floating labels. */
export default function GlobalFigure() {
  const reduce = useReducedMotion();
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 320 320" className="h-full max-h-[320px] w-full max-w-[320px]" fill="none">
          <defs>
            <radialGradient id="gf-globe" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#1677ff" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#0A1642" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#050b2e" />
            </radialGradient>
          </defs>
          <circle cx="160" cy="160" r="112" fill="url(#gf-globe)" stroke="#4F8CFF" strokeOpacity="0.45" />
          {/* Parallels */}
          {[-70, -35, 0, 35, 70].map((dy) => {
            const w = Math.sqrt(112 * 112 - dy * dy);
            return <ellipse key={dy} cx="160" cy={160 + dy} rx={w} ry={w * 0.16} stroke="#7FB2FF" strokeOpacity="0.28" />;
          })}
          {/* Meridians */}
          {[28, 62, 100].map((rx) => (
            <ellipse key={rx} cx="160" cy="160" rx={rx} ry="112" stroke="#7FB2FF" strokeOpacity="0.28" />
          ))}
          <line x1="160" y1="48" x2="160" y2="272" stroke="#7FB2FF" strokeOpacity="0.28" />
          {/* Connection arcs */}
          <path d="M205 118 Q 250 70 282 96" stroke="#00d9ff" strokeOpacity="0.8" strokeDasharray="2 5" strokeLinecap="round" />
          <path d="M205 118 Q 170 60 120 92" stroke="#00d9ff" strokeOpacity="0.8" strokeDasharray="2 5" strokeLinecap="round" />
          <path d="M205 118 Q 240 190 258 232" stroke="#00d9ff" strokeOpacity="0.8" strokeDasharray="2 5" strokeLinecap="round" />
          {[[205, 118], [282, 96], [120, 92], [258, 232]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 0 ? 5 : 3.5} fill={i === 0 ? '#ffffff' : '#00d9ff'} />
          ))}
          {/* Orbit ring */}
          <ellipse cx="160" cy="160" rx="150" ry="52" stroke="#00d9ff" strokeOpacity="0.35" strokeDasharray="1 6" strokeLinecap="round" transform="rotate(-18 160 160)" />
        </svg>
        {!reduce && (
          <motion.div
            className="absolute h-[320px] w-[320px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-[4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00d9ff] shadow-[0_0_12px_#00d9ff]" />
          </motion.div>
        )}
      </div>

      <FigureChip icon={Globe} label="Remote-first studio" className="left-0 top-[8%]" delay={0.2} />
      <FigureChip icon={Code2} label="Custom software" className="right-0 top-[30%]" delay={0.9} distance={-8} />
      <FigureChip icon={Rocket} label="Startups to enterprises" className="left-[2%] bottom-[22%]" delay={1.4} />
      <FigureChip icon={MessageSquare} label="Direct communication" className="bottom-[4%] right-[4%]" delay={0.6} distance={-8} />
    </>
  );
}
