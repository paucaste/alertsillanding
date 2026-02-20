'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Shield (rotating icosahedron) ─────────────────────────────────────────────

function Shield() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshPhysicalMaterial
        color="#3b82f6"
        transparent
        opacity={0.12}
        roughness={0.1}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Shield wireframe overlay ──────────────────────────────────────────────────

function ShieldWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.22, 1]} />
      <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// ── Network nodes ─────────────────────────────────────────────────────────────

interface NodeConfig {
  radius: number;
  speed: number;
  offset: number;
  y: number;
  size: number;
}

const NODE_CONFIGS: NodeConfig[] = [
  { radius: 3.5, speed: 0.3, offset: 0, y: 0.5, size: 0.12 },
  { radius: 4.0, speed: -0.2, offset: Math.PI * 0.5, y: -0.3, size: 0.1 },
  { radius: 3.2, speed: 0.4, offset: Math.PI, y: 1.2, size: 0.14 },
  { radius: 4.5, speed: -0.15, offset: Math.PI * 1.5, y: -1.0, size: 0.1 },
  { radius: 3.8, speed: 0.25, offset: Math.PI * 0.3, y: 0.8, size: 0.13 },
  { radius: 4.2, speed: -0.35, offset: Math.PI * 0.8, y: -0.6, size: 0.11 },
  { radius: 3.0, speed: 0.5, offset: Math.PI * 1.2, y: 1.5, size: 0.12 },
  { radius: 4.8, speed: -0.18, offset: Math.PI * 1.7, y: 0.2, size: 0.1 },
  { radius: 3.6, speed: 0.28, offset: Math.PI * 0.6, y: -1.3, size: 0.13 },
  { radius: 4.3, speed: -0.22, offset: Math.PI * 1.1, y: 0.9, size: 0.11 },
];

function NetworkNode({ config }: { config: NodeConfig }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const angle = config.offset + t * config.speed;
    ref.current.position.set(
      Math.cos(angle) * config.radius,
      config.y + Math.sin(t * 0.5 + config.offset) * 0.3,
      Math.sin(angle) * config.radius
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[config.size, 12, 12]} />
      <meshStandardMaterial
        color="#60a5fa"
        emissive="#3b82f6"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

// ── Connection lines ──────────────────────────────────────────────────────────

const LINE_PAIRS = [
  [0, 2], [1, 3], [4, 6], [5, 7], [8, 9],
  [0, 5], [2, 7], [3, 8], [1, 6], [4, 9],
];

function ConnectionLines() {
  const lines = useMemo(() => {
    return LINE_PAIRS.map(([a, b]) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(60 * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color: '#3b82f6',
        transparent: true,
        opacity: 0.15,
      });
      const line = new THREE.Line(geo, mat);
      line.userData = { pair: [a, b] };
      return line;
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (const line of lines) {
      const [a, b] = line.userData.pair as number[];
      const cfgA = NODE_CONFIGS[a];
      const cfgB = NODE_CONFIGS[b];

      const angleA = cfgA.offset + t * cfgA.speed;
      const angleB = cfgB.offset + t * cfgB.speed;

      const posA = new THREE.Vector3(
        Math.cos(angleA) * cfgA.radius,
        cfgA.y + Math.sin(t * 0.5 + cfgA.offset) * 0.3,
        Math.sin(angleA) * cfgA.radius
      );
      const posB = new THREE.Vector3(
        Math.cos(angleB) * cfgB.radius,
        cfgB.y + Math.sin(t * 0.5 + cfgB.offset) * 0.3,
        Math.sin(angleB) * cfgB.radius
      );

      const mid = posA.clone().add(posB).multiplyScalar(0.5).multiplyScalar(0.4);
      const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);
      const pts = curve.getPoints(59);
      const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < pts.length; i++) {
        posAttr.setXYZ(i, pts[i].x, pts[i].y, pts[i].z);
      }
      posAttr.needsUpdate = true;

      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 2 + a) * 0.08;
    }
  });

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

// ── Traveling particles ───────────────────────────────────────────────────────

interface ParticleConfig {
  fromIdx: number;
  toIdx: number;
  speed: number;
  delay: number;
}

const TRAVELING_PARTICLES: ParticleConfig[] = [
  { fromIdx: 0, toIdx: 2, speed: 0.4, delay: 0 },
  { fromIdx: 1, toIdx: 3, speed: 0.35, delay: 0.3 },
  { fromIdx: 4, toIdx: 6, speed: 0.45, delay: 0.6 },
  { fromIdx: 5, toIdx: 7, speed: 0.3, delay: 0.15 },
  { fromIdx: 8, toIdx: 9, speed: 0.5, delay: 0.45 },
  { fromIdx: 0, toIdx: 5, speed: 0.38, delay: 0.7 },
  { fromIdx: 2, toIdx: 7, speed: 0.42, delay: 0.2 },
];

function TravelingParticle({ fromIdx, toIdx, speed, delay }: ParticleConfig) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const cfgA = NODE_CONFIGS[fromIdx];
    const cfgB = NODE_CONFIGS[toIdx];

    const angleA = cfgA.offset + t * cfgA.speed;
    const angleB = cfgB.offset + t * cfgB.speed;

    const posA = new THREE.Vector3(
      Math.cos(angleA) * cfgA.radius,
      cfgA.y + Math.sin(t * 0.5 + cfgA.offset) * 0.3,
      Math.sin(angleA) * cfgA.radius
    );
    const posB = new THREE.Vector3(
      Math.cos(angleB) * cfgB.radius,
      cfgB.y + Math.sin(t * 0.5 + cfgB.offset) * 0.3,
      Math.sin(angleB) * cfgB.radius
    );

    const mid = posA.clone().add(posB).multiplyScalar(0.5).multiplyScalar(0.4);
    const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);

    const progress = ((t * speed + delay) % 1);
    const pos = curve.getPoint(progress);
    ref.current.position.copy(pos);

    const pulse = Math.sin(t * 8 + delay * 10) * 0.5 + 0.5;
    ref.current.scale.setScalar(0.8 + pulse * 0.4);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.9} />
    </mesh>
  );
}

// ── Full scene ────────────────────────────────────────────────────────────────

function HeroSceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#3b82f6" distance={10} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />

      <Shield />
      <ShieldWireframe />

      {NODE_CONFIGS.map((config, i) => (
        <NetworkNode key={i} config={config} />
      ))}

      <ConnectionLines />

      {TRAVELING_PARTICLES.map((p, i) => (
        <TravelingParticle key={i} {...p} />
      ))}
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <HeroSceneContent />
    </Canvas>
  );
}
