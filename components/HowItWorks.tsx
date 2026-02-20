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
