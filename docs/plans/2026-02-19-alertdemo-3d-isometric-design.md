# AlertDemo 3D Isometric Redesign

**Fecha:** 2026-02-19
**Objetivo:** Rediseñar AlertDemo como escena 3D isométrica del hospital usando React Three Fiber

---

## Dependencias nuevas

- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — Helpers (OrthographicCamera, Html, ContactShadows, Line)
- `three` — Peer dependency

## Escena 3D

Vista isométrica fija (OrthographicCamera) desde arriba-izquierda, sin controles de órbita.

### Elementos

1. **Suelo:** planeGeometry con meshStandardMaterial gris muy claro
2. **Habitaciones (6):** boxGeometry con paredes semitransparentes (opacity 0.15, blanco). Altura baja (~0.8 unidades). Labels via Html de Drei
3. **Pasillo:** Franja de suelo ligeramente más oscura entre las dos filas
4. **Partículas de alerta:** Esferas luminosas (meshBasicMaterial con emissive) que viajan por paths predefinidos usando useFrame
5. **Iluminación de habitaciones:** Cambio de color al recibir alerta (blanco → azul → verde)
6. **Labels HTML:** Html de Drei superpuesto para texto legible (nombre sala, persona, badges)

### Layout

```
Top row:    Consulta 1 (source), Consulta 2, Consulta 3
Bottom row: Recepción, Consulta 4, Seguridad
Hallway:    Between rows
```

Posiciones en 3D (coordenadas X, Z):
- Top row: (-3, -2), (0, -2), (3, -2)
- Bottom row: (-3, 2), (0, 2), (3, 2)
- Hallway: franja en Z=0

### Cámara y luces

- OrthographicCamera: position [10, 10, 10], zoom ~120, lookAt [0, 0, 0]
- ambientLight: intensity 0.6
- directionalLight: position [5, 8, 5], intensity 0.8
- ContactShadows: debajo de las habitaciones

### Animación (useFrame, loop 11s)

| Tiempo | Evento |
|--------|--------|
| 0-0.8s | Escena estática |
| 0.8s | Consulta 1 emite glow rojo pulsante |
| 1.2-3.5s | Esferas de luz azul viajan: Consulta 1 → pasillo → cada habitación |
| 2.0-3.5s | Cada habitación se ilumina azul |
| 4.5-6.5s | Labels de respuesta aparecen (Html) |
| 6.5s | Consulta 1 muestra "3 en camino" |
| 8.5-11s | Pausa |
| 11s | Reset |

### Datos (sin cambios)

```
Top:    Consulta 1 (source, Dra. María López)
        Consulta 2 (en_camino, Dr. Andrés Ruiz)
        Consulta 3 (recibido, Dra. Elena Navarro)
Bottom: Recepción (recibido, Laura Díaz)
        Consulta 4 (en_camino, Dr. Carlos Méndez)
        Seguridad (en_camino, José Martínez)
```

### Responsive

- Desktop: Canvas max-w-5xl, h-[500px]
- Mobile: Canvas h-[350px], zoom ajustado

### Fallback

Si WebGL no disponible, mostrar plano 2D con mensaje sutil.

## Archivo

- Reemplazar: `components/AlertDemo.tsx` (rewrite completo)
