'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y Eslogan */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              <span className="text-blue-500">Alert</span>Sil
            </Link>
            <p className="text-sm leading-relaxed">
              Soluciones avanzadas de monitoreo IoT y gestión de alarmas para empresas modernas.
            </p>
          </div>

          {/* Enlaces de Producto */}
          <div>
            <h4 className="text-white font-bold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-blue-400 transition-colors">Características</Link></li>
              <li><Link href="https://app.alertsil.com/login" className="hover:text-blue-400 transition-colors">Panel de Control</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">API Docs</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Sobre nosotros</Link></li>
              <li><Link href="mailto:info@alertsil.com" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-white font-bold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="mailto:support@alertsil.com" className="hover:text-blue-400 transition-colors">Soporte Técnico</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Estado del Sistema</Link></li>
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