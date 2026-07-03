import { useEffect, useRef } from 'react';

export default function ServiceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Premium infrastructure colors
    const colors = [
      "#ffffff", // White
      "#4F8CFF", // Accent Blue
      "#e0f2fe", // Light Cyan
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
      isGlowingNode: boolean;
      clusterId: number;
    }

    const particles: Particle[] = [];
    const CLUSTERS = 8;
    const clusterCenters: {x: number, y: number}[] = [];

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
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
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseSpeed: 0.005 + Math.random() * 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
          isGlowingNode: Math.random() > 0.9,
          clusterId
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Slow pulsing alpha
        const currentAlpha = 0.2 + (Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5) * 0.8;

        if (p.isGlowingNode) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections (Thin, rare, mostly within clusters)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          // Mostly connect within same cluster, rarely across clusters
          const connectionChance = p.clusterId === p2.clusterId ? 1.0 : 0.05;
          
          if (Math.random() > connectionChance) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Connect if very close
          if (distSq < 12000) {
            const distAlpha = 1 - (Math.sqrt(distSq) / 109);
            if (distAlpha > 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${distAlpha * 0.08})`; // Extremely thin/low opacity
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      
      ctx.globalAlpha = 1.0;

      // Dark radial fade for text readability
      const fade = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 380
      );
      fade.addColorStop(0, "rgba(21, 42, 90, 0.95)");
      fade.addColorStop(0.5, "rgba(21, 42, 90, 0.6)");
      fade.addColorStop(1, "rgba(21, 42, 90, 0)");
      
      ctx.fillStyle = fade;
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90"
    />
  );
}
