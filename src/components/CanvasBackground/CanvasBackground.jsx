import { useEffect, useRef } from 'react';
import './CanvasBackground.css';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      radius: 140,
      isActive: false
    };

    // Particle class
    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        this.size = isBurst ? Math.random() * 3 + 1.5 : Math.random() * 2 + 0.8;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * (isBurst ? 3.5 : 0.7);
        this.speedY = (Math.random() - 0.5) * (isBurst ? 3.5 : 0.7);
        this.life = isBurst ? 100 : Infinity;
        this.opacity = isBurst ? 1 : Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.life !== Infinity) {
          this.life -= 1;
          this.opacity = Math.max(0, this.life / 100);
        } else {
          // Bounce off walls
          if (this.x < 0 || this.x > width) this.speedX *= -1;
          if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        // Mouse interaction
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = (dx / distance) * force * 3;
            const directionY = (dy / distance) * force * 3;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw(isDark) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const fill = isDark
          ? `rgba(129, 140, 255, ${this.opacity * 0.8})`
          : `rgba(99, 102, 241, ${this.opacity * 0.6})`;
        ctx.fillStyle = fill;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(99, 102, 241, 0.4)';
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const particles = Array.from({ length: particleCount }, () => new Particle());
    let burstParticles = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    const handleClick = (event) => {
      // Spawn burst particles on click
      for (let i = 0; i < 15; i++) {
        burstParticles.push(new Particle(event.clientX, event.clientY, true));
      }
      if (burstParticles.length > 50) {
        burstParticles = burstParticles.slice(-40);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      // Connect standard particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.16 : 0.09);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw standard particles
      particles.forEach((p) => {
        p.update();
        p.draw(isDark);
      });

      // Update & draw burst particles
      burstParticles = burstParticles.filter((p) => p.life > 0);
      burstParticles.forEach((p) => {
        p.update();
        p.draw(isDark);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" aria-hidden="true" />;
};

export default CanvasBackground;
