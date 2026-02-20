'use client';
import { motion } from 'framer-motion';
import {
  LockClosedIcon,
  ShieldCheckIcon,
  ServerIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const badges = [
  { title: 'Cifrado E2E', description: 'Comunicación cifrada extremo a extremo', icon: LockClosedIcon },
  { title: 'RGPD', description: 'Normativa europea de protección de datos', icon: ShieldCheckIcon },
  { title: '99.9% Uptime', description: 'Disponibilidad garantizada', icon: ServerIcon },
  { title: 'Soporte en español', description: 'Ayuda en tu idioma', icon: ChatBubbleLeftRightIcon },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className={`text-center ${
                i < badges.length - 1 ? 'md:border-r md:border-white/10' : ''
              }`}
            >
              <badge.icon className="h-8 w-8 text-blue-400 mx-auto mb-3 animate-glow" />
              <h3 className="text-lg font-bold text-white mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
