import type { ReactNode } from 'react';

/**
 * Visible marker for facts that still need verified client data.
 * Intentionally styled (dashed amber) so it reads as "to fill in", never as real content.
 */
export default function Placeholder({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-dashed border-amber-400/40 bg-amber-400/[0.06] px-1.5 font-mono text-[0.85em] font-semibold tracking-normal text-amber-300 light:text-amber-700 ${className}`}
      title="Placeholder: replace with verified information"
    >
      {children}
    </span>
  );
}
