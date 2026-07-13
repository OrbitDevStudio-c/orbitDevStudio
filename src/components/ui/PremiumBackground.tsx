import { motion } from 'framer-motion';

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Scattered Engineering Dots (from FAQ) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Soft Blue Glowing Particles */}
      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 bg-[#4F8CFF] rounded-full blur-[80px] opacity-40"
      />
      <motion.div
        animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[30%] right-[20%] w-40 h-40 bg-[#7C5CFF] rounded-full blur-[100px] opacity-30"
      />

      {/* 3. Constellation Connecting Lines (Subtle SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 10% 20% L 25% 45% L 15% 70% M 80% 15% L 65% 40% L 85% 65%"
          stroke="#4F8CFF"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Occasional animated dots on vertices */}
        <motion.circle cx="10%" cy="20%" r="1.5" fill="#ffffff" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="25%" cy="45%" r="1.5" fill="#ffffff" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="65%" cy="40%" r="1.5" fill="#ffffff" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3.5, repeat: Infinity }} />
      </svg>
    </div>
  );
}
