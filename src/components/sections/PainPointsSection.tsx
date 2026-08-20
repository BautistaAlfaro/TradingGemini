import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { PAIN_POINTS } from '../../data/landingData';
import { SpotlightCard } from '../interactive/SpotlightCard';
import { audioEngine } from '../../utils/audio';

export const PainPointsSection: React.FC<{ onOpenApplication: () => void }> = ({ onOpenApplication }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop: 2 per slide (3 slides). Mobile: 1 per slide (6 slides).
  const desktopItemsPerSlide = 2;
  const desktopTotalSlides = Math.ceil(PAIN_POINTS.length / desktopItemsPerSlide);
  const totalMobileSlides = PAIN_POINTS.length;

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

  const currentDesktopItems = PAIN_POINTS.slice(
    currentSlide * desktopItemsPerSlide,
    currentSlide * desktopItemsPerSlide + desktopItemsPerSlide
  );

  return (
    <section id="diagnostico" className="relative py-28 sm:py-32 bg-[#05070B]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-red-400 uppercase">
              <span>01 — Diagnóstico Operativo</span>
              <span className="h-px w-10 bg-red-500/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
              ¿Sentís que sabés de trading, pero todavía te falta consistencia?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              <strong className="text-white">No es falta de información, es falta de proceso.</strong> Identificá qué fricciones están frenando tu crecimiento.
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
                aria-label="Anterior"
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
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal 1-by-1 sliding track to the right */}
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
          {PAIN_POINTS.map((item, idx) => {
            const isHovered = activeId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  audioEngine.playClickSound();
                  setActiveId(item.id);
                }}
                className={`w-[86vw] max-w-[340px] shrink-0 snap-center p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isHovered
                    ? 'bg-[#0C1018]/95 shadow-[0_0_40px_rgba(34,197,94,0.15)] border-kbj-green/50'
                    : 'bg-[#070A0F]/85 backdrop-blur-xl border-white/10'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-sm text-kbj-lime font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                      {item.stat}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-black text-white uppercase mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.08]">
                  <div className="text-xs text-slate-300 flex items-start gap-2.5 bg-[#030508]/80 p-3.5 rounded-2xl border border-white/[0.06]">
                    <Check className="w-4 h-4 text-kbj-lime shrink-0 mt-0.5" />
                    <div>
                      <span className="text-kbj-lime font-mono text-[11px] uppercase tracking-wider block mb-0.5 font-bold">
                        Criterio KBJ
                      </span>
                      <span className="text-slate-300 font-sans leading-relaxed">{item.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW: 2-by-2 Animated Carousel */}
        <div className="hidden md:block relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-6"
            >
              {currentDesktopItems.map((item, idx) => {
                const globalIndex = currentSlide * desktopItemsPerSlide + idx;
                const isHovered = activeId === item.id;

                return (
                  <SpotlightCard
                    key={item.id}
                    onClick={() => {
                      audioEngine.playClickSound();
                      setActiveId(item.id);
                    }}
                    className={`p-8 sm:p-10 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer border border-white/[0.08] ${
                      isHovered
                        ? 'bg-[#0C1018]/95 shadow-[0_0_50px_rgba(34,197,94,0.15)] -translate-y-1 border-kbj-green/50'
                        : 'bg-[#070A0F]/85 backdrop-blur-xl hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                        <span className="font-mono text-sm text-kbj-lime font-bold">
                          0{globalIndex + 1}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                          {item.stat}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase mb-3 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/[0.08]">
                      <div className="text-xs sm:text-sm text-slate-300 flex items-start gap-3 bg-[#030508]/80 p-4 sm:p-5 rounded-2xl border border-white/[0.06]">
                        <Check className="w-4 h-4 text-kbj-lime shrink-0 mt-0.5" />
                        <div>
                          <span className="text-kbj-lime font-mono text-xs uppercase tracking-wider block mb-1 font-bold">
                            Criterio KBJ
                          </span>
                          <span className="text-slate-300 font-sans leading-relaxed">{item.solution}</span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
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
              aria-label={`Ir a diapositiva ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Dots (6 dots for 1-by-1) */}
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

        {/* Strategic Purpose Statement */}
        <div className="mt-14 sm:mt-16 p-7 sm:p-12 rounded-3xl bg-[#080B10]/85 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-kbj-green/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
              <span>Propósito de la Formación</span>
              <span className="h-px w-10 bg-kbj-lime/40" />
            </div>

            <h3 className="text-xl sm:text-4xl font-display font-black text-white uppercase leading-tight">
              KBJ nace para cambiar eso. <br />
              <span className="text-kbj-green">
                No quiero enseñarte a perseguir operaciones: quiero enseñarte a pensar como trader.
              </span>
            </h3>

            <div className="pt-3 sm:pt-4">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onOpenApplication();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-kbj-lime text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-green transition-all duration-200"
              >
                <span>INGRESAR A LA MENTORÍA</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
