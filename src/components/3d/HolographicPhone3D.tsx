import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const HolographicPhone3D: React.FC = () => {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!phoneRef.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    
    // Floating and gentle gyroscopic response
    phoneRef.current.position.y = -0.5 + Math.sin(t * 1.2) * 0.12;
    phoneRef.current.position.x = 3.6 + Math.cos(t * 0.9) * 0.08;
    phoneRef.current.rotation.y = -0.35 + THREE.MathUtils.lerp(phoneRef.current.rotation.y, x * 0.25, 0.08);
    phoneRef.current.rotation.x = 0.15 + THREE.MathUtils.lerp(phoneRef.current.rotation.x, -y * 0.15, 0.08);
    phoneRef.current.rotation.z = Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={phoneRef} position={[3.6, -0.5, 1.2]}>
      {/* Phone Body / Frame */}
      <mesh>
        <boxGeometry args={[1.7, 3.4, 0.12]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Screen Glass */}
      <mesh position={[0, 0, 0.065]}>
        <boxGeometry args={[1.58, 3.25, 0.01]} />
        <meshStandardMaterial
          color="#08090C"
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Neon Glow Rim */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[1.6, 3.28, 0.01]} />
        <meshBasicMaterial
          color="#A3E635"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* UI Elements on Phone Screen */}
      <group position={[0, 1.3, 0.08]}>
        {/* Dynamic Island / Speaker Notch */}
        <mesh position={[0, 0.18, 0]}>
          <capsuleGeometry args={[0.04, 0.25, 4, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        <Text
          position={[0, -0.05, 0]}
          fontSize={0.11}
          color="#E2E8F0"
          anchorX="center"
          anchorY="middle"
        >
          KBJ EXECUTION
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.08}
          color="#22C55E"
          anchorX="center"
          anchorY="middle"
        >
          +4.25% LIVE PROFIT
        </Text>
      </group>

      {/* Mini Candlestick Series on Phone */}
      <group position={[0, 0.1, 0.08]}>
        {[-0.5, -0.25, 0, 0.25, 0.5].map((x, idx) => {
          const isGreen = idx % 2 === 0 || idx === 4;
          const h = [0.35, 0.5, 0.4, 0.65, 0.8][idx];
          const y = [ -0.2, 0.1, -0.1, 0.25, 0.45 ][idx];

          return (
            <group key={idx} position={[x, y, 0]}>
              {/* Wick */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.008, 0.008, h + 0.3, 6]} />
                <meshBasicMaterial color={isGreen ? '#22C55E' : '#EF4444'} />
              </mesh>
              {/* Body */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.16, h, 0.04]} />
                <meshStandardMaterial
                  color={isGreen ? '#22C55E' : '#EF4444'}
                  emissive={isGreen ? '#10B981' : '#DC2626'}
                  emissiveIntensity={0.6}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Bottom Buy / Sell Quick Buttons */}
      <group position={[0, -1.2, 0.08]}>
        <mesh position={[-0.38, 0, 0]}>
          <boxGeometry args={[0.65, 0.22, 0.02]} />
          <meshStandardMaterial color="#EF4444" roughness={0.4} />
        </mesh>
        <Text position={[-0.38, 0, 0.02]} fontSize={0.07} color="#FFFFFF" anchorX="center" anchorY="middle">
          CLOSE
        </Text>

        <mesh position={[0.38, 0, 0]}>
          <boxGeometry args={[0.65, 0.22, 0.02]} />
          <meshStandardMaterial color="#22C55E" roughness={0.4} />
        </mesh>
        <Text position={[0.38, 0, 0.02]} fontSize={0.07} color="#FFFFFF" anchorX="center" anchorY="middle">
          TP LOCK
        </Text>
      </group>
    </group>
  );
};
