# AlertDemo Floor Plan Redesign

**Fecha:** 2026-02-19
**Objetivo:** Rediseñar AlertDemo como un plano de arquitecto de hospital minimalista con líneas de conexión animadas

---

## Estilo visual

- **Plano limpio/minimalista:** Fondo gris muy claro (#f8f9fa), paredes grises gruesas (#374151), texto gris oscuro
- **Contenedor:** Borde sutil, titulo "Planta 0 — Centro Médico", esquinas redondeadas
- **Habitaciones:** Divs con bordes gruesos simulando paredes, fondo blanco
- **Pasillo:** Franja horizontal central con texto "PASILLO" en gris claro
- **Puertas:** Gaps en los bordes para simular puertas abiertas
- **SVG overlay:** Capa absoluta para las líneas de conexión animadas

## Layout

```
+----------------------------------------------------------+
|  PLANTA 0 — CENTRO MÉDICO                    [leyenda]   |
|                                                           |
|  +-----------+-----------+-----------+                    |
|  | Consulta1 | Consulta2 | Consulta3 |                    |
|  | Dra.López | Dr.Ruiz   | Dra.Navarro                   |
|  |  [ALERTA] |    [EC]   |    [R]    |                    |
|  +-----+-----+-----+-----+-----+-----+                   |
|        |           |           |                          |
|  ======|===========|===========|========  PASILLO         |
|        |           |           |                          |
|  +-----+-----+-----+-----+-----+-----+                   |
|  | Recepción | Consulta4 | Seguridad |                    |
|  | L.Díaz    | Dr.Méndez | J.Martínez                    |
|  |    [R]    |    [EC]   |    [EC]   |                    |
|  +-----------+-----------+-----------+                    |
+----------------------------------------------------------+
```

## Animación — Líneas SVG con Framer Motion

**Técnica:** SVG `<path>` con `pathLength` + `stroke-dashoffset` animados (efecto "dibujo de línea")

**Secuencia (loop ~11s):**

| Tiempo | Evento |
|--------|--------|
| 0.0s | Plano estático, habitaciones neutras (fondo blanco) |
| 0.8s | Consulta 1 parpadea rojo (alerta activada) |
| 1.2s | Línea roja/azul sale de Consulta 1 hacia abajo al pasillo |
| 1.8s | Línea se bifurca en el pasillo hacia izquierda y derecha |
| 2.0-3.5s | Líneas suben/bajan hacia cada habitación (escalonado) |
| 2.0-3.5s | Cada habitación se ilumina azul claro al recibir la línea |
| 4.5-6.5s | Badges "En camino" (verde) o "Recibido" (gris) aparecen dentro de cada habitación |
| 6.5s | Consulta 1 muestra "3 en camino" |
| 8.5s | Pausa — todo visible |
| 11s | Reset, loop |

## Datos de habitaciones (sin cambios)

```
Top:    Consulta 1 (origen, Dra. María López), Consulta 2 (en_camino, Dr. Andrés Ruiz), Consulta 3 (recibido, Dra. Elena Navarro)
Bottom: Recepción (recibido, Laura Díaz), Consulta 4 (en_camino, Dr. Carlos Méndez), Seguridad (en_camino, José Martínez)
```

## Badges de respuesta

- **En camino:** Badge verde con texto "En camino" dentro de la habitación
- **Recibido:** Badge gris con texto "Recibido" dentro de la habitación
- **Origen (Consulta 1):** Badge azul -> luego verde con "3 en camino"

## Leyenda

Esquina superior derecha del plano:
- Círculo rojo = Alerta activa
- Círculo azul = Alerta recibida
- Círculo verde = En camino

## Responsive

- **Desktop (md+):** Plano a ancho completo (max-w-4xl), texto normal
- **Mobile:** Plano compacto, texto xs/sm, misma estructura

## Tecnología

- Framer Motion (ya instalado) para todas las animaciones
- SVG paths para líneas de conexión
- CSS/Tailwind para el layout del plano
- useState + useEffect para el loop (mismo patrón que el actual)

## Archivo

- Reemplazar: `components/AlertDemo.tsx` (rewrite completo)
