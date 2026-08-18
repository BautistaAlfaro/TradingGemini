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

  // Procedural order block shards spanning space
  const shardCount = 28;
  const shards = useMemo<ShardData[]>(() => {
    const arr: ShardData[] = [];
    for (let i = 0; i < shardCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / shardCount);
      const theta = Math.sqrt(shardCount * Math.PI) * phi;
      const radius = 3.2 + (i % 5) * 0.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const scatterDir = new THREE.Vector3(x, y, z).normalize().multiplyScalar(4.5 + Math.random() * 5);

      arr.push({
        position: [x, y, z],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.35 + Math.random() * 0.45,
        speed: 0.4 + Math.random() * 0.8,
        initialPos: new THREE.Vector3(x, y, z),
        scatterDirection: scatterDir,
      });
    }
    return arr;
  }, [shardCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Scroll progress
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    if (groupRef.current) {
      // Keep Monolith stably centered and gently shifting across all sections
      const targetX = Math.sin(scrollProgress * Math.PI * 2.5) * 1.8 + mouse.x * 0.6;
      const targetY = Math.sin(time * 0.8) * 0.25 + mouse.y * 0.4;
      const targetZ = Math.cos(scrollProgress * Math.PI * 2) * 0.5;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

      // Continuous 3D rotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.35 + scrollProgress * Math.PI, 0.05);
      groupRef.current.rotation.y += delta * 0.25;

      // Disperse outer crystal shards dynamically in orbit
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

    // Inner pulsing core
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 3.2) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Internal trapped candlesticks rotation
    if (internalBarsRef.current) {
      internalBarsRef.current.rotation.y = -time * 0.3;
    }

    // Orbital rings rotation
    if (orbitalRingsRef.current) {
      orbitalRingsRef.current.rotation.z = time * 0.15;
      orbitalRingsRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Floating Optical Glass Monolith */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh
          onPointerOver={() => audioEngine.playHoverSound()}
          onClick={() => audioEngine.playCrystalResonance(1.15)}
          scale={[1.7, 3.2, 1.2]}
        >
          <octahedronGeometry args={[1.35, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={12}
            resolution={512}
            transmission={0.95}
            roughness={0.06}
            thickness={1.4}
            ior={1.38}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.15}
            distortionScale={0.2}
            temporalDistortion={0.08}
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
          emissiveIntensity={3.2}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Internal Candlestick Bars */}
      <group ref={internalBarsRef}>
        {[-0.6, -0.2, 0.2, 0.6].map((x, idx) => {
          const isGreen = idx !== 1;
          const h = [0.9, 0.6, 1.2, 0.8][idx];
          const y = [ -0.1, -0.3, 0.2, 0.1 ][idx];
          return (
            <group key={idx} position={[x * 0.7, y, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, h + 0.4, 6]} />
                <meshBasicMaterial color={isGreen ? '#22c55e' : '#ef4444'} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.18, h, 0.18]} />
                <meshStandardMaterial
                  color={isGreen ? '#22c55e' : '#ef4444'}
                  emissive={isGreen ? '#10b981' : '#dc2626'}
                  emissiveIntensity={2.2}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Concentric 3D Orbital Rings for extra visual presence */}
      <group ref={orbitalRingsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.6, 0.015, 16, 64]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[4.4, 0.012, 16, 64]} />
          <meshBasicMaterial color="#a3e635" transparent opacity={0.25} />
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
            <tetrahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#0d121b"
              emissive={idx % 2 === 0 ? '#22c55e' : '#a3e635'}
              emissiveIntensity={0.8}
              metalness={0.85}
              roughness={0.15}
              wireframe={idx % 3 === 0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
