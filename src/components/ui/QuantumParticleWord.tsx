import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { audioEngine } from '../../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  orbitAngle: number;
  orbitSpeed: number;
  orbitRadius: number;
}

export const QuantumParticleWord: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const letters = 'CRITERIO'.split('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const colors = ['#00F0FF', '#22C55E', '#A3E635', '#6366F1', '#38BDF8'];

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize quantum photon particles
    const particleCount = 65;
    const particles: Particle[] = [];

    const initParticle = (p?: Partial<Particle>): Particle => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = 20 + Math.random() * (rect.width * 0.45);
      const angle = Math.random() * Math.PI * 2;

      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * (radius * 0.4),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 1.2 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.3 + Math.random() * 0.7,
        life: 0,
        maxLife: 100 + Math.random() * 120,
        orbitAngle: angle,
        orbitSpeed: (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: radius,
        ...p,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(initParticle({ life: Math.random() * 100 }));
    }

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw quantum entanglement lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 45) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.life++;
        if (p.life > p.maxLife) {
          particles[idx] = initParticle();
          return;
        }

        // Orbit around center
        p.orbitAngle += p.orbitSpeed;
        const targetX = centerX + Math.cos(p.orbitAngle) * p.orbitRadius;
        const targetY = centerY + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.45);

        // Mouse attraction physics when hovering
        if (mousePosRef.current) {
          const mdx = mousePosRef.current.x - p.x;
          const mdy = mousePosRef.current.y - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120) {
            const force = (1 - mDist / 120) * 2.5;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        p.x += (targetX - p.x) * 0.05 + p.vx;
        p.y += (targetY - p.y) * 0.05 + p.vy;

        // Draw glowing particle
        const pulse = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * pulse;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => {
        setIsHovered(true);
        audioEngine.playHoverSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block select-none"
    >
      {/* Quantum Particles Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute -inset-x-8 -inset-y-6 w-[calc(100%+4rem)] h-[calc(100%+3rem)] pointer-events-none z-0"
      />

      {/* Kinetic Quantum Typography */}
      <span className="relative z-10 inline-flex flex-wrap font-black tracking-tight sm:tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A3E635] to-[#22C55E] drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.9 + i * 0.06,
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
            whileHover={{
              scale: 1.25,
              y: -8,
              transition: { type: 'spring', stiffness: 500, damping: 10 },
            }}
            className="inline-block cursor-default"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
};
