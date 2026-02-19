# AlertSil Landing Page — Marketing Redesign

**Fecha:** 2026-02-19
**Objetivo:** Mejorar visibilidad/branding, comprension del producto y SEO
**Target:** Clinicas/centros medicos + PYMEs con oficinas
**Enfoque:** B — Landing completa de marketing

---

## Problemas identificados

1. **Comprension del producto:** Un visitante nuevo no entiende rapidamente que hace AlertSil ni para quien es
2. **SEO inexistente:** 1 pagina, sin Open Graph, sin sitemap, sin robots.txt, sin structured data
3. **Prueba social = 0:** Sin testimonios, logos ni cifras reales
4. **Estadisticas ocultas:** Stats del Hero comentadas
5. **CTAs dispersos:** Mensajes inconsistentes entre secciones
6. **Sin seccion de confianza:** Critico para un producto de seguridad

---

## Nuevo flujo de pagina

```
Header (CTAs unificados)
  -> Hero (copy reescrito + stats visibles)
  -> AlertDemo (sin los 3 pasos del final)
  -> HowItWorks (NUEVO)
  -> TargetAudience (NUEVO)
  -> Features (copy mejorado)
  -> TrustBadges (NUEVO)
  -> Pricing (sin cambios estructurales)
  -> CallToAction (CTA unificado)
  -> ContactForm (copy mejorado, typo corregida)
  -> Footer (enlaces adicionales)
```

---

## 1. SEO y Metadata

### layout.tsx
- `title`: "AlertSil | Sistema de alerta de seguridad laboral para empresas"
- `description`: "AlertSil es un sistema de alerta instantanea para clinicas y empresas. Activa una senal de emergencia en todos los dispositivos con un solo clic. Instalacion en 30 segundos."
- Open Graph completo: og:title, og:description, og:image (1200x630), og:url, og:type, og:locale
- Twitter Cards: summary_large_image
- Canonical URL

### Nuevos archivos
- `app/sitemap.ts` — sitemap dinamico Next.js
- `app/robots.ts` — robots.txt dinamico Next.js
- JSON-LD structured data (Organization + SoftwareApplication)

---

## 2. Hero reescrito

- **Badge:** "Seguridad laboral para clinicas y empresas"
- **H1:** "Cuando hay una emergencia en tu centro, cada segundo cuenta"
- **Subtitulo:** "AlertSil conecta a todo tu equipo en un clic. Un empleado detecta un riesgo, pulsa el boton, y todos los dispositivos de la empresa reciben la alerta al instante. Sin apps, sin formacion, sin retrasos."
- **CTA primario:** "Probar gratis" (registro)
- **CTA secundario:** "Ver como funciona" (scroll a demo)
- **Stats descomentadas:** "< 1 segundo" (propagacion), "0 formacion" (instalacion), "24/7" (proteccion)

---

## 3. HowItWorks.tsx (NUEVO)

Tres pasos horizontales con iconos y flechas:

1. **Detecta** — Un empleado identifica una situacion de riesgo
2. **Alerta** — Con un clic, AlertSil envia la senal a todos los dispositivos
3. **Responde** — Todo el equipo recibe la alerta y responde: "En camino" o "Recibido"

Subtitulo: "De la deteccion a la respuesta en menos de 1 segundo"

Se eliminan los 3 pasos actuales de AlertDemo para no duplicar.

---

## 4. TargetAudience.tsx (NUEVO)

Dos columnas con casos de uso:

### Clinicas y centros medicos
- Pacientes agresivos, emergencias medicas, personal aislado
- Caso: Una doctora sola con un paciente agresivo

### PYMEs y oficinas
- Empleados amenazados, robos, incidentes de seguridad
- Caso: Un empleado de recepcion detecta una intrusion

Titulo: "Para quien es AlertSil"
Subtitulo: "Proteccion adaptada a tu sector"

---

## 5. TrustBadges.tsx (NUEVO)

Cuatro badges en fila:

1. **Cifrado E2E** — Comunicacion cifrada extremo a extremo
2. **RGPD** — Cumplimiento normativa europea
3. **99.9% Uptime** — Disponibilidad garantizada
4. **Soporte en espanol** — Soporte tecnico en tu idioma

Titulo: "La seguridad de tus datos, garantizada"

---

## 6. Mejoras en componentes existentes

### CTAs unificados
- Header: "Empezar Gratis" -> "Probar gratis"
- Hero CTA primario: "Probar gratis"
- CallToAction: "Crear Cuenta Gratis" -> "Probar gratis"
- Pricing y ContactForm: mantener textos contextuales

### Features
- Titulo: "Comunicacion critica en cadena: de uno a todos" -> "Todo lo que necesitas para proteger a tu equipo"

### ContactForm
- Typo: "Empezemos" -> "Empecemos"
- Titulo: "Empecemos!" -> "Solicita una demo personalizada"
- Subtitulo: "Dejanos tus datos y te mostraremos como AlertSil puede proteger a tu equipo en menos de 5 minutos."

### Footer
- Anadir enlace a #contact ("Contacto")
- Anadir enlace a #pricing ("Precios")

---

## Archivos afectados

### Modificados
- `app/layout.tsx` — metadata, JSON-LD
- `app/page.tsx` — nuevo orden de componentes
- `components/Hero.tsx` — copy reescrito, stats descomentadas
- `components/AlertDemo.tsx` — eliminar 3 pasos finales
- `components/Features.tsx` — titulo mejorado
- `components/Header.tsx` — CTA unificado
- `components/CallToAction.tsx` — CTA unificado
- `components/ContactForm.tsx` — copy mejorado, typo
- `components/Footer.tsx` — enlaces adicionales

### Nuevos
- `components/HowItWorks.tsx`
- `components/TargetAudience.tsx`
- `components/TrustBadges.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
