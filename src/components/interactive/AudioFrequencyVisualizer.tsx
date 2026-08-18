import React, { useEffect, useRef } from 'react';

export const AudioFrequencyVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;
    let isVisible = false;
    const barCount = 32;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width / barCount) * 0.65;
      const gap = (width / barCount) * 0.35;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap);
        
        // Multi-frequency wave synthesis
        const wave1 = Math.sin(phase + i * 0.25);
        const wave2 = Math.cos(phase * 1.4 + i * 0.15);
        const intensity = Math.abs(wave1 * 0.6 + wave2 * 0.4);
        
        const barHeight = Math.max(4, intensity * (height * 0.85));
        const y = (height - barHeight) / 2;

        const isPeak = i % 4 === 0;
        ctx.fillStyle = isPeak ? '#A3E635' : '#22C55E';
        ctx.globalAlpha = 0.4 + intensity * 0.5;

        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += 0.04;
      animId = requestAnimationFrame(render);
    };

    // Pause rendering when element is not visible in viewport (crucial for mobile performance)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-12 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        width={320}
        height={48}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};
