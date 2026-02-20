# Shield Network 3D Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the AlertSil landing page into a premium, clean design with two 3D focal points (Hero Shield Network + enhanced AlertDemo) and Framer Motion scroll animations throughout.

**Architecture:** Rewrite all 11 components in-place. Add a new `HeroScene.tsx` for the 3D shield scene. Update `globals.css` for new animations and patterns. All components remain client components. No new routes or API changes.

**Tech Stack:** React Three Fiber + Drei (Hero 3D, AlertDemo), Framer Motion (scroll reveal animations), Tailwind CSS v4 (all styling), Three.js MeshPhysicalMaterial (shield materials).

**Design doc:** `docs/plans/2026-02-20-shield-network-3d-redesign-design.md`

---

## Task 1: Update globals.css with new animations and patterns

**Files:**
- Modify: `app/globals.css`

**Step 1: Rewrite globals.css**

Replace the entire file with:

```css
@import "tailwindcss";
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Blob animation (existing) ────────────────────────────────── */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }

/* ── Smooth scroll ────────────────────────────────────────────── */
.scroll-smooth { scroll-behavior: smooth; }

/* ── Dot grid pattern ─────────────────────────────────────────── */
.bg-dot-grid {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ── Animated gradient border (Pricing popular card) ──────────── */
@keyframes rotate-gradient {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.animated-border {
  background: conic-gradient(from var(--gradient-angle), #3b82f6, #60a5fa, #93c5fd, #3b82f6);
  animation: rotate-gradient 3s linear infinite;
}

/* ── Glow pulse for trust badge icons ─────────────────────────── */
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3)); }
  50% { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)); }
}
.animate-glow { animation: glow-pulse 2s ease-in-out infinite; }

/* ── Fade-in up (for scroll reveals) ──────────────────────────── */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Theme ────────────────────────────────────────────────────── */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add new CSS animations for Shield Network redesign"
```

---

## Task 2: Redesign Header with scroll-aware transparency

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Rewrite Header.tsx**

Replace the entire component with a scroll-aware header that starts transparent (for the dark hero) and solidifies on scroll:

```tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
            <Image src="/logo.png" alt="AlertSil Logo" width={32} height={32} />
            <span>
              <span className={scrolled ? 'text-blue-600' : 'text-blue-400'}>Alert</span>
              <span className={scrolled ? 'text-gray-900' : 'text-white'}>Sil</span>
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/paucaste/alertsillanding/releases/download/1.0.2/AlertSil-1.0.2-setup.exe"
            download="AlertSil-1.0.2-setup.exe"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
            }`}
          >
            Descargar Gratis
          </a>
          <Link
            href="https://alertsil-admin-panel.vercel.app/"
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
            }`}
          >
            Entrar
          </Link>
          <Link
            href="https://alertsil-admin-panel.vercel.app/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25"
          >
            Probar gratis
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
          }`}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100">
          <div className="px-4 py-4 flex flex-col gap-4">
            <a
              href="https://github.com/paucaste/alertsillanding/releases/download/1.0.2/AlertSil-1.0.2-setup.exe"
              download="AlertSil-1.0.2-setup.exe"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Descargar Gratis
            </a>
            <Link href="https://alertsil-admin-panel.vercel.app/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Entrar
            </Link>
            <Link href="https://alertsil-admin-panel.vercel.app/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 text-center">
              Probar gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
```

**Step 2: Verify dev server renders correctly**

Run: `npm run dev` and check localhost:3000
Expected: Header starts transparent, solidifies on scroll.

**Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: redesign Header with scroll-aware transparency"
```

---

## Task 3: Create HeroScene 3D component (Shield Network)

**Files:**
- Create: `components/HeroScene.tsx`

**Step 1: Create the 3D Shield Network scene**

This is a new component containing the R3F Canvas with the shield, network nodes, connection lines, and traveling particles. It will be imported by the Hero component.

The scene contains:
- A slowly rotating icosahedron (shield) with translucent blue material
- 10 orbiting node spheres at different radii and speeds
- Curved connection lines between nodes (CatmullRomCurve3)
- Particles traveling along the connection lines
- Deep blue radial background
- Ambient + point + directional lighting

```tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Shield (rotating icosahedron) ─────────────────────────────────────────────

function Shield() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
    }
  });

  return (
    <group>
      {/* Solid translucent shield */}
      <mesh ref={ref}>
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
      {/* Wireframe overlay */}
      <mesh rotation={ref.current?.rotation ?? new THREE.Euler()}>
        <icosahedronGeometry args={[2.22, 1]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// ── Wireframe that rotates with the shield ────────────────────────────────────

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

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: THREE.Line[] = [];
    // Connect pairs of nodes and to center
    const pairs = [
      [0, 2], [1, 3], [4, 6], [5, 7], [8, 9],
      [0, 5], [2, 7], [3, 8], [1, 6], [4, 9],
    ];
    for (const [a, b] of pairs) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(60 * 3); // 60 points per curve
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.LineBasicMaterial({
        color: '#3b82f6',
        transparent: true,
        opacity: 0.15,
      });
      const line = new THREE.Line(geo, mat);
      (line.userData as { pair: number[] }).pair = [a, b];
      result.push(line);
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (const line of lines) {
      const [a, b] = (line.userData as { pair: number[] }).pair;
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

      // Create curve through midpoint near center
      const mid = posA.clone().add(posB).multiplyScalar(0.5);
      mid.multiplyScalar(0.4); // Pull toward center
      const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);
      const pts = curve.getPoints(59);
      const posAttr = line.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < pts.length; i++) {
        posAttr.setXYZ(i, pts[i].x, pts[i].y, pts[i].z);
      }
      posAttr.needsUpdate = true;

      // Pulse opacity
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 2 + a) * 0.08;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

// ── Traveling particles ───────────────────────────────────────────────────────

function TravelingParticle({ fromIdx, toIdx, speed, delay }: {
  fromIdx: number;
  toIdx: number;
  speed: number;
  delay: number;
}) {
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

    // Pulse size
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

const TRAVELING_PARTICLES = [
  { fromIdx: 0, toIdx: 2, speed: 0.4, delay: 0 },
  { fromIdx: 1, toIdx: 3, speed: 0.35, delay: 0.3 },
  { fromIdx: 4, toIdx: 6, speed: 0.45, delay: 0.6 },
  { fromIdx: 5, toIdx: 7, speed: 0.3, delay: 0.15 },
  { fromIdx: 8, toIdx: 9, speed: 0.5, delay: 0.45 },
  { fromIdx: 0, toIdx: 5, speed: 0.38, delay: 0.7 },
  { fromIdx: 2, toIdx: 7, speed: 0.42, delay: 0.2 },
];

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
```

**Step 2: Verify file compiles**

Run: `npm run build`
Expected: Build succeeds (HeroScene not yet imported anywhere, so no visual test yet).

**Step 3: Commit**

```bash
git add components/HeroScene.tsx
git commit -m "feat: create HeroScene 3D Shield Network component"
```

---

## Task 4: Redesign Hero section with 3D background

**Files:**
- Modify: `components/Hero.tsx`

**Step 1: Rewrite Hero.tsx**

Replace the entire component. Uses dynamic import for HeroScene to avoid SSR issues. Dark background with the 3D scene, white text, pill buttons, and stats with animated appearance.

```tsx
'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1628]">
      {/* 3D Scene background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a1628_80%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Protección instantánea para tu equipo
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cuando hay una emergencia,{' '}
            <span className="text-blue-400">cada segundo cuenta</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AlertSil conecta a todo tu equipo en un clic. Un empleado detecta un riesgo, pulsa el botón, y{' '}
            <strong className="text-gray-200">todos los dispositivos de la empresa reciben la alerta al instante</strong>.
            Sin apps, sin formación, sin retrasos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="https://alertsil-admin-panel.vercel.app/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 text-center"
            >
              Probar gratis
            </Link>
            <Link
              href="#demo"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center"
            >
              Ver demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div>
              <p className="text-3xl font-bold text-white">&lt; 1s</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Tiempo de propagación</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">0 formación</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Instalación inmediata</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Protección activa</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Run: `npm run dev` and check localhost:3000
Expected: Full-viewport hero with dark background, 3D shield scene visible, white text on left, transparent header on top.

**Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: redesign Hero with 3D Shield Network background"
```

---

## Task 5: Enhance AlertDemo with better materials and scroll animation

**Files:**
- Modify: `components/AlertDemo.tsx`

**Step 1: Add section title, Framer Motion scroll entry, and improved labels**

Wrap the existing AlertDemo in a section with title + subtitle above the canvas and a Framer Motion `whileInView` animation. Update the labels to use `backdrop-blur-sm` and rounded corners. Keep all the existing 3D logic intact — only modify the outer wrapper and HTML labels.

Key changes:
- Add section heading above canvas: "Mira cómo funciona AlertSil en tiempo real"
- Add subtitle: "Simulación de alerta en un centro médico con 6 estancias"
- Wrap canvas container in `motion.div` with `whileInView` fade + scale animation
- Update `RoomLabel` HTML overlay styles to use `backdrop-blur-sm bg-white/80 rounded-lg px-3 py-2 shadow-sm`
- Upgrade `Floor` meshes to `MeshStandardMaterial` with `roughness: 0.3`

See the design doc for the full list of visual changes. The core animation logic (timing, particles, trails) stays the same.

**Step 2: Verify in browser**

Run: `npm run dev` — scroll to AlertDemo section
Expected: Section title visible, canvas animates in from 90% scale, labels have blur background.

**Step 3: Commit**

```bash
git add components/AlertDemo.tsx
git commit -m "feat: enhance AlertDemo with section title and scroll animation"
```

---

## Task 6: Redesign HowItWorks as vertical timeline

**Files:**
- Modify: `components/HowItWorks.tsx`

**Step 1: Rewrite HowItWorks.tsx**

Replace horizontal grid with vertical centered timeline. Each step is a card with a large watermark number, gradient icon circle, and title+description. A vertical connecting line runs between steps. Use Framer Motion `whileInView` with `staggerChildren`.

```tsx
'use client';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    number: 1,
    title: 'Detecta',
    description: 'Un empleado identifica una situación de riesgo en su puesto de trabajo.',
    icon: ExclamationTriangleIcon,
  },
  {
    number: 2,
    title: 'Alerta',
    description: 'Con un solo clic, AlertSil envía la señal a todos los dispositivos de la empresa.',
    icon: BellAlertIcon,
  },
  {
    number: 3,
    title: 'Responde',
    description: 'Todo el equipo recibe la alerta y responde al instante: "En camino" o "Recibido".',
    icon: CheckBadgeIcon,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white bg-dot-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Cómo funciona AlertSil
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            De la detección a la respuesta en menos de 1 segundo
          </p>
        </div>

        <motion.div
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 hidden md:block" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="relative flex items-center gap-8 mb-16 last:mb-0"
            >
              {/* Step number watermark */}
              <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 text-8xl font-extrabold text-blue-50 select-none pointer-events-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 mx-auto md:mx-0 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Paso {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Run: `npm run dev` — scroll to HowItWorks
Expected: Vertical timeline with staggered fade-in animations, dot grid background.

**Step 3: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: redesign HowItWorks as vertical timeline with scroll animation"
```

---

## Task 7: Redesign TargetAudience with slide-in cards

**Files:**
- Modify: `components/TargetAudience.tsx`

**Step 1: Rewrite TargetAudience.tsx**

Larger cards with generous padding, larger icons with gradient background, testimonial-styled "Caso real" sections, and slide-in animations from opposite sides.

```tsx
'use client';
import { motion } from 'framer-motion';
import {
  BuildingOffice2Icon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const audiences = [
  {
    title: 'Clínicas y centros médicos',
    icon: HeartIcon,
    description: 'Pacientes agresivos, emergencias médicas o situaciones de riesgo con personal aislado. AlertSil permite que cualquier profesional pida ayuda sin salir de la consulta.',
    scenario: 'Una doctora está sola con un paciente agresivo. Pulsa el botón discretamente y todo el centro lo sabe al instante.',
    direction: -1,
  },
  {
    title: 'PYMEs y oficinas',
    icon: BuildingOffice2Icon,
    description: 'Empleados amenazados, intentos de robo o incidentes de seguridad. Conecta a todo el equipo en segundos para una respuesta coordinada.',
    scenario: 'Un empleado de recepción detecta una intrusión. Con un clic, seguridad, dirección y todo el equipo están alertados.',
    direction: 1,
  },
];

export default function TargetAudience() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Para quién es AlertSil
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Protección adaptada a tu sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, x: audience.direction * 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-200/50">
                <audience.icon className="h-9 w-9 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {audience.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {audience.description}
              </p>

              <div className="bg-blue-50 rounded-xl p-5 relative">
                <span className="absolute -top-3 left-4 text-4xl text-blue-200 font-serif leading-none">&ldquo;</span>
                <p className="text-sm text-gray-700 italic leading-relaxed pl-4">
                  {audience.scenario}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Expected: Cards slide in from left and right with testimonial-styled quotes.

**Step 3: Commit**

```bash
git add components/TargetAudience.tsx
git commit -m "feat: redesign TargetAudience with slide-in cards and testimonial quotes"
```

---

## Task 8: Redesign Features with left-accent cards

**Files:**
- Modify: `components/Features.tsx`

**Step 1: Rewrite Features.tsx**

Cards with `border-l-3 border-blue-500`, gradient icon circles, and staggered fade-up animation.

```tsx
'use client';
import { motion } from 'framer-motion';
import {
  ShieldExclamationIcon,
  SignalIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ClockIcon,
  CloudArrowDownIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const features = [
  { name: 'Alerta Global Instantánea', description: 'Con un solo clic, activa una señal de emergencia en todos los dispositivos de la empresa sin retrasos.', icon: ShieldExclamationIcon },
  { name: 'Alarmas con Sonido', description: 'Emite una alarma sonora en todos los equipos configurados, garantizando que cada miembro del equipo reciba el aviso al instante.', icon: SpeakerWaveIcon },
  { name: 'Alarmas Silenciosas', description: 'Notifica discretamente a seguridad sin alertar a intrusos ni causar pánico innecesario.', icon: SpeakerXMarkIcon },
  { name: 'Conectividad Crítica', description: 'Monitoreo constante del estado de los equipos para asegurar una red siempre lista.', icon: SignalIcon },
  { name: 'Instalación en 30s', description: 'Sin manuales complejos ni formación. Descargar, instalar y empezar a proteger.', icon: CloudArrowDownIcon },
  { name: 'Cero Mantenimiento', description: 'Se ejecuta silenciosamente en segundo plano. Ni lo verás, hasta que lo necesites.', icon: ClockIcon },
  { name: 'Ligereza Total', description: 'Optimizado para no consumir recursos. Tu equipo seguirá volando mientras está protegido.', icon: CpuChipIcon },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Todo lo que necesitas para proteger a tu equipo
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Reducimos el tiempo de respuesta ante agresiones, emergencias médicas o incidentes de seguridad de minutos a segundos,{' '}
            <strong>asegurando que ningún empleado esté solo en una situación de riesgo.</strong>
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              className="bg-white p-8 rounded-2xl border-l-[3px] border-l-blue-500 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200/50">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Expected: Cards with blue left border, gradient icons, staggered fade-in.

**Step 3: Commit**

```bash
git add components/Features.tsx
git commit -m "feat: redesign Features with accent border cards and stagger animation"
```

---

## Task 9: Redesign TrustBadges as dark horizontal stripe

**Files:**
- Modify: `components/TrustBadges.tsx`

**Step 1: Rewrite TrustBadges.tsx**

Dark background stripe with horizontal badges and glow-pulsing icons.

```tsx
'use client';
import { motion } from 'framer-motion';
import {
  LockClosedIcon,
  ShieldCheckIcon,
  ServerIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const badges = [
  { title: 'Cifrado E2E', description: 'Comunicación cifrada extremo a extremo', icon: LockClosedIcon },
  { title: 'RGPD', description: 'Normativa europea de protección de datos', icon: ShieldCheckIcon },
  { title: '99.9% Uptime', description: 'Disponibilidad garantizada', icon: ServerIcon },
  { title: 'Soporte en español', description: 'Ayuda en tu idioma', icon: ChatBubbleLeftRightIcon },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className={`text-center ${
                i < badges.length - 1 ? 'md:border-r md:border-white/10' : ''
              }`}
            >
              <badge.icon className="h-8 w-8 text-blue-400 mx-auto mb-3 animate-glow" />
              <h3 className="text-lg font-bold text-white mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Expected: Dark stripe with glowing blue icons and white text.

**Step 3: Commit**

```bash
git add components/TrustBadges.tsx
git commit -m "feat: redesign TrustBadges as dark horizontal stripe with glow icons"
```

---

## Task 10: Redesign Pricing with animated border and pill buttons

**Files:**
- Modify: `components/Pricing.tsx`

**Step 1: Rewrite Pricing.tsx**

Business card gets animated gradient border. All buttons become pills (`rounded-full`). Stagger animation on viewport entry.

```tsx
'use client';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Starter',
    price: 8.99,
    limit: 10,
    description: 'Protección esencial. Solo 0,90€ por equipo.',
    savings: null,
    features: ['Hasta 10 equipos conectados', 'Alerta Global Instantánea', 'Instalación en 30 segundos', 'Cero mantenimiento', 'Soporte vía email'],
    cta: 'Empezar ahora',
    mostPopular: false,
  },
  {
    name: 'Business',
    price: 19.99,
    limit: 50,
    description: 'Eficiencia para PYMES. Baja a 0,40€ por equipo.',
    savings: 'Ahorras un 55%',
    features: ['Hasta 50 equipos conectados', 'Alarmas Silenciosas', 'Historial de alertas', 'Ligereza total del sistema', 'Soporte prioritario'],
    cta: 'Proteger mi empresa',
    mostPopular: true,
  },
  {
    name: 'Industrial',
    price: 49.99,
    limit: 150,
    description: 'Máximo ahorro corporativo. Solo 0,33€ por equipo.',
    savings: 'Ahorras un 63%',
    features: ['Hasta 150 equipos conectados', 'Panel de control avanzado', 'Conectividad Crítica 24/7', 'Multidispositivo ilimitado', 'Soporte telefónico'],
    cta: 'Contactar ventas',
    mostPopular: false,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl tracking-tight">
            Planes adaptados a tu equipo
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Seguridad laboral inteligente. Cuantos más equipos protejas, menos pagas por cada uno.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={item}>
              {tier.mostPopular ? (
                <div className="relative h-full">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-[2px] rounded-3xl animated-border opacity-70" />
                  <div className="relative flex flex-col h-full p-8 rounded-3xl bg-white shadow-xl shadow-blue-500/10 z-10">
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Recomendado
                    </span>
                    {tier.savings && (
                      <span className="mb-4 inline-block w-fit bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg uppercase">
                        {tier.savings}
                      </span>
                    )}
                    <PricingCardContent tier={tier} popular />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full p-8 rounded-3xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                  {tier.savings && (
                    <span className="mb-4 inline-block w-fit bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg uppercase">
                      {tier.savings}
                    </span>
                  )}
                  <PricingCardContent tier={tier} popular={false} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-gray-900 font-semibold">
            ¿Más de 150 equipos?{' '}
            <span className="text-blue-600 underline cursor-pointer decoration-2 underline-offset-4">
              Hablemos de un plan a medida
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCardContent({ tier, popular }: { tier: typeof tiers[number]; popular: boolean }) {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{tier.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-extrabold text-gray-900">
            {tier.price.toString().replace('.', ',')}€
          </span>
          <span className="ml-1 text-xl font-medium text-gray-500">/mes</span>
        </div>
        <p className="mt-4 text-gray-600 text-sm font-medium leading-relaxed italic">
          {tier.description}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
            <CheckIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-4 rounded-full font-bold transition-all transform active:scale-95 ${
          popular
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-200'
            : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
        }`}
      >
        {tier.cta}
      </button>
    </>
  );
}
```

**Step 2: Verify in browser**

Expected: Business card has rotating gradient border, all buttons are pills, cards stagger in.

**Step 3: Commit**

```bash
git add components/Pricing.tsx
git commit -m "feat: redesign Pricing with animated gradient border and pill buttons"
```

---

## Task 11: Redesign CallToAction with deeper gradient

**Files:**
- Modify: `components/CallToAction.tsx`

**Step 1: Rewrite CallToAction.tsx**

```tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 text-white overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          ¿Listo para proteger tu negocio?
        </h2>
        <p className="text-xl mb-10 text-blue-100">
          Únete a AlertSil hoy mismo y toma el control total de tus dispositivos con alertas inteligentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://alertsil-admin-panel.vercel.app/register"
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Probar gratis
          </Link>
          <Link
            href="mailto:info@effizy.es"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            Contactar Ventas
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/CallToAction.tsx
git commit -m "feat: redesign CallToAction with deeper gradient and dot pattern"
```

---

## Task 12: Redesign ContactForm with centered card and glow inputs

**Files:**
- Modify: `components/ContactForm.tsx`

**Step 1: Rewrite ContactForm.tsx**

Centered card with shadow-xl, rounded-2xl, blue ring focus states, full-width pill submit button.

```tsx
'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqearqqd");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-16 bg-green-50 rounded-2xl border border-green-100 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">¡Solicitud enviada!</h3>
            <p className="text-gray-700 mt-2">
              Hemos recibido tu petición y te contactaremos para ayudarte a contratar el software.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white bg-dot-grid">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Solicita una demo personalizada</h2>
          <p className="mt-4 text-gray-600">
            Déjanos tus datos y te mostraremos cómo AlertSil puede proteger a tu equipo en menos de 5 minutos.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-10 rounded-2xl border border-gray-100 shadow-xl text-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre y apellidos
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                required
              />
              <ValidationError prefix="Nombre" field="fullName" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email profesional
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="nombre@empresa.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Empresa
              </label>
              <input
                id="company"
                type="text"
                name="company"
                placeholder="Nombre de la empresa"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                required
              />
              <ValidationError prefix="Empresa" field="company" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono (opcional)
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+34 600 000 000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              />
              <ValidationError prefix="Teléfono" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          <input type="hidden" name="formType" value="Solicitud contratación software" />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-500 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/25"
          >
            {state.submitting ? 'Enviando...' : 'Solicitar contratación'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Al enviar, aceptas que te contactemos para gestionar la contratación. No enviamos spam.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: redesign ContactForm with centered card, glow inputs, and pill button"
```

---

## Task 13: Refine Footer

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Rewrite Footer.tsx**

Darker background (`gray-950`), separator line, refined typography and spacing.

```tsx
'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-extrabold text-white mb-4 block tracking-tight">
              <span className="text-blue-500">Alert</span>Sil
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Seguridad laboral instantánea para empresas. Protegemos a tu equipo mediante un sistema de alerta crítica con replicación total en un solo clic.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Producto</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Características</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="https://alertsil-admin-panel.vercel.app" className="text-gray-400 hover:text-white transition-colors">Panel de Control</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Soporte</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="mailto:info@effizy.es" className="text-gray-400 hover:text-white transition-colors">info@effizy.es</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AlertSil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "style: refine Footer with darker background and improved typography"
```

---

## Task 14: Final build verification and combined commit

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Visual check**

Run: `npm run dev` and scroll through entire page.
Expected: All sections render correctly with new design. Check:
- Header: Transparent → solid on scroll
- Hero: Dark background, 3D shield scene, white text
- AlertDemo: Section title, scroll-in animation
- HowItWorks: Vertical timeline
- TargetAudience: Slide-in cards
- Features: Left-accent cards with stagger
- TrustBadges: Dark stripe
- Pricing: Animated border on Business card
- CTA: Deep gradient with dot pattern
- ContactForm: Centered card with shadow
- Footer: Darker background

**Step 4: Fix any issues found**

If issues arise, fix and commit individually.
