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
