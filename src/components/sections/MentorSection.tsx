import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MENTOR_METRICS } from '../../data/landingData';
import { AudioFrequencyVisualizer } from '../interactive/AudioFrequencyVisualizer';
import { audioEngine } from '../../utils/audio';

export const MentorSection: React.FC<{ onOpenApplication: () => void }> = ({ onOpenApplication }) => {
  return (
    <section id="mentor" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Workstation Visual & Audio Frequency HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#070A0F]/80 backdrop-blur-md shadow-2xl">
              
              <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80"
                  alt="KBJ Trading Desk"
                  className="w-full h-full object-cover object-center filter brightness-70 contrast-125 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-black/40" />

                {/* Live Real-time Audio Frequency Wave HUD */}
                <div className="absolute bottom-20 left-4 right-4 p-3 rounded-2xl bg-[#030508]/85 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase pb-1">
                    <span>Frecuencia Acústica // 432 Hz</span>
                    <span className="text-kbj-green font-bold">Activo</span>
                  </div>
                  <AudioFrequencyVisualizer />
                </div>

                {/* Overlaid Bottom Quote */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#070A0F]/90 border border-white/10 backdrop-blur-md space-y-1">
                  <div className="text-xs font-sans font-medium text-white leading-snug">
                    "El trading profesional se juega en el control del riesgo, no en la euforia del acierto."
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Story & Telemetry Counters */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
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
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              {MENTOR_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  className="p-6 rounded-2xl glass-panel hover:border-kbj-green/40 transition-colors bg-[#070A0F]/75 backdrop-blur-md border border-white/[0.08]"
                >
                  <div className="text-3xl sm:text-4xl font-display font-black text-kbj-lime mb-1">
                    {metric.suffix}
                  </div>
                  <div className="text-sm font-display font-bold text-white uppercase">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onOpenApplication();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-lime shadow-glow-green transition-all"
              >
                <span>EVALUAR MI CASO CON EL MENTOR</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
