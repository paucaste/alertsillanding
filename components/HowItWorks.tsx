'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

// Dynamically load the 3D scene with SSR disabled
const AlertNetworkScene = dynamic(() => import('./AlertNetworkScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-2xl">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Cargando visualización...</p>
      </div>
    </div>
  ),
});

const steps = [
  {
    number: 1,
    title: 'Detecta',
    description: 'Un empleado identifica una situación de riesgo en su puesto de trabajo.',
    icon: ExclamationTriangleIcon,
    color: 'from-red-500 to-orange-500',
    shadow: 'shadow-red-200/50',
    badge: 'bg-red-50 text-red-700',
  },
  {
    number: 2,
    title: 'Alerta',
    description: 'Con un solo clic, AlertSil envía la señal a todos los dispositivos de la empresa.',
    icon: BellAlertIcon,
    color: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-200/50',
    badge: 'bg-blue-50 text-blue-700',
  },
  {
    number: 3,
    title: 'Responde',
    description: 'Todo el equipo recibe la alerta y responde al instante: "En camino" o "Recibido".',
    icon: CheckBadgeIcon,
    color: 'from-green-500 to-emerald-600',
    shadow: 'shadow-green-200/50',
    badge: 'bg-green-50 text-green-700',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const sceneVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function HowItWorks() {
  return (
    <section id="demo" className="py-24 bg-white bg-dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Cómo funciona AlertSil
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            De la detección a la respuesta en menos de 1 segundo
          </p>
        </div>

        {/* Two-column layout: 3D scene + steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: 3D network scene */}
          <motion.div
            className="relative w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200/60 shadow-xl shadow-gray-200/40"
            variants={sceneVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Scene label */}
            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-600">Red de alertas en tiempo real</p>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-100 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span className="text-[10px] text-gray-600 font-medium">Origen de alerta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                <span className="text-[10px] text-gray-600 font-medium">Dispositivo conectado</span>
              </div>
            </div>

            <AlertNetworkScene />
          </motion.div>

          {/* Right: Steps */}
          <motion.div
            className="flex flex-col gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={item}
                className="relative flex items-start gap-5 group"
              >
                {/* Step icon */}
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${step.shadow} transition-transform duration-300 group-hover:scale-110`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${step.badge}`}>
                      Paso {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line between steps */}
                {step.number < 3 && (
                  <div className="absolute left-7 top-14 w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent" />
                )}
              </motion.div>
            ))}

            {/* Bottom accent */}
            <div className="mt-2 pl-19">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Ciclo completo en menos de 1 segundo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
