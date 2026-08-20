import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface CtaSectionProps {
  onOpenApplication: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenApplication }) => {
  return (
    <section className="relative py-32 bg-[#030508]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#080C14]/90 via-[#0C121E]/90 to-[#080C14]/90 backdrop-blur-xl border border-kbj-green/40 p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-kbj-lime uppercase">
              <span>Comenzar el Proceso</span>
              <span className="h-px w-8 bg-kbj-lime/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
              Tu próximo trade debería comenzar con un plan, <br />
              <span className="luxury-gradient-text">
                no con una emoción.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans font-light leading-relaxed">
              Vamos a analizar tu situación actual y ver si la mentoría tiene sentido para vos. Sin compromisos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onOpenApplication();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-lime shadow-glow-green hover:shadow-glow-lime transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95"
              >
                <span>QUIERO INFORMACIÓN SOBRE KBJ</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/5491100000000?text=Hola%20KBJ%20Trading,%20quiero%20informaci%C3%B3n%20sobre%20la%20mentor%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                onClick={() => audioEngine.playClickSound()}
                className="w-full sm:w-auto px-9 py-4 rounded-xl glass-panel text-white font-mono text-xs uppercase tracking-wider hover:border-kbj-green/60 hover:bg-[#101726] transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-kbj-lime" />
                <span>HABLAR CON EL MENTOR</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
