# Marketing Landing Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the AlertSil landing page into a marketing-optimized site with better product comprehension, SEO, and trust signals.

**Architecture:** Single-page Next.js 16 App Router site. Add 3 new client components (HowItWorks, TargetAudience, TrustBadges), 2 new Next.js convention files (sitemap.ts, robots.ts), and modify 8 existing files for copy/SEO improvements. No new dependencies needed — uses existing Heroicons and Tailwind.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript, Heroicons

**Design doc:** `docs/plans/2026-02-19-marketing-landing-redesign-design.md`

---

### Task 1: SEO Metadata in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update metadata object**

Replace the existing metadata in `app/layout.tsx` with:

```typescript
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
```

**Step 2: Add JSON-LD structured data to the body**

Add a `<script>` tag with JSON-LD inside the `<body>`, before `{children}`:

```tsx
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
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add comprehensive SEO metadata and JSON-LD structured data"
```

---

### Task 2: sitemap.ts and robots.ts

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Step 1: Create sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alertsil.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

**Step 2: Create robots.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://alertsil.com/sitemap.xml',
  }
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds, sitemap.xml and robots.txt routes generated

**Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt for SEO"
```

---

### Task 3: Rewrite Hero copy and uncomment stats

**Files:**
- Modify: `components/Hero.tsx`

**Step 1: Update badge text**

Change the badge text from:
```
Seguridad Laboral Inteligente
```
To:
```
Seguridad laboral para clinicas y empresas
```

**Step 2: Update H1**

Change from:
```tsx
<h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
    Proteccion instantanea con <br />
    <span className="text-blue-600">un solo clic</span>
</h1>
```
To:
```tsx
<h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
    Cuando hay una emergencia, <br />
    <span className="text-blue-600">cada segundo cuenta</span>
</h1>
```

**Step 3: Update subtitle paragraph**

Change from the current paragraph to:
```tsx
<p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
    AlertSil conecta a todo tu equipo en un clic. Un empleado detecta un riesgo, pulsa el boton, y <strong>todos los dispositivos de la empresa reciben la alerta al instante</strong>. Sin apps, sin formacion, sin retrasos.
</p>
```

**Step 4: Update CTAs**

Change the primary CTA text from "Proteger mi empresa ahora" to "Probar gratis".
Change the secondary CTA text from "Como funciona" to "Ver como funciona" and href from `#features` to `#demo`.

**Step 5: Uncomment and update statistics block**

Uncomment the stats block (lines 57-70) and update the values:
```tsx
<div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-100 pt-12 max-w-4xl mx-auto">
    <div>
        <p className="text-3xl font-bold text-gray-900">&lt; 1s</p>
        <p className="text-sm text-gray-500 uppercase tracking-wider">Tiempo de propagacion</p>
    </div>
    <div>
        <p className="text-3xl font-bold text-gray-900">0 formacion</p>
        <p className="text-sm text-gray-500 uppercase tracking-wider">Instalacion inmediata</p>
    </div>
    <div>
        <p className="text-3xl font-bold text-gray-900">24/7</p>
        <p className="text-sm text-gray-500 uppercase tracking-wider">Proteccion activa</p>
    </div>
</div>
```

**Step 6: Verify dev server renders correctly**

Run: `npm run dev`
Check: Visit localhost:3000, verify Hero displays new copy and stats

**Step 7: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite Hero copy for clarity and uncomment stats"
```

---

### Task 4: Remove 3-step explanation from AlertDemo

**Files:**
- Modify: `components/AlertDemo.tsx`

**Step 1: Add id="demo" to the section tag**

Change the opening `<section>` tag to include the id for scroll linking from Hero:
```tsx
<section id="demo" className="pt-32 pb-20 bg-white">
```

**Step 2: Remove the "Explicacion paso a paso" block**

Delete the entire block from line 339 to line 354 (the `<div className="mt-14 grid...">` containing the 3 numbered steps). This content will be replaced by the new HowItWorks component.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add components/AlertDemo.tsx
git commit -m "refactor: remove 3-step explanation from AlertDemo (moved to HowItWorks)"
```

---

### Task 5: Create HowItWorks component

**Files:**
- Create: `components/HowItWorks.tsx`

**Step 1: Create the component**

```tsx
'use client';
import {
    ExclamationTriangleIcon,
    BellAlertIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const steps = [
    {
        number: 1,
        title: 'Detecta',
        description:
            'Un empleado identifica una situacion de riesgo en su puesto de trabajo.',
        icon: ExclamationTriangleIcon,
    },
    {
        number: 2,
        title: 'Alerta',
        description:
            'Con un solo clic, AlertSil envia la senal a todos los dispositivos de la empresa.',
        icon: BellAlertIcon,
    },
    {
        number: 3,
        title: 'Responde',
        description:
            'Todo el equipo recibe la alerta y responde al instante: "En camino" o "Recibido".',
        icon: CheckBadgeIcon,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Como funciona AlertSil
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        De la deteccion a la respuesta en menos de 1 segundo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative text-center">
                            {/* Connector arrow (hidden on mobile and after last item) */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 -right-4 w-8 text-gray-300">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            )}

                            <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                                <step.icon className="h-10 w-10 text-white" />
                            </div>

                            <div className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                                Paso {step.number}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component not yet wired into page.tsx)

**Step 3: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: add HowItWorks component with 3-step visual flow"
```

---

### Task 6: Create TargetAudience component

**Files:**
- Create: `components/TargetAudience.tsx`

**Step 1: Create the component**

```tsx
'use client';
import {
    BuildingOffice2Icon,
    HeartIcon,
} from '@heroicons/react/24/outline';

const audiences = [
    {
        title: 'Clinicas y centros medicos',
        icon: HeartIcon,
        description:
            'Pacientes agresivos, emergencias medicas o situaciones de riesgo con personal aislado. AlertSil permite que cualquier profesional pida ayuda sin salir de la consulta.',
        scenario:
            'Una doctora esta sola con un paciente agresivo. Pulsa el boton discretamente y todo el centro lo sabe al instante.',
        color: 'blue',
    },
    {
        title: 'PYMEs y oficinas',
        icon: BuildingOffice2Icon,
        description:
            'Empleados amenazados, intentos de robo o incidentes de seguridad. Conecta a todo el equipo en segundos para una respuesta coordinada.',
        scenario:
            'Un empleado de recepcion detecta una intrusion. Con un clic, seguridad, direccion y todo el equipo estan alertados.',
        color: 'indigo',
    },
];

export default function TargetAudience() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Para quien es AlertSil
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Proteccion adaptada a tu sector
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {audiences.map((audience) => (
                        <div
                            key={audience.title}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <audience.icon className="h-8 w-8 text-blue-600" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {audience.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {audience.description}
                            </p>

                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">
                                    Caso real
                                </p>
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                    &ldquo;{audience.scenario}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/TargetAudience.tsx
git commit -m "feat: add TargetAudience component for clinics and SMBs"
```

---

### Task 7: Create TrustBadges component

**Files:**
- Create: `components/TrustBadges.tsx`

**Step 1: Create the component**

```tsx
'use client';
import {
    LockClosedIcon,
    ShieldCheckIcon,
    ServerIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const badges = [
    {
        title: 'Cifrado E2E',
        description: 'Comunicacion cifrada extremo a extremo',
        icon: LockClosedIcon,
    },
    {
        title: 'RGPD',
        description: 'Cumplimiento de la normativa europea de proteccion de datos',
        icon: ShieldCheckIcon,
    },
    {
        title: '99.9% Uptime',
        description: 'Disponibilidad garantizada para tu empresa',
        icon: ServerIcon,
    },
    {
        title: 'Soporte en espanol',
        description: 'Soporte tecnico en tu idioma, cuando lo necesites',
        icon: ChatBubbleLeftRightIcon,
    },
];

export default function TrustBadges() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                    La seguridad de tus datos, garantizada
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge) => (
                        <div
                            key={badge.title}
                            className="text-center p-6 bg-white rounded-2xl border border-gray-100"
                        >
                            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <badge.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">
                                {badge.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {badge.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/TrustBadges.tsx
git commit -m "feat: add TrustBadges component with security/compliance badges"
```

---

### Task 8: Update Features copy

**Files:**
- Modify: `components/Features.tsx`

**Step 1: Update title**

Change the `<h2>` text from:
```
Comunicacion critica en cadena: de uno a todos
```
To:
```
Todo lo que necesitas para proteger a tu equipo
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Features.tsx
git commit -m "feat: update Features section title for clarity"
```

---

### Task 9: Unify Header CTAs

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Update CTA text**

In both the desktop menu (line 33) and mobile menu (line 68), change the Link text from "Empezar Gratis" to "Probar gratis".

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: unify Header CTA to 'Probar gratis'"
```

---

### Task 10: Unify CallToAction CTA

**Files:**
- Modify: `components/CallToAction.tsx`

**Step 1: Update CTA text**

Change the primary button text from "Crear Cuenta Gratis" to "Probar gratis".

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/CallToAction.tsx
git commit -m "feat: unify CallToAction CTA to 'Probar gratis'"
```

---

### Task 11: Improve ContactForm copy

**Files:**
- Modify: `components/ContactForm.tsx`

**Step 1: Fix typo and update title**

Change the `<h2>` from:
```
Empezemos!
```
To:
```
Solicita una demo personalizada
```

**Step 2: Update subtitle**

Change the `<p>` subtitle from:
```
Dejanos tus datos y te contactaremos.
```
To:
```
Dejanos tus datos y te mostraremos como AlertSil puede proteger a tu equipo en menos de 5 minutos.
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: improve ContactForm copy and fix typo"
```

---

### Task 12: Add links to Footer

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Add Precios and Contacto links to Producto column**

In the "Producto" `<ul>`, add two new `<li>` entries:
```tsx
<li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Precios</Link></li>
<li><Link href="#contact" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Precios and Contacto links to Footer"
```

---

### Task 13: Wire everything into page.tsx

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add imports for new components**

Add at the top of the file:
```tsx
import HowItWorks from '../components/HowItWorks';
import TargetAudience from '../components/TargetAudience';
import TrustBadges from '../components/TrustBadges';
```

**Step 2: Update component order in the JSX**

Replace the entire return block with the new order:
```tsx
return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AlertDemo />
      <HowItWorks />
      <TargetAudience />
      <Features />
      <TrustBadges />
      <Pricing />
      <CallToAction />
      <ContactForm />
      <Footer />
    </main>
  );
```

**Step 3: Verify full build**

Run: `npm run build`
Expected: Build succeeds with all components rendered

**Step 4: Visual verification**

Run: `npm run dev`
Check: Visit localhost:3000, scroll through entire page verifying:
- Hero shows new copy + stats
- AlertDemo no longer has 3-step explanation
- HowItWorks shows 3 steps with arrows
- TargetAudience shows clinicas and PYMEs cards
- Features has new title
- TrustBadges shows 4 badges
- CTAs say "Probar gratis" consistently
- ContactForm has new title and subtitle
- Footer has new links

**Step 5: Run lint**

Run: `npm run lint`
Expected: No errors

**Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire new components and update page section order"
```

---

## Summary

| Task | Component | Type |
|------|-----------|------|
| 1 | layout.tsx metadata + JSON-LD | Modify |
| 2 | sitemap.ts + robots.ts | Create |
| 3 | Hero.tsx copy rewrite + stats | Modify |
| 4 | AlertDemo.tsx remove 3 steps | Modify |
| 5 | HowItWorks.tsx | Create |
| 6 | TargetAudience.tsx | Create |
| 7 | TrustBadges.tsx | Create |
| 8 | Features.tsx title | Modify |
| 9 | Header.tsx CTA | Modify |
| 10 | CallToAction.tsx CTA | Modify |
| 11 | ContactForm.tsx copy + typo | Modify |
| 12 | Footer.tsx links | Modify |
| 13 | page.tsx wiring + final verification | Modify |
