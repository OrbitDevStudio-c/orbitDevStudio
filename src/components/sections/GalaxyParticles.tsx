import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function GalaxyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let startTimeoutId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    
    // Premium SaaS particle colors — dark theme sits on a near-black sky,
    // light theme needs saturated brand colors since white/screen-blend
    // particles disappear entirely against a near-white background.
    const darkColors = [
      "#ffffff",
      "#AFCBFF",
      "#7AA8FF",
      "#6C63FF",
      "#B08CFF"
    ];
    const lightColors = [
      "#1677ff",
      "#3b82f6",
      "#0ea5e9",
      "#6c2bff",
      "#7c8cff"
    ];

    interface Particle {
      radius: number;
      orbit: number;
      angle: number;
      speed: number;
      x: number;
      y: number;
      alpha: number;
      size: number;
      colorIndex: number;
      isDust: boolean;
    }

    const particles: Particle[] = [];
    
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      active: boolean;
      life: number;
    }
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

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

    const createGalaxyParticle = (i: number): Particle => {
      const branches = 4;
      const spin = 4.5;
      // Make radius much larger to cover the entire width
      const radius = Math.max(width, height) * 0.75;

      const branch = i % branches;
      const r = Math.pow(Math.random(), 0.65) * radius;
      
      const angle = (branch / branches) * Math.PI * 2 + r * 0.015 * spin;
      const randomOffset = (Math.random() - 0.5) * 35;

      return {
        radius: Math.random() * 1.8 + 0.5,
        orbit: r,
        angle,
        speed: 0.0006 + Math.random() * 0.0005,
        x: width / 2 + Math.cos(angle) * r + randomOffset,
        y: height / 2 + Math.sin(angle) * r * 0.45 + randomOffset,
        alpha: Math.random() * 0.6 + 0.3,
        size: Math.random() * 1.5 + 0.5,
        colorIndex: Math.floor(Math.random() * darkColors.length),
        isDust: i % 5 === 0
      };
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      init();
    };

    const init = () => {
      particles.length = 0;
      // Increase particle count so it stays dense when spread over the wider area
      const PARTICLE_COUNT = window.innerWidth > 768 ? 1400 : 500;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createGalaxyParticle(i));
      }
    };

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.3,
        y: Math.random() * height * 0.2,
        vx: 8,
        vy: 3,
        active: true,
        life: 1.0
      });
    };

    const draw = (time: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const isLight = themeRef.current === 'light';
      const colors = isLight ? lightColors : darkColors;

      ctx.clearRect(0, 0, width, height);

      // Bright Galaxy Core
      const coreGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 250
      );
      if (isLight) {
        coreGradient.addColorStop(0, "rgba(22,119,255,0.16)");
        coreGradient.addColorStop(0.2, "rgba(108,43,255,0.07)");
        coreGradient.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        coreGradient.addColorStop(0, "rgba(255,255,255,0.25)");
        coreGradient.addColorStop(0.2, "rgba(170,180,255,0.1)");
        coreGradient.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(width/2, height/2, 250, 0, Math.PI*2);
      ctx.fill();

      // Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const color = colors[p.colorIndex];

        // Orbit animation
        p.angle += p.speed;
        const randomOffset = (Math.random() - 0.5) * 0.5; // slight jitter
        p.x = width / 2 + Math.cos(p.angle) * p.orbit + randomOffset;
        p.y = height / 2 + Math.sin(p.angle) * p.orbit * 0.45 + randomOffset;

        // Dust Clouds
        if (p.isDust) {
          ctx.shadowBlur = isLight ? 10 : 18;
          ctx.shadowColor = isLight ? "rgba(22,119,255,0.5)" : "rgba(120,140,255,0.7)";
        } else {
          ctx.shadowBlur = isLight ? 2 : 4;
          ctx.shadowColor = color;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = isLight ? p.alpha * 0.7 : p.alpha;
        ctx.fill();

        ctx.shadowBlur = 0; // reset for lines

        // Reduced Connections
        if (Math.random() < 0.005) {
          for (let j = i + 1; j < particles.length; j+=20) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 4000) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isLight ? `rgba(22,119,255,0.08)` : `rgba(255,255,255,0.05)`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // Make Text Readable (Fade center) — fades back toward the page's own
      // background color so it works whether that's near-black or near-white.
      const fade = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 340
      );
      const fadeRgb = isLight ? "255, 255, 255" : "10, 15, 30";
      fade.addColorStop(0, `rgba(${fadeRgb}, 0.88)`);
      fade.addColorStop(0.55, `rgba(${fadeRgb}, 0.45)`);
      fade.addColorStop(1, `rgba(${fadeRgb}, 0)`);

      ctx.fillStyle = fade;
      ctx.beginPath();
      ctx.arc(width/2, height/2, 340, 0, Math.PI*2);
      ctx.fill();

      // Shooting Stars
      if (time - lastShootingStarTime > 8000) {
        if (Math.random() > 0.5) spawnShootingStar();
        lastShootingStarTime = time;
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const star = shootingStars[s];
        if (!star.active) continue;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);

        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.015;

        const starRgb = isLight ? "22,119,255" : "255,255,255";
        ctx.lineTo(star.x, star.y);
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${starRgb},0.7)`;
        ctx.strokeStyle = `rgba(${starRgb},${Math.max(0, star.life)})`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (star.life <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(s, 1);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    
    startTimeoutId = window.setTimeout(() => {
      init();
      draw(0);
    }, 120);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.clearTimeout(startTimeoutId);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 light:mix-blend-normal mix-blend-screen opacity-90 light:opacity-80"
    />
  );
}
