import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
}

export const FloatingParticles3D: React.FC<FloatingParticlesProps> = ({ count = 120 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorA = new THREE.Color('#22C55E'); // Emerald
    const colorB = new THREE.Color('#A3E635'); // Lime
    const colorC = new THREE.Color('#06B6D4'); // Cyan
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      // Distributed around the 3D stage
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      // Color variation
      const rand = Math.random();
      let chosenColor = colorA;
      if (rand < 0.4) chosenColor = colorA;
      else if (rand < 0.7) chosenColor = colorB;
      else if (rand < 0.9) chosenColor = colorC;
      else chosenColor = colorWhite;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
