import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DELIVERABLES } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const DeliverablesBento: React.FC = () => {
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollMobileTo = (index: number) => {
    audioEngine.playClickSound();
    setActiveMobileIdx(index);
    if (mobileScrollRef.current) {
      const cardWidth = mobileScrollRef.current.clientWidth * 0.88;
      mobileScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextMobile = () => {
    const next = (activeMobileIdx + 1) % DELIVERABLES.length;
    scrollMobileTo(next);
  };

  const prevMobile = () => {
    const prev = (activeMobileIdx - 1 + DELIVERABLES.length) % DELIVERABLES.length;
    scrollMobileTo(prev);
  };

  return (
    <section id="entregables" className="relative py-28 sm:py-32 bg-[#030508]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Mobile Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
              <span>04 — Recursos y Acompañamiento</span>
              <span className="h-px w-10 bg-kbj-lime/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              ¿Qué incluye la <span className="text-kbj-green">Mentoría KBJ</span>?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Un ecosistema de formación institucional diseñado para acompañar tu proceso sin dejar cabos sueltos.
            </p>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center justify-between gap-4 shrink-0">
            <div className="font-mono text-xs text-slate-400">
              <span className="text-kbj-lime font-bold">0{activeMobileIdx + 1}</span> / 0{DELIVERABLES.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMobile}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Entregable anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextMobile}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Entregable siguiente"
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
            if (newIndex !== activeMobileIdx && newIndex >= 0 && newIndex < DELIVERABLES.length) {
              setActiveMobileIdx(newIndex);
            }
          }}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4 pt-1"
        >
          {DELIVERABLES.map((item, idx) => (
            <div
              key={idx}
              className={`w-[86vw] max-w-[340px] shrink-0 snap-center p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
                activeMobileIdx === idx
                  ? 'border-kbj-green/60 bg-[#0C111A]/95 shadow-2xl'
                  : 'bg-[#070A0F]/85 backdrop-blur-xl border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-white/[0.08] pb-3">
                  <span className="font-mono text-sm text-kbj-lime font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-kbj-lime bg-kbj-green/10 px-2.5 py-0.5 rounded-full border border-kbj-green/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-display font-black text-white uppercase mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="text-kbj-green">●</span>
                <span>Formación práctica e individual</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden flex justify-center items-center gap-1.5 mt-4">
          {DELIVERABLES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollMobileTo(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIdx === dotIdx
                  ? 'w-6 bg-kbj-green shadow-glow-green'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Ir a entregable ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* DESKTOP VIEW: Bento Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERABLES.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`p-8 rounded-2xl glass-panel transition-all duration-300 flex flex-col justify-between group ${
                item.span ? item.span : 'col-span-1'
              } ${item.featured ? 'border-kbj-green/40 bg-[#0C111A]/90' : 'hover:border-white/20 bg-[#070A0F]/75 backdrop-blur-md border-white/[0.08]'}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-kbj-lime">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-display font-black text-white uppercase mb-3 group-hover:text-kbj-lime transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="text-kbj-green">●</span>
                <span>Formación práctica e individual</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
