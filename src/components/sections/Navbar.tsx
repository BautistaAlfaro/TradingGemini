import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

interface NavbarProps {
  onOpenApplication: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplication }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'DIAGNÓSTICO', href: '#diagnostico' },
    { label: 'PILARES', href: '#pilares' },
    { label: 'MÉTODO', href: '#metodo' },
    { label: 'MENTOR', href: '#mentor' },
    { label: 'CALCULADORA', href: '#calculadora' },
    { label: 'RESULTADOS', href: '#resultados' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none">
      
      {/* Main Glass Navigation Bar */}
      <div
        className={`px-4 sm:px-8 transition-all duration-400 pointer-events-auto ${
          scrolled
            ? 'py-3.5 bg-[#070A0F]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Mark */}
          <a
            href="#hero"
            onMouseEnter={() => audioEngine.playHoverSound()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0C1017] border border-white/15 flex items-center justify-center group-hover:border-kbj-green transition-colors">
              <span className="font-display font-black text-sm text-kbj-lime tracking-tighter">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                KBJ <span className="text-kbj-green font-mono font-bold">TRADING</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                INSTITUTIONAL MENTORSHIP
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0C1017]/70 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="px-3.5 py-1 text-[11px] font-mono tracking-wider text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: CTA + Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button */}
            <button
              onClick={() => {
                audioEngine.playClickSound();
                onOpenApplication();
              }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="relative hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-kbj-green hover:bg-kbj-lime shadow-glow-green hover:shadow-glow-lime transition-all duration-300 transform active:scale-95"
            >
              <span>POSTULAR A KBJ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#030508]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 space-y-4 pointer-events-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  audioEngine.playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-mono tracking-widest text-slate-300 hover:text-kbj-lime py-3 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                audioEngine.playClickSound();
                setMobileMenuOpen(false);
                onOpenApplication();
              }}
              className="w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-kbj-green hover:bg-kbj-lime shadow-glow-green transition-all"
            >
              POSTULAR A LA MENTORÍA →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
