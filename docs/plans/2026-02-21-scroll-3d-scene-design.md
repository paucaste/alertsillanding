# Scroll-Driven 3D "Cómo funciona" Design

## Overview
Replace HowItWorks section with a full-screen sticky scroll-driven 3D experience showing the AlertSil alert flow in 3 phases.

## Structure
- Container div: `height: 300vh` (3 pages of scroll)
- Sticky inner div: `height: 100vh` with R3F Canvas
- Custom scroll progress hook using `getBoundingClientRect` (NOT drei's ScrollControls)

## 3 Phases (scroll 0→1)

### Phase 1: Detecta (0-33%)
- 3D: A device (RoundedBox) appears center. Red button pulses on it.
- Text: "Un empleado detecta un riesgo"

### Phase 2: Alerta (33-66%)
- 3D: Button "presses", concentric ring waves expand from device. Device pulls back.
- Text: "Pulsa el botón. La señal se envía."

### Phase 3: Responde (66-100%)
- 3D: Multiple devices appear in network. Waves reach each one, they light up sequentially.
- Text: "Todos los equipos reciben la alerta al instante."

## Technical
- Basic Three.js geometries only (RoundedBox, Ring, Sphere, Line)
- Dark bg #0a1628 matching Hero/CTA
- dpr: [1, 1.5], lazy-loaded with next/dynamic
- HTML text overlaid with position absolute, opacity driven by scroll range
- Camera moves from close (phase 1) to far (phase 3)
