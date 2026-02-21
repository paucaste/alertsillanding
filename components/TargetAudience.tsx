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
    description:
      'Pacientes agresivos, emergencias médicas o situaciones de riesgo con personal aislado. AlertSil permite que cualquier profesional pida ayuda sin salir de la consulta.',
    scenario:
      'Una doctora está sola con un paciente agresivo. Pulsa el botón discretamente y todo el centro lo sabe al instante.',
    direction: -1,
  },
  {
    title: 'PYMEs y oficinas',
    icon: BuildingOffice2Icon,
    description:
      'Empleados amenazados, intentos de robo o incidentes de seguridad. Conecta a todo el equipo en segundos para una respuesta coordinada.',
    scenario:
      'Un empleado de recepción detecta una intrusión. Con un clic, seguridad, dirección y todo el equipo están alertados.',
    direction: 1,
  },
];

function IconArea({ icon: Icon }: { icon: typeof HeartIcon }) {
  return (
    <div className="flex items-center justify-center py-12 md:py-0">
      <div className="relative flex items-center justify-center">
        {/* Large gradient circle behind the icon */}
        <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 absolute" />
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 absolute" />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-300/40">
          <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
        </div>
      </div>
    </div>
  );
}

function TextContent({
  title,
  description,
  scenario,
}: {
  title: string;
  description: string;
  scenario: string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {description}
      </p>
      <div className="border-l-4 border-blue-500 bg-blue-50/60 rounded-r-xl px-5 py-4">
        <p className="text-gray-700 italic leading-relaxed">
          &ldquo;{scenario}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function TargetAudience() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Para quién es AlertSil
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Protección adaptada a tu sector
          </p>
        </div>

        {/* First audience: icon LEFT, text RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-16"
        >
          <IconArea icon={audiences[0].icon} />
          <TextContent
            title={audiences[0].title}
            description={audiences[0].description}
            scenario={audiences[0].scenario}
          />
        </motion.div>

        {/* Subtle divider */}
        <div className="border-t border-gray-100 mx-8 md:mx-16" />

        {/* Second audience: text LEFT, icon RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-16"
        >
          {/* On mobile: icon on top (order-first), on md+: text on left */}
          <div className="order-2 md:order-1">
            <TextContent
              title={audiences[1].title}
              description={audiences[1].description}
              scenario={audiences[1].scenario}
            />
          </div>
          <div className="order-1 md:order-2">
            <IconArea icon={audiences[1].icon} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
