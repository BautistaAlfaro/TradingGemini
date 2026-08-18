import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TradingPrismMonolith3D } from './TradingPrismMonolith3D';
import { FloatingParticles3D } from './FloatingParticles3D';

export const SceneCanvas: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In Hero (scrollY < 150px): opacity is 0 so the Hero has ONLY the clean interactive candle chart
  // Once user scrolls past Hero: opacity smoothly transitions to 1 for all subsequent sections
  const isPastHero = scrollY > 150;
  const opacity = isPastHero ? Math.min(1, (scrollY - 150) / 300) : 0;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity }}
    >
      {/* Background Volumetric Lighting & Atmospheric Gradients */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-kbj-lime/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-kbj-green/10 rounded-full blur-[150px] pointer-events-none" />

      {/* R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full pointer-events-none"
      >
        <Suspense fallback={null}>
          {/* Ambient Lighting */}
          <ambientLight intensity={1.0} />
          
          {/* Main Directional & Spotlights */}
          <spotLight
            position={[0, 10, 8]}
            angle={0.7}
            penumbra={0.9}
            intensity={3.5}
            color="#ffffff"
          />
          
          {/* Emerald Rim Light */}
          <pointLight position={[-7, 4, 3]} intensity={4.5} color="#22c55e" distance={20} />
          
          {/* Electric Lime Accent Light */}
          <pointLight position={[7, -4, 4]} intensity={4.0} color="#a3e635" distance={20} />

          {/* Persistent Multi-Section 3D Glass Prism Monolith & Shards */}
          <TradingPrismMonolith3D />

          {/* Multi-Section Floating Particles */}
          <FloatingParticles3D count={180} />
        </Suspense>
      </Canvas>
    </div>
  );
};
