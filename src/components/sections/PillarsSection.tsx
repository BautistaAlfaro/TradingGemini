import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PILLARS } from '../../data/landingData';
import { NeuralPillar3D } from '../canvas/NeuralPillar3D';
import { audioEngine } from '../../utils/audio';

export const PillarsSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section id="pilares" className="relative py-32 bg-[#030508]/70 backdrop-blur-sm border-t border-white/[0.08] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>02 — Pilares de Operación</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Los 4 Pilares de <span className="text-kbj-green">KBJ TRADING</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            La consistencia en mercados institucionales se apoya en cuatro dimensiones innegociables. Sin una de ellas, el sistema colapsa.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <div
                key={pillar.number}
                onClick={() => {
                  audioEngine.playClickSound();
                  setSelectedIdx(idx);
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className={`p-8 rounded-2xl glass-panel transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-kbj-green/60 bg-[#0D121B]/90 shadow-2xl -translate-y-2'
                    : 'hover:border-white/20 bg-[#070A0F]/75 backdrop-blur-md border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-black text-4xl text-slate-600 group-hover:text-kbj-lime transition-colors">
                      {pillar.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-kbj-green/60" />
                  </div>

                  <h3 className="text-xl font-display font-black text-white uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-kbj-lime block mb-4">
                    {pillar.subtitle}
                  </span>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  {pillar.details.slice(0, 3).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                      <span className="text-kbj-green font-mono font-bold">/</span>
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Interactive 3D Pillar Console */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#070A0F]/85 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative and Selector */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-kbj-lime uppercase tracking-widest">
                  Formación Integral // {PILLARS[selectedIdx].title}
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
                  {PILLARS[selectedIdx].subtitle}
                </h4>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {PILLARS[selectedIdx].description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-[11px] uppercase text-slate-500 tracking-wider">
                  Módulos de entrenamiento:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PILLARS[selectedIdx].details.map((d, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#030508]/80 border border-white/5 text-xs text-slate-300 font-sans flex items-start gap-2">
                      <span className="text-kbj-lime font-mono font-bold">●</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {PILLARS.map((p, pIdx) => (
                  <button
                    key={p.number}
                    onClick={() => {
                      audioEngine.playClickSound();
                      setSelectedIdx(pIdx);
                    }}
                    onMouseEnter={() => audioEngine.playHoverSound()}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                      selectedIdx === pIdx
                        ? 'bg-kbj-green text-slate-950 shadow-glow-green'
                        : 'bg-[#0D121B] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {p.number} {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 3D Neural Lattice Mesh Canvas */}
            <div className="lg:col-span-5 h-[280px] sm:h-[320px] rounded-2xl bg-[#030508]/80 border border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Matriz 3D // {PILLARS[selectedIdx].title}
              </div>
              <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                dpr={[1, 1.25]}
                gl={{
                  antialias: false,
                  powerPreference: 'high-performance',
                  stencil: false,
                }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[5, 5, 5]} intensity={1.5} />
                  <NeuralPillar3D activePillarIndex={selectedIdx} />
                </Suspense>
              </Canvas>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
