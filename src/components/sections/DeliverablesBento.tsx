import React from 'react';
import { DELIVERABLES } from '../../data/landingData';
import { audioEngine } from '../../utils/audio';

export const DeliverablesBento: React.FC = () => {
  return (
    <section id="entregables" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
