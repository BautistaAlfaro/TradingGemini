import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, CornerDownLeft } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface CommandOutput {
  command: string;
  response: string;
}

export const TerminalCommandConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'sys.init',
      response: 'KBJ TERMINAL v4.2 // CONECTADO AL NODO CENTRAL. ESCRIBÍ "help" PARA VER LOS COMANDOS DISPONIBLES.'
    }
  ]);
  const historyContainerRef = useRef<HTMLDivElement>(null);

  const commandLibrary: Record<string, string> = {
    help: 'COMANDOS DISPONIBLES: "metodo", "pilares", "fondeo", "capital", "senales", "mentor", "contacto", "clear"',
    metodo: 'MÉTODO KBJ: 6 etapas desde la auditoría inicial hasta la independencia operativa. Clases en vivo, revisiones 1 a 1 y journal automatizado.',
    pilares: 'LOS 4 PILARES: 01 Estrategia Cuantitativa | 02 Gestión de Riesgo (≤1% por trade) | 03 Mecánica de Ejecución | 04 Psicología Aplicada.',
    fondeo: 'CUENTAS FONDEADAS: Formamos para superar evaluaciones de $50k a $200k (FTMO, Topstep, FundedNext) con drawdown controlado.',
    capital: 'CAPITAL INICIAL: Durante el entrenamiento operás en cuenta DEMO. No arriesgás ahorros personales.',
    senales: 'CANAL DE SEÑALES: Rotundamente NO. En KBJ no vendemos pescado: te enseñamos a pescar y operar con criterio propio.',
    mentor: 'EXPERIENCIA: +5 años en mercados financieros, +300 alumnos graduados, +10.000 horas de análisis documentadas.',
    contacto: 'POSTULACIÓN: Escribí por WhatsApp al +54 9 11 0000-0000 o abrí el modal de postulación.',
    clear: '__CLEAR__'
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    audioEngine.playKeySound();

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const resp = commandLibrary[trimmed] || `COMANDO NO RECONOCIDO: "${trimmed}". ESCRIBÍ "help" PARA VER LA LISTA.`;

    setHistory((prev) => [...prev, { command: cmd, response: resp }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  // Scroll ONLY the inner terminal output container, never the window!
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="rounded-3xl bg-[#04060A]/90 border border-white/10 p-6 sm:p-8 font-mono text-xs shadow-2xl space-y-4 backdrop-blur-md">
      
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-kbj-lime">
          <TerminalIcon className="w-4 h-4 text-kbj-green" />
          <span className="font-bold tracking-wider uppercase">KBJ QUERY ENGINE // INTERACTIVE CLI</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-kbj-green animate-pulse" />
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* Terminal History Container */}
      <div ref={historyContainerRef} className="space-y-3 max-h-[220px] overflow-y-auto pr-2 text-slate-300">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-kbj-lime">
              <span className="text-slate-600">❯</span>
              <span className="font-bold">{item.command}</span>
            </div>
            <div className="pl-4 text-slate-400 font-sans text-xs leading-relaxed">
              {item.response}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Chips */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
        <span className="text-[10px] text-slate-500 py-1 uppercase">COMANDOS RÁPIDOS:</span>
        {['metodo', 'pilares', 'fondeo', 'senales', 'mentor', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="px-2.5 py-1 rounded bg-[#0C1017] hover:bg-kbj-green/20 hover:text-kbj-lime text-slate-400 border border-white/5 transition-colors text-[11px]"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input Command Line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <span className="text-kbj-green font-bold text-sm">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            audioEngine.playKeySound();
            setInput(e.target.value);
          }}
          placeholder="Escribí un comando (ej: metodo, fondeo, help)..."
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs"
        />
        <button
          type="submit"
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="px-3 py-1.5 rounded-lg bg-kbj-green/20 hover:bg-kbj-green text-kbj-lime hover:text-slate-950 transition-colors flex items-center gap-1 font-mono text-[11px] font-bold"
        >
          <span>ENVIAR</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>

    </div>
  );
};
