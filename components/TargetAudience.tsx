'use client';
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
    },
    {
        title: 'PYMEs y oficinas',
        icon: BuildingOffice2Icon,
        description:
            'Empleados amenazados, intentos de robo o incidentes de seguridad. Conecta a todo el equipo en segundos para una respuesta coordinada.',
        scenario:
            'Un empleado de recepción detecta una intrusión. Con un clic, seguridad, dirección y todo el equipo están alertados.',
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
                        <div
                            key={audience.title}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <audience.icon className="h-8 w-8 text-blue-600" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {audience.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {audience.description}
                            </p>

                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">
                                    Caso real
                                </p>
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                    &ldquo;{audience.scenario}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
