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
    let time = 0;

    let mouse = {
      x: width / 2,
      y: height / 2,
      radius: 180,
      isActive: false
    };

    // Aurora gradient mesh nodes
    class AuroraNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 200 + 100;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.003 + 0.001;
      }

      update(t) {
        this.x = this.baseX + Math.sin(t * this.speed + this.phase) * 60;
        this.y = this.baseY + Math.cos(t * this.speed * 0.8 + this.phase) * 40;
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < -100 || this.baseX > width + 100) this.vx *= -1;
        if (this.baseY < -100 || this.baseY > height + 100) this.vy *= -1;
      }
    }

    // Particle class with bloom
    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        this.size = isBurst ? Math.random() * 3 + 1.5 : Math.random() * 2.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * (isBurst ? 4 : 0.5);
        this.speedY = (Math.random() - 0.5) * (isBurst ? 4 : 0.5);
        this.life = isBurst ? 80 : Infinity;
        this.opacity = isBurst ? 1 : Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        if (this.life !== Infinity) {
          this.life -= 1;
          this.opacity = Math.max(0, this.life / 80);
        } else {
          if (this.x < 0 || this.x > width) this.speedX *= -1;
          if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        // Mouse magnetic interaction
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const dirX = (dx / distance) * force * 2.5;
            const dirY = (dy / distance) * force * 2.5;
            this.x -= dirX;
            this.y -= dirY;
          }
        }
      }

      draw(isDark) {
        const pulseFactor = 0.3 + Math.sin(this.pulse) * 0.15;
        const bloomSize = this.size * (1 + pulseFactor);
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, bloomSize, 0, Math.PI * 2);
        const fill = isDark
          ? `rgba(129, 140, 255, ${this.opacity * 0.75})`
          : `rgba(99, 102, 241, ${this.opacity * 0.55})`;
        ctx.fillStyle = fill;
        ctx.shadowBlur = isDark ? 14 : 8;
        ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(99, 102, 241, 0.35)';
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = Array.from({ length: particleCount }, () => new Particle());
    let burstParticles = [];

    // Create aurora nodes
    const auroraCount = 5;
    const auroraNodes = Array.from({ length: auroraCount }, () => new AuroraNode());

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
      for (let i = 0; i < 12; i++) {
        burstParticles.push(new Particle(event.clientX, event.clientY, true));
      }
      if (burstParticles.length > 40) {
        burstParticles = burstParticles.slice(-30);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      time += 1;

      // Draw aurora gradient mesh
      auroraNodes.forEach((node) => {
        node.update(time);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        if (isDark) {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
          gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
          gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
          gradient.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Mouse ripple glow
      if (mouse.isActive) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        if (isDark) {
          mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
          mouseGlow.addColorStop(1, 'transparent');
        } else {
          mouseGlow.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
          mouseGlow.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Connect particles with neon lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 130;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.14 : 0.08);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
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
