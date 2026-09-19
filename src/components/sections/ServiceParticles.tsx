import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ServiceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Premium infrastructure colors — dark theme sits on a near-black sky,
    // light theme swaps in saturated brand blues/cyan/purple since pale or
    // white dots (and screen-blend) disappear entirely against a white page.
    const darkColors = [
      "#ffffff", // White
      "#3B6FE0", // Accent Blue
      "#e0f2fe", // Light Cyan
    ];
    const lightColors = [
      "#1677ff", // Brand blue
      "#0ea5e9", // Light cyan-blue
      "#6c2bff", // Soft purple/blue
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      colorIndex: number;
      pulseSpeed: number;
      pulseOffset: number;
      isGlowingNode: boolean;
      clusterId: number;
    }

    const particles: Particle[] = [];
    const CLUSTERS = 8;
    const clusterCenters: {x: number, y: number}[] = [];

    // IntersectionObserver to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      particles.length = 0;
      clusterCenters.length = 0;

      // Create cluster points
      for (let i = 0; i < CLUSTERS; i++) {
        clusterCenters.push({
          x: width * 0.2 + Math.random() * (width * 0.6),
          y: height * 0.2 + Math.random() * (height * 0.6)
        });
      }

      // Reduced particle count (around 120 total)
      const PARTICLE_COUNT = window.innerWidth > 768 ? 120 : 60;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const clusterId = i % CLUSTERS;
        const center = clusterCenters[clusterId];
        
        // Gaussian-ish spread around cluster
        const radius = Math.pow(Math.random(), 2) * 250;
        const angle = Math.random() * Math.PI * 2;
        
        // Some particles are standalone (not in a tight cluster)
        const isStandalone = Math.random() > 0.8;
        
        const x = isStandalone ? Math.random() * width : center.x + Math.cos(angle) * radius;
        const y = isStandalone ? Math.random() * height : center.y + Math.sin(angle) * radius;

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.15, // Extremely slow drift
          vy: (Math.random() - 0.5) * 0.15,
          baseSize: Math.random() > 0.85 ? Math.random() * 2 + 1.5 : Math.random() * 1 + 0.5, // Depth via size
          colorIndex: Math.floor(Math.random() * darkColors.length),
          pulseSpeed: 0.005 + Math.random() * 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
          isGlowingNode: Math.random() > 0.9,
          clusterId
        });
      }
    };

    const draw = (time: number) => {
      // Stop the loop when not visible
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const isLight = themeRef.current === 'light';
      const colors = isLight ? lightColors : darkColors;
      const alphaMultiplier = isLight ? 0.6 : 1;

      ctx.clearRect(0, 0, width, height);

      // Batch shadowBlur: set once for glowing nodes, draw them, then reset
      // First pass: draw non-glowing particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Slow pulsing alpha
        const currentAlpha = (0.2 + (Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5) * 0.8) * alphaMultiplier;

        if (!p.isGlowingNode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = colors[p.colorIndex];
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
        }
      }

      // Second pass: draw glowing nodes with shadowBlur set once
      ctx.shadowBlur = isLight ? 8 : 15;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isGlowingNode) continue;

        const currentAlpha = (0.2 + (Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5) * 0.8) * alphaMultiplier;
        const color = colors[p.colorIndex];
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Connections (Thin, rare, mostly within clusters)
      // Use deterministic connection check instead of Math.random()
      const DIST_SQ_THRESHOLD = 12000;
      const DIST_THRESHOLD = Math.sqrt(DIST_SQ_THRESHOLD); // ~109, precomputed
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          // Deterministic: mostly connect within same cluster, rarely across
          if (p.clusterId !== p2.clusterId && ((i + j) % 20 !== 0)) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Connect if very close — use squared distance comparison first
          if (distSq < DIST_SQ_THRESHOLD) {
            const distAlpha = 1 - (Math.sqrt(distSq) / DIST_THRESHOLD);
            if (distAlpha > 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isLight
                ? `rgba(22, 119, 255, ${distAlpha * 0.06})`
                : `rgba(255, 255, 255, ${distAlpha * 0.08})`; // Extremely thin/low opacity
              ctx.lineWidth = 0.5;
              ctx.globalAlpha = 1.0;
              ctx.stroke();
            }
          }
        }
      }
      
      ctx.globalAlpha = 1.0;

      // Radial fade for text readability — fades back toward the section's
      // own background color so it blends whether that's near-black or white.
      const fadeGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 380
      );
      const fadeRgb = isLight ? "255, 255, 255" : "21, 42, 90";
      fadeGradient.addColorStop(0, `rgba(${fadeRgb}, 0.95)`);
      fadeGradient.addColorStop(0.5, `rgba(${fadeRgb}, 0.6)`);
      fadeGradient.addColorStop(1, `rgba(${fadeRgb}, 0)`);

      ctx.fillStyle = fadeGradient;
      ctx.beginPath();
      ctx.arc(width/2, height/2, 380, 0, Math.PI*2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw(0);

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 light:mix-blend-normal mix-blend-screen opacity-90 light:opacity-70"
    />
  );
}
