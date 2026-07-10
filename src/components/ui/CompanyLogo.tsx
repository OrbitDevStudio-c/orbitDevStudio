import { motion } from 'framer-motion';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg';

type CompanyLogoProps = {
  className?: string;
  size?: LogoSize;
};

const sizeMap: Record<LogoSize, { outer: number; middle: number; inner: number; icon: number; dot: number }> = {
  xs: { outer: 64, middle: 44, inner: 34, icon: 26, dot: 8 },
  sm: { outer: 72, middle: 50, inner: 40, icon: 32, dot: 9 },
  md: { outer: 104, middle: 76, inner: 64, icon: 52, dot: 12 },
  lg: { outer: 140, middle: 102, inner: 84, icon: 64, dot: 14 },
};

export default function CompanyLogo({ className = 'relative', size = 'md' }: CompanyLogoProps) {
  const dimensions = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width: dimensions.outer, height: dimensions.outer }}
    >
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 6,
        }}
        transition={{ duration: 0.35 }}
        className="relative w-full h-full"
      >
        <div
          className="absolute rounded-full bg-cyan-400/30 blur-3xl"
          style={{
            width: dimensions.outer * 1.08,
            height: dimensions.outer * 1.08,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          className="relative rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-[0_0_70px_rgba(0,180,255,.18)]"
          style={{ width: dimensions.outer, height: dimensions.outer }}
        >
          <div
            className="rounded-full border border-white/15 bg-white/10 backdrop-blur-xl flex items-center justify-center"
            style={{ width: dimensions.middle, height: dimensions.middle }}
          >
            <div
              className="rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden"
              style={{ width: dimensions.inner, height: dimensions.inner }}
            >
              <img
                src="/companylogo.webp"
                alt="OrbitDevStudio"
                className="object-contain"
                width={dimensions.icon}
                height={dimensions.icon}
                style={{ width: dimensions.icon, height: dimensions.icon }}
              />
            </div>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute rounded-full bg-emerald-400 shadow-[0_0_20px_#22c55e]"
            style={{ width: dimensions.dot, height: dimensions.dot, bottom: dimensions.outer * 0.15, right: dimensions.outer * 0.15 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
