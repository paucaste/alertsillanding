'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Alert</span><span className="text-gray-900">Sil</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="/alertsil/releases/AlertSil-1.0.2-setup.exe" download className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Descargar Gratis
          </a>
          <Link href="https://alertsil-admin-panel.vercel.app/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Entrar
          </Link>
          <Link href="https://alertsil-admin-panel.vercel.app/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            Empezar Gratis
          </Link>
        </div>
      </nav>
    </header>
  );
}