import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Activity, Terminal } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

type Candle = { o: number; h: number; l: number; c: number; time: string };

const CANDLE_COUNT = 48;
const TICK_MS = 1200;

function seedCandles(startPrice: number): Candle[] {
  const out: Candle[] = [];
  let price = startPrice;
  const now = Date.now();

  for (let i = 0; i < CANDLE_COUNT; i++) {
    const o = price;
    const delta = (Math.random() - 0.47) * 4.5;
    const c = o + delta;
    const h = Math.max(o, c) + Math.random() * 2.8;
    const l = Math.min(o, c) - Math.random() * 2.8;
    const timeStr = new Date(now - (CANDLE_COUNT - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    out.push({ o, h, l, c, time: timeStr });
    price = c;
  }
  return out;
}

export const InteractiveCandleHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const candlesRef = useRef<Candle[]>(seedCandles(100));
  const targetRef = useRef<number>(100);
  const priceRef = useRef<number>(100);
  const [readout, setReadout] = useState({ price: 100, change: 0, high: 104, low: 96 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastTick = performance.now();

    const bullColor = '#22C55E';
    const bearColor = '#EF4444';
    const limeAccent = '#A3E635';
    const gridColor = 'rgba(255, 255, 255, 0.04)';

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

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

      // Calculate normalized vertical position (0 bottom, 1 top)
      const relativeY = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      
      // Map mouse position to price range dynamically
      const candles = candlesRef.current;
      let minP = Infinity;
      let maxP = -Infinity;
      for (const c of candles) {
        minP = Math.min(minP, c.l);
        maxP = Math.max(maxP, c.h);
      }
      const range = maxP - minP || 20;
      targetRef.current = minP - range * 0.1 + relativeY * (range * 1.2);
      
      setIsInteracting(true);
    };

    const onPointerLeave = () => {
      setIsInteracting(false);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', onPointerMove);
      el.addEventListener('mouseleave', onPointerLeave);
      el.addEventListener('touchmove', onPointerMove, { passive: true });
    }

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);

      // Smooth lerp live price toward cursor target
      priceRef.current += (targetRef.current - priceRef.current) * 0.12;
      const currentLivePrice = priceRef.current;

      const candles = candlesRef.current;
      const live = candles[candles.length - 1];
      if (live) {
        live.c = currentLivePrice;
        live.h = Math.max(live.h, currentLivePrice);
        live.l = Math.min(live.l, currentLivePrice);
      }

      // Add a new candle periodically
      if (now - lastTick > TICK_MS) {
        lastTick = now;
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        candles.push({
          o: currentLivePrice,
          c: currentLivePrice,
          h: currentLivePrice,
          l: currentLivePrice,
          time: timeStr
        });
        if (candles.length > CANDLE_COUNT) candles.shift();
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Calculate Min/Max Bounds
      let minVal = Infinity;
      let maxVal = -Infinity;
      for (const c of candles) {
        minVal = Math.min(minVal, c.l);
        maxVal = Math.max(maxVal, c.h);
      }
      const padding = (maxVal - minVal) * 0.2 + 2;
      minVal -= padding;
      maxVal += padding;

      const getY = (val: number) => h - ((val - minVal) / (maxVal - minVal)) * h;

      // Draw Grid Lines & Price Coordinates
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const gridLevels = 5;
      for (let i = 1; i <= gridLevels; i++) {
        const gy = Math.round((h / (gridLevels + 1)) * i) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();

        // Price tag on grid line
        const levelPrice = maxVal - ((gy / h) * (maxVal - minVal));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(levelPrice.toFixed(2), w - 45, gy - 4);
      }

      // Draw Institutional Order Block Highlight (KBJ Fair Value Gap)
      const fvgTop = getY(maxVal - (maxVal - minVal) * 0.35);
      const fvgBottom = getY(maxVal - (maxVal - minVal) * 0.48);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.07)';
      ctx.fillRect(0, fvgTop, w, fvgBottom - fvgTop);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(0, fvgTop, w, fvgBottom - fvgTop);
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(163, 230, 53, 0.6)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText('KBJ ORDER BLOCK [INSTITUTIONAL LIQUIDITY]', 16, fvgTop + 14);

      // Render Candlesticks
      const slotWidth = w / CANDLE_COUNT;
      const bodyWidth = Math.max(3, slotWidth * 0.62);

      candles.forEach((candle, i) => {
        const cx = i * slotWidth + slotWidth / 2;
        const isUp = candle.c >= candle.o;
        const color = isUp ? bullColor : bearColor;
        const isLastCandle = i === candles.length - 1;

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = isLastCandle ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(cx, getY(candle.h));
        ctx.lineTo(cx, getY(candle.l));
        ctx.stroke();

        // Candle Body
        const topY = getY(Math.max(candle.o, candle.c));
        const bottomY = getY(Math.min(candle.o, candle.c));
        const bodyHeight = Math.max(2, bottomY - topY);

        ctx.fillStyle = color;
        ctx.globalAlpha = isLastCandle ? 1 : 0.85;

        // Glow shadow for the interactive live candle
        if (isLastCandle) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(cx - bodyWidth / 2, topY, bodyWidth, bodyHeight);
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      // Live Dashed Price Line tracking current price
      const liveY = getY(currentLivePrice);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = live.c >= live.o ? limeAccent : bearColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, liveY);
      ctx.lineTo(w - 70, liveY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Live Price Badge Tag on Right Axis
      ctx.fillStyle = live.c >= live.o ? '#22C55E' : '#EF4444';
      ctx.fillRect(w - 65, liveY - 10, 60, 20);
      ctx.fillStyle = '#030508';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(currentLivePrice.toFixed(2), w - 58, liveY + 4);
    };

    rafId = requestAnimationFrame(draw);

    const interval = window.setInterval(() => {
      const candles = candlesRef.current;
      if (candles.length === 0) return;
      const first = candles[0].o;
      const current = priceRef.current;
      let minP = Infinity;
      let maxP = -Infinity;
      for (const c of candles) {
        minP = Math.min(minP, c.l);
        maxP = Math.max(maxP, c.h);
      }
      setReadout({
        price: current,
        change: ((current - first) / first) * 100,
        high: maxP,
        low: minP
      });
    }, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      if (el) {
        el.removeEventListener('mousemove', onPointerMove);
        el.removeEventListener('mouseleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] rounded-3xl bg-[#05070B]/90 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl group cursor-ns-resize"
    >
      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#070A0F]/80 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-kbj-green animate-pulse" />
            <span className="font-mono text-xs font-bold text-white uppercase">
              NQ100 // 15M DYNAMIC CANDLE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#070A0F]/80 border border-white/10 text-xs font-mono text-kbj-lime">
            <Activity className="w-3.5 h-3.5" />
            <span>MERCADO INTERACTIVO</span>
          </div>
        </div>

        {/* Live Metrics Readout */}
        <div className="flex items-center gap-4 px-4 py-1.5 rounded-xl bg-[#070A0F]/90 border border-white/10 backdrop-blur-md font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block">LIVE PRICE</span>
            <span className="font-bold text-white text-sm">{readout.price.toFixed(2)}</span>
          </div>
          <div className="h-5 w-[1px] bg-white/10" />
          <div>
            <span className="text-slate-500 text-[10px] block">VARIACIÓN</span>
            <span className={`font-bold text-sm ${readout.change >= 0 ? 'text-kbj-lime' : 'text-red-400'}`}>
              {readout.change >= 0 ? '+' : ''}{readout.change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Bottom Cue */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2 bg-[#030508]/80 px-3 py-1 rounded-lg border border-white/10">
          <span className="text-kbj-lime font-bold">▲ ▼</span>
          <span>MOVÉ EL CURSOR ARRIBA / ABAJO PARA FORMAR LA VELA EN VIVO</span>
        </div>
        <div className="hidden sm:block text-slate-500">
          ALTA PRECISIÓN 60 FPS
        </div>
      </div>
    </div>
  );
};
