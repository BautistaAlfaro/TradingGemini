import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PILLARS } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const PillarsSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollMobileTo = (index: number) => {
    audioEngine.playClickSound();
    setActiveMobileIdx(index);
    setSelectedIdx(index);
    if (mobileScrollRef.current) {
      const cardWidth = mobileScrollRef.current.clientWidth * 0.88;
      mobileScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextMobile = () => {
    const next = (activeMobileIdx + 1) % PILLARS.length;
    scrollMobileTo(next);
  };

  const prevMobile = () => {
    const prev = (activeMobileIdx - 1 + PILLARS.length) % PILLARS.length;
    scrollMobileTo(prev);
  };

  return (
    <section id="pilares" className="relative py-28 sm:py-32 bg-[#030508]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Mobile Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
              <span>02 — Pilares de Operación</span>
              <span className="h-px w-10 bg-kbj-lime/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              Los 4 Pilares de <span className="text-kbj-green">KBJ TRADING</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              La consistencia en mercados institucionales se apoya en cuatro dimensiones innegociables. Sin una de ellas, el sistema colapsa.
            </p>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center justify-between gap-4 shrink-0">
            <div className="font-mono text-xs text-slate-400">
              <span className="text-kbj-lime font-bold">0{activeMobileIdx + 1}</span> / 0{PILLARS.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMobile}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Pilar anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextMobile}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Pilar siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal 1-by-1 sliding track */}
        <div
          ref={mobileScrollRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const cardWidth = target.clientWidth * 0.88;
            const newIndex = Math.round(target.scrollLeft / cardWidth);
            if (newIndex !== activeMobileIdx && newIndex >= 0 && newIndex < PILLARS.length) {
              setActiveMobileIdx(newIndex);
              setSelectedIdx(newIndex);
            }
          }}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4 pt-1"
        >
          {PILLARS.map((pillar, idx) => {
            const isSelected = activeMobileIdx === idx;

            return (
              <div
                key={pillar.number}
                onClick={() => {
                  audioEngine.playClickSound();
                  setSelectedIdx(idx);
                }}
                className={`w-[86vw] max-w-[340px] shrink-0 snap-center p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'border-kbj-green/60 bg-[#0D121B]/95 shadow-2xl'
                    : 'bg-[#070A0F]/85 backdrop-blur-xl border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl text-kbj-lime">
                      {pillar.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-kbj-green" />
                  </div>

                  <h3 className="text-lg font-display font-black text-white uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-kbj-lime block mb-3 font-bold">
                    {pillar.subtitle}
                  </span>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  {pillar.details.slice(0, 3).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                      <span className="text-kbj-green font-mono font-bold">/</span>
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Dots (4 dots for 1-by-1) */}
        <div className="md:hidden flex justify-center items-center gap-1.5 mt-4">
          {PILLARS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollMobileTo(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIdx === dotIdx
                  ? 'w-6 bg-kbj-green shadow-glow-green'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Ir a pilar ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* DESKTOP VIEW: 4 Pillars Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <div
                key={pillar.number}
                onClick={() => {
                  audioEngine.playClickSound();
                  setSelectedIdx(idx);
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className={`p-8 rounded-2xl glass-panel transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-kbj-green/60 bg-[#0D121B]/90 shadow-2xl -translate-y-2'
                    : 'hover:border-white/20 bg-[#070A0F]/75 backdrop-blur-md border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-black text-4xl text-slate-600 group-hover:text-kbj-lime transition-colors">
                      {pillar.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-kbj-green/60" />
                  </div>

                  <h3 className="text-xl font-display font-black text-white uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-kbj-lime block mb-4">
                    {pillar.subtitle}
                  </span>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  {pillar.details.slice(0, 3).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                      <span className="text-kbj-green font-mono font-bold">/</span>
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
