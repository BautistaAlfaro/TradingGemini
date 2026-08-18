import React from 'react';
import { METHOD_STEPS } from '../../data/landingData';
import { InteractiveSetupPlayer } from '../interactive/InteractiveSetupPlayer';
import { audioEngine } from '../../utils/audio';

export const MethodSection: React.FC<{ onOpenApplication: () => void }> = ({ onOpenApplication }) => {
  return (
    <section id="metodo" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>03 — Protocolo de Ejecución</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            El Método <span className="text-kbj-lime">KBJ</span> // Un proceso que puedas repetir
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            El trading no debería depender de cómo te sentís ese día. Trabajamos sobre un proceso estructurado paso a paso desde el análisis contextual hasta la toma de decisiones autónoma.
          </p>
        </div>

        {/* Interactive Step Simulator Component */}
        <div className="mb-14">
          <InteractiveSetupPlayer />
        </div>

        {/* 6-Step Summary Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHOD_STEPS.map((step) => (
            <div
              key={step.number}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="p-8 rounded-2xl glass-panel flex flex-col justify-between hover:border-kbj-green/30 transition-colors border border-white/[0.08] bg-[#070A0F]/80 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl text-kbj-lime">
                    {step.number}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white uppercase mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                {step.deliverables.slice(0, 2).map((d, dIdx) => (
                  <div key={dIdx} className="text-[11px] font-sans text-slate-300 flex items-start gap-1.5">
                    <span className="text-kbj-green font-mono font-bold">/</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
