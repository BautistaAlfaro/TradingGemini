import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface OverviewSectionProps {
  onOpenApplication: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onOpenApplication }) => {
  return (
    // Render only on mobile (md:hidden)
    <section id="resumen-mobile" className="md:hidden relative py-20 bg-transparent border-t border-white/[0.06] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Main Subtitle */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-kbj-lime uppercase">
            <span>Enfoque Institucional</span>
            <span className="h-px w-8 bg-kbj-lime/40" />
          </div>

          <p className="text-xl font-display font-bold text-white leading-snug">
            Mentoría personalizada para traders que quieren dejar de improvisar y construir un proceso sólido, consistente y rentable en el tiempo.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                audioEngine.playClickSound();
                onOpenApplication();
              }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="w-full py-4 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-kbj-lime shadow-glow-green transition-all"
            >
              <span>CONOCER LA MENTORÍA</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/5491100000000?text=Hola%20KBJ%20Trading,%20quiero%20conocer%20la%20mentor%C3%ADa%20personalizada"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => audioEngine.playHoverSound()}
              onClick={() => audioEngine.playClickSound()}
              className="w-full py-4 rounded-xl glass-panel text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-kbj-green/60 hover:bg-[#0E141F] transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 text-kbj-lime" />
              <span>HABLAR POR WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Key Institutional Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-6 rounded-2xl glass-panel bg-[#070A0F]/80 backdrop-blur-md border border-white/[0.08]">
            <div className="font-mono text-xs text-slate-400 tracking-wider mb-1">
              Ratio R:R Mínimo
            </div>
            <div className="font-display text-2xl font-black text-kbj-lime">
              1 : 3.0+ RR
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Asimetría matemática en cada operación.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-[#070A0F]/80 backdrop-blur-md border border-white/[0.08]">
            <div className="font-mono text-xs text-slate-400 tracking-wider mb-1">
              Riesgo Controlado
            </div>
            <div className="font-display text-2xl font-black text-white">
              ≤ 1.0% por trade
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Preservación estricta de capital.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-[#070A0F]/80 backdrop-blur-md border border-white/[0.08]">
            <div className="font-mono text-xs text-slate-400 tracking-wider mb-1">
              Canal de Señales
            </div>
            <div className="font-display text-2xl font-black text-red-400">
              0% (Solo criterio)
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cero dependencia: operás por vos mismo.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-[#070A0F]/80 backdrop-blur-md border border-white/[0.08]">
            <div className="font-mono text-xs text-slate-400 tracking-wider mb-1">
              Modalidad de Revisión
            </div>
            <div className="font-display text-2xl font-black text-kbj-green">
              1 a 1 directo
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Auditoría y feedback individual.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
