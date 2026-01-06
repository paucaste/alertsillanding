import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlertSil | Protección con un solo clic',
  description:
    'AlertSil permite activar alarmas con un solo clic en situaciones de riesgo, garantizando una respuesta rápida y discreta en entornos profesionales.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}