'use client';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Starter',
    price: '8,99€',
    description: 'Protección básica para autónomos, oficinas pequeñas y talleres.',
    features: [
      'Hasta 10 equipos conectados',
      'Alerta Global Instantánea',
      'Instalación en 30 segundos',
      'Cero mantenimiento',
      'Soporte vía email'
    ],
    cta: 'Empezar ahora',
    mostPopular: false,
  },
  {
    name: 'Business',
    price: '19,99€',
    description: 'La opción ideal para PYMES, almacenes y centros logísticos.',
    features: [
      'Hasta 50 equipos conectados',
      'Alarmas Silenciosas',
      'Historial de alertas (Logs)',
      'Ligereza total del sistema',
      'Soporte prioritario'
    ],
    cta: 'Proteger mi empresa',
    mostPopular: true,
  },
  {
    name: 'Industrial',
    price: '49,99€',
    description: 'Máxima capacidad para plantas de producción e infraestructuras.',
    features: [
      'Hasta 150 equipos conectados',
      'Panel de control avanzado',
      'Conectividad Crítica 24/7',
      'Multidispositivo ilimitado',
      'Soporte telefónico'
    ],
    cta: 'Contactar ventas',
    mostPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl tracking-tight">
            Planes adaptados a tu equipo
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Seguridad laboral inteligente sin complicaciones técnicas. 
            Elige el plan que mejor se adapte al tamaño de tu compañía.
          </p>
        </div>

        {/* Contenedor de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`flex flex-col relative p-8 rounded-3xl transition-all duration-300 ${
                tier.mostPopular 
                ? 'border-2 border-blue-600 shadow-2xl scale-105 z-10 bg-white' 
                : 'border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-xl'
              }`}
            >
              {tier.mostPopular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Recomendado
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/mes</span>
                </div>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Lista de Features */}
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botón de Acción */}
              <button 
                className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                  tier.mostPopular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Pie de precios */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-500 text-sm italic">
            * Precios netos sin IVA. Facturación mensual simplificada.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-xs font-medium uppercase tracking-widest">
            <span>Sin permanencia</span>
            <span>•</span>
            <span>Activación inmediata</span>
            <span>•</span>
            <span>Soporte en España</span>
          </div>
          <p className="mt-8 text-gray-900 font-semibold">
            ¿Más de 150 equipos? <span className="text-blue-600 underline cursor-pointer decoration-2 underline-offset-4">Hablemos de un plan a medida</span>
          </p>
        </div>
      </div>
    </section>
  );
}