import React, { useState } from 'react';
import { PILLARS } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const PillarsSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section id="pilares" className="relative py-32 bg-[#030508]/70 backdrop-blur-sm border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
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

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
