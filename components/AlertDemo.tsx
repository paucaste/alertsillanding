'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ── Types ──────────────────────────────────────────────────────────────────────

type Response = 'en_camino' | 'recibido';

interface RoomData {
    label: string;
    person: string;
    isSource: boolean;
    response: Response | undefined;
}

// ── Room data ──────────────────────────────────────────────────────────────────

const topRooms: RoomData[] = [
    { label: 'Consulta 1', person: 'Dra. María López', isSource: true, response: undefined },
    { label: 'Consulta 2', person: 'Dr. Andrés Ruiz', isSource: false, response: 'en_camino' },
    { label: 'Consulta 3', person: 'Dra. Elena Navarro', isSource: false, response: 'recibido' },
];

const bottomRooms: RoomData[] = [
    { label: 'Recepción', person: 'Laura Díaz', isSource: false, response: 'recibido' },
    { label: 'Consulta 4', person: 'Dr. Carlos Méndez', isSource: false, response: 'en_camino' },
    { label: 'Seguridad', person: 'José Martínez', isSource: false, response: 'en_camino' },
];

const enCaminoCount = [...topRooms, ...bottomRooms].filter(
    (r) => r.response === 'en_camino'
).length;

// ── Animation timing (seconds) ─────────────────────────────────────────────────

const LOOP_DURATION = 11;

const TIMING = {
    alertFlash: 0.8,
    lineToHallway: 1.2,
    lineBranch: 1.8,
    lineToRoomsStart: 2.0,
    lineToRoomsEnd: 3.5,
    roomHighlightStart: 2.0,
    responseBadgesStart: 4.5,
    sourceBadge: 6.5,
} as const;

// Per-room line arrival delays (staggered from 2.0 to 3.5)
const roomLineDelay = (index: number, total: number) =>
    TIMING.lineToRoomsStart +
    (index / Math.max(total - 1, 1)) * (TIMING.lineToRoomsEnd - TIMING.lineToRoomsStart);

// Per-room response badge delays (staggered from 4.5 to 6.5)
const responseBadgeDelay = (index: number, total: number) =>
    TIMING.responseBadgesStart +
    (index / Math.max(total - 1, 1)) * (TIMING.sourceBadge - TIMING.responseBadgesStart);

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

// ── Door gap (white div that covers part of a border to simulate an open door) ─

function DoorGap({ side }: { side: 'bottom' | 'top' }) {
    const positionClasses =
        side === 'bottom'
            ? 'bottom-[-2px] left-1/2 -translate-x-1/2 w-6 md:w-8 h-[3px]'
            : 'top-[-2px] left-1/2 -translate-x-1/2 w-6 md:w-8 h-[3px]';
    return <div className={`absolute ${positionClasses} bg-gray-50 z-[1]`} />;
}

// ── Room component ─────────────────────────────────────────────────────────────

function Room({
    room,
    phase,
    animIndex,
    totalRooms,
}: {
    room: RoomData;
    phase: number;
    animIndex: number;
    totalRooms: number;
}) {
    const { label, person, isSource, response } = room;

    // Determine visual state based on phase
    const isAlerted = isSource && phase >= 1;
    const isReceived = !isSource && phase >= 3;
    const showResponse = !isSource && phase >= 4;
    const showSourceBadge = isSource && phase >= 5;

    // Room border/bg classes
    let borderClass = 'border-gray-400';
    let bgClass = 'bg-white';
    if (isAlerted) {
        borderClass = 'border-red-400';
        bgClass = 'bg-red-50';
    }
    if (isReceived) {
        borderClass = 'border-blue-400';
        bgClass = 'bg-blue-50';
    }

    const lineDelay = roomLineDelay(animIndex, totalRooms);
    const badgeDelay = responseBadgeDelay(animIndex, totalRooms);

    return (
        <motion.div
            className={`relative border-2 ${borderClass} ${bgClass} rounded-md p-2 md:p-3 flex flex-col justify-between min-h-[70px] md:min-h-[90px] transition-colors duration-500`}
            {...(isSource && phase >= 1
                ? {
                      animate: {
                          borderColor: ['#f87171', '#ef4444', '#f87171'],
                      },
                      transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                      },
                  }
                : !isSource && phase >= 3
                  ? {
                        initial: { backgroundColor: '#ffffff' },
                        animate: { backgroundColor: '#eff6ff' },
                        transition: {
                            duration: 0.6,
                            delay: lineDelay - TIMING.lineToRoomsStart,
                        },
                    }
                  : {})}
        >
            {/* Door gap */}
            {topRooms.includes(room) && <DoorGap side="bottom" />}
            {bottomRooms.includes(room) && <DoorGap side="top" />}

            {/* Room label */}
            <p className="text-[10px] md:text-xs font-bold text-gray-900 leading-tight">
                {label}
            </p>

            {/* Person */}
            <div className="flex items-center gap-1 mt-1">
                <svg
                    className="w-3 h-3 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
                <p className="text-[9px] md:text-[11px] text-gray-600 truncate leading-tight">
                    {person}
                </p>
            </div>

            {/* Source status */}
            {isSource && (
                <div className="mt-1">
                    {!showSourceBadge ? (
                        <motion.p
                            className="text-[9px] md:text-[10px] font-semibold text-red-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 1 ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Genera alerta
                        </motion.p>
                    ) : (
                        <motion.div
                            className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-300 rounded px-1.5 py-0.5 text-[9px] md:text-[10px] font-bold"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {enCaminoCount} en camino
                        </motion.div>
                    )}
                </div>
            )}

            {/* Response badge */}
            {!isSource && showResponse && response && (
                <motion.div
                    className={`mt-1 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] md:text-[10px] font-bold ${
                        response === 'en_camino'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: badgeDelay - TIMING.responseBadgesStart,
                    }}
                >
                    {response === 'en_camino' ? 'En camino' : 'Recibido'}
                </motion.div>
            )}

            {/* Alert indicator dot for source room */}
            {isSource && phase >= 1 && (
                <motion.div
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-white z-[2]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
}

// ── SVG Connection Lines ───────────────────────────────────────────────────────

/*
 * ViewBox: 0 0 600 400
 *
 * Grid layout (3 columns equally spaced):
 *   Col centers: x = 100, 300, 500
 *
 * Row layout:
 *   Top rooms: y center ≈ 80
 *   Top room bottom edge: y ≈ 130
 *   Hallway: y = 170–230 (center at 200)
 *   Bottom room top edge: y ≈ 270
 *   Bottom rooms: y center ≈ 320
 *
 * Paths from Consulta 1 (x=100):
 *   1. Down from Consulta 1 to hallway center: (100, 130) → (100, 200)
 *   2. Along hallway left:  (100, 200) → (300, 200)
 *   3. Along hallway right: (300, 200) → (500, 200)
 *   4. Up to Consulta 2: (300, 200) → (300, 130)
 *   5. Up to Consulta 3: (500, 200) → (500, 130)
 *   6. Down to Recepción: (100, 200) → (100, 270)
 *   7. Down to Consulta 4: (300, 200) → (300, 270)
 *   8. Down to Seguridad: (500, 200) → (500, 270)
 */

interface LineConfig {
    path: string;
    delay: number;
    duration: number;
    color: string;
}

function ConnectionLines({ phase }: { phase: number }) {
    if (phase < 2) return null;

    const totalTargets = 5; // rooms that receive lines (excluding source)

    const lines: LineConfig[] = [
        // 1. Consulta 1 down to hallway
        {
            path: 'M 100 130 L 100 200',
            delay: TIMING.lineToHallway,
            duration: 0.5,
            color: '#3b82f6',
        },
        // 2. Hallway left to center
        {
            path: 'M 100 200 L 300 200',
            delay: TIMING.lineBranch,
            duration: 0.5,
            color: '#3b82f6',
        },
        // 3. Hallway center to right
        {
            path: 'M 300 200 L 500 200',
            delay: TIMING.lineBranch + 0.2,
            duration: 0.5,
            color: '#3b82f6',
        },
        // 4. Up to Consulta 2
        {
            path: 'M 300 200 L 300 130',
            delay: roomLineDelay(0, totalTargets),
            duration: 0.4,
            color: '#3b82f6',
        },
        // 5. Up to Consulta 3
        {
            path: 'M 500 200 L 500 130',
            delay: roomLineDelay(1, totalTargets),
            duration: 0.4,
            color: '#3b82f6',
        },
        // 6. Down to Recepción
        {
            path: 'M 100 200 L 100 270',
            delay: roomLineDelay(2, totalTargets),
            duration: 0.4,
            color: '#3b82f6',
        },
        // 7. Down to Consulta 4
        {
            path: 'M 300 200 L 300 270',
            delay: roomLineDelay(3, totalTargets),
            duration: 0.4,
            color: '#3b82f6',
        },
        // 8. Down to Seguridad
        {
            path: 'M 500 200 L 500 270',
            delay: roomLineDelay(4, totalTargets),
            duration: 0.4,
            color: '#3b82f6',
        },
    ];

    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
            viewBox="0 0 600 400"
            preserveAspectRatio="none"
            fill="none"
        >
            {lines.map((line, i) => (
                <motion.path
                    key={i}
                    d={line.path}
                    stroke={line.color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{
                        pathLength: {
                            duration: line.duration,
                            delay: line.delay,
                            ease: 'easeInOut',
                        },
                        opacity: { duration: 0.1, delay: line.delay },
                    }}
                />
            ))}

            {/* Animated pulse dot traveling from source */}
            {phase >= 2 && (
                <motion.circle
                    r={4}
                    fill="#3b82f6"
                    initial={{ cx: 100, cy: 130, opacity: 0 }}
                    animate={{
                        cx: [100, 100, 300, 500],
                        cy: [130, 200, 200, 200],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: TIMING.lineToHallway,
                        ease: 'easeInOut',
                    }}
                />
            )}
        </svg>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AlertDemo() {
    const [loopKey, setLoopKey] = useState(0);
    const [phase, setPhase] = useState(0);

    // Animation loop: reset everything every LOOP_DURATION seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setLoopKey((k) => k + 1);
            setPhase(0);
        }, LOOP_DURATION * 1000);
        return () => clearInterval(timer);
    }, []);

    // Phase progression within each loop
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Phase 1: Alert flash on Consulta 1 (0.8s)
        timers.push(setTimeout(() => setPhase(1), TIMING.alertFlash * 1000));

        // Phase 2: SVG lines start drawing (1.2s)
        timers.push(setTimeout(() => setPhase(2), TIMING.lineToHallway * 1000));

        // Phase 3: Rooms highlight as lines reach them (2.0s)
        timers.push(setTimeout(() => setPhase(3), TIMING.roomHighlightStart * 1000));

        // Phase 4: Response badges appear (4.5s)
        timers.push(setTimeout(() => setPhase(4), TIMING.responseBadgesStart * 1000));

        // Phase 5: Source badge shows "3 en camino" (6.5s)
        timers.push(setTimeout(() => setPhase(5), TIMING.sourceBadge * 1000));

        return () => timers.forEach(clearTimeout);
    }, [loopKey]);

    return (
        <section id="demo" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Floor plan container */}
                <div
                    key={loopKey}
                    className="relative bg-gray-50 border-2 border-gray-300 rounded-xl overflow-hidden"
                >
                    {/* Title bar */}
                    <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 md:px-5 md:py-3">
                        <h3 className="text-xs md:text-sm font-bold text-gray-700 tracking-wide uppercase">
                            Planta 0 — Centro Médico
                        </h3>
                    </div>

                    {/* Legend */}
                    <Legend />

                    {/* Floor plan content */}
                    <div className="relative p-3 md:p-6">
                        {/* Top row of rooms */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {topRooms.map((room, i) => (
                                <Room
                                    key={room.label}
                                    room={room}
                                    phase={phase}
                                    animIndex={i}
                                    totalRooms={5}
                                />
                            ))}
                        </div>

                        {/* Hallway */}
                        <div className="my-3 md:my-5 relative h-12 md:h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase select-none">
                                Pasillo · Planta 0
                            </span>
                        </div>

                        {/* Bottom row of rooms */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {bottomRooms.map((room, i) => (
                                <Room
                                    key={room.label}
                                    room={room}
                                    phase={phase}
                                    animIndex={i + 2}
                                    totalRooms={5}
                                />
                            ))}
                        </div>

                        {/* SVG connection lines overlay */}
                        <ConnectionLines phase={phase} />
                    </div>
                </div>
            </div>
        </section>
    );
}
