'use client';

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

function BadgeCard({ badge }: { badge: (typeof badges)[number] }) {
  const Icon = badge.icon;
  return (
    <div className="flex items-center gap-4 bg-slate-800/60 border border-white/5 rounded-2xl px-6 py-4 shrink-0">
      <Icon className="h-8 w-8 text-blue-400 shrink-0 animate-glow" />
      <div className="whitespace-nowrap">
        <h3 className="text-base font-bold text-white leading-tight">{badge.title}</h3>
        <p className="text-sm text-gray-400 leading-tight">{badge.description}</p>
      </div>
    </div>
  );
}

export default function TrustBadges() {
  return (
    <section className="py-16 bg-slate-900 overflow-hidden relative">
      {/* Inline keyframe for the marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Left fade overlay */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, rgb(15 23 42), transparent)' }}
      />

      {/* Right fade overlay */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, rgb(15 23 42), transparent)' }}
      />

      {/* Marquee track */}
      <div
        className="flex gap-8 w-max"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {/* First copy */}
        {badges.map((badge) => (
          <BadgeCard key={badge.title} badge={badge} />
        ))}
        {/* Duplicate for seamless loop */}
        {badges.map((badge) => (
          <BadgeCard key={`dup-${badge.title}`} badge={badge} />
        ))}
      </div>
    </section>
  );
}
