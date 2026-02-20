'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
            <Image src="/logo.png" alt="AlertSil Logo" width={32} height={32} />
            <span>
              <span className={scrolled ? 'text-blue-600' : 'text-blue-400'}>Alert</span>
              <span className={scrolled ? 'text-gray-900' : 'text-white'}>Sil</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/paucaste/alertsillanding/releases/download/1.0.2/AlertSil-1.0.2-setup.exe"
            download="AlertSil-1.0.2-setup.exe"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
            }`}
          >
            Descargar Gratis
          </a>
          <Link
            href="https://alertsil-admin-panel.vercel.app/"
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
            }`}
          >
            Entrar
          </Link>
          <Link
            href="https://alertsil-admin-panel.vercel.app/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25"
          >
            Probar gratis
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
          }`}
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

      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100">
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
            <Link href="https://alertsil-admin-panel.vercel.app/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 text-center">
              Probar gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
