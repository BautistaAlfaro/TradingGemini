import React, { useState } from 'react';
import { X, ArrowUpRight, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../utils/audio';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('Intermedio (Opero pero no soy consistente)');
  const [market, setMarket] = useState('Forex (EURUSD, GBPUSD)');
  const [mainObstacle, setMainObstacle] = useState('Psicología y gestión de riesgo');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playCrystalResonance(1.2);
    
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#22C55E', '#A3E635', '#ffffff', '#00F0FF']
    });

    setSubmitted(true);

    const message = encodeURIComponent(
      `*POSTULACIÓN MENTORÍA KBJ TRADING*\n\n` +
      `👤 *Nombre:* ${name || 'Operador'}\n` +
      `📊 *Nivel de Experiencia:* ${experience}\n` +
      `📈 *Mercado de Interés:* ${market}\n` +
      `🛑 *Principal Obstáculo:* ${mainObstacle}\n` +
      `📱 *WhatsApp:* ${whatsapp || 'Vía chat'}\n\n` +
      `_Hola, quiero postularme a la mentoría KBJ para evaluar mi caso._`
    );

    setTimeout(() => {
      window.open(`https://wa.me/5491100000000?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl p-8 sm:p-10 bg-[#070A0F] border border-kbj-green/40 rounded-3xl shadow-2xl shadow-kbj-green/10 text-slate-100 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-kbj-green/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-kbj-lime/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-md bg-kbj-green/10 border border-kbj-green/30 text-kbj-lime text-xs font-mono mb-4">
              <span>[ POSTULACIÓN DIRECTA // CUPOS LIMITADOS ]</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight mb-2">
              Evaluación de Perfil <span className="text-kbj-green">KBJ</span>
            </h3>
            <p className="text-sm text-slate-400 font-sans mb-8">
              Completá estos breves datos para evaluar tu situación técnica y confirmar si la mentoría se alinea con tus metas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lucas Martínez"
                  value={name}
                  onChange={(e) => {
                    audioEngine.playKeySound();
                    setName(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-[#030508] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-kbj-green font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Nivel Actual
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 bg-[#030508] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-kbj-green font-mono"
                  >
                    <option value="Principiante (Conozco lo básico)">Principiante (Básico)</option>
                    <option value="Intermedio (Opero pero no soy consistente)">Intermedio (Sin consistencia)</option>
                    <option value="Avanzado (Buscando pasar fondeo)">Avanzado (Buscando fondeo)</option>
                    <option value="Frustrado por pérdidas previas">Frustrado por pérdidas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Mercado Principal
                  </label>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="w-full px-4 py-3 bg-[#030508] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-kbj-green font-mono"
                  >
                    <option value="Forex (EURUSD, GBPUSD)">Forex (Divisas)</option>
                    <option value="Índices (Nasdaq 100, S&P 500)">Índices (NQ, ES)</option>
                    <option value="Crypto (BTC, ETH)">Crypto (BTC / Altcoins)</option>
                    <option value="Oro / Commodities (XAUUSD)">Oro / Commodities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  ¿Cuál es tu mayor obstáculo hoy?
                </label>
                <select
                  value={mainObstacle}
                  onChange={(e) => setMainObstacle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#030508] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-kbj-green font-mono"
                >
                  <option value="Psicología y gestión de riesgo">Psicología (FOMO, sobreoperar, revancha)</option>
                  <option value="No tengo un setup claro de entrada">No tengo un setup claro de entrada</option>
                  <option value="Cierro rápido las ganancias y dejo correr las pérdidas">Cierro rápido ganancias / dejo correr pérdidas</option>
                  <option value="Falta de acompañamiento y feedback real">Falta de acompañamiento y feedback real</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Número de WhatsApp
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: +54 9 11 2345-6789"
                  value={whatsapp}
                  onChange={(e) => {
                    audioEngine.playKeySound();
                    setWhatsapp(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-[#030508] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-kbj-green font-mono"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-kbj-green shrink-0" />
                <span>Privacidad institucional garantizada. Respuesta directa del mentor.</span>
              </div>

              <button
                type="submit"
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider bg-kbj-green text-slate-950 hover:bg-kbj-lime shadow-glow-green transition-all"
              >
                <span>ENVIAR POSTULACIÓN VÍA WHATSAPP</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-kbj-green/20 border border-kbj-green flex items-center justify-center text-kbj-lime">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-display font-black text-white uppercase">
              Postulación Registrada
            </h4>
            <p className="text-slate-400 text-sm max-w-md mx-auto font-sans">
              Redirigiendo a WhatsApp para iniciar el diagnóstico con el mentor de <strong>KBJ TRADING</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
