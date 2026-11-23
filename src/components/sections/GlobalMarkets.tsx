import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_BASE, markets } from '../../data/globalSolutions';

/**
 * Hand-built dotted world map (no map library): simplified continent outlines clip a dot grid.
 * Coordinates are lon/lat; the map projects them equirectangularly into a 360 x 140 box
 * covering latitude 80°N → 60°S.
 */
const VB_W = 360;
const VB_H = 140;
const project = (lon: number, lat: number): [number, number] => [lon + 180, 80 - lat];

const LAND: [number, number][][] = [
  // North America
  [[-168, 66], [-162, 70], [-140, 70], [-125, 70], [-95, 72], [-82, 68], [-80, 63], [-93, 59], [-88, 56], [-79, 55], [-78, 60], [-70, 60], [-62, 57], [-56, 52], [-66, 45], [-70, 42], [-76, 38], [-76, 34], [-81, 31], [-80, 26], [-83, 29], [-90, 30], [-97, 27], [-98, 22], [-95, 18], [-90, 21], [-87, 21], [-88, 16], [-83, 15], [-83, 10], [-78, 8], [-85, 10], [-92, 15], [-97, 16], [-105, 20], [-110, 23], [-115, 30], [-117, 33], [-121, 35], [-124, 40], [-124, 48], [-130, 54], [-135, 58], [-146, 61], [-152, 59], [-158, 57], [-165, 55], [-160, 59], [-165, 62]],
  // Greenland
  [[-73, 78], [-60, 82], [-30, 83], [-20, 76], [-22, 70], [-40, 65], [-48, 61], [-54, 66], [-58, 75]],
  // South America
  [[-78, 8], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-44, -2], [-35, -6], [-39, -14], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-62, -40], [-65, -45], [-68, -52], [-70, -54], [-74, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -1], [-77, 4]],
  // Europe and Asia
  [[-9, 37], [-9, 43], [-2, 43.5], [-4, 48], [2, 51], [8, 54], [10, 57], [5, 59], [5, 62], [14, 68], [20, 70], [30, 71], [40, 67], [44, 68], [60, 69], [70, 73], [80, 73], [100, 77], [112, 74], [130, 71], [140, 72], [160, 70], [170, 70], [180, 68], [180, 65], [170, 60], [162, 58], [156, 51], [150, 59], [140, 59], [135, 54], [141, 48], [132, 43], [129, 40], [129, 36], [126, 34.5], [125, 38], [121, 40], [122, 37], [119, 35], [122, 31], [121, 28], [116, 23], [110, 21], [106, 20], [108, 15], [109, 11], [105, 9], [101, 13], [100, 8], [103, 1.5], [98, 8], [98, 16], [94, 17], [92, 22], [88, 22], [86, 20], [80, 15], [78, 8], [74, 14], [72, 20], [68, 23], [62, 25], [57, 26], [57, 25], [52, 27], [50, 30], [48, 30], [50, 26], [52, 24], [56, 24], [58, 22], [55, 17], [44, 12], [43, 15], [39, 21], [35, 28], [34, 28], [32, 30], [35, 33], [36, 36], [30, 36], [27, 37], [26, 40], [23, 40], [23, 37], [21, 38], [19, 41], [14, 45], [12, 44], [16, 41], [18, 40], [16, 38], [12, 42], [8, 44], [3, 43], [0, 39], [-2, 37], [-6, 36.5]],
  // Africa
  [[-17, 21], [-13, 28], [-6, 36], [10, 37], [11, 33], [20, 31], [32, 31], [33, 27], [37, 22], [43, 12], [51, 12], [48, 5], [40, -3], [40, -15], [35, -24], [32, -29], [27, -34], [20, -35], [18, -32], [12, -18], [13, -8], [9, -1], [9, 4], [5, 6], [-4, 5], [-8, 4], [-13, 8], [-17, 14]],
  // Madagascar
  [[44, -17], [50, -15], [48, -25], [44, -24]],
  // United Kingdom and Ireland
  [[-5.5, 50], [1.5, 51], [1.5, 53], [-2, 56], [-2, 58.5], [-5, 58.5], [-6, 56], [-3, 54.5], [-4.5, 52]],
  [[-10, 52], [-6, 52], [-6, 55], [-10, 54]],
  // Iceland
  [[-24, 65], [-14, 66], [-14, 64], [-22, 63.5]],
  // Japan
  [[130, 32], [135, 34], [141, 36], [142, 41], [140, 41], [139, 38], [133, 35.5], [130, 33]],
  // Indonesia and Philippines
  [[95, 5], [106, -6], [104, -6], [95, 2]],
  [[109, 1], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[105, -6], [114, -8], [106, -7.5]],
  [[120, 18], [124, 13], [126, 8], [122, 8], [120, 14]],
  // Australia and New Zealand
  [[114, -22], [122, -18], [130, -12], [137, -12], [136, -16], [141, -12], [143, -14], [146, -19], [153, -26], [151, -34], [147, -38], [140, -38], [135, -34], [130, -32], [124, -34], [115, -34]],
  [[172, -35], [178, -38], [175, -42], [172, -41]],
];

const pathOf = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => `${i ? 'L' : 'M'}${project(lon, lat).map((n) => n.toFixed(1)).join(' ')}`).join(' ') + 'Z';

const LAND_PATH = LAND.map(pathOf).join(' ');
const HOME = project(HOME_BASE.lon, HOME_BASE.lat);

/** A gently curved connection from the home base to a market, bowed away from the equator. */
function arc(to: [number, number]) {
  const [x1, y1] = HOME;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M${x1} ${y1} Q${mx} ${my - dist * 0.28} ${x2} ${y2}`;
}

export default function GlobalMarkets() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="markets" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Markets we serve</span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl light:text-slate-900">
            Built in India. <span className="text-gradient">Working with businesses worldwide.</span>
          </h2>
          <p className="text-base leading-relaxed text-[#C7D2E4] light:text-slate-600">
            We are a remote-first studio based in Ahmedabad, India. These are the markets we are focused on. We have no offices abroad:
            everything is delivered online.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050b2e] p-3 shadow-[0_20px_60px_rgba(5,11,46,0.45)] sm:p-6 light:border-slate-200"
          style={{ backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(22,119,255,0.2), transparent 65%)' }}
        >
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full" role="img" aria-label="World map connecting Ahmedabad, India with the United States, United Kingdom, Canada, Australia, the UAE, Europe, Singapore, the Philippines, Indonesia, Russia and Africa">
            <defs>
              <pattern id="gs-dots" width="2.6" height="2.6" patternUnits="userSpaceOnUse">
                <circle cx="1.3" cy="1.3" r="0.55" fill="#4F8CFF" fillOpacity="0.5" />
              </pattern>
              <clipPath id="gs-land">
                <path d={LAND_PATH} />
              </clipPath>
              {markets.map((m) => {
                const [x, y] = project(m.lon, m.lat);
                return (
                  <clipPath key={m.id} id={`gs-flag-${m.id}`}>
                    <circle cx={x} cy={y} r={2.6} />
                  </clipPath>
                );
              })}
              <linearGradient id="gs-arc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1677ff" />
                <stop offset="100%" stopColor="#00d9ff" />
              </linearGradient>
            </defs>

            <rect width={VB_W} height={VB_H} fill="url(#gs-dots)" clipPath="url(#gs-land)" />

            {markets.map((m, i) => {
              const to = project(m.lon, m.lat);
              const on = active === m.id;
              return (
                <g key={m.id}>
                  <motion.path
                    d={arc(to)}
                    fill="none"
                    stroke="url(#gs-arc)"
                    strokeWidth={on ? 1.1 : 0.55}
                    strokeLinecap="round"
                    strokeOpacity={active && !on ? 0.25 : 0.95}
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
                  />
                </g>
              );
            })}

            {/* Markets */}
            {markets.map((m) => {
              const [x, y] = project(m.lon, m.lat);
              const on = active === m.id;
              return (
                <g key={m.id} onMouseEnter={() => setActive(m.id)} onMouseLeave={() => setActive(null)}>
                  {!reduce && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={1.6}
                      fill="none"
                      stroke="#00d9ff"
                      strokeWidth={0.4}
                      animate={{ r: [1.6, 4.2], opacity: [0.8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: (x % 7) * 0.2 }}
                    />
                  )}
                  <circle cx={x} cy={y} r={(on ? 3.4 : 3) } fill="#050b2e" stroke="#00d9ff" strokeWidth={0.5} />
                  <image
                    href={`/flags/${m.flag}.svg`}
                    x={x - 2.6}
                    y={y - 2.6}
                    width={5.2}
                    height={5.2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#gs-flag-${m.id})`}
                  />
                  <text x={m.id === 'sg' ? x - 4.2 : m.id === 'id' ? x + 4.2 : x} y={m.id === 'sg' || m.id === 'id' ? y + 1.2 : y - 5.2} textAnchor={m.id === 'sg' ? 'end' : m.id === 'id' ? 'start' : 'middle'} fontSize="3.6" fontWeight="600" fill="#E6EEFF" opacity={on || !active ? 0.95 : 0.4} className="max-sm:hidden" style={{ pointerEvents: 'none' }}>
                    {m.short}
                  </text>
                </g>
              );
            })}

            {/* Home base */}
            <g>
              {!reduce && (
                <motion.circle
                  cx={HOME[0]}
                  cy={HOME[1]}
                  r={2}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  animate={{ r: [2, 6], opacity: [0.9, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <circle cx={HOME[0]} cy={HOME[1]} r={2.3} fill="#ffffff" stroke="#1677ff" strokeWidth={0.9} />
              <text x={HOME[0]} y={HOME[1] + 7} textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#ffffff" className="max-sm:hidden">
                Orbit Dev Studios · Ahmedabad
              </text>
            </g>
          </svg>
        </motion.div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {markets.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(m.id)}
                onBlur={() => setActive(null)}
                className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[13px] font-semibold transition-colors ${
                  active === m.id
                    ? 'border-accent/60 bg-accent/10 text-white light:text-slate-900'
                    : 'border-white/10 bg-white/[0.03] text-[#C7D2E4] light:border-slate-200 light:bg-white light:text-slate-700'
                }`}
              >
                <img src={`/flags/${m.flag}.svg`} alt="" width={20} height={20} loading="lazy" className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-white/20" />
                {m.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
