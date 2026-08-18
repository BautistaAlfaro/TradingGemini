import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TradingPrismMonolith3D } from './TradingPrismMonolith3D';
import { FloatingParticles3D } from './FloatingParticles3D';

export const SceneCanvas: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);

  // In Hero (scrollY < 150px): opacity is 0 so the Hero has ONLY the clean interactive candle chart
  const isPastHero = scrollY > 150;
  const opacity = isPastHero ? Math.min(1, (scrollY - 150) / 300) : 0;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 will-change-transform"
      style={{ opacity }}
    >
      {/* Background Volumetric Lighting & Atmospheric Gradients */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-kbj-lime/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-kbj-green/10 rounded-full blur-[120px] pointer-events-none" />

      {/* R3F Canvas with capped DPR for 60 FPS on iPhone / Retina */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, isTouchDevice ? 1.25 : 1.5]}
        gl={{
          antialias: !isTouchDevice,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full pointer-events-none"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          
          <spotLight
            position={[0, 10, 8]}
            angle={0.7}
            penumbra={0.9}
            intensity={3.0}
            color="#ffffff"
          />
          
          <pointLight position={[-7, 4, 3]} intensity={3.5} color="#22c55e" distance={18} />
          <pointLight position={[7, -4, 4]} intensity={3.0} color="#a3e635" distance={18} />

          {/* Persistent Multi-Section 3D Glass Prism Monolith & Shards */}
          <TradingPrismMonolith3D />

          {/* Multi-Section Floating Particles */}
          <FloatingParticles3D count={isTouchDevice ? 40 : 120} />
        </Suspense>
      </Canvas>
    </div>
  );
};
