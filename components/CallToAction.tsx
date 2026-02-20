'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 text-white overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          ¿Listo para proteger tu negocio?
        </h2>
        <p className="text-xl mb-10 text-blue-100">
          Únete a AlertSil hoy mismo y toma el control total de tus dispositivos con alertas inteligentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://alertsil-admin-panel.vercel.app/register"
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Probar gratis
          </Link>
          <Link
            href="mailto:info@effizy.es"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            Contactar Ventas
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
