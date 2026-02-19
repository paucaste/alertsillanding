'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ── Types ──────────────────────────────────────────────────────────────────────

type Response = 'en_camino' | 'recibido';

interface RoomData {
  label: string;
  person: string;
  isSource: boolean;
  response: Response | undefined;
  pos: readonly [number, number, number];
}

// ── Room data ──────────────────────────────────────────────────────────────────

const rooms: RoomData[] = [
  // Top row (z = -2)
  { label: 'Consulta 1', person: 'Dra. María López', isSource: true, response: undefined, pos: [-3, 0, -2] as const },
  { label: 'Consulta 2', person: 'Dr. Andrés Ruiz', isSource: false, response: 'en_camino' as Response, pos: [0, 0, -2] as const },
  { label: 'Consulta 3', person: 'Dra. Elena Navarro', isSource: false, response: 'recibido' as Response, pos: [3, 0, -2] as const },
  // Bottom row (z = 2)
  { label: 'Recepción', person: 'Laura Díaz', isSource: false, response: 'recibido' as Response, pos: [-3, 0, 2] as const },
  { label: 'Consulta 4', person: 'Dr. Carlos Méndez', isSource: false, response: 'en_camino' as Response, pos: [0, 0, 2] as const },
  { label: 'Seguridad', person: 'José Martínez', isSource: false, response: 'en_camino' as Response, pos: [3, 0, 2] as const },
];

const enCaminoCount = rooms.filter((r) => r.response === 'en_camino').length;
const targetRooms = rooms.filter((r) => !r.isSource);

// ── Animation timing ───────────────────────────────────────────────────────────

const LOOP_DURATION = 11; // seconds

const TIMING = {
  alertFlash: 0.8,
  particlesStart: 1.2,
  particlesEnd: 3.5,
  roomIlluminate: 3.5,
  responseBadges: 4.5,
  sourceBadge: 6.5,
  pauseEnd: 10.0,
} as const;

// ── Particle paths ─────────────────────────────────────────────────────────────

function getParticlePath(targetPos: readonly [number, number, number]): [number, number, number][] {
  const sourcePos: [number, number, number] = [-3, 0.5, -2];
  return [
    sourcePos,
    [-3, 0.5, 0],
    [targetPos[0], 0.5, 0],
    [targetPos[0], 0.5, targetPos[2]],
  ];
}

function interpolatePath(path: [number, number, number][], t: number): [number, number, number] {
  // t is 0..1 along the total path
  if (t <= 0) return path[0];
  if (t >= 1) return path[path.length - 1];

  // Calculate total length of the path
  const segmentLengths: number[] = [];
  let totalLength = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const dx = path[i + 1][0] - path[i][0];
    const dy = path[i + 1][1] - path[i][1];
    const dz = path[i + 1][2] - path[i][2];
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    segmentLengths.push(len);
    totalLength += len;
  }

  // Find which segment we're on
  const targetDist = t * totalLength;
  let accumulated = 0;
  for (let i = 0; i < segmentLengths.length; i++) {
    if (accumulated + segmentLengths[i] >= targetDist) {
      const segT = (targetDist - accumulated) / segmentLengths[i];
      return [
        path[i][0] + (path[i + 1][0] - path[i][0]) * segT,
        path[i][1] + (path[i + 1][1] - path[i][1]) * segT,
        path[i][2] + (path[i + 1][2] - path[i][2]) * segT,
      ];
    }
    accumulated += segmentLengths[i];
  }
  return path[path.length - 1];
}

// ── Precomputed particle paths ─────────────────────────────────────────────────

const particlePaths = targetRooms.map((room) => getParticlePath(room.pos));

// Per-room stagger delays for particles (0 to 1 range mapped across rooms)
const particleStaggerDelay = (index: number): number => {
  return (index / Math.max(targetRooms.length - 1, 1)) * 0.4; // up to 0.4s stagger
};

// ── Room Box component ─────────────────────────────────────────────────────────

const colorWhite = new THREE.Color('#ffffff');
const colorLightBlue = new THREE.Color('#dbeafe');
const colorLightGreen = new THREE.Color('#dcfce7');
const colorLightRed = new THREE.Color('#fee2e2');

function RoomBox({ room, timeRef }: { room: RoomData; timeRef: React.RefObject<number> }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(2.4, 0.8, 1.8), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const edgeMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const roomIndex = useMemo(() => targetRooms.indexOf(room), [room]);

  useFrame(() => {
    if (!materialRef.current || !timeRef.current) return;
    const t = timeRef.current % LOOP_DURATION;
    const mat = materialRef.current;

    if (room.isSource) {
      // Source room: flash red during alert
      if (t >= TIMING.alertFlash && t < TIMING.pauseEnd) {
        const pulse = Math.sin(t * 4) * 0.5 + 0.5;
        mat.color.copy(colorWhite).lerp(colorLightRed, 0.3 + pulse * 0.3);
        mat.opacity = 0.15 + pulse * 0.15;
      } else {
        mat.color.copy(colorWhite);
        mat.opacity = 0.08;
      }
    } else {
      // Target rooms: illuminate when particles arrive
      const roomDelay = TIMING.particlesStart + particleStaggerDelay(roomIndex) +
        (TIMING.particlesEnd - TIMING.particlesStart - 0.4);

      if (t >= roomDelay && t < TIMING.pauseEnd) {
        const elapsed = t - roomDelay;
        const fadeIn = Math.min(elapsed / 0.8, 1);
        const targetColor = room.response === 'en_camino' ? colorLightGreen : colorLightBlue;
        mat.color.copy(colorWhite).lerp(targetColor, fadeIn);
        mat.opacity = THREE.MathUtils.lerp(0.08, 0.35, fadeIn);
      } else {
        mat.color.copy(colorWhite);
        mat.opacity = 0.08;
      }
    }

    // Edge color: slightly highlight when illuminated
    if (edgeMaterialRef.current) {
      if (room.isSource && t >= TIMING.alertFlash && t < TIMING.pauseEnd) {
        edgeMaterialRef.current.color.set('#f87171');
      } else if (!room.isSource) {
        const roomDelay = TIMING.particlesStart + particleStaggerDelay(roomIndex) +
          (TIMING.particlesEnd - TIMING.particlesStart - 0.4);
        if (t >= roomDelay && t < TIMING.pauseEnd) {
          edgeMaterialRef.current.color.set(room.response === 'en_camino' ? '#86efac' : '#93c5fd');
        } else {
          edgeMaterialRef.current.color.set('#9ca3af');
        }
      } else {
        edgeMaterialRef.current.color.set('#9ca3af');
      }
    }
  });

  const position: [number, number, number] = [room.pos[0], room.pos[1], room.pos[2]];

  return (
    <group position={position}>
      {/* Solid fill */}
      <mesh position={[0, 0.4, 0]} geometry={geo}>
        <meshStandardMaterial
          ref={materialRef}
          transparent
          opacity={0.08}
          color="white"
        />
      </mesh>
      {/* Wireframe edges */}
      <lineSegments position={[0, 0.4, 0]} geometry={edges}>
        <lineBasicMaterial ref={edgeMaterialRef} color="#9ca3af" />
      </lineSegments>
    </group>
  );
}

// ── Alert indicator (pulsing sphere above source room) ─────────────────────────

function AlertIndicator({ timeRef }: { timeRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!meshRef.current || !matRef.current || !timeRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    if (t >= TIMING.alertFlash && t < TIMING.pauseEnd) {
      meshRef.current.visible = true;
      const pulse = Math.sin(t * 6) * 0.5 + 0.5;
      const scale = 0.12 + pulse * 0.08;
      meshRef.current.scale.setScalar(scale / 0.12);
      matRef.current.opacity = 0.6 + pulse * 0.4;
    } else {
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, 1.0, -2]} visible={false}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial ref={matRef} color="#ef4444" transparent opacity={0.8} />
    </mesh>
  );
}

// ── Particle component ─────────────────────────────────────────────────────────

function Particle({ path, index, timeRef }: {
  path: [number, number, number][];
  index: number;
  timeRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const delay = particleStaggerDelay(index);
  const travelDuration = TIMING.particlesEnd - TIMING.particlesStart - 0.4;

  useFrame(() => {
    if (!meshRef.current || !matRef.current || !timeRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    const particleStart = TIMING.particlesStart + delay;
    const particleEnd = particleStart + travelDuration;

    if (t >= particleStart && t < particleEnd) {
      meshRef.current.visible = true;
      const progress = (t - particleStart) / travelDuration;
      const pos = interpolatePath(path, progress);
      meshRef.current.position.set(pos[0], pos[1], pos[2]);

      // Pulsing glow
      const pulse = Math.sin(t * 12) * 0.5 + 0.5;
      const scale = 1 + pulse * 0.5;
      meshRef.current.scale.setScalar(scale);
      matRef.current.opacity = 0.7 + pulse * 0.3;
    } else {
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial ref={matRef} color="#3b82f6" transparent opacity={0.8} />
    </mesh>
  );
}

// ── Trail line (shows the path the particle has traveled) ──────────────────────

function TrailLine({ path, index, timeRef }: {
  path: [number, number, number][];
  index: number;
  timeRef: React.RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const delay = particleStaggerDelay(index);
  const travelDuration = TIMING.particlesEnd - TIMING.particlesStart - 0.4;

  const maxPoints = 50;

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxPoints * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    const mat = new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.4 });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(() => {
    if (!groupRef.current || !timeRef.current) return;
    const t = timeRef.current % LOOP_DURATION;

    const particleStart = TIMING.particlesStart + delay;
    const particleEnd = particleStart + travelDuration;
    const mat = lineObj.material as THREE.LineBasicMaterial;
    const geo = lineObj.geometry;

    if (t >= particleStart && t < TIMING.pauseEnd) {
      lineObj.visible = true;
      const progress = Math.min((t - particleStart) / travelDuration, 1);
      const numPoints = Math.max(2, Math.floor(progress * maxPoints));

      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < numPoints; i++) {
        const pt = interpolatePath(path, i / (numPoints - 1) * progress);
        posAttr.setXYZ(i, pt[0], pt[1], pt[2]);
      }
      posAttr.needsUpdate = true;
      geo.setDrawRange(0, numPoints);

      // Fade out after particles finish
      if (t > particleEnd) {
        const fadeProgress = (t - particleEnd) / 2;
        mat.opacity = Math.max(0, 0.4 - fadeProgress * 0.4);
      } else {
        mat.opacity = 0.4;
      }
    } else {
      lineObj.visible = false;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={lineObj} />
    </group>
  );
}

// ── Room HTML label component ──────────────────────────────────────────────────

function RoomLabel({ room, timeRef }: { room: RoomData; timeRef: React.RefObject<number> }) {
  const [badgeState, setBadgeState] = useState<'hidden' | 'alert' | 'response' | 'count'>('hidden');

  const roomIndex = useMemo(() => targetRooms.indexOf(room), [room]);

  // Poll the timeRef to update badge state (DOM-side, not useFrame)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!timeRef.current) return;
      const t = timeRef.current % LOOP_DURATION;

      if (room.isSource) {
        if (t >= TIMING.sourceBadge && t < TIMING.pauseEnd) {
          setBadgeState('count');
        } else if (t >= TIMING.alertFlash && t < TIMING.pauseEnd) {
          setBadgeState('alert');
        } else {
          setBadgeState('hidden');
        }
      } else {
        const badgeDelay = TIMING.responseBadges + (roomIndex / Math.max(targetRooms.length - 1, 1)) * 1.5;
        if (t >= badgeDelay && t < TIMING.pauseEnd) {
          setBadgeState('response');
        } else {
          setBadgeState('hidden');
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [room, roomIndex, timeRef]);

  return (
    <Html
      position={[room.pos[0], 1.4, room.pos[2]]}
      center
      distanceFactor={8}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div className="text-center whitespace-nowrap">
        <p className="text-xs font-bold text-gray-900 leading-tight">{room.label}</p>
        <p className="text-[10px] text-gray-600 leading-tight">{room.person}</p>

        {/* Source room badges */}
        {room.isSource && badgeState === 'alert' && (
          <div className="mt-0.5">
            <span className="text-[9px] font-semibold text-red-600">
              Genera alerta
            </span>
          </div>
        )}
        {room.isSource && badgeState === 'count' && (
          <div className="mt-0.5 inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-300 rounded px-1.5 py-0.5 text-[9px] font-bold">
            {enCaminoCount} en camino
          </div>
        )}

        {/* Target room response badges */}
        {!room.isSource && badgeState === 'response' && room.response && (
          <div className="mt-0.5">
            <span
              className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold ${
                room.response === 'en_camino'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-blue-100 text-blue-600 border border-blue-300'
              }`}
            >
              {room.response === 'en_camino' ? 'En camino' : 'Recibido'}
            </span>
          </div>
        )}
      </div>
    </Html>
  );
}

// ── Animation clock (shared time ref driven by useFrame) ───────────────────────

function AnimationClock({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  useFrame((_, delta) => {
    timeRef.current += delta;
  });
  return null;
}

// ── Floor ──────────────────────────────────────────────────────────────────────

function Floor() {
  return (
    <>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      {/* Hallway strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[12, 1.5]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </>
  );
}

// ── Hallway label ──────────────────────────────────────────────────────────────

function HallwayLabel() {
  return (
    <Html position={[0, 0.1, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap">
        Pasillo
      </p>
    </Html>
  );
}

// ── Scene component ────────────────────────────────────────────────────────────

function Scene() {
  const timeRef = useRef<number>(0);

  return (
    <>
      <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={50} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <ContactShadows position={[0, -0.01, 0]} opacity={0.3} scale={15} blur={2} far={5} />

      <AnimationClock timeRef={timeRef} />

      <Floor />
      <HallwayLabel />

      {/* Room boxes */}
      {rooms.map((room) => (
        <RoomBox key={room.label} room={room} timeRef={timeRef} />
      ))}

      {/* Alert indicator on source room */}
      <AlertIndicator timeRef={timeRef} />

      {/* Particles traveling to target rooms */}
      {particlePaths.map((path, i) => (
        <Particle key={`particle-${i}`} path={path} index={i} timeRef={timeRef} />
      ))}

      {/* Trail lines */}
      {particlePaths.map((path, i) => (
        <TrailLine key={`trail-${i}`} path={path} index={i} timeRef={timeRef} />
      ))}

      {/* HTML labels for each room */}
      {rooms.map((room) => (
        <RoomLabel key={`label-${room.label}`} room={room} timeRef={timeRef} />
      ))}
    </>
  );
}

// ── Legend ──────────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-[10px] md:text-xs space-y-1 z-10">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
        <span className="text-gray-600">Alerta activa</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
        <span className="text-gray-600">Alerta recibida</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
        <span className="text-gray-600">En camino</span>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function AlertDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[350px] md:h-[500px] w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Legend />
          {mounted && (
            <Canvas>
              <Scene />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}
