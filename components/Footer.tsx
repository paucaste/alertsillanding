'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="border-t border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-extrabold text-white mb-4 block tracking-tight">
              <span className="text-blue-500">Alert</span>Sil
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Seguridad laboral instantánea para empresas. Protegemos a tu equipo mediante un sistema de alerta crítica con replicación total en un solo clic.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Producto</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Características</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Precios</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="https://alertsil-admin-panel.vercel.app" className="text-gray-400 hover:text-white transition-colors">Panel de Control</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Soporte</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="mailto:info@effizy.es" className="text-gray-400 hover:text-white transition-colors">info@effizy.es</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AlertSil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
