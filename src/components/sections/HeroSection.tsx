import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, ChevronDown } from 'lucide-react';
import { CandleHero } from '../canvas/CandleHero';
import { QuantumStructureWord } from '../ui/QuantumStructureWord';
import { audioEngine } from '../../utils/audio';

interface HeroSectionProps {
  onOpenApplication?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApplication }) => {
  const [mobileShiftUp, setMobileShiftUp] = useState(false);

  useEffect(() => {
    // After 3 seconds, smoothly shift the title up 20% on mobile and reveal the discreet scroll arrow
    const timer = setTimeout(() => {
      setMobileShiftUp(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToSection = (id: string) => {
    audioEngine.playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const wordSlideVariant = (delay: number) => ({
    hidden: { opacity: 0, x: -50, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        delay,
        type: 'spring',
        stiffness: 260,
        damping: 22,
      },
    },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-16 z-10"
    >
      {/* Full-Viewport Interactive Dancing Candle Canvas Background */}
      <CandleHero />

      {/* Main Hero Kinetic Typography & Actions */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 my-auto py-6 sm:py-8 relative z-10 pointer-events-auto">
        <div
          className={`max-w-4xl space-y-4 sm:space-y-6 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileShiftUp ? '-translate-y-[16%] md:translate-y-0' : 'translate-y-0'
          }`}
        >
          
          {/* Animated Headline - Optimized for both mobile and desktop */}
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
            
            {/* Line 1: TRADING CON */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <motion.span
                variants={wordSlideVariant(0.1)}
                initial="hidden"
                animate="visible"
                className="inline-block text-white"
              >
                TRADING
              </motion.span>
              <motion.span
                variants={wordSlideVariant(0.2)}
                initial="hidden"
                animate="visible"
                className="inline-block text-slate-300 font-bold"
              >
                CON
              </motion.span>
            </div>

            {/* Line 2: ESTRUCTURA. (Falling from ceiling) */}
            <div className="block my-1 sm:my-2">
              <QuantumStructureWord />
            </div>

            {/* Line 3: DECISIONES CON CRITERIO. */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <motion.span
                variants={wordSlideVariant(0.75)}
                initial="hidden"
                animate="visible"
                className="inline-block text-white"
              >
                DECISIONES
              </motion.span>
              <motion.span
                variants={wordSlideVariant(0.85)}
                initial="hidden"
                animate="visible"
                className="inline-block text-slate-300 font-bold"
              >
                CON
              </motion.span>
              <motion.span
                variants={wordSlideVariant(0.95)}
                initial="hidden"
                animate="visible"
                className="inline-block text-white"
              >
                CRITERIO
              </motion.span>
            </div>

          </h1>

          {/* Desktop Subtitle & CTAs (Shown on md+ screens) */}
          <div className="hidden md:block space-y-6 pt-1">
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans font-normal">
              Mentoría personalizada para traders que quieren dejar de improvisar y construir un proceso sólido, consistente y rentable en el tiempo.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  if (onOpenApplication) onOpenApplication();
                }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="px-8 py-3.5 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 hover:bg-kbj-lime hover:shadow-glow-lime transition-all duration-300 group active:scale-95 shadow-2xl"
              >
                <span>CONOCER LA MENTORÍA</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/5491100000000?text=Hola%20KBJ%20Trading,%20quiero%20conocer%20la%20mentor%C3%ADa%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => audioEngine.playHoverSound()}
                onClick={() => audioEngine.playClickSound()}
                className="px-8 py-3.5 rounded-xl glass-panel text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 hover:border-kbj-green/60 hover:bg-[#0E141F] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-kbj-lime" />
                <span>HABLAR POR WHATSAPP</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Subtle Animated Scroll Indicator (Appears after 3 seconds) */}
      <AnimatePresence>
        {mobileShiftUp && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:hidden absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-auto"
          >
            <button
              onClick={() => handleScrollToSection('resumen-mobile')}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-kbj-lime transition-colors group p-2"
              aria-label="Deslizar hacia abajo"
            >
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-slate-500 group-hover:text-kbj-lime transition-colors">
                DESLIZAR
              </span>
              <ChevronDown className="w-4 h-4 text-kbj-lime/80 animate-bounce" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Bottom Telemetry Metrics Strip */}
      <div className="hidden md:flex max-w-7xl mx-auto w-full px-4 sm:px-8 flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.08] relative z-10 pointer-events-auto">
        <div className="grid grid-cols-4 gap-10 text-left w-auto">
          <div>
            <div className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">RATIO R:R MÍNIMO</div>
            <div className="font-mono text-lg font-bold text-kbj-lime">1 : 3.0+ RR</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">RIESGO CONTROLADO</div>
            <div className="font-mono text-lg font-bold text-white">≤ 1.0% POR TRADE</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">CANAL DE SEÑALES</div>
            <div className="font-mono text-lg font-bold text-red-400">0% (SOLO CRITERIO)</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">MODALIDAD DE REVISIÓN</div>
            <div className="font-mono text-lg font-bold text-kbj-green">1 A 1 DIRECTO</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => handleScrollToSection('diagnostico')}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
        >
          <span>EXPLORAR SISTEMA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-kbj-green" />
        </button>
      </div>

    </section>
  );
};
