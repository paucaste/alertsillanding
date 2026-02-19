'use client';
import {
    ExclamationTriangleIcon,
    BellAlertIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const steps = [
    {
        number: 1,
        title: 'Detecta',
        description:
            'Un empleado identifica una situación de riesgo en su puesto de trabajo.',
        icon: ExclamationTriangleIcon,
    },
    {
        number: 2,
        title: 'Alerta',
        description:
            'Con un solo clic, AlertSil envía la señal a todos los dispositivos de la empresa.',
        icon: BellAlertIcon,
    },
    {
        number: 3,
        title: 'Responde',
        description:
            'Todo el equipo recibe la alerta y responde al instante: "En camino" o "Recibido".',
        icon: CheckBadgeIcon,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Cómo funciona AlertSil
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        De la detección a la respuesta en menos de 1 segundo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative text-center">
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 -right-4 w-8 text-gray-300">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            )}

                            <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                                <step.icon className="h-10 w-10 text-white" />
                            </div>

                            <div className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                                Paso {step.number}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
