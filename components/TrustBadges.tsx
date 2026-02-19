'use client';
import {
    LockClosedIcon,
    ShieldCheckIcon,
    ServerIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const badges = [
    {
        title: 'Cifrado E2E',
        description: 'Comunicación cifrada extremo a extremo',
        icon: LockClosedIcon,
    },
    {
        title: 'RGPD',
        description: 'Cumplimiento de la normativa europea de protección de datos',
        icon: ShieldCheckIcon,
    },
    {
        title: '99.9% Uptime',
        description: 'Disponibilidad garantizada para tu empresa',
        icon: ServerIcon,
    },
    {
        title: 'Soporte en español',
        description: 'Soporte técnico en tu idioma, cuando lo necesites',
        icon: ChatBubbleLeftRightIcon,
    },
];

export default function TrustBadges() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                    La seguridad de tus datos, garantizada
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge) => (
                        <div
                            key={badge.title}
                            className="text-center p-6 bg-white rounded-2xl border border-gray-100"
                        >
                            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <badge.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">
                                {badge.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {badge.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
