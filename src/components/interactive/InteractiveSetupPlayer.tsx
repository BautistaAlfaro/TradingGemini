import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, TrendingUp, Shield, Award, Terminal } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface SetupStep {
  step: string;
  title: string;
  action: string;
  pnl: string;
  log: string;
  status: string;
}

export const InteractiveSetupPlayer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps: SetupStep[] = [
    {
      step: '01',
      title: 'AUDITORÍA & CONTEXTO MACRO (HTF)',
      action: 'Análisis de estructura diaria en NQ100. Identificación de liquidez pendiente en 21,250.',
      pnl: '$0.00',
      log: 'ORDEN: EN ESPERA // CONDICIONES INICIALES VALIDADAS',
      status: 'DIRECCIÓN DIARIA ALCISTA'
    },
    {
      step: '02',
      title: 'BARRIDO DE LIQUIDEZ (LIQUIDITY SWEEP)',
      action: 'El precio toma los mínimos de Asia y testea el Order Block institucional de 15 minutos.',
      pnl: '$0.00',
      log: 'LIQUIDEZ EXTERNA RECOGIDA // ESPERANDO CAMBIO ESTRUCTURAL',
      status: 'SWEEP COMPLETADO'
    },
    {
      step: '03',
      title: 'SETUP KBJ & FVG CONFIRMADO',
      action: 'Quiebre de estructura con desplazamiento alcista (MSS). Entrada programada en 21,320.',
      pnl: '+$0.00 (PENDIENTE)',
      log: 'CRITERIO KBJ: 4 DE 4 CONFLUENCIAS ACTIVADAS',
      status: 'GATILLO DE ENTRADA DISPARADO'
    },
    {
      step: '04',
      title: 'EJECUCIÓN & INIZIALIZACIÓN DE RIESGO',
      action: 'Orden LONG abierta: 5 Lotes. Stop Loss en 21,295 (25 pts). Riesgo fijo: 0.8% ($800).',
      pnl: '+$450.00 (+0.45R)',
      log: 'SL INNEGOCIABLE COLOCADO // DRAWDOWN CERO',
      status: 'POSICIÓN ACTIVA'
    },
    {
      step: '05',
      title: 'GESTIÓN ACTIVA & BREAKEVEN',
      action: 'El precio alcanza +2.0R. Se toma 50% de beneficio y se mueve Stop Loss a Breakeven ($0 riesgo).',
      pnl: '+$1,600.00 (+2.0R)',
      log: 'PARCIALES TOMADOS // OPERACIÓN BLINDADA AL 100%',
      status: 'BREAKEVEN LOCK'
    },
    {
      step: '06',
      title: 'TAKE PROFIT FINAL & INDEPENDENCIA',
      action: 'Objetivo institucional alcanzado en 21,425. Trade cerrado con ratio asimétrico +4.2R.',
      pnl: '+$3,360.00 (+4.2R)',
      log: 'EJECUCIÓN PERFECTA // REGISTRADO EN JOURNAL KBJ',
      status: 'TAKE PROFIT COMPLETADO'
    }
  ];

  const handleNext = () => {
    audioEngine.playClickSound();
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    audioEngine.playClickSound();
    setCurrentStep(0);
  };

  const active = steps[currentStep];

  return (
    <div className="rounded-3xl bg-[#070A0F] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-kbj-lime uppercase">
            <Terminal className="w-4 h-4" />
            <span>SIMULADOR DE PROTOCOLO KBJ EN VIVO</span>
          </div>
          <h4 className="text-xl font-display font-bold text-white uppercase mt-1">
            Mecánica de Ejecución Institucional
          </h4>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reiniciar simulador"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="px-5 py-2.5 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-lime shadow-glow-green transition-all flex items-center gap-2"
          >
            <span>{currentStep === steps.length - 1 ? 'REINICIAR PROTOCOLO' : 'AVANZAR ETAPA'}</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* 6 Step Progress Timeline */}
      <div className="grid grid-cols-6 gap-2">
        {steps.map((s, idx) => {
          const isCurrent = currentStep === idx;
          const isPast = currentStep > idx;

          return (
            <button
              key={s.step}
              onClick={() => {
                audioEngine.playClickSound();
                setCurrentStep(idx);
              }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'bg-kbj-lime shadow-glow-lime'
                  : isPast
                  ? 'bg-kbj-green'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              title={`Paso ${s.step}: ${s.title}`}
            />
          );
        })}
      </div>

      {/* Simulated Live Trade HUD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#030508] rounded-2xl border border-white/[0.08] p-6">
        
        {/* Left Telemetry info */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-4xl text-kbj-lime">
              {active.step}
            </span>
            <div>
              <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider block">
                FASE OPERATIVA
              </span>
              <h5 className="font-display font-bold text-white text-base sm:text-lg uppercase">
                {active.title}
              </h5>
            </div>
          </div>

          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            {active.action}
          </p>

          <div className="p-3.5 rounded-xl bg-[#070A0F] border border-white/5 font-mono text-xs text-kbj-green">
            <span className="text-slate-500 block text-[10px] uppercase">LOG EN TIEMPO REAL:</span>
            {active.log}
          </div>
        </div>

        {/* Right Metric Gauge */}
        <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-[#070A0F] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">ESTADO</span>
            <span className="font-mono text-xs text-kbj-lime font-bold">
              {active.status}
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] text-slate-500 uppercase">RETORNO ACUMULADO</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-white mt-1">
              {active.pnl}
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5 flex items-center justify-between">
            <span>PASO {currentStep + 1} DE 6</span>
            <span className="text-kbj-green font-bold">KBJ VERIFIED EDGE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
