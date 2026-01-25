'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image src="/logo.png" alt="AlertSil Logo" width={32} height={32} />
            <span><span className="text-blue-600">Alert</span><span className="text-gray-900">Sil</span></span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/paucaste/alertsillanding/releases/download/1.0.2/AlertSil-1.0.2-setup.exe"
            download="AlertSil-1.0.2-setup.exe"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Descargar Gratis
          </a>
          <Link href="https://alertsil-admin-panel.vercel.app/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Entrar
          </Link>
          <Link href="https://alertsil-admin-panel.vercel.app/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            Empezar Gratis
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 flex flex-col gap-4">
            <a
              href="https://github.com/paucaste/alertsillanding/releases/download/1.0.2/AlertSil-1.0.2-setup.exe"
              download="AlertSil-1.0.2-setup.exe"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Descargar Gratis
            </a>
            <Link href="https://alertsil-admin-panel.vercel.app/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Entrar
            </Link>
            <Link href="https://alertsil-admin-panel.vercel.app/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-center">
              Empezar Gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
