'use client';
import {
    ShieldExclamationIcon,
    SignalIcon,
    UserGroupIcon,
    SpeakerXMarkIcon, // Mejor para alarmas silenciosas
    ClockIcon,
    CloudArrowDownIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Alerta Global Instantánea',
        description: 'Con un solo clic, activa una señal de emergencia en todos los dispositivos de la empresa sin retrasos.',
        icon: ShieldExclamationIcon,
    },
    {
        name: 'Alarmas Silenciosas',
        description: 'Notifica discretamente a seguridad sin alertar a intrusos ni causar pánico innecesario.',
        icon: SpeakerXMarkIcon,
    },
    {
        name: 'Instalación en 30s',
        description: 'Sin manuales complejos ni formación. Descargar, instalar y empezar a proteger.',
        icon: CloudArrowDownIcon,
    },
    {
        name: 'Cero Mantenimiento',
        description: 'Se ejecuta silenciosamente en segundo plano. Ni lo verás, hasta que lo necesites.',
        icon: ClockIcon,
    },
    {
        name: 'Ligereza Total',
        description: 'Optimizado para no consumir recursos. Tu equipo seguirá volando mientras está protegido.',
        icon: CpuChipIcon,
    },
    {
        name: 'Conectividad Crítica',
        description: 'Monitoreo constante del estado de los equipos para asegurar una red siempre lista.',
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
                        <strong> replica la señal instantáneamente a cada equipo</strong>, eliminando tiempos de aviso manual.
                    </p>
                </div>

                {/* Grid actualizado a 3 columnas en desktop para que se vea más ordenado con 6 elementos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div 
                            key={feature.name} 
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-start"
                        >
                            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}