import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const appcastPath = path.join(process.cwd(), 'public', 'alertsil', 'appcast.xml');
    const appcastContent = await fs.readFile(appcastPath, 'utf-8');

    // Extraer la primera URL de enclosure (la versión más reciente)
    const urlMatch = appcastContent.match(/url="([^"]+)"/);

    if (urlMatch && urlMatch[1]) {
      const downloadUrl = urlMatch[1];
      // Convertir URL absoluta a relativa para redirección local
      const relativePath = downloadUrl.replace('https://alertsil.com', '');
      return NextResponse.redirect(new URL(relativePath, process.env.NEXT_PUBLIC_BASE_URL || 'https://alertsil.com'), 302);
    }

    return NextResponse.json({ error: 'No se encontró la URL de descarga' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer el appcast' }, { status: 500 });
  }
}
