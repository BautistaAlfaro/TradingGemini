import React from 'react';
import { TESTIMONIALS } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="resultados" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>07 — Casos de Estudio</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Experiencias de <span className="text-kbj-green">Traders KBJ</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            <strong className="text-white">El progreso no siempre comienza con una cifra en dólares.</strong> Avanzar es respetar el stop loss sin dolor, eliminar el FOMO y tener un plan que puedas ejecutar con calma sesión a sesión.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="p-8 rounded-3xl glass-panel transition-all duration-300 flex flex-col justify-between group hover:border-kbj-green/40 bg-[#070A0F]/80 backdrop-blur-md hover:bg-[#0C1018]/90 border border-white/[0.08]"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.timeframe}
                  </span>
                </div>

                <p className="text-base text-slate-200 font-sans leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-kbj-lime bg-kbj-green/10 px-3 py-1.5 rounded-lg border border-kbj-green/20">
                    {item.winRateImpact}
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-[#030508]/80 px-3 py-1.5 rounded-lg border border-white/5">
                    {item.riskManagement}
                  </div>
                </div>

                <div>
                  <div className="font-display font-bold text-white text-base uppercase">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
