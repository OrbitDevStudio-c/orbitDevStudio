import { TECH_CHIP_COLORS } from '../../data/projects';

interface TechChipsProps {
  technologies: string[];
  size?: 'sm' | 'md';
  className?: string;
}

/** Tech stack badges using the site's shared `.chip-*` palette. */
export default function TechChips({ technologies, size = 'sm', className = '' }: TechChipsProps) {
  const sizing = size === 'md' ? 'px-3 py-1.5 rounded-lg text-xs' : 'px-2 py-1 rounded text-[10px]';
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {technologies.map((tech, i) => (
        <li key={tech} className={`chip-${TECH_CHIP_COLORS[i % TECH_CHIP_COLORS.length]} ${sizing} font-semibold`}>
          <span className="chip-dot" aria-hidden="true" />
          {tech}
        </li>
      ))}
    </ul>
  );
}
