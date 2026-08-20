import React, { useState } from 'react';
import { audioEngine } from '../../utils/audio';

export const RiskCalculatorWidget: React.FC = () => {
  const [accountSize, setAccountSize] = useState<number>(50000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPips, setStopLossPips] = useState<number>(15);
  const [takeProfitPips, setTakeProfitPips] = useState<number>(45);

  const riskAmount = (accountSize * riskPercent) / 100;
  const rewardAmount = stopLossPips > 0 ? (riskAmount / stopLossPips) * takeProfitPips : 0;
  const riskRewardRatio = stopLossPips > 0 ? (takeProfitPips / stopLossPips).toFixed(2) : '0';
  const lotSize = stopLossPips > 0 ? (riskAmount / (stopLossPips * 10)).toFixed(2) : '0.00';

  const isFavorable = parseFloat(riskRewardRatio) >= 2.5;

  return (
    <section id="calculadora" className="relative py-32 bg-[#030508]/75 backdrop-blur-md border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>06 — Terminal de Cálculo R:R</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Dimensionamiento de <span className="text-kbj-green">Posición y Riesgo</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Un trader profesional nunca arriesga al azar. Dimensioná tu posición y calculá la asimetría matemática antes de ejecutar.
          </p>
        </div>

        {/* Terminal Box */}
        <div className="max-w-5xl rounded-3xl bg-[#070A0F]/85 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Inputs Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Account Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono">
                  <span className="text-slate-400 uppercase">Balance de la Cuenta</span>
                  <span className="text-kbj-lime font-bold font-mono text-sm">${accountSize.toLocaleString('en-US')} USD</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="200000"
                  step="1000"
                  value={accountSize}
                  onChange={(e) => {
                    audioEngine.playKeySound();
                    setAccountSize(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-kbj-green"
                />
                <div className="flex justify-between gap-1.5 mt-3">
                  {[10000, 25000, 50000, 100000, 200000].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        audioEngine.playClickSound();
                        setAccountSize(val);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#0C1017] hover:bg-slate-800 text-xs font-mono text-slate-400 border border-white/5"
                    >
                      ${val / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk % Preset */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono">
                  <span className="text-slate-400 uppercase">Riesgo por trade (%)</span>
                  <span className="text-kbj-green font-bold">{riskPercent}%</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0.5, 1.0, 1.5, 2.0].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => {
                        audioEngine.playClickSound();
                        setRiskPercent(pct);
                      }}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        riskPercent === pct
                          ? 'bg-kbj-green text-slate-950 shadow-glow-green border-kbj-green'
                          : 'bg-[#0C1017] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* SL and TP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Stop Loss (Pips)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="200"
                    value={stopLossPips}
                    onChange={(e) => {
                      audioEngine.playKeySound();
                      setStopLossPips(Math.max(1, Number(e.target.value)));
                    }}
                    className="w-full px-4 py-3 bg-[#030508]/80 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Take Profit (Pips)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={takeProfitPips}
                    onChange={(e) => {
                      audioEngine.playKeySound();
                      setTakeProfitPips(Math.max(1, Number(e.target.value)));
                    }}
                    className="w-full px-4 py-3 bg-[#030508]/80 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-kbj-green"
                  />
                </div>
              </div>

            </div>

            {/* Output HUD Display */}
            <div className="lg:col-span-6 bg-[#030508]/85 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Resultado Calculado</span>
                <span className={`text-xs font-mono font-bold ${
                  isFavorable ? 'text-kbj-lime' : 'text-yellow-300'
                }`}>
                  {isFavorable ? '● Ventaja Aprobada' : '● R:R Menor a 1:2.5'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#070A0F]/80 border border-red-500/20">
                  <div className="text-[11px] font-mono text-slate-400">Riesgo Monetario</div>
                  <div className="text-2xl font-mono font-black text-red-400 mt-1">
                    -${riskAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">{riskPercent}% del balance</div>
                </div>

                <div className="p-4 rounded-xl bg-[#070A0F]/80 border border-kbj-green/20">
                  <div className="text-[11px] font-mono text-slate-400">Retorno Estimado</div>
                  <div className="text-2xl font-mono font-black text-kbj-lime mt-1">
                    +${rewardAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">+{(riskPercent * parseFloat(riskRewardRatio)).toFixed(2)}% retorno</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#070A0F]/80 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Lotaje Sugerido</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {lotSize} <span className="text-xs text-slate-500 font-normal">LOTS</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400">Ratio R:R</div>
                  <div className="text-2xl font-mono font-black text-kbj-green mt-1">
                    1 : {riskRewardRatio}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
