import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CandlestickChart3D } from './CandlestickChart3D';
import * as THREE from 'three';

export const TerminalMonitor3D: React.FC = () => {
  const monitorGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!monitorGroupRef.current) return;
    const { x, y } = state.pointer;
    // Smooth responsive gyroscopic parallax with dampening
    monitorGroupRef.current.rotation.y = THREE.MathUtils.lerp(monitorGroupRef.current.rotation.y, x * 0.18, 0.05);
    monitorGroupRef.current.rotation.x = THREE.MathUtils.lerp(monitorGroupRef.current.rotation.x, -y * 0.12, 0.05);
  });

  return (
    <group ref={monitorGroupRef} position={[0, 0, 0]}>
      {/* Outer Monitor Frame (Chassis) */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[9.4, 4.8, 0.25]} />
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Screen Inner Bezel */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[9.1, 4.5, 0.05]} />
        <meshStandardMaterial
          color="#08090C"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Glowing Neon Edge Trim around the Monitor */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[9.25, 4.65, 0.02]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      {/* Stand Neck and Base */}
      <group position={[0, -2.4, -0.5]}>
        {/* Vertical Stand Column */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 1.2, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Hexagonal / Sleek Base plate */}
        <mesh position={[0, -1.0, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.4, 1.6, 0.1, 6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* Live Trading 3D Chart Inside Screen */}
      <group position={[0, 0.1, 0.05]}>
        <CandlestickChart3D scale={0.92} />
      </group>
    </group>
  );
};
