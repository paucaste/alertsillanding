'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge de confianza/seguridad */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Seguridad Laboral Inteligente
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Protección instantánea con <br />
            <span className="text-blue-600">un solo clic</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Nuestra tecnología permite disparar una alerta crítica a <strong>todos los equipos de tu compañía simultáneamente</strong>. En situaciones de riesgo, cada segundo cuenta para garantizar la seguridad de tus trabajadores.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="https://app.alertsil.com/register" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              Proteger mi empresa ahora
            </Link>
            <Link 
              href="#features" 
              className="bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all border border-gray-200"
            >
              Cómo funciona
            </Link>
          </div>

          {/* Estadísticas rápidas o propuesta de valor */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-100 pt-12 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-gray-900">0.5s</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Latencia de Alerta</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Equipos Conectados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Monitoreo Activo</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-24 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-24 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
}