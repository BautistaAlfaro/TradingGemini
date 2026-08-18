import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/landingData';
import { TerminalCommandConsole } from '../interactive/TerminalCommandConsole';
import { audioEngine } from '../../utils/audio';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    audioEngine.playClickSound();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-32 bg-transparent border-t border-white/[0.08] z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>08 — Preguntas Frecuentes</span>
            <span className="h-px w-10 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Respuestas Claras sobre <span className="text-kbj-green">KBJ</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Claridad técnica sobre la metodología, las sesiones, el capital y la filosofía de formación.
          </p>
        </div>

        {/* Interactive CLI Terminal Console */}
        <div>
          <TerminalCommandConsole />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest pb-2">
            Consultas Frecuentes
          </div>

          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A0E17]/90 backdrop-blur-md border-kbj-green/40 shadow-2xl'
                    : 'bg-[#070A0F]/75 backdrop-blur-md border-white/[0.06] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-kbj-lime font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold text-white uppercase">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-kbj-green text-slate-950 border-kbj-green' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed border-t border-white/[0.06]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
