import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlertSil | Sistema de alerta de seguridad laboral para empresas',
  description:
    'AlertSil es un sistema de alerta instantanea para clinicas y empresas. Activa una senal de emergencia en todos los dispositivos con un solo clic. Instalacion en 30 segundos.',
  keywords: ['alerta seguridad laboral', 'sistema alerta empresas', 'alerta emergencia clinicas', 'seguridad laboral', 'AlertSil'],
  openGraph: {
    title: 'AlertSil | Sistema de alerta de seguridad laboral para empresas',
    description:
      'Activa una senal de emergencia en todos los dispositivos de tu empresa con un solo clic. Proteccion instantanea para clinicas y PYMEs.',
    url: 'https://alertsil.com',
    siteName: 'AlertSil',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlertSil | Alerta de seguridad laboral con un clic',
    description:
      'Proteccion instantanea para clinicas y empresas. Activa una alerta en todos los dispositivos en menos de 1 segundo.',
  },
  robots: {
    index: true,
    follow: true,
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'AlertSil',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Windows',
              description:
                'Sistema de alerta instantanea para clinicas y empresas. Activa una senal de emergencia en todos los dispositivos con un solo clic.',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '8.99',
                highPrice: '49.99',
                priceCurrency: 'EUR',
              },
              publisher: {
                '@type': 'Organization',
                name: 'AlertSil',
                url: 'https://alertsil.com',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}