import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { METHOD_STEPS } from '../../data/landingData';
import { InteractiveSetupPlayer } from '../interactive/InteractiveSetupPlayer';
import { audioEngine } from '../../utils/audio';

export const MethodSection: React.FC<{ onOpenApplication: () => void }> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop: 2 per slide (3 slides). Mobile: 1 per slide (5 slides).
  const desktopItemsPerSlide = 2;
  const desktopTotalSlides = Math.ceil(METHOD_STEPS.length / desktopItemsPerSlide);
  const totalMobileSlides = METHOD_STEPS.length;

  const nextDesktop = () => {
    audioEngine.playClickSound();
    setCurrentSlide((prev) => (prev + 1) % desktopTotalSlides);
  };

  const prevDesktop = () => {
    audioEngine.playClickSound();
    setCurrentSlide((prev) => (prev - 1 + desktopTotalSlides) % desktopTotalSlides);
  };

  const scrollMobileTo = (index: number) => {
    audioEngine.playClickSound();
    setCurrentSlide(index);
    if (mobileScrollRef.current) {
      const cardWidth = mobileScrollRef.current.clientWidth * 0.88;
      mobileScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextMobile = () => {
    const nextIdx = (currentSlide + 1) % totalMobileSlides;
    scrollMobileTo(nextIdx);
  };

  const prevMobile = () => {
    const prevIdx = (currentSlide - 1 + totalMobileSlides) % totalMobileSlides;
    scrollMobileTo(prevIdx);
  };

  const currentDesktopItems = METHOD_STEPS.slice(
    currentSlide * desktopItemsPerSlide,
    currentSlide * desktopItemsPerSlide + desktopItemsPerSlide
  );

  return (
    <section id="metodo" className="relative py-28 sm:py-32 bg-[#05070B]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
              <span>03 — Protocolo de Ejecución</span>
              <span className="h-px w-10 bg-kbj-lime/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
              El Método <span className="luxury-gradient-text">KBJ</span> // Hoja de Ruta Paso a Paso
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Un proceso estructurado de 10 semanas diseñado para que aprendas a analizar, ejecutar y auditar tu operativa con criterio propio.
            </p>
          </div>

          {/* Carousel Controls (Desktop & Mobile) */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            {/* Desktop Counter */}
            <div className="hidden md:block font-mono text-xs text-slate-400">
              <span className="text-kbj-lime font-bold">0{currentSlide + 1}</span> / 0{desktopTotalSlides}
            </div>

            {/* Mobile Counter */}
            <div className="md:hidden font-mono text-xs text-slate-400">
              <span className="text-kbj-lime font-bold">0{currentSlide + 1}</span> / 0{totalMobileSlides}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.innerWidth < 768) prevMobile();
                  else prevDesktop();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Fase anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  if (window.innerWidth < 768) nextMobile();
                  else nextDesktop();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="p-3 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-kbj-green/40 transition-all active:scale-95 border border-white/10"
                aria-label="Fase siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Phase Quick Jump Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {METHOD_STEPS.map((step, idx) => {
            const isActive = window.innerWidth < 768 ? currentSlide === idx : currentSlide === Math.floor(idx / desktopItemsPerSlide);

            return (
              <button
                key={step.number}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    scrollMobileTo(idx);
                  } else {
                    audioEngine.playClickSound();
                    setCurrentSlide(Math.floor(idx / desktopItemsPerSlide));
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all shrink-0 border ${
                  isActive
                    ? 'bg-kbj-green text-slate-950 font-bold shadow-glow-green border-kbj-green'
                    : 'bg-[#080C14] text-slate-400 hover:text-white border-white/5 hover:border-white/15'
                }`}
              >
                {step.number} // {step.phase}
              </button>
            );
          })}
        </div>

        {/* Interactive Step Simulator Component (Hidden for now as requested) */}
        {/* <div className="mb-12"><InteractiveSetupPlayer /></div> */}

        {/* MOBILE VIEW: Horizontal 1-by-1 sliding track */}
        <div
          ref={mobileScrollRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const cardWidth = target.clientWidth * 0.88;
            const newIndex = Math.round(target.scrollLeft / cardWidth);
            if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalMobileSlides) {
              setCurrentSlide(newIndex);
            }
          }}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4 pt-1"
        >
          {METHOD_STEPS.map((step) => (
            <div
              key={step.number}
              className="w-[86vw] max-w-[340px] shrink-0 snap-center p-7 rounded-3xl bg-[#070A0F]/85 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display font-black text-2xl text-kbj-lime">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                      {step.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-kbj-green bg-kbj-green/10 px-2.5 py-0.5 rounded-full border border-kbj-green/20">
                    {step.phase}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-2">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Entregables:
                </div>

                {step.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="text-xs text-slate-200 font-sans flex items-start gap-2 bg-[#030508]/80 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-kbj-lime shrink-0 mt-0.5" />
                    <span className="leading-snug">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: 2-by-2 Animated Carousel */}
        <div className="hidden md:block relative min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-6"
            >
              {currentDesktopItems.map((step) => (
                <div
                  key={step.number}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  className="p-8 sm:p-10 rounded-3xl bg-[#070A0F]/85 backdrop-blur-xl border border-white/10 hover:border-kbj-green/40 transition-all duration-300 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-kbj-green/5 rounded-full blur-3xl pointer-events-none group-hover:bg-kbj-green/15 transition-colors" />

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-black text-3xl text-kbj-lime">
                          {step.number}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                          {step.title}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-kbj-green bg-kbj-green/10 px-3 py-1 rounded-full border border-kbj-green/20">
                        {step.phase}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-2.5 relative z-10">
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                      Entregables de la etapa:
                    </div>

                    {step.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="text-xs sm:text-sm text-slate-200 font-sans flex items-start gap-2.5 bg-[#030508]/80 p-3 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-kbj-lime shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        {/* Desktop Dots */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-8">
          {[...Array(desktopTotalSlides)].map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                audioEngine.playClickSound();
                setCurrentSlide(dotIdx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === dotIdx
                  ? 'w-8 bg-kbj-green shadow-glow-green'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir a etapa ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden flex justify-center items-center gap-1.5 mt-4">
          {[...Array(totalMobileSlides)].map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollMobileTo(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === dotIdx
                  ? 'w-6 bg-kbj-green shadow-glow-green'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Ir a tarjeta ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
