import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Particles3D from './Particles3D';

export default function ParticlesContainer() {
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" } // Keep it mounted slightly before it comes into view
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto bg-navy">
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ 
            antialias: false, // Performance: disabled antialiasing for points
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
        >
          <Particles3D />
        </Canvas>
      )}
    </div>
  );
}
