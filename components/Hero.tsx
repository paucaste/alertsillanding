'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1628]">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a1628_80%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-sm font-semibold border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Protección instantánea para tu equipo
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Alertas de emergencia en todos los equipos de tu empresa,{' '}
            <span className="text-blue-300">al instante</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un empleado detecta un riesgo, pulsa el botón, y{' '}
            <strong className="text-white">todos los dispositivos reciben la alerta en menos de 1 segundo</strong>.
            Sin apps, sin formación, sin retrasos.
          </motion.p>

        </div>
      </div>
    </section>
  );
}
