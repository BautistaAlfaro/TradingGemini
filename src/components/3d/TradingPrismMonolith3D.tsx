import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audio';

interface ShardData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  initialPos: THREE.Vector3;
  scatterDirection: THREE.Vector3;
}

export const TradingPrismMonolith3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);
  const internalBarsRef = useRef<THREE.Group>(null);
  const orbitalRingsRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);

  // Scaled down count for mobile
  const shardCount = isMobile ? 12 : 24;
  const shards = useMemo<ShardData[]>(() => {
    const arr: ShardData[] = [];
    for (let i = 0; i < shardCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / shardCount);
      const theta = Math.sqrt(shardCount * Math.PI) * phi;
      const radius = 3.2 + (i % 4) * 0.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const scatterDir = new THREE.Vector3(x, y, z).normalize().multiplyScalar(4.5 + Math.random() * 4);

      arr.push({
        position: [x, y, z],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.35 + Math.random() * 0.4,
        speed: 0.4 + Math.random() * 0.8,
        initialPos: new THREE.Vector3(x, y, z),
        scatterDirection: scatterDir,
      });
    }
    return arr;
  }, [shardCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    if (groupRef.current) {
      const targetX = Math.sin(scrollProgress * Math.PI * 2.5) * 1.8 + mouse.x * 0.6;
      const targetY = Math.sin(time * 0.8) * 0.25 + mouse.y * 0.4;
      const targetZ = Math.cos(scrollProgress * Math.PI * 2) * 0.5;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.35 + scrollProgress * Math.PI, 0.05);
      groupRef.current.rotation.y += delta * 0.25;

      if (shardsGroupRef.current) {
        shardsGroupRef.current.children.forEach((child, idx) => {
          const shard = shards[idx];
          if (!shard) return;

          const scatterScale = Math.sin(scrollProgress * Math.PI * 2 + idx) * 0.8 + 1.2;
          const targetShardX = shard.initialPos.x * scatterScale;
          const targetShardY = shard.initialPos.y * scatterScale + Math.sin(time * shard.speed + idx) * 0.3;
          const targetShardZ = shard.initialPos.z * scatterScale;

          child.position.x = THREE.MathUtils.lerp(child.position.x, targetShardX, 0.08);
          child.position.y = THREE.MathUtils.lerp(child.position.y, targetShardY, 0.08);
          child.position.z = THREE.MathUtils.lerp(child.position.z, targetShardZ, 0.08);

          child.rotation.x += delta * 0.4 * shard.speed;
          child.rotation.y += delta * 0.6 * shard.speed;
        });
      }
    }

    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 3.2) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (internalBarsRef.current) {
      internalBarsRef.current.rotation.y = -time * 0.3;
    }

    if (orbitalRingsRef.current) {
      orbitalRingsRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Floating Optical Glass Monolith with optimized transmission samples */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh
          onPointerOver={() => audioEngine.playHoverSound()}
          onClick={() => audioEngine.playCrystalResonance(1.15)}
          scale={[1.7, 3.2, 1.2]}
        >
          <octahedronGeometry args={[1.35, 0]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={isMobile ? 4 : 8}
            resolution={isMobile ? 256 : 512}
            transmission={0.92}
            roughness={0.08}
            thickness={1.2}
            ior={1.35}
            chromaticAberration={isMobile ? 0 : 0.05}
            anisotropy={0.1}
            distortion={isMobile ? 0 : 0.1}
            distortionScale={0.1}
            temporalDistortion={0}
            color="#e2e8f0"
            attenuationColor="#22c55e"
            attenuationDistance={1.6}
          />
        </mesh>
      </Float>

      {/* Internal Luminous Trading Core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#a3e635"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Internal Candlestick Bars */}
      <group ref={internalBarsRef}>
        {[-0.5, -0.15, 0.2, 0.55].map((x, idx) => {
          const isGreen = idx !== 1;
          const h = [0.8, 0.55, 1.1, 0.75][idx];
          const y = [ -0.1, -0.25, 0.15, 0.08 ][idx];
          return (
            <group key={idx} position={[x * 0.7, y, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, h + 0.3, 4]} />
                <meshBasicMaterial color={isGreen ? '#22c55e' : '#ef4444'} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.16, h, 0.16]} />
                <meshStandardMaterial
                  color={isGreen ? '#22c55e' : '#ef4444'}
                  emissive={isGreen ? '#10b981' : '#dc2626'}
                  emissiveIntensity={2.0}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Concentric 3D Orbital Rings */}
      <group ref={orbitalRingsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.6, 0.015, 8, 36]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[4.4, 0.012, 8, 36]} />
          <meshBasicMaterial color="#a3e635" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Floating Order Block Shards */}
      <group ref={shardsGroupRef}>
        {shards.map((shard, idx) => (
          <mesh
            key={idx}
            position={shard.position}
            rotation={shard.rotation}
            scale={shard.scale}
            onPointerOver={() => audioEngine.playHoverSound()}
            onClick={() => audioEngine.playClickSound()}
          >
            <tetrahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#0d121b"
              emissive={idx % 2 === 0 ? '#22c55e' : '#a3e635'}
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
              wireframe={idx % 3 === 0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
