'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
            <span className="text-blue-500">Alert</span>Sil
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
              Características
            </Link>
            <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
              Precios
            </Link>
            <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contacto
            </Link>
            <Link href="https://alertsil-admin-panel.vercel.app" className="text-gray-400 hover:text-white transition-colors">
              Panel de Control
            </Link>
            <Link href="mailto:info@effizy.es" className="text-gray-400 hover:text-white transition-colors">
              info@effizy.es
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AlertSil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
