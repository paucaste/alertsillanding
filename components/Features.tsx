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
