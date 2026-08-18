import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MENTOR_METRICS } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const MentorSection: React.FC<{ onOpenApplication: () => void }> = ({ onOpenApplication }) => {
  return (
    <section id="mentor" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header & Narrative */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>05 — Trayectoria y Criterio</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
            Quién está detrás de <span className="text-kbj-green">KBJ TRADING</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Mi camino en el trading no comenzó teniendo todas las respuestas. El problema nunca fue encontrar más indicadores en los gráficos: era aprender a desarrollar un proceso.
          </p>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Mi objetivo <strong className="text-white">no es que copies mis operaciones, sino darte las herramientas para desarrollar criterio propio.</strong> Un trader consistente es aquel que no necesita que nadie le diga qué botón apretar cuando el mercado abre.
          </p>
        </div>

        {/* Metrics Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {MENTOR_METRICS.map((metric, idx) => (
            <div
              key={idx}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="p-8 rounded-2xl glass-panel hover:border-kbj-green/40 transition-colors bg-[#070A0F]/75 backdrop-blur-md border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-kbj-lime mb-2">
                  {metric.suffix}
                </div>
                <div className="text-sm font-display font-bold text-white uppercase mb-2">
                  {metric.label}
                </div>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed pt-3 border-t border-white/[0.06]">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action CTA */}
        <div className="pt-4">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              onOpenApplication();
            }}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-lime shadow-glow-green transition-all active:scale-95"
          >
            <span>EVALUAR MI CASO CON EL MENTOR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
