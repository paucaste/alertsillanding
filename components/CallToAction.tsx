'use client';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          ¿Listo para optimizar tu monitoreo?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Únete a AlertSil hoy mismo y toma el control total de tus dispositivos con alertas inteligentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="https://app.alertsil.com/register" 
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Crear Cuenta Gratis
          </Link>
          <Link 
            href="mailto:info@alertsil.com" 
            className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            Contactar Ventas
          </Link>
        </div>
      </div>
    </section>
  );
}