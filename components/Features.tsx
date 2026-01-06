'use client';
import {
    BoltIcon,
    UsersIcon,
    ShieldCheckIcon,
    MegaphoneIcon // Cambiado para enfatizar la difusión de la alerta
} from '@heroicons/react/24/outline';
import {
    ShieldExclamationIcon,
    SignalIcon,
    LockClosedIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Alerta Global Instantánea',
        description: 'Con un solo clic, activa una señal de emergencia en todos los dispositivos de la empresa sin retrasos.',
        icon: ShieldExclamationIcon,
    },
    {
        name: 'Seguridad del Trabajador',
        description: 'Diseñado específicamente para entornos industriales donde la rapidez de respuesta es clave.',
        icon: UserGroupIcon,
    },
    {
        name: 'Alarmas Silenciosas',
        description: 'Notifica discretamente a los equipos de seguridad o brigadas de emergencia sin alertar a posibles intrusos o causar pánico innecesario.',
        icon: MegaphoneIcon,
    },
    {
        name: 'Conectividad Crítica',
        description: 'Monitoreo constante del estado de los equipos para asegurar que siempre estén listos para recibir la señal.',
        icon: SignalIcon,
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Comunicación crítica en cadena: de uno a todos
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Nuestro software centraliza la seguridad en un solo panel. Al activar la alerta, el sistema
                        <strong> replica la señal instantáneamente a cada equipo conectado</strong> de la compañía,
                        eliminando los tiempos de aviso manual y garantizando que toda la organización reaccione al unísono.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}