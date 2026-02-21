'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function CallToAction() {
  return (
    <section className="relative bg-[#0a1628] py-24 text-white overflow-hidden">
      {/* Particle animation background */}
      <ParticleBackground />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a1628_80%)]" />

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          ¿Listo para proteger tu negocio?
        </h2>
        <p className="text-xl mb-10 text-gray-300">
          Únete a AlertSil hoy mismo y toma el control total de tus dispositivos con alertas inteligentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://alertsil-admin-panel.vercel.app/register"
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-xl"
          >
            Probar gratis
          </Link>
          <Link
            href="mailto:info@effizy.es"
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
          >
            Contactar Ventas
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
