import React, { useEffect, useRef, useState } from 'react';

type Candle = { o: number; h: number; l: number; c: number };

const CANDLE_COUNT = 55;
const TICK_MS = 900;

function seedCandles(start: number): Candle[] {
  const out: Candle[] = [];
  let price = start;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const o = price;
    const c = o + (Math.random() - 0.48) * 5.5;
    out.push({
      o,
      c,
      h: Math.max(o, c) + Math.random() * 2.8,
      l: Math.min(o, c) - Math.random() * 2.8,
    });
    price = c;
  }
  return out;
}

export const CandleHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>(seedCandles(180));
  const targetRef = useRef<number>(180);
  const priceRef = useRef<number>(180);
  const [readout, setReadout] = useState({ price: 180, change: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let lastTick = performance.now();
    const bull = '#22C55E';
    const bear = '#EF4444';
    const grid = 'rgba(255, 255, 255, 0.04)';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onPointer = (e: PointerEvent | MouseEvent) => {
      // Map pointer Y to price target
      const t = 1 - e.clientY / window.innerHeight; // 0 bottom .. 1 top
      targetRef.current = 120 + t * 140;
    };
    window.addEventListener('pointermove', onPointer);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);

      // Ease live price toward mouse target with smooth lerp
      priceRef.current += (targetRef.current - priceRef.current) * 0.09;
      const price = priceRef.current;

      const candles = candlesRef.current;
      const live = candles[candles.length - 1]!;
      live.c = price;
      live.h = Math.max(live.h, price);
      live.l = Math.min(live.l, price);

      if (now - lastTick > TICK_MS) {
        lastTick = now;
        candles.push({ o: price, c: price, h: price, l: price });
        if (candles.length > CANDLE_COUNT) candles.shift();
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      let min = Infinity;
      let max = -Infinity;
      for (const c of candles) {
        min = Math.min(min, c.l);
        max = Math.max(max, c.h);
      }
      const pad = (max - min) * 0.18 + 2;
      min -= pad;
      max += pad;
      const y = (v: number) => h - ((v - min) / (max - min)) * h;

      // Draw Grid lines
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      for (let i = 1; i < 7; i++) {
        const gy = Math.round((h / 7) * i) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      const slot = w / CANDLE_COUNT;
      const body = Math.max(3, slot * 0.58);

      candles.forEach((c, i) => {
        const cx = i * slot + slot / 2;
        const up = c.c >= c.o;
        const color = up ? bull : bear;
        const isLive = i === candles.length - 1;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = isLive ? 1 : 0.65;

        // Wick
        ctx.lineWidth = isLive ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, y(c.h));
        ctx.lineTo(cx, y(c.l));
        ctx.stroke();

        // Body
        const top = y(Math.max(c.o, c.c));
        const bot = y(Math.min(c.o, c.c));
        
        if (isLive) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 16;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(cx - body / 2, top, body, Math.max(2, bot - top));
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      // Live price dashed horizontal line
      const ly = y(price);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = live.c >= live.o ? bull : bear;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, ly);
      ctx.lineTo(w, ly);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    raf = requestAnimationFrame(draw);

    const readoutTimer = window.setInterval(() => {
      const candles = candlesRef.current;
      const first = candles[0]!.o;
      const p = priceRef.current;
      setReadout({ price: p, change: ((p - first) / first) * 100 });
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(readoutTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  const up = readout.change >= 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="h-full w-full pointer-events-auto" />
      
      {/* Subtle Scanlines & Gradient Overlay on top of canvas */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-[#030508]/60 pointer-events-none" />

      {/* Floating Price Telemetry Card */}
      <div className="absolute right-6 top-32 hidden sm:block rounded-2xl border border-white/10 bg-[#070A0F]/80 px-5 py-4 font-mono text-right backdrop-blur-xl shadow-2xl pointer-events-none">
        <div className="text-[10px] tracking-widest text-slate-500 uppercase">NQ100 // VELA EN VIVO</div>
        <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${up ? 'text-kbj-green' : 'text-kbj-red'}`}>
          {readout.price.toFixed(2)}
        </div>
        <div className={`text-xs font-mono font-bold mt-0.5 ${up ? 'text-kbj-lime' : 'text-kbj-red'}`}>
          {up ? '▲' : '▼'} {readout.change >= 0 ? '+' : ''}{readout.change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};
