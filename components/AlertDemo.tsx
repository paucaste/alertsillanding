'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────────────────────────

type Response = 'en_camino' | 'recibido';

interface RoomData {
  label: string;
  person: string;
  isSource: boolean;
  response: Response | undefined;
  pos: [number, number, number];
}

// ── Room data ──────────────────────────────────────────────────────────────────

const rooms: RoomData[] = [
  { label: 'Consulta 1', person: 'Dra. María López', isSource: true, response: undefined, pos: [-3.2, 0, -1.8] },
  { label: 'Consulta 2', person: 'Dr. Andrés Ruiz', isSource: false, response: 'en_camino', pos: [0, 0, -1.8] },
  { label: 'Consulta 3', person: 'Dra. Elena Navarro', isSource: false, response: 'recibido', pos: [3.2, 0, -1.8] },
  { label: 'Recepción', person: 'Laura Díaz', isSource: false, response: 'recibido', pos: [-3.2, 0, 1.8] },
  { label: 'Consulta 4', person: 'Dr. Carlos Méndez', isSource: false, response: 'en_camino', pos: [0, 0, 1.8] },
  { label: 'Seguridad', person: 'José Martínez', isSource: false, response: 'en_camino', pos: [3.2, 0, 1.8] },
];

const enCaminoCount = rooms.filter((r) => r.response === 'en_camino').length;
const targetRooms = rooms.filter((r) => !r.isSource);

// ── Animation timing ───────────────────────────────────────────────────────────

const LOOP_DURATION = 11;

const T = {
  alertFlash: 0.8,
  particlesStart: 1.2,
  particlesEnd: 3.5,
  badges: 4.5,
  sourceBadge: 6.5,
  pauseEnd: 10.0,
} as const;

// ── Particle paths ─────────────────────────────────────────────────────────────

const SOURCE_POS: [number, number, number] = [-3.2, 0.4, -1.8];

function getPath(target: [number, number, number]): [number, number, number][] {
  return [
    SOURCE_POS,
    [-3.2, 0.4, 0],
    [target[0], 0.4, 0],
    [target[0], 0.4, target[2]],
  ];
}

function lerpPath(path: [number, number, number][], t: number): [number, number, number] {
  if (t <= 0) return path[0];
  if (t >= 1) return path[path.length - 1];
  const lens: number[] = [];
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const d = Math.sqrt(
      (path[i + 1][0] - path[i][0]) ** 2 +
      (path[i + 1][1] - path[i][1]) ** 2 +
      (path[i + 1][2] - path[i][2]) ** 2
    );
    lens.push(d);
    total += d;
  }
  const target = t * total;
  let acc = 0;
  for (let i = 0; i < lens.length; i++) {
    if (acc + lens[i] >= target) {
      const s = (target - acc) / lens[i];
      return [
        path[i][0] + (path[i + 1][0] - path[i][0]) * s,
        path[i][1] + (path[i + 1][1] - path[i][1]) * s,
        path[i][2] + (path[i + 1][2] - path[i][2]) * s,
      ];
    }
    acc += lens[i];
  }
  return path[path.length - 1];
}

const paths = targetRooms.map((r) => getPath(r.pos));
const stagger = (i: number) => (i / Math.max(targetRooms.length - 1, 1)) * 0.5;
const travelDur = T.particlesEnd - T.particlesStart - 0.5;

// ── Colors ─────────────────────────────────────────────────────────────────────

const COL = {
  white: new THREE.Color('#ffffff'),
  roomDefault: new THREE.Color('#ffffff'),
  blue: new THREE.Color('#dbeafe'),
  green: new THREE.Color('#dcfce7'),
  red: new THREE.Color('#fee2e2'),
  edgeDefault: new THREE.Color('#e8ecf0'),
  edgeRed: new THREE.Color('#f87171'),
  edgeGreen: new THREE.Color('#86efac'),
  edgeBlue: new THREE.Color('#93c5fd'),
};

// ── Camera setup (handled by Canvas props, no runtime mutation needed) ────────

// ── Animation clock ────────────────────────────────────────────────────────────

function AnimationClock({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  useFrame((_, delta) => {
    timeRef.current += delta;
  });
  return null;
}

// ── Floor ──────────────────────────────────────────────────────────────────────

function Floor() {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Hallway strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[11, 1.2]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>
      {/* Hallway border lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.6]}>
        <planeGeometry args={[11, 0.02]} />
        <meshBasicMaterial color="#f3f4f6" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.6]}>
        <planeGeometry args={[11, 0.02]} />
        <meshBasicMaterial color="#f3f4f6" />
      </mesh>
    </group>
  );
}

// ── Room box ───────────────────────────────────────────────────────────────────

function RoomBox({ room, timeRef }: { room: RoomData; timeRef: React.MutableRefObject<number> }) {
  const floorMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const wallMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const idx = useMemo(() => targetRooms.indexOf(room), [room]);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(2.6, 0.6, 1.4), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  const edgeLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: '#e8ecf0' });
    return new THREE.LineSegments(edgesGeo, mat);
  }, [edgesGeo]);

  useFrame(() => {
    const t = timeRef.current % LOOP_DURATION;

    // Room floor color
    if (floorMatRef.current) {
      const fm = floorMatRef.current;
      if (room.isSource) {
        if (t >= T.alertFlash && t < T.pauseEnd) {
          const p = Math.sin(t * 4) * 0.5 + 0.5;
          fm.color.copy(COL.white).lerp(COL.red, 0.4 + p * 0.4);
        } else {
          fm.color.copy(COL.roomDefault);
        }
      } else {
        const delay = T.particlesStart + stagger(idx) + travelDur;
        if (t >= delay && t < T.pauseEnd) {
          const fade = Math.min((t - delay) / 0.6, 1);
          const target = room.response === 'en_camino' ? COL.green : COL.blue;
          fm.color.copy(COL.white).lerp(target, fade);
        } else {
          fm.color.copy(COL.roomDefault);
        }
      }
    }

    // Wall color
    if (wallMatRef.current) {
      if (room.isSource && t >= T.alertFlash && t < T.pauseEnd) {
        wallMatRef.current.color.set('#fecaca');
        wallMatRef.current.opacity = 0.25;
      } else if (!room.isSource) {
        const delay = T.particlesStart + stagger(idx) + travelDur;
        if (t >= delay && t < T.pauseEnd) {
          const c = room.response === 'en_camino' ? '#bbf7d0' : '#bfdbfe';
          wallMatRef.current.color.set(c);
          wallMatRef.current.opacity = 0.2;
        } else {
          wallMatRef.current.color.set('#ffffff');
          wallMatRef.current.opacity = 0.12;
        }
      } else {
        wallMatRef.current.color.set('#ffffff');
        wallMatRef.current.opacity = 0.12;
      }
    }

    // Edge color
    const edgeMat = edgeLine.material as THREE.LineBasicMaterial;
    if (room.isSource && t >= T.alertFlash && t < T.pauseEnd) {
      edgeMat.color.copy(COL.edgeRed);
    } else if (!room.isSource) {
      const delay = T.particlesStart + stagger(idx) + travelDur;
      if (t >= delay && t < T.pauseEnd) {
        edgeMat.color.copy(room.response === 'en_camino' ? COL.edgeGreen : COL.edgeBlue);
      } else {
        edgeMat.color.copy(COL.edgeDefault);
      }
    } else {
      edgeMat.color.copy(COL.edgeDefault);
    }
  });

  return (
    <group position={room.pos}>
      {/* Room floor (visible colored surface) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[2.6, 1.4]} />
        <meshStandardMaterial ref={floorMatRef} color="#ffffff" />
      </mesh>
      {/* Walls (semitransparent box) */}
      <mesh position={[0, 0.3, 0]} geometry={boxGeo}>
        <meshStandardMaterial ref={wallMatRef} transparent opacity={0.12} color="white" side={THREE.DoubleSide} />
      </mesh>
      {/* Wireframe edges */}
      <primitive object={edgeLine} position={[0, 0.3, 0]} />
    </group>
  );
}

// ── Alert indicator ────────────────────────────────────────────────────────────

function AlertIndicator({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!ref.current || !matRef.current) return;
    const t = timeRef.current % LOOP_DURATION;
    if (t >= T.alertFlash && t < T.pauseEnd) {
      ref.current.visible = true;
      const p = Math.sin(t * 6) * 0.5 + 0.5;
      ref.current.scale.setScalar(0.8 + p * 0.5);
      matRef.current.opacity = 0.5 + p * 0.5;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} position={[-3.2, 0.8, -1.8]} visible={false}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial ref={matRef} color="#ef4444" transparent />
    </mesh>
  );
}

// ── Particle ───────────────────────────────────────────────────────────────────

function Particle({ path, index, timeRef }: {
  path: [number, number, number][];
  index: number;
  timeRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const delay = stagger(index);

  useFrame(() => {
    if (!ref.current) return;
    const t = timeRef.current % LOOP_DURATION;
    const start = T.particlesStart + delay;
    const end = start + travelDur;

    if (t >= start && t < end) {
      ref.current.visible = true;
      const progress = (t - start) / travelDur;
      const pos = lerpPath(path, progress);
      ref.current.position.set(pos[0], pos[1], pos[2]);
      const p = Math.sin(t * 10) * 0.5 + 0.5;
      ref.current.scale.setScalar(1 + p * 0.6);
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.9} />
    </mesh>
  );
}

// ── Trail line ─────────────────────────────────────────────────────────────────

function TrailLine({ path, index, timeRef }: {
  path: [number, number, number][];
  index: number;
  timeRef: React.MutableRefObject<number>;
}) {
  const delay = stagger(index);
  const maxPts = 40;

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxPts * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    const mat = new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.5, linewidth: 1 });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(() => {
    const t = timeRef.current % LOOP_DURATION;
    const start = T.particlesStart + delay;
    const end = start + travelDur;
    const mat = lineObj.material as THREE.LineBasicMaterial;
    const geo = lineObj.geometry;

    if (t >= start && t < T.pauseEnd) {
      lineObj.visible = true;
      const progress = Math.min((t - start) / travelDur, 1);
      const n = Math.max(2, Math.floor(progress * maxPts));
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < n; i++) {
        const pt = lerpPath(path, (i / (n - 1)) * progress);
        posAttr.setXYZ(i, pt[0], pt[1], pt[2]);
      }
      posAttr.needsUpdate = true;
      geo.setDrawRange(0, n);
      mat.opacity = t > end ? Math.max(0, 0.5 - (t - end) * 0.15) : 0.5;
    } else {
      lineObj.visible = false;
    }
  });

  return <primitive object={lineObj} />;
}

// ── Room label (HTML overlay) ──────────────────────────────────────────────────

function RoomLabel({ room, timeRef }: { room: RoomData; timeRef: React.MutableRefObject<number> }) {
  const [badge, setBadge] = useState<'hidden' | 'alert' | 'response' | 'count'>('hidden');
  const idx = useMemo(() => targetRooms.indexOf(room), [room]);

  useEffect(() => {
    const iv = setInterval(() => {
      const t = timeRef.current % LOOP_DURATION;
      if (room.isSource) {
        if (t >= T.sourceBadge && t < T.pauseEnd) setBadge('count');
        else if (t >= T.alertFlash && t < T.pauseEnd) setBadge('alert');
        else setBadge('hidden');
      } else {
        const d = T.badges + (idx / Math.max(targetRooms.length - 1, 1)) * 1.5;
        if (t >= d && t < T.pauseEnd) setBadge('response');
        else setBadge('hidden');
      }
    }, 100);
    return () => clearInterval(iv);
  }, [room, idx, timeRef]);

  return (
    <Html
      position={[room.pos[0], 1.0, room.pos[2]]}
      center
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div className="text-center whitespace-nowrap backdrop-blur-sm bg-white/80 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-sm font-bold text-gray-900 leading-tight">{room.label}</p>
        <p className="text-xs text-gray-600 leading-tight mt-0.5">{room.person}</p>

        {room.isSource && badge === 'alert' && (
          <div className="mt-1">
            <span className="text-xs font-bold text-red-600 animate-pulse">Genera alerta</span>
          </div>
        )}
        {room.isSource && badge === 'count' && (
          <div className="mt-1">
            <span className="inline-flex items-center bg-green-100 text-green-700 border border-green-300 rounded-md px-2 py-1 text-xs font-bold">
              {enCaminoCount} en camino
            </span>
          </div>
        )}

        {!room.isSource && badge === 'response' && room.response && (
          <div className="mt-1">
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ${
              room.response === 'en_camino'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-blue-100 text-blue-600 border border-blue-200'
            }`}>
              {room.response === 'en_camino' ? 'En camino' : 'Recibido'}
            </span>
          </div>
        )}
      </div>
    </Html>
  );
}

// ── Hallway label ──────────────────────────────────────────────────────────────

function HallwayLabel() {
  return (
    <Html position={[0, 0.05, 0]} center style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase whitespace-nowrap">
        Pasillo · Planta 0
      </p>
    </Html>
  );
}

// ── Scene ──────────────────────────────────────────────────────────────────────

function Scene() {
  const timeRef = useRef(0);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} />
      <directionalLight position={[-3, 6, -3]} intensity={0.2} />

      <AnimationClock timeRef={timeRef} />
      <Floor />
      <HallwayLabel />

      {rooms.map((room) => (
        <RoomBox key={room.label} room={room} timeRef={timeRef} />
      ))}

      <AlertIndicator timeRef={timeRef} />

      {paths.map((path, i) => (
        <Particle key={`p-${i}`} path={path} index={i} timeRef={timeRef} />
      ))}
      {paths.map((path, i) => (
        <TrailLine key={`t-${i}`} path={path} index={i} timeRef={timeRef} />
      ))}

      {rooms.map((room) => (
        <RoomLabel key={`lbl-${room.label}`} room={room} timeRef={timeRef} />
      ))}
    </>
  );
}

// ── Legend ──────────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-[10px] md:text-xs space-y-1.5 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
        <span className="text-gray-700 font-medium">Alerta activa</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
        <span className="text-gray-700 font-medium">Alerta recibida</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        <span className="text-gray-700 font-medium">En camino</span>
      </div>
    </div>
  );
}

// ── Title ──────────────────────────────────────────────────────────────────────

function PlanTitle() {
  return (
    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
      <p className="text-xs md:text-sm font-bold text-gray-700">
        Planta 0 — Centro Médico
      </p>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function AlertDemo() {
  const mounted = typeof window !== 'undefined';

  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Mira cómo funciona AlertSil en tiempo real
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Simulación de alerta en un centro médico con 6 estancias
          </p>
        </div>
      </div>

      {/* Canvas container with scroll animation */}
      <motion.div
        className="w-full px-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative h-[450px] md:h-[700px] w-full overflow-hidden bg-white">
          <PlanTitle />
          <Legend />
          {mounted ? (
            <Canvas
              orthographic
              camera={{ position: [8, 8, 8], zoom: 80, near: 0.1, far: 100 }}
              style={{ background: '#ffffff' }}
            >
              <Scene />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-gray-400">Cargando visualización...</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
