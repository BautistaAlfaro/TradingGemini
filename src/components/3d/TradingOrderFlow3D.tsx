import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface OrderBlockData {
  position: [number, number, number];
  size: [number, number, number];
  isBullish: boolean;
  opacity: number;
}

interface Candle3DData {
  x: number;
  y: number;
  z: number;
  open: number;
  close: number;
  high: number;
  low: number;
  width: number;
  isBullish: boolean;
}

export const TradingOrderFlow3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const gridMeshRef = useRef<THREE.Mesh>(null);
  const candlesGroupRef = useRef<THREE.Group>(null);
  const orderBlocksRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);

  // Generate 3D Candlesticks arranged along an institutional price path
  const candles = useMemo<Candle3DData[]>(() => {
    const list: Candle3DData[] = [];
    const count = isMobile ? 18 : 32;
    let prevClose = 0;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = (i - count / 2) * 0.48;
      const wave = Math.sin(t * 1.8) * 1.6 + Math.cos(t * 0.9) * 0.8;
      
      const change = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * 0.45;
      const open = prevClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.abs(Math.sin(i * 2.1)) * 0.35 + 0.1;
      const low = Math.min(open, close) - Math.abs(Math.cos(i * 1.7)) * 0.35 - 0.1;
      const z = Math.cos(t * 1.2) * 1.2;

      list.push({
        x,
        y: wave,
        z,
        open,
        close,
        high,
        low,
        width: 0.22,
        isBullish: close >= open,
      });

      prevClose = close;
    }
    return list;
  }, [isMobile]);

  // Generate Institutional 3D Order Blocks (Zones of Supply & Demand)
  const orderBlocks = useMemo<OrderBlockData[]>(() => {
    return [
      { position: [-3.2, 1.4, -0.8], size: [2.2, 0.65, 1.4], isBullish: true, opacity: 0.28 },
      { position: [2.8, -1.2, 0.6], size: [2.4, 0.75, 1.5], isBullish: false, opacity: 0.28 },
      { position: [0.2, 2.1, -1.2], size: [3.0, 0.5, 1.8], isBullish: true, opacity: 0.22 },
      { position: [-1.8, -1.8, 0.4], size: [2.0, 0.6, 1.2], isBullish: false, opacity: 0.25 },
      { position: [4.0, 1.1, -0.4], size: [1.8, 0.55, 1.3], isBullish: true, opacity: 0.2 },
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    if (groupRef.current) {
      // Smooth dynamic rotation and position responding to scroll & mouse
      const targetRotX = mouse.y * 0.2 + (scrollProgress - 0.5) * 0.6;
      const targetRotY = time * 0.08 + mouse.x * 0.3 + scrollProgress * Math.PI * 0.8;
      const targetPosY = (scrollProgress - 0.5) * -1.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);
    }

    // Wavy market depth grid animation
    if (gridMeshRef.current && gridMeshRef.current.geometry) {
      const pos = gridMeshRef.current.geometry.attributes.position;
      if (pos) {
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const zWave = Math.sin(u * 0.6 + time * 1.2) * Math.cos(v * 0.6 + time * 0.8) * 0.35;
          pos.setZ(i, zWave);
        }
        pos.needsUpdate = true;
      }
    }

    // Pulsing Order Blocks
    if (orderBlocksRef.current) {
      orderBlocksRef.current.children.forEach((block, idx) => {
        const pulse = 1 + Math.sin(time * 2 + idx * 1.2) * 0.06;
        block.scale.set(pulse, pulse, pulse);
      });
    }

    // Gentle floating motion on candles
    if (candlesGroupRef.current) {
      candlesGroupRef.current.position.y = Math.sin(time * 0.9) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* 3D Candlesticks Sequence (Order Flow Wave) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={candlesGroupRef}>
          {candles.map((c, i) => {
            const bodyHeight = Math.max(0.12, Math.abs(c.close - c.open));
            const bodyY = c.y + (c.open + c.close) / 2;
            const wickHeight = Math.max(0.3, c.high - c.low);
            const wickY = c.y + (c.high + c.low) / 2;
            const color = c.isBullish ? '#22C55E' : '#EF4444';
            const emissiveColor = c.isBullish ? '#10B981' : '#DC2626';

            return (
              <group key={i} position={[c.x, 0, c.z]}>
                {/* Candlestick Wick */}
                <mesh position={[0, wickY, 0]}>
                  <cylinderGeometry args={[0.014, 0.014, wickHeight, 4]} />
                  <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>

                {/* Candlestick 3D Glass Body */}
                <mesh position={[0, bodyY, 0]}>
                  <boxGeometry args={[c.width, bodyHeight, c.width * 1.1]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={1.8}
                    roughness={0.15}
                    metalness={0.85}
                    transparent
                    opacity={0.85}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </Float>

      {/* Institutional 3D Order Blocks (Zones of Supply & Demand) */}
      <group ref={orderBlocksRef}>
        {orderBlocks.map((ob, idx) => {
          const color = ob.isBullish ? '#22C55E' : '#EF4444';
          const emissive = ob.isBullish ? '#10B981' : '#DC2626';

          return (
            <group key={idx} position={ob.position}>
              {/* Semi-transparent Glass Volume */}
              <mesh>
                <boxGeometry args={ob.size} />
                <meshStandardMaterial
                  color={color}
                  emissive={emissive}
                  emissiveIntensity={0.6}
                  roughness={0.2}
                  metalness={0.7}
                  transparent
                  opacity={ob.opacity}
                />
              </mesh>

              {/* Precise Neon Wireframe Edges */}
              <mesh>
                <boxGeometry args={[ob.size[0] * 1.002, ob.size[1] * 1.002, ob.size[2] * 1.002]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3D Market Depth Topography Grid (DOM Wave Floor) */}
      <mesh
        ref={gridMeshRef}
        position={[0, -3.2, -1]}
        rotation={[-Math.PI / 2.6, 0, 0]}
      >
        <planeGeometry args={[16, 12, 24, 18]} />
        <meshBasicMaterial
          color="#22C55E"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Concentric Liquidity Coordinates & Price Rings */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 3.5, 0, 0]}>
          <torusGeometry args={[4.8, 0.015, 6, 40]} />
          <meshBasicMaterial color="#A3E635" transparent opacity={0.22} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[5.8, 0.012, 6, 40]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.18} />
        </mesh>
      </group>

    </group>
  );
};
