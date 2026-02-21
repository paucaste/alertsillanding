'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Starter',
    price: 8.99,
    limit: 10,
    description: 'Protección esencial. Solo 0,90€ por equipo.',
    savings: null,
    features: ['Hasta 10 equipos conectados', 'Alerta Global Instantánea', 'Instalación en 30 segundos', 'Cero mantenimiento', 'Soporte vía email'],
    cta: 'Empezar ahora',
    mostPopular: false,
  },
  {
    name: 'Business',
    price: 19.99,
    limit: 50,
    description: 'Eficiencia para PYMES. Baja a 0,40€ por equipo.',
    savings: 'Ahorras un 55%',
    features: ['Hasta 50 equipos conectados', 'Alarmas Silenciosas', 'Historial de alertas', 'Ligereza total del sistema', 'Soporte prioritario'],
    cta: 'Proteger mi empresa',
    mostPopular: true,
  },
  {
    name: 'Industrial',
    price: 49.99,
    limit: 150,
    description: 'Máximo ahorro corporativo. Solo 0,33€ por equipo.',
    savings: 'Ahorras un 63%',
    features: ['Hasta 150 equipos conectados', 'Panel de control avanzado', 'Conectividad Crítica 24/7', 'Multidispositivo ilimitado', 'Soporte telefónico'],
    cta: 'Contactar ventas',
    mostPopular: false,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      setRotation({ x: rotateX, y: rotateY });
    },
    [maxTilt],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovering
            ? 'transform 0.15s ease-out'
            : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PricingCardContent({ tier, popular }: { tier: typeof tiers[number]; popular: boolean }) {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{tier.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-extrabold text-gray-900">
            {tier.price.toString().replace('.', ',')}€
          </span>
          <span className="ml-1 text-xl font-medium text-gray-500">/mes</span>
        </div>
        <p className="mt-4 text-gray-600 text-sm font-medium leading-relaxed italic">
          {tier.description}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
            <CheckIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-4 rounded-full font-bold transition-all transform active:scale-95 ${
          popular
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-200'
            : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
        }`}
      >
        {tier.cta}
      </button>
    </>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl tracking-tight">
            Planes adaptados a tu equipo
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Seguridad laboral inteligente. Cuantos más equipos protejas, menos pagas por cada uno.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={item}>
              {tier.mostPopular ? (
                <TiltCard
                  maxTilt={10}
                  className="relative h-full"
                >
                  {/* Animated gradient border */}
                  <div className="absolute -inset-[2px] rounded-3xl animated-border opacity-70" />
                  <div className="relative flex flex-col h-full p-8 rounded-3xl bg-white shadow-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] z-10">
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Recomendado
                    </span>
                    {tier.savings && (
                      <span className="mb-4 inline-block w-fit bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg uppercase">
                        {tier.savings}
                      </span>
                    )}
                    <PricingCardContent tier={tier} popular />
                  </div>
                </TiltCard>
              ) : (
                <TiltCard
                  maxTilt={8}
                  className="flex flex-col h-full p-8 rounded-3xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  {tier.savings && (
                    <span className="mb-4 inline-block w-fit bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg uppercase">
                      {tier.savings}
                    </span>
                  )}
                  <PricingCardContent tier={tier} popular={false} />
                </TiltCard>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-gray-900 font-semibold">
            ¿Más de 150 equipos?{' '}
            <span className="text-blue-600 underline cursor-pointer decoration-2 underline-offset-4">
              Hablemos de un plan a medida
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
