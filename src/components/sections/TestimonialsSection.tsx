import React, { useState, useRef } from 'react';
import { Star, Quote, TrendingUp, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../../data/landingData';

export const TestimonialsSection: React.FC = () => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollMobileTo = (index: number) => {
    setActiveMobileIdx(index);
    if (mobileScrollRef.current) {
      const cardWidth = mobileScrollRef.current.clientWidth * 0.88;
      mobileScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="resultados" className="relative py-28 sm:py-32 bg-[#05070B]/75 backdrop-blur-md border-t border-white/[0.08] z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-kbj-lime uppercase">
            <span>07 — Experiencias Reales</span>
            <span className="h-px w-8 bg-kbj-lime/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
            Lo que dicen <span className="luxury-gradient-text">mis alumnos</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed">
            Historias reales, resultados reales.
          </p>
        </div>

        {/* MOBILE VIEW: Horizontal 1-by-1 sliding track */}
        <div
          ref={mobileScrollRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const cardWidth = target.clientWidth * 0.88;
            const newIndex = Math.round(target.scrollLeft / cardWidth);
            if (newIndex !== activeMobileIdx && newIndex >= 0 && newIndex < TESTIMONIALS.length) {
              setActiveMobileIdx(newIndex);
            }
          }}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4 pt-1"
        >
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="w-[86vw] max-w-[340px] shrink-0 snap-center p-7 rounded-3xl bg-[#080C14]/95 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                {/* Author Info Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 p-0.5 shadow-lg bg-slate-900 shrink-0">
                      {idx === 1 ? (
                        <div className="w-full h-full rounded-full bg-[#0C121E] flex flex-col items-center justify-center border border-white/10 text-center">
                          <span className="font-display font-black text-[10px] text-white tracking-tighter">MB</span>
                          <span className="text-[5px] font-mono text-amber-300 uppercase tracking-widest leading-none">MENTORING</span>
                        </div>
                      ) : (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>

                    <div>
                      <div className="font-display font-black text-white text-base uppercase tracking-tight">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        📍 {item.location}
                      </div>
                    </div>
                  </div>

                  {/* 5 Stars Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Icon & Text */}
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-amber-400/50" />
                  <div className="text-slate-200 font-sans text-xs leading-relaxed space-y-2 whitespace-pre-line">
                    {item.quote}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Pill Bar */}
              <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-[11px] font-mono text-kbj-lime bg-kbj-green/10 px-3 py-1 rounded-xl border border-kbj-green/20">
                  <TrendingUp className="w-3 h-3 text-kbj-lime" />
                  <span>{item.winRateImpact}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>{item.riskManagement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="md:hidden flex justify-center items-center gap-1.5 pt-1">
          {TESTIMONIALS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollMobileTo(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIdx === dotIdx
                  ? 'w-6 bg-kbj-green shadow-glow-green'
                  : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Ir a testimonio ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* DESKTOP VIEW: 2-Column Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#080C14]/90 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-kbj-green/10 transition-colors" />

              <div className="space-y-6 relative z-10">
                {/* Author Info Bar */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/60 p-0.5 shadow-lg bg-slate-900 shrink-0">
                      {idx === 1 ? (
                        <div className="w-full h-full rounded-full bg-[#0C121E] flex flex-col items-center justify-center border border-white/10 text-center">
                          <span className="font-display font-black text-xs text-white tracking-tighter">MB</span>
                          <span className="text-[6px] font-mono text-amber-300 uppercase tracking-widest leading-none">MENTORING</span>
                        </div>
                      ) : (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>

                    <div>
                      <div className="font-display font-black text-white text-lg uppercase tracking-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                        <span className="text-amber-400">📍</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* 5 Stars Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Icon & Text */}
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-amber-400/40 group-hover:text-amber-400/80 transition-colors" />
                  
                  <div className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line">
                    {item.quote}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Pill Bar */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-kbj-lime bg-kbj-green/10 px-3.5 py-1.5 rounded-xl border border-kbj-green/20">
                  <TrendingUp className="w-3.5 h-3.5 text-kbj-lime" />
                  <span>{item.winRateImpact}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.riskManagement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discipline / Results Footer Banner */}
        <div className="text-center pt-4 sm:pt-6 space-y-2 border-t border-white/[0.06]">
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-slate-400">
            MENTE <span className="text-kbj-lime font-bold">•</span> ESTRATEGIA <span className="text-kbj-green font-bold">•</span> DISCIPLINA
          </div>
          <div className="text-sm sm:text-base font-display font-black tracking-widest text-amber-400 uppercase">
            RESULTADOS
          </div>
        </div>

      </div>
    </section>
  );
};
