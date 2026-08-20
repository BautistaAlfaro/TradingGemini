import React, { useEffect, useState } from 'react';
import { SceneCanvas } from './components/3d/SceneCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { OverviewSection } from './components/sections/OverviewSection';
import { PainPointsSection } from './components/sections/PainPointsSection';
import { PillarsSection } from './components/sections/PillarsSection';
import { MethodSection } from './components/sections/MethodSection';
import { DeliverablesBento } from './components/sections/DeliverablesBento';
import { MentorSection } from './components/sections/MentorSection';
import { RiskCalculatorWidget } from './components/sections/RiskCalculatorWidget';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { CtaSection } from './components/sections/CtaSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/sections/Footer';
import { ApplicationModal } from './components/ui/ApplicationModal';
import { VideoModal } from './components/ui/VideoModal';
import { initSmoothScroll } from './utils/smoothScroll';

export const App: React.FC = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling synchronized with GSAP ScrollTrigger
    const lenisInstance = initSmoothScroll();

    // Automatically trigger Video Popup Modal 1.4s after page load
    const videoTimer = setTimeout(() => {
      setIsVideoModalOpen(true);
    }, 1400);

    return () => {
      clearTimeout(videoTimer);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030508] text-[#E2E8F0] selection:bg-kbj-green/30 selection:text-white font-sans overflow-x-hidden">
      {/* Magnetic Fluid Custom Cursor */}
      <CustomCursor />

      {/* 3D WebGL Fixed Optical Canvas Stage with Institutional Order Flow & Candles */}
      <SceneCanvas />

      {/* Top Hairline Telemetry Glow */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-kbj-green/50 to-transparent z-50 pointer-events-none" />

      {/* Navigation */}
      <Navbar onOpenApplication={() => setIsApplicationOpen(true)} />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        <HeroSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <OverviewSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <PainPointsSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <PillarsSection />
        <MethodSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <DeliverablesBento />
        <MentorSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <RiskCalculatorWidget />
        <TestimonialsSection />
        <CtaSection onOpenApplication={() => setIsApplicationOpen(true)} />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Popup Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Application & WhatsApp Direct Modal */}
      <ApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
      />
    </div>
  );
};

export default App;
