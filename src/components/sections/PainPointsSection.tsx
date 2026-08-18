import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PAIN_POINTS } from '../../data/landingData';
import { SpotlightCard } from '../interactive/SpotlightCard';
import { audioEngine } from '../../utils/audio';

export const PainPointsSection: React.FC<{ onOpenApplication: () => void }> = ({ onOpenApplication }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="diagnostico" className="relative py-32 bg-[#05070B]/75 backdrop-blur-sm border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-red-400 uppercase">
            <span>01 — Diagnóstico Operativo</span>
            <span className="h-px w-10 bg-red-500/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
            ¿Sentís que sabés de trading, pero todavía te falta consistencia?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            <strong className="text-white">No es falta de información, es falta de proceso.</strong> La mayoría de los operadores acumulan cientos de horas en YouTube pero siguen improvisando la entrada en el segundo uno de apertura.
          </p>
        </div>

        {/* 6 Problem Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((item, idx) => {
            const isHovered = activeId === item.id;

            return (
              <SpotlightCard
                key={item.id}
                onClick={() => {
                  audioEngine.playClickSound();
                  setActiveId(item.id);
                }}
                className={`p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-white/[0.08] ${
                  isHovered ? 'bg-[#0C1018]/90 shadow-2xl -translate-y-1 border-kbj-green/40' : 'bg-[#070A0F]/80 backdrop-blur-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm text-slate-500 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                  </div>

                  <h3 className="text-lg font-display font-bold text-white uppercase mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-slate-300 flex items-start gap-2.5 bg-[#030508]/80 p-4 rounded-xl border border-white/[0.06]">
                    <Check className="w-4 h-4 text-kbj-lime shrink-0 mt-0.5" />
                    <div>
                      <span className="text-kbj-lime font-mono text-[11px] uppercase tracking-wider block mb-1">
                        Criterio KBJ
                      </span>
                      <span className="text-slate-300 font-sans leading-relaxed">{item.solution}</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Strategic Purpose Statement */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#080B10]/85 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-kbj-green/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
              <span>Propósito de la Formación</span>
              <span className="h-px w-10 bg-kbj-lime/40" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase leading-tight">
              KBJ nace para cambiar eso. <br />
              <span className="text-kbj-green">
                No quiero enseñarte a perseguir operaciones: quiero enseñarte a pensar como trader.
              </span>
            </h3>

            <div className="pt-4">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onOpenApplication();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-kbj-lime text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-green transition-all duration-200"
              >
                <span>INGRESAR A LA MENTORÍA</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
