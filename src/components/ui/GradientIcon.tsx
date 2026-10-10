import type { LucideIcon } from 'lucide-react';

/** Mounted once in MainLayout; every `.brand-icon` strokes with this gradient. */
export function BrandIconGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {/* userSpaceOnUse over lucide's 24x24 viewBox, so straight-line paths are painted too. */}
        <linearGradient id="brand-icon-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="55%" stopColor="#1677ff" />
          <stop offset="100%" stopColor="#00d9ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type GradientIconProps = {
  icon: LucideIcon;
  size?: number;
  /** Render the soft tinted tile around the icon (default true). */
  box?: boolean;
  /** Tile size and radius; defaults to the About page value tile. */
  boxClassName?: string;
  className?: string;
};

/** The brand gradient icon treatment used across the site (same look as the About page values). */
export default function GradientIcon({
  icon: Icon,
  size = 22,
  box = true,
  boxClassName = 'h-12 w-12 rounded-xl',
  className = '',
}: GradientIconProps) {
  const icon = <Icon size={size} className={`brand-icon ${className}`} aria-hidden="true" />;
  if (!box) return icon;
  return (
    <div
      className={`brand-icon-wrap flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110 ${boxClassName}`}
    >
      {icon}
    </div>
  );
}
