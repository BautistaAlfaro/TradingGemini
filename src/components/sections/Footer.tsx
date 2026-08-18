import React from 'react';
import { ArrowUp, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioEngine.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020407]/85 backdrop-blur-md border-t border-white/[0.08] pt-20 pb-12 text-slate-400 font-sans text-sm z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.06]">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0D121B] border border-kbj-green/40 flex items-center justify-center">
                <span className="font-display font-black text-sm text-kbj-lime">K</span>
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                KBJ <span className="text-kbj-green font-mono font-bold">TRADING</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 max-w-sm font-sans leading-relaxed">
              Mentoría personalizada para traders que buscan estructura profesional, gestión matemática de riesgo y control psicológico en mercados financieros.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/10 flex items-center justify-center text-slate-400 hover:text-kbj-lime hover:border-kbj-green/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/10 flex items-center justify-center text-slate-400 hover:text-kbj-lime hover:border-kbj-green/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/10 flex items-center justify-center text-slate-400 hover:text-kbj-lime hover:border-kbj-green/40 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/10 flex items-center justify-center text-slate-400 hover:text-kbj-lime hover:border-kbj-green/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navegación
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><a href="#hero" className="hover:text-kbj-lime transition-colors">// INICIO</a></li>
              <li><a href="#diagnostico" className="hover:text-kbj-lime transition-colors">// DIAGNÓSTICO</a></li>
              <li><a href="#pilares" className="hover:text-kbj-lime transition-colors">// PILARES MATRIZ</a></li>
              <li><a href="#metodo" className="hover:text-kbj-lime transition-colors">// MÉTODO KBJ</a></li>
              <li><a href="#mentor" className="hover:text-kbj-lime transition-colors">// MENTOR</a></li>
              <li><a href="#calculadora" className="hover:text-kbj-lime transition-colors">// CALCULADORA R:R</a></li>
              <li><a href="#resultados" className="hover:text-kbj-lime transition-colors">// RESULTADOS</a></li>
              <li><a href="#faq" className="hover:text-kbj-lime transition-colors">// FAQ</a></li>
            </ul>
          </div>

          {/* Compliance Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-kbj-lime">
              Transparencia Institucional
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              La mentoría KBJ se enfoca en la educación técnica, el criterio propio y el desarrollo de habilidades analíticas individuales. No somos asesores financieros ni gestionamos capital de terceros.
            </p>
            <div className="p-3 rounded-xl bg-[#070A0F] border border-white/5 text-[11px] font-mono text-slate-400">
              KBJ TRADING © {new Date().getFullYear()} • TODOS LOS DERECHOS RESERVADOS
            </div>
          </div>

        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="pt-8 space-y-3 text-slate-500 text-[11px] font-sans leading-relaxed">
          <div className="font-mono font-bold uppercase text-slate-400">
            AVISO DE RIESGO INSTITUCIONAL:
          </div>
          <p>
            El comercio de divisas (Forex), contratos por diferencia (CFDs), futuros, acciones y criptomonedas conlleva un alto nivel de riesgo para su capital y puede no ser adecuado para todos los inversores. Existe la posibilidad de que sufra una pérdida parcial o total de su capital invertido; por lo tanto, no debe especular con capital que no pueda permitirse perder. Todo el contenido, materiales, análisis, clases y ejemplos provistos por KBJ TRADING tienen propósitos exclusivamente educativos e informativos y bajo ninguna circunstancia constituyen una recomendación directa de inversión o asesoramiento financiero. El rendimiento pasado no garantiza resultados futuros.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
          <div>
            KBJ TRADING // INSTITUTIONAL SYSTEM
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="flex items-center gap-1.5 text-slate-400 hover:text-kbj-lime transition-colors"
          >
            <span>VOLVER ARRIBA</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
