'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// ── Scroll progress store (written by wrapper, read by scene) ────────────────

const scrollStore = { progress: 0 };

// ── Helpers ──────────────────────────────────────────────────────────────────

function range(progress: number, from: number, dist: number) {
  return THREE.MathUtils.clamp((progress - from) / dist, 0, 1);
}

function bell(progress: number, from: number, dist: number) {
  const t = range(progress, from, dist);
  return Math.sin(t * Math.PI);
}

// ── Device (RoundedBox with emissive screen) ─────────────────────────────────

function Device({
  positionTarget,
  lit,
  litColor,
}: {
  positionTarget: [number, number, number];
  lit: number;
  litColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);
  const pos = useRef(new THREE.Vector3(...positionTarget));

  useFrame(() => {
    if (!groupRef.current || !screenRef.current) return;
    pos.current.lerp(new THREE.Vector3(...positionTarget), 0.08);
    groupRef.current.position.copy(pos.current);
    screenRef.current.emissiveIntensity = lit;
    screenRef.current.emissive.set(litColor);
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <RoundedBox args={[1.2, 0.8, 0.08]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#0f172a"
          emissive={litColor}
          emissiveIntensity={0}
        />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.15, 0.3, 0.06]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

// ── Single keycap ────────────────────────────────────────────────────────────

function KeyCap({
  label,
  width,
  posX,
  pressed,
  visible,
}: {
  label: string;
  width: number;
  posX: number;
  pressed: number;
  visible: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyMatRef.current) return;
    const t = clock.getElapsedTime();

    // Press animation: key moves down on Z axis
    const pressDepth = pressed * 0.04;
    groupRef.current.position.z = 0.1 - pressDepth;
    groupRef.current.position.x = posX;

    // Glow when not pressed (pulsing hint)
    const glow = pressed > 0.5 ? 0.8 : 0.2 + Math.sin(t * 3) * 0.15;
    bodyMatRef.current.emissiveIntensity = glow;

    groupRef.current.visible = visible > 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Keycap body */}
      <RoundedBox args={[width, 0.18, 0.06]} radius={0.02} smoothness={4}>
        <meshStandardMaterial
          ref={bodyMatRef}
          color="#1e293b"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.4}
        />
      </RoundedBox>
      {/* Top face (lighter) */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[width - 0.04, 0.14]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* Label text */}
      <Text
        position={[0, 0, 0.035]}
        fontSize={0.07}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {label}
      </Text>
    </group>
  );
}

// ── Keyboard shortcut (Ctrl + 1) ─────────────────────────────────────────────

function KeyboardShortcut({ visible, pressed }: { visible: number; pressed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.visible = visible > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      <KeyCap label="Ctrl" width={0.28} posX={-0.2} pressed={pressed} visible={visible} />
      {/* Plus sign */}
      <Text
        position={[0.02, 0, 0.1]}
        fontSize={0.08}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        +
      </Text>
      <KeyCap label="1" width={0.18} posX={0.22} pressed={pressed} visible={visible} />
    </group>
  );
}

// ── Expanding wave ring ──────────────────────────────────────────────────────

function WaveRing({ delay, active }: { delay: number; active: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return;
    if (active < 0.01) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const t = ((clock.getElapsedTime() - delay) % 2.5) / 2.5;
    const scale = 0.5 + t * 4;
    ref.current.scale.setScalar(scale);
    matRef.current.opacity = (1 - t) * 0.4 * active;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1.0, 32]} />
      <meshBasicMaterial ref={matRef} color="#3b82f6" transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Network positions ────────────────────────────────────────────────────────

const NETWORK_POSITIONS: [number, number, number][] = [
  [-3, 1.5, -1],
  [3, 1, -1.5],
  [-2.5, -1, -0.5],
  [2.8, -1.2, -1],
  [-1, 2, -2],
  [1.5, -1.8, -1.5],
];

// ── Connection lines ─────────────────────────────────────────────────────────

function ConnectionLine({
  from,
  to,
  lit,
}: {
  from: [number, number, number];
  to: [number, number, number];
  lit: number;
}) {
  const lineRef = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array([...from, ...to]);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#3b82f6',
      transparent: true,
      opacity: 0,
    });
    return new THREE.Line(geo, mat);
  }, [from, to]);

  useFrame(() => {
    const mat = lineRef.material as THREE.LineBasicMaterial;
    mat.opacity = lit * 0.4;
  });

  return <primitive object={lineRef} />;
}

// ── Main scene content ───────────────────────────────────────────────────────

function SceneContent() {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollStore.progress;

    // Camera: close → medium → far
    const z = THREE.MathUtils.lerp(3.5, 8, range(p, 0.2, 0.5));
    const y = THREE.MathUtils.lerp(0, 1.5, range(p, 0.3, 0.4));
    camera.position.set(0, y, z);
    camera.lookAt(0, 0, 0);
  });

  // Derived values from scroll progress
  const state = useRef({
    buttonVisible: 1,
    buttonPressed: 0,
    wavesActive: 0,
    networkVisible: 0,
    networkLit: 0,
    mainDeviceLit: 0,
  });

  useFrame(() => {
    const p = scrollStore.progress;
    const s = state.current;

    // Phase 1 (0-0.33): Device appears, button pulses
    s.buttonVisible = p < 0.38 ? range(p, 0.0, 0.1) : 1 - range(p, 0.38, 0.05);
    s.buttonPressed = range(p, 0.28, 0.08);
    s.mainDeviceLit = range(p, 0.25, 0.1);

    // Phase 2 (0.33-0.66): Waves expand
    s.wavesActive = bell(p, 0.3, 0.4);

    // Phase 3 (0.66-1): Network appears, devices light up
    s.networkVisible = range(p, 0.55, 0.15);
    s.networkLit = range(p, 0.65, 0.2);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 3]} intensity={0.8} color="#e2e8f0" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      {/* Main device */}
      <Device
        positionTarget={[0, 0, 0]}
        lit={state.current.mainDeviceLit}
        litColor="#ef4444"
      />

      {/* Keyboard shortcut Ctrl+1 */}
      <KeyboardShortcut
        visible={state.current.buttonVisible}
        pressed={state.current.buttonPressed}
      />

      {/* Wave rings */}
      <WaveRing delay={0} active={state.current.wavesActive} />
      <WaveRing delay={0.8} active={state.current.wavesActive} />
      <WaveRing delay={1.6} active={state.current.wavesActive} />

      {/* Network devices */}
      {NETWORK_POSITIONS.map((pos, i) => {
        const deviceVisible = state.current.networkVisible;
        const targetPos: [number, number, number] = deviceVisible > 0.01
          ? pos
          : [0, 0, 0];
        const litAmount = Math.max(0, state.current.networkLit - i * 0.1);

        return (
          <group key={i} visible={deviceVisible > 0.01}>
            <Device
              positionTarget={targetPos}
              lit={litAmount}
              litColor="#3b82f6"
            />
            <ConnectionLine
              from={[0, 0, 0]}
              to={pos}
              lit={litAmount}
            />
          </group>
        );
      })}
    </>
  );
}

// ── Exported full component (Canvas + scroll wrapper + text overlays) ────────

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read scroll progress from container position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = THREE.MathUtils.clamp(-rect.top / scrollHeight, 0, 1);
      scrollStore.progress = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text overlay opacity helpers
  const getPhaseOpacity = (phase: 1 | 2 | 3) => {
    const p = scrollStore.progress;
    if (phase === 1) return bell(p, 0, 0.33);
    if (phase === 2) return bell(p, 0.33, 0.33);
    return bell(p, 0.66, 0.34);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a1628]"
      style={{ height: '300vh' }}
      id="demo"
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false }}
            style={{ background: '#0a1628' }}
          >
            <SceneContent />
          </Canvas>
        )}

        {/* Text overlays */}
        <ScrollOverlays getPhaseOpacity={getPhaseOpacity} />
      </div>
    </section>
  );
}

// ── Text overlays component ──────────────────────────────────────────────────

function ScrollOverlays({
  getPhaseOpacity,
}: {
  getPhaseOpacity: (phase: 1 | 2 | 3) => number;
}) {
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  // Animate text opacity using rAF
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (phase1Ref.current) phase1Ref.current.style.opacity = String(getPhaseOpacity(1));
      if (phase2Ref.current) phase2Ref.current.style.opacity = String(getPhaseOpacity(2));
      if (phase3Ref.current) phase3Ref.current.style.opacity = String(getPhaseOpacity(3));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [getPhaseOpacity]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Phase 1 */}
      <div
        ref={phase1Ref}
        className="absolute inset-0 flex flex-col items-start justify-end pb-24 px-8 sm:px-16"
        style={{ opacity: 0 }}
      >
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 mb-4 uppercase tracking-wider">
          Paso 1 — Detecta
        </span>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          Un empleado detecta un riesgo
        </h3>
        <p className="text-lg text-gray-400 max-w-lg">
          Identifica una situación de peligro en su puesto de trabajo.
        </p>
      </div>

      {/* Phase 2 */}
      <div
        ref={phase2Ref}
        className="absolute inset-0 flex flex-col items-start justify-end pb-24 px-8 sm:px-16"
        style={{ opacity: 0 }}
      >
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 mb-4 uppercase tracking-wider">
          Paso 2 — Alerta
        </span>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          Pulsa Ctrl+1. La señal se envía.
        </h3>
        <p className="text-lg text-gray-400 max-w-lg">
          Con una tecla, AlertSil envía la señal a todos los dispositivos de la empresa.
        </p>
      </div>

      {/* Phase 3 */}
      <div
        ref={phase3Ref}
        className="absolute inset-0 flex flex-col items-start justify-end pb-24 px-8 sm:px-16"
        style={{ opacity: 0 }}
      >
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 mb-4 uppercase tracking-wider">
          Paso 3 — Responde
        </span>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          Todos los equipos reciben la alerta al instante
        </h3>
        <p className="text-lg text-gray-400 max-w-lg">
          Todo el equipo responde de forma coordinada. Nadie queda solo.
        </p>
      </div>
    </div>
  );
}
