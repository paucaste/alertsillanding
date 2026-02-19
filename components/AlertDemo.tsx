'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CYCLE = 14;

type Response = 'en_camino' | 'recibido';

const topRooms = [
    { label: 'Consulta 1', doctor: 'Dra. María López', isSource: true, response: undefined as Response | undefined },
    { label: 'Consulta 2', doctor: 'Dr. Andrés Ruiz', isSource: false, response: 'en_camino' as Response },
    { label: 'Consulta 3', doctor: 'Dra. Elena Navarro', isSource: false, response: 'recibido' as Response },
];

const bottomRooms = [
    { label: 'Recepción', doctor: 'Laura Díaz', isSource: false, response: 'recibido' as Response },
    { label: 'Consulta 4', doctor: 'Dr. Carlos Méndez', isSource: false, response: 'en_camino' as Response },
    { label: 'Seguridad', doctor: 'José Martínez', isSource: false, response: 'en_camino' as Response },
];

const enCaminoRooms = [...topRooms, ...bottomRooms]
    .filter((r) => r.response === 'en_camino')
    .map((r) => ({ label: r.label, doctor: r.doctor }));

// Delays en segundos
const ALERT_DELAY = (col: number) => 1.4 + col * 0.5;
const RESPONSE_DELAY = (col: number) => 5.5 + col * 0.3;
const SOURCE_RECEIVE = 6.8;

function RoomCard({
    label,
    doctor,
    isSource,
    col,
    response,
}: {
    label: string;
    doctor: string;
    isSource: boolean;
    col: number;
    response?: Response;
}) {
    const ad = ALERT_DELAY(col);
    const rd = RESPONSE_DELAY(col);
    const isEnCamino = response === 'en_camino';

    return (
        <div className="relative">
            <motion.div
                className={`relative p-3 sm:p-4 rounded-xl border-2 flex items-center gap-2 sm:gap-3 ${
                    isSource
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200'
                }`}
                {...(isSource
                    ? {
                          animate: { scale: [1, 0.95, 1.05, 1] },
                          transition: {
                              duration: 0.5,
                              delay: 0.8,
                              times: [0, 0.3, 0.7, 1],
                          },
                      }
                    : {
                          animate: {
                              backgroundColor: [
                                  '#ffffff',
                                  '#dbeafe',
                                  '#dbeafe',
                                  '#ffffff',
                              ],
                              borderColor: [
                                  '#e5e7eb',
                                  '#3b82f6',
                                  '#3b82f6',
                                  '#e5e7eb',
                              ],
                          },
                          transition: {
                              duration: 2,
                              delay: ad,
                              times: [0, 0.15, 0.7, 1],
                          },
                      })}
            >
                {/* Icono */}
                <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSource ? 'bg-blue-600' : 'bg-gray-100'
                    }`}
                >
                    {isSource ? (
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001a11.209 11.209 0 0 0 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z"
                            />
                        </svg>
                    )}
                </div>

                {/* Texto */}
                <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {label}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-gray-700 truncate flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        {doctor}
                    </p>
                    {isSource && (
                        <div className="relative h-3 sm:h-4">
                            <motion.p
                                className="absolute text-[10px] sm:text-xs text-blue-600 font-semibold whitespace-nowrap"
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.4, delay: SOURCE_RECEIVE - 0.4 }}
                            >
                                Genera alerta
                            </motion.p>
                            <motion.p
                                className="absolute text-[10px] sm:text-xs text-green-600 font-semibold whitespace-nowrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: SOURCE_RECEIVE }}
                            >
                                {enCaminoRooms.length} vienen en camino
                            </motion.p>
                        </div>
                    )}
                </div>

                {/* Badge rojo alerta */}
                {!isSource && (
                    <motion.div
                        className="absolute top-1.5 right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.2, 1, 1, 0],
                            opacity: [0, 1, 1, 1, 0],
                        }}
                        transition={{
                            duration: 3,
                            delay: ad,
                            times: [0, 0.1, 0.2, 0.8, 1],
                        }}
                    />
                )}

                {/* Overlay verde para salas "en camino" — dentro del card */}
                {isEnCamino && (
                    <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-green-400 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: rd }}
                    />
                )}

                {/* Overlay verde para Consulta 1 al recibir — dentro del card */}
                {isSource && (
                    <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-green-400 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: SOURCE_RECEIVE }}
                    />
                )}
            </motion.div>

            {/* Etiqueta de respuesta debajo de la tarjeta — fuera del borde verde */}
            {response && (
                <motion.div
                    className={`mt-1.5 text-center py-1 sm:py-1.5 rounded-lg font-bold text-[10px] sm:text-xs ${
                        isEnCamino
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: rd }}
                >
                    {isEnCamino ? 'En camino' : 'Recibido'}
                </motion.div>
            )}
        </div>
    );
}

function Connector({
    col,
    hasGreenPhase,
}: {
    col: number;
    hasGreenPhase: boolean;
}) {
    const ad = ALERT_DELAY(col);
    const rd = RESPONSE_DELAY(col);
    return (
        <div className="flex justify-center relative">
            {/* Fase azul — destello temporal */}
            <motion.div
                className="w-0.5 h-5 sm:h-7"
                animate={{
                    backgroundColor: [
                        '#e5e7eb',
                        '#3b82f6',
                        '#3b82f6',
                        '#e5e7eb',
                    ],
                }}
                transition={{
                    duration: 2,
                    delay: ad - 0.2,
                    times: [0, 0.1, 0.7, 1],
                }}
            />
            {/* Fase verde — aparece y se queda */}
            {hasGreenPhase && (
                <motion.div className="absolute inset-0 flex justify-center">
                    <motion.div
                        className="w-0.5 h-5 sm:h-7"
                        initial={{ backgroundColor: 'transparent' }}
                        animate={{ backgroundColor: '#22c55e' }}
                        transition={{ duration: 0.4, delay: rd }}
                    />
                </motion.div>
            )}
        </div>
    );
}

const LOOP_DURATION = 11; // segundos totales del ciclo (animación ~8.5s + 2.5s pausa)

export default function AlertDemo() {
    const [loopKey, setLoopKey] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setLoopKey((k) => k + 1);
        }, LOOP_DURATION * 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="demo" className="pt-32 pb-20 bg-white">
            <div key={loopKey} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Consultas superiores */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {topRooms.map((room, i) => (
                        <div key={room.label} className="relative">
                            {/* Notificaciones WhatsApp encima de Consulta 1 */}
                            {room.isSource && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 flex flex-col items-start gap-1.5 z-10">
                                    {enCaminoRooms.map((room, idx) => (
                                        <motion.div
                                            key={room.label}
                                            className="bg-[#dcf8c6] text-gray-800 text-[9px] sm:text-[11px] font-medium px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg rounded-bl-none shadow-sm max-w-full relative"
                                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3, delay: SOURCE_RECEIVE + idx * 0.4 }}
                                        >
                                            <span className="font-bold text-green-700 block text-[8px] sm:text-[10px]">{room.label} · {room.doctor}</span>
                                            <span>Voy en camino</span>
                                            {/* Colita del mensaje */}
                                            <div className="absolute bottom-0 -left-1.5 w-3 h-3 overflow-hidden">
                                                <div className="bg-[#dcf8c6] w-3 h-3 rotate-45 translate-x-1.5 -translate-y-0.5" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            <RoomCard {...room} col={i} />
                        </div>
                    ))}
                </div>

                {/* Conectores superiores */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {topRooms.map((room, i) => (
                        <Connector
                            key={`top-${i}`}
                            col={i}
                            hasGreenPhase={
                                room.isSource ||
                                room.response === 'en_camino'
                            }
                        />
                    ))}
                </div>

                {/* Pasillo */}
                <div className="relative h-10 sm:h-12 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
                    <span className="relative text-[10px] sm:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                        Pasillo · Planta 0
                    </span>
                </div>

                {/* Conectores inferiores */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {bottomRooms.map((room, i) => (
                        <Connector
                            key={`bot-${i}`}
                            col={i}
                            hasGreenPhase={room.response === 'en_camino'}
                        />
                    ))}
                </div>

                {/* Consultas inferiores */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {bottomRooms.map((room, i) => (
                        <RoomCard key={room.label} {...room} col={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
