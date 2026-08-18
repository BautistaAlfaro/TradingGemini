import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { audioEngine } from '../../utils/audio';

interface NeuralPillarProps {
  activePillarIndex?: number;
}

export const NeuralPillar3D: React.FC<NeuralPillarProps> = ({ activePillarIndex = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const colors = ['#22C55E', '#A3E635', '#00F0FF', '#10B981'];
  const currentColor = colors[activePillarIndex % colors.length];

  const { vertices, linesGeometry, dummy } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.1, 1);
    const wireGeo = new THREE.WireframeGeometry(geo);
    
    const posAttr = geo.attributes.position;
    const uniqueVertices: THREE.Vector3[] = [];
    const threshold = 0.02;

    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const exists = uniqueVertices.some((existing) => existing.distanceTo(v) < threshold);
      if (!exists) {
        uniqueVertices.push(v);
      }
    }

    return {
      vertices: uniqueVertices,
      linesGeometry: wireGeo,
      dummy: new THREE.Object3D()
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      const targetRotX = time * 0.12 + mouse.y * 0.4;
      const targetRotY = time * 0.18 + mouse.x * 0.4;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    // Nodes pulsing
    if (nodesRef.current) {
      vertices.forEach((v, idx) => {
        const pulse = 1.0 + Math.sin(time * 3.5 + idx * 0.5) * 0.4;
        dummy.position.copy(v);
        dummy.scale.set(0.09 * pulse, 0.09 * pulse, 0.09 * pulse);
        dummy.updateMatrix();
        nodesRef.current?.setMatrixAt(idx, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Inner core breathing
    if (coreRef.current) {
      const scale = 0.95 + Math.sin(time * 2.0) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={() => audioEngine.playHoverSound()}
      onClick={() => audioEngine.playCrystalResonance(1.3)}
    >
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Wireframe Matrix Lines */}
        <lineSegments ref={wireframeRef} geometry={linesGeometry}>
          <lineBasicMaterial color={currentColor} transparent opacity={0.6} linewidth={1.5} />
        </lineSegments>

        {/* Inner Octahedron Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#070A0F"
            emissive={currentColor}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>

        {/* Instanced Glowing Confluence Nodes */}
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, vertices.length]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={currentColor} />
        </instancedMesh>
      </Float>
    </group>
  );
};
