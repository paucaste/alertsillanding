'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Animation timing ────────────────────────────────────────────────────────

const LOOP_DURATION = 6.0;

const T = {
  pulseStart: 0.0,
  pulseEnd: 1.0,
  waveStart: 1.0,
  waveEnd: 2.8,
  lightUpStart: 2.0,
  lightUpEnd: 3.5,
  holdEnd: 5.0,
  fadeEnd: 5.8,
} as const;

// ── Node positions ──────────────────────────────────────────────────────────

const CENTER: [number, number, number] = [0, 0, 0];

const PERIPHERAL_NODES: [number, number, number][] = [
  [2.2, 1.2, 0],
  [1.8, -1.4, 0.8],
  [-2.0, 1.0, 0.4],
  [-1.6, -1.2, -0.6],
  [0.4, 2.0, -0.8],
  [-0.6, -2.0, 0.6],
];

// ── Animation clock ─────────────────────────────────────────────────────────

function AnimationClock({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  useFrame((_, delta) => {
    timeRef.current += delta;
  });
  return null;
}

// ── Central pulsing node ────────────────────────────────────────────────────

function CentralNode({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!meshRef.current || !matRef.current || !glowRef.current || !glowMatRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    // Pulse phase
    if (t >= T.pulseStart && t < T.pulseEnd) {
      const p = Math.sin(((t - T.pulseStart) / (T.pulseEnd - T.pulseStart)) * Math.PI * 3) * 0.5 + 0.5;
      const scale = 1.0 + p * 0.3;
      meshRef.current.scale.setScalar(scale);
      matRef.current.emissiveIntensity = 0.5 + p * 1.5;
      glowRef.current.scale.setScalar(scale * 1.8);
      glowMatRef.current.opacity = 0.15 + p * 0.2;
    } else if (t >= T.pulseEnd && t < T.holdEnd) {
      // Active state — gentle pulse
      const p = Math.sin(t * 4) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(1.0 + p * 0.1);
      matRef.current.emissiveIntensity = 0.8 + p * 0.4;
      glowRef.current.scale.setScalar(1.8 + p * 0.3);
      glowMatRef.current.opacity = 0.15 + p * 0.1;
    } else {
      // Reset / fade
      const fade = t >= T.holdEnd ? Math.max(0, 1 - (t - T.holdEnd) / (T.fadeEnd - T.holdEnd)) : 1;
      meshRef.current.scale.setScalar(1.0);
      matRef.current.emissiveIntensity = 0.3 * fade;
      glowRef.current.scale.setScalar(1.8);
      glowMatRef.current.opacity = 0.08 * fade;
    }
  });

  return (
    <group position={CENTER}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial ref={glowMatRef} color="#f97316" transparent opacity={0.15} />
      </mesh>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          ref={matRef}
          color="#ef4444"
          emissive="#f97316"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

// ── Peripheral node ─────────────────────────────────────────────────────────

function PeripheralNode({
  position,
  index,
  timeRef,
}: {
  position: [number, number, number];
  index: number;
  timeRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const lightUpDelay = useMemo(() => {
    return T.lightUpStart + (index / PERIPHERAL_NODES.length) * (T.lightUpEnd - T.lightUpStart);
  }, [index]);

  useFrame(() => {
    if (!meshRef.current || !matRef.current || !glowRef.current || !glowMatRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    if (t >= lightUpDelay && t < T.holdEnd) {
      // Light up phase
      const fadeIn = Math.min((t - lightUpDelay) / 0.3, 1);
      matRef.current.emissive.set('#3b82f6');
      matRef.current.emissiveIntensity = fadeIn * 1.5;
      matRef.current.color.set('#60a5fa');
      meshRef.current.scale.setScalar(1 + fadeIn * 0.25);
      glowMatRef.current.opacity = fadeIn * 0.2;
      glowRef.current.scale.setScalar(1.6 + fadeIn * 0.4);
    } else if (t >= T.holdEnd) {
      // Fade out
      const fade = Math.max(0, 1 - (t - T.holdEnd) / (T.fadeEnd - T.holdEnd));
      matRef.current.emissiveIntensity = fade * 1.5;
      matRef.current.color.set('#60a5fa');
      meshRef.current.scale.setScalar(1 + fade * 0.25);
      glowMatRef.current.opacity = fade * 0.2;
    } else {
      // Idle state
      matRef.current.emissive.set('#1d4ed8');
      matRef.current.emissiveIntensity = 0.2;
      matRef.current.color.set('#3b82f6');
      meshRef.current.scale.setScalar(1);
      glowMatRef.current.opacity = 0.05;
      glowRef.current.scale.setScalar(1.6);
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial ref={glowMatRef} color="#3b82f6" transparent opacity={0.05} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial
          ref={matRef}
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// ── Connection line with signal wave ────────────────────────────────────────

function ConnectionLine({
  targetPos,
  index,
  timeRef,
}: {
  targetPos: [number, number, number];
  index: number;
  timeRef: React.MutableRefObject<number>;
}) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(2 * 3);
    positions[0] = CENTER[0];
    positions[1] = CENTER[1];
    positions[2] = CENTER[2];
    positions[3] = targetPos[0];
    positions[4] = targetPos[1];
    positions[5] = targetPos[2];
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#94a3b8',
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Line(geo, mat);
  }, [targetPos]);

  const waveDelay = useMemo(() => {
    return T.waveStart + (index / PERIPHERAL_NODES.length) * (T.waveEnd - T.waveStart - 0.5);
  }, [index]);

  // Signal particle traveling along the line
  const particleRef = useRef<THREE.Mesh>(null);
  const particleMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const t = timeRef.current % LOOP_DURATION;
    const lineMat = lineObj.material as THREE.LineBasicMaterial;

    // Line color animation
    const lightUpDelay = T.lightUpStart + (index / PERIPHERAL_NODES.length) * (T.lightUpEnd - T.lightUpStart);
    if (t >= lightUpDelay && t < T.holdEnd) {
      const fade = Math.min((t - lightUpDelay) / 0.3, 1);
      lineMat.color.set('#3b82f6');
      lineMat.opacity = 0.3 + fade * 0.4;
    } else if (t >= T.holdEnd) {
      const fade = Math.max(0, 1 - (t - T.holdEnd) / (T.fadeEnd - T.holdEnd));
      lineMat.opacity = 0.3 + fade * 0.4;
      if (fade < 0.5) lineMat.color.set('#94a3b8');
    } else {
      lineMat.color.set('#94a3b8');
      lineMat.opacity = 0.3;
    }

    // Signal particle
    if (!particleRef.current || !particleMatRef.current) return;
    const waveEnd = waveDelay + 0.6;
    if (t >= waveDelay && t < waveEnd) {
      particleRef.current.visible = true;
      const progress = (t - waveDelay) / (waveEnd - waveDelay);
      particleRef.current.position.set(
        CENTER[0] + (targetPos[0] - CENTER[0]) * progress,
        CENTER[1] + (targetPos[1] - CENTER[1]) * progress,
        CENTER[2] + (targetPos[2] - CENTER[2]) * progress
      );
      const pulse = Math.sin(progress * Math.PI);
      particleRef.current.scale.setScalar(0.8 + pulse * 0.6);
      particleMatRef.current.opacity = 0.6 + pulse * 0.4;
    } else {
      particleRef.current.visible = false;
    }
  });

  return (
    <group>
      <primitive object={lineObj} />
      <mesh ref={particleRef} visible={false}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial ref={particleMatRef} color="#60a5fa" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ── Pulse ring (expands from center) ────────────────────────────────────────

function PulseRing({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!ringRef.current || !matRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    if (t >= T.pulseStart && t < T.waveEnd) {
      ringRef.current.visible = true;
      const progress = (t - T.pulseStart) / (T.waveEnd - T.pulseStart);
      const scale = 0.3 + progress * 3.5;
      ringRef.current.scale.setScalar(scale);
      matRef.current.opacity = Math.max(0, 0.25 * (1 - progress));
    } else {
      ringRef.current.visible = false;
    }
  });

  return (
    <mesh ref={ringRef} position={CENTER} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.9, 1.0, 32]} />
      <meshBasicMaterial ref={matRef} color="#f97316" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Slow scene rotation ─────────────────────────────────────────────────────

function SceneRotator({ children, timeRef }: { children: React.ReactNode; timeRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = timeRef.current * 0.08;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── Full scene content ──────────────────────────────────────────────────────

function AlertNetworkContent() {
  const timeRef = useRef(0);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#f97316" distance={8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-3, 3, -3]} intensity={0.2} />

      <AnimationClock timeRef={timeRef} />

      <SceneRotator timeRef={timeRef}>
        <CentralNode timeRef={timeRef} />

        {PERIPHERAL_NODES.map((pos, i) => (
          <PeripheralNode key={i} position={pos} index={i} timeRef={timeRef} />
        ))}

        {PERIPHERAL_NODES.map((pos, i) => (
          <ConnectionLine key={`line-${i}`} targetPos={pos} index={i} timeRef={timeRef} />
        ))}

        <PulseRing timeRef={timeRef} />
      </SceneRotator>
    </>
  );
}

// ── Exported component ──────────────────────────────────────────────────────

export default function AlertNetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <AlertNetworkContent />
    </Canvas>
  );
}
