import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface CandleData {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  isBullish: boolean;
  time: string;
}

export const CandlestickChart3D: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [livePriceOffset, setLivePriceOffset] = useState<number>(0);

  // Generate realistic institutional candlestick data pattern
  const candleSeries: CandleData[] = useMemo(() => {
    const rawData = [
      { o: 100, h: 108, l: 96, c: 105, v: 45, time: '09:00' },
      { o: 105, h: 114, l: 103, c: 112, v: 60, time: '09:15' },
      { o: 112, h: 115, l: 104, c: 107, v: 38, time: '09:30' },
      { o: 107, h: 109, l: 98, c: 101, v: 52, time: '09:45' },
      { o: 101, h: 106, l: 95, c: 98, v: 70, time: '10:00' }, // Liquidity sweep low
      { o: 98, h: 118, l: 97, c: 116, v: 120, time: '10:15' }, // Institutional Impulse candle (KBJ Setup)
      { o: 116, h: 124, l: 114, c: 122, v: 85, time: '10:30' },
      { o: 122, h: 128, l: 119, c: 126, v: 75, time: '10:45' },
      { o: 126, h: 135, l: 125, c: 133, v: 95, time: '11:00' },
      { o: 133, h: 134, l: 128, c: 130, v: 40, time: '11:15' },
      { o: 130, h: 138, l: 129, c: 136, v: 65, time: '11:30' },
      { o: 136, h: 145, l: 135, c: 142, v: 110, time: '11:45' },
      { o: 142, h: 148, l: 140, c: 147, v: 88, time: '12:00' }, // Target Hit (TP)
    ];

    return rawData.map(d => ({
      open: (d.o - 120) * 0.05,
      close: (d.c - 120) * 0.05,
      high: (d.h - 120) * 0.05,
      low: (d.l - 120) * 0.05,
      volume: d.v * 0.015,
      isBullish: d.c >= d.o,
      time: d.time
    }));
  }, []);

  // Subtle real-time ticking animation for the last candle and order flow scan
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    setLivePriceOffset(Math.sin(t * 3) * 0.04);

    if (groupRef.current) {
      // Gentle floating physics
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Background Chart Grid */}
      <group position={[0, 0, -0.4]}>
        {[-1.5, -0.75, 0, 0.75, 1.5].map((y, idx) => (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([-4.5, y, 0, 4.5, y, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#1e293b" transparent opacity={0.35} />
          </line>
        ))}

        {[-4, -2.5, -1, 0.5, 2, 3.5].map((x, idx) => (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([x, -1.8, 0, x, 1.8, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#1e293b" transparent opacity={0.25} />
          </line>
        ))}
      </group>

      {/* Institutional Zone Highlight (Fair Value Gap / Order Block) */}
      <mesh position={[-0.8, -0.4, -0.1]}>
        <boxGeometry args={[1.6, 0.75, 0.05]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.12}
          wireframe={false}
        />
      </mesh>
      
      {/* Order Block Label */}
      <Text
        position={[-0.8, -0.1, 0.05]}
        fontSize={0.12}
        color="#a3e635"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_qs.woff"
      >
        KBJ ORDER BLOCK [BUY ZONE]
      </Text>

      {/* Target TP & Invalidation SL Lines */}
      {/* TP Line */}
      <group position={[1.5, 1.35, 0]}>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-6, 0, 0, 3, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineDashedMaterial
            color="#22c55e"
            dashSize={0.2}
            gapSize={0.1}
            linewidth={2}
          />
        </line>
        <Text
          position={[3.1, 0, 0]}
          fontSize={0.13}
          color="#22c55e"
          anchorX="left"
          anchorY="middle"
        >
          TAKE PROFIT [+3.8R]
        </Text>
      </group>

      {/* Entry Line */}
      <group position={[0, -0.2, 0]}>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-4.5, 0, 0, 4.5, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#a3e635" linewidth={2} />
        </line>
        <Text
          position={[4.6, 0, 0]}
          fontSize={0.12}
          color="#a3e635"
          anchorX="left"
          anchorY="middle"
        >
          ENTRY [EXECUTION]
        </Text>
      </group>

      {/* Stop Loss Line */}
      <group position={[0, -1.1, 0]}>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-4.5, 0, 0, 4.5, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineDashedMaterial
            color="#ef4444"
            dashSize={0.15}
            gapSize={0.1}
          />
        </line>
        <Text
          position={[4.6, 0, 0]}
          fontSize={0.12}
          color="#ef4444"
          anchorX="left"
          anchorY="middle"
        >
          STOP LOSS [-1.0R]
        </Text>
      </group>

      {/* Candlesticks loop */}
      {candleSeries.map((candle, i) => {
        const xPos = (i - candleSeries.length / 2) * 0.62;
        const isHovered = hoveredIndex === i;
        const isLast = i === candleSeries.length - 1;

        const effectiveClose = isLast ? candle.close + livePriceOffset : candle.close;
        const bodyHeight = Math.max(0.08, Math.abs(effectiveClose - candle.open));
        const bodyCenterY = (candle.open + effectiveClose) / 2;
        const wickHeight = Math.max(0.2, candle.high - candle.low);
        const wickCenterY = (candle.high + candle.low) / 2;

        const candleColor = candle.isBullish ? '#22C55E' : '#EF4444';
        const emissiveColor = candle.isBullish ? '#10B981' : '#DC2626';

        return (
          <group
            key={i}
            position={[xPos, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIndex(i);
            }}
            onPointerOut={() => setHoveredIndex(null)}
          >
            {/* Candle Wick (High to Low thin cylinder) */}
            <mesh position={[0, wickCenterY, 0]}>
              <cylinderGeometry args={[0.015, 0.015, wickHeight, 8]} />
              <meshStandardMaterial
                color={candleColor}
                emissive={candleColor}
                emissiveIntensity={isHovered ? 0.8 : 0.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Candle Body (Open to Close Box) */}
            <mesh position={[0, bodyCenterY, 0]} scale={isHovered ? [1.15, 1.05, 1.3] : [1, 1, 1]}>
              <boxGeometry args={[0.38, bodyHeight, 0.18]} />
              <meshStandardMaterial
                color={candleColor}
                emissive={emissiveColor}
                emissiveIntensity={isHovered ? 0.9 : (isLast ? 0.6 : 0.25)}
                roughness={0.15}
                metalness={0.65}
              />
            </mesh>

            {/* Base Volume Histogram Bar */}
            <mesh position={[0, -1.6 + candle.volume / 2, 0]}>
              <boxGeometry args={[0.34, candle.volume, 0.08]} />
              <meshStandardMaterial
                color={candleColor}
                transparent
                opacity={0.35}
                roughness={0.4}
              />
            </mesh>

            {/* 3D Tooltip when hovered */}
            {isHovered && (
              <Html position={[0, candle.high + 0.35, 0]} center distanceFactor={8}>
                <div className="bg-[#08090C]/90 border border-kbj-green/40 backdrop-blur-md p-2 rounded-lg shadow-neon-green text-[11px] font-mono text-white pointer-events-none whitespace-nowrap z-50">
                  <div className="text-kbj-lime font-bold">HORA: {candle.time}</div>
                  <div>O: {(candle.open * 20 + 120).toFixed(2)}</div>
                  <div>H: {(candle.high * 20 + 120).toFixed(2)}</div>
                  <div>L: {(candle.low * 20 + 120).toFixed(2)}</div>
                  <div className={candle.isBullish ? 'text-kbj-green' : 'text-kbj-red'}>
                    C: {(effectiveClose * 20 + 120).toFixed(2)}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Floating Institutional Badge inside the chart */}
      <group position={[-2.8, 1.4, 0.1]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 0.55]} />
          <meshBasicMaterial color="#0A0D14" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, 0.08, 0.01]}
          fontSize={0.13}
          color="#A3E635"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
        >
          KBJ INSTITUTIONAL
        </Text>
        <Text
          position={[0, -0.12, 0.01]}
          fontSize={0.09}
          color="#64748B"
          anchorX="center"
          anchorY="middle"
        >
          NQ100 • 15M • ALTA PRECISIÓN
        </Text>
      </group>
    </group>
  );
};
