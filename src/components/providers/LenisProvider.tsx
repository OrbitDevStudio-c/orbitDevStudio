import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

const lenisOptions = { lerp: 0.05, duration: 1.5, smoothWheel: true };

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
