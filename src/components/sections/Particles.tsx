import { useEffect, useRef } from 'react';

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;

        let width = 0;
        let height = 0;

        const particles: any[] = [];
        const shootingStars: any[] = [];

        const getThemeValues = () => {
            // Using the #4F8CFF accent color (79, 140, 255)
            return {
                color: '79,140,255',
                lineOpacity: 0.15,
                dotOpacity: 0.7,
            };
        };

        const createParticle = () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 1.5 + 1,
            alpha: Math.random() * 0.5 + 0.4,
        });

        const createShootingStar = () => {
            const isMobile = window.innerWidth < 768;
            return {
                x: Math.random() * width,
                y: Math.random() * (height * 0.4),
                vx: isMobile ? 3 + Math.random() * 1.5 : 10 + Math.random() * 3,
                vy: isMobile ? 1.5 + Math.random() : 5 + Math.random() * 2,
                life: isMobile ? 450 : 300,
                maxLife: isMobile ? 450 : 300,
            };
        };

        const resetParticles = () => {
            particles.length = 0;
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 25 : 80;

            for (let i = 0; i < count; i++) {
                particles.push(createParticle());
            }

            shootingStars.length = 0;
            const starCount = isMobile ? 1 : 2;

            for (let i = 0; i < starCount; i++) {
                shootingStars.push(createShootingStar());
            }
        };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            resetParticles();
        };

        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            const { color, lineOpacity, dotOpacity } = getThemeValues();
            const isMobile = width < 768;
            const CONNECTION_DISTANCE = isMobile ? 65 : 150;

            ctx.clearRect(0, 0, width, height);

            /* ==========================
               PARTICLES
            ========================== */
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color},${p.alpha * dotOpacity})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = `rgba(${color},0.8)`;
                ctx.fill();
            });

            /* ==========================
               CONSTELLATION LINES
            ========================== */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        const opacity = (1 - distance / CONNECTION_DISTANCE) * lineOpacity;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${color},${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            /* ==========================
               SHOOTING STARS
            ========================== */
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];

                star.x += star.vx;
                star.y += star.vy;
                star.life--;

                const opacity = Math.max(0, star.life / star.maxLife);

                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - 45, star.y - 22);
                ctx.strokeStyle = `rgba(${color},${opacity})`;
                ctx.lineWidth = 2.2;
                ctx.shadowBlur = 25;
                ctx.shadowColor = `rgba(${color},1)`;
                ctx.stroke();

                if (star.life <= 0 || star.x > width + 100 || star.y > height + 100) {
                    shootingStars[i] = createShootingStar();
                }
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 1,
            }}
        />
    );
}
