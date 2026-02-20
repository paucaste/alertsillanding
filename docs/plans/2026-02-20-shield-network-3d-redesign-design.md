# AlertSil "Shield Network" 3D Redesign

**Date:** 2026-02-20
**Approach:** Enfoque A — Shield Network
**Style:** Limpio y elegante con toques 3D (Stripe-like)
**Scope:** Reestructurar + Redisenar todas las secciones. Mantener las mismas secciones, transformar el diseno visual.
**3D Focus:** Hero 3D (escena nueva) + AlertDemo mejorado. Resto con Framer Motion scroll animations.

---

## Tech Stack

| Tecnologia | Uso |
|---|---|
| React Three Fiber + Drei | Hero 3D Shield Network, AlertDemo mejorado |
| Framer Motion | Scroll reveal animations, stagger, entrada de elementos |
| Tailwind CSS v4 | Styling completo (gradientes, glassmorphism, pill buttons) |
| Three.js MeshPhysicalMaterial | Materiales translucidos del escudo |

---

## 1. Header (Redesigned)

**Current:** Fixed white navbar with `bg-white/80 backdrop-blur-md`.

**New:**
- **Top of page:** Fully transparent background, white text (hero has dark background)
- **On scroll:** Transitions to `bg-white/90 backdrop-blur-xl shadow-sm` with dark text
- Smooth 300ms transition between states using scroll event listener
- Logo: "Alert" + "Sil" with `font-extrabold` (heavier weight)
- CTA button: `rounded-full` pill shape with blue glow hover (`shadow-blue-500/25`)
- Mobile menu: Glassmorphism panel (`bg-white/80 backdrop-blur-xl`)

**Implementation:** Add `useEffect` scroll listener, toggle CSS classes based on `scrollY > 50`.

---

## 2. Hero 3D "Shield Network" (New)

The centerpiece. Full viewport height (`100vh`).

### Layout
- **Left (text):** Title, subtitle, CTAs, stats — positioned with `z-10` above canvas
- **Right/Background:** R3F Canvas with 3D scene

### 3D Scene (React Three Fiber)
- **Shield (center):** Icosahedron geometry (20 faces), semi-transparent with blue wireframe glow
  - Material: `MeshPhysicalMaterial` with `transmission: 0.6, roughness: 0.1, color: #3b82f6, opacity: 0.3`
  - Rotation: Slow Y rotation at `0.1 rad/s`
  - Scale: ~2.5 units radius
- **Network nodes:** 8-12 small spheres orbiting at different radii/speeds
  - Material: `MeshStandardMaterial` with emissive blue glow
  - Size: 0.1-0.15 units
  - Orbit: Each on its own circular path, different speeds
- **Connection lines:** CatmullRomCurve3 curves connecting nodes to shield and to each other
  - Material: `LineBasicMaterial` with blue color, opacity 0.3-0.6
  - Dynamic: Lines subtly pulse in opacity
- **Traveling particles:** Small emissive spheres traveling along connection lines
  - Speed: 1-2 units/second, staggered start times
  - Trail: Fading opacity behind particle
- **Background:** Radial gradient from deep blue (#0a1628) to black
- **Lighting:** Ambient (intensity 0.3) + PointLight blue near shield + SpotLight from above

### Text Content
- Badge: Shield icon + "Proteccion instantanea para tu equipo" (pill shape, `bg-blue-500/10 text-blue-400 border border-blue-500/20`)
- H1: `text-5xl md:text-7xl font-extrabold text-white` — "Cuando hay una emergencia, cada segundo cuenta"
- Subtitle: `text-xl text-gray-400` — Current subtitle improved
- CTAs: Two pill buttons
  - Primary: `bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/25`
  - Secondary: `border border-white/30 text-white rounded-full hover:bg-white/10`
- Stats: 3-column with animated counters (`<1s`, `0 formacion`, `24/7`), white numbers on dark background

### Responsive
- Mobile: 3D scene as full background (smaller, lower detail), text overlay with dark gradient for readability
- `prefers-reduced-motion`: Disable 3D, show static gradient background
- `<Suspense>` fallback: Dark gradient + loading spinner

---

## 3. AlertDemo (Enhanced)

Improve the existing 3D isometric scene.

### Visual Upgrades
- **Shadows:** Enable `castShadow/receiveShadow` on all meshes. Soft shadows on floor plane
- **Materials:** Upgrade from `MeshBasicMaterial` to `MeshStandardMaterial` with `roughness: 0.3, metalness: 0.1`
- **Floor:** Add subtle grid pattern texture (architectural blueprint style)
- **Alert glow:** Red halo sprite when alert triggers (radial gradient texture on sprite)
- **Labels:** Redesign with `backdrop-blur-sm`, rounded corners, subtle shadows

### Animation Upgrades
- **Scroll entry:** Section zooms in from 80% scale with Framer Motion `whileInView`
- **Particle trails:** Replace plain spheres with glowing sprites using PointsMaterial + custom texture
- **Easing:** Apply `easeOutCubic` for arrivals, `easeInCubic` for departures

### Context
- Section title above canvas: "Mira como funciona AlertSil en tiempo real" (`text-3xl font-bold`)
- Subtitle: "Simulacion de alerta en un centro medico con 6 estancias"
- Timeline bar below canvas showing animation progress with phase labels

---

## 4. HowItWorks (Redesigned)

**Current:** 3-column horizontal grid.

**New:**
- **Layout:** Vertical centered timeline with connecting animated line
- **Cards:** Larger with 3D-like icons (gradient + shadow creating depth illusion)
  - Step number: Large `text-5xl font-extrabold text-blue-100` watermark behind icon
  - Icon: `w-14 h-14` in gradient blue circle with shadow
  - Title + description to the right
- **Connecting line:** Vertical `2px` blue line drawn on scroll (using Framer Motion `scaleY` with `whileInView`)
- **Animation:** Cards `fadeInUp` with `staggerChildren: 0.2` on scroll
- **Background:** White with subtle dot grid pattern (`radial-gradient` of tiny gray dots)

---

## 5. TargetAudience (Redesigned)

**Current:** 2-column cards with nested "Caso real" boxes.

**New:**
- **Cards:** Larger with generous padding (`p-10`)
- **Icons:** `w-16 h-16` with soft blue gradient background circle
- **"Caso real":** Styled as testimonial quote — decorative large quotes, `bg-blue-50` background, italic text
- **Animation:** Cards slide in from opposite sides (left card from left, right card from right) with Framer Motion
- **Hover:** Growing shadow + `translateY(-4px)` elevation
- **Background:** White

---

## 6. Features (Redesigned)

**Current:** 3-column grid with simple icon cards.

**New:**
- **Card style:** White card with `border-l-3 border-blue-500` left accent + `shadow-sm hover:shadow-lg`
- **Icon:** Inside gradient blue circle (`from-blue-500 to-blue-600`) with colored shadow (`shadow-blue-200/50`)
- **Animation:** `staggerChildren` fade-up on viewport entry, 0.1s delay per card
- **Background:** Subtle gradient from `gray-50` (top) to `white` (bottom)

---

## 7. TrustBadges (Redesigned)

**Current:** 4 white cards on gray background.

**New:**
- **Layout:** Horizontal row with thin vertical separators between badges
- **Style:** Minimal — icon + bold value + label, no card backgrounds
- **Background:** Dark stripe `bg-slate-900` — creates visual contrast break
- **Text:** White on dark. Values in `text-2xl font-bold`, labels in `text-sm text-gray-400`
- **Icon animation:** Subtle glow pulse on icons (`animate-pulse` at 50% opacity overlay)

---

## 8. Pricing (Redesigned)

**Current:** 3-tier table with Business card scaled up.

**New:**
- **Business card (popular):** Animated gradient border using `conic-gradient` rotation via CSS animation. Blue glow shadow (`shadow-blue-500/20`)
- **Normal cards:** Subtle gray border, hover elevates with shadow growth
- **Buttons:** `rounded-full` pill shape consistent with hero
- **"Mas popular" badge:** Blue pill badge positioned above Business card
- **Animation:** Cards stagger in, Business card slightly delayed for dramatic effect
- **Background:** White

---

## 9. CallToAction (Redesigned)

**Current:** `bg-blue-600` flat background.

**New:**
- **Background:** Gradient from `blue-600` to `blue-800` (deeper)
- **Pattern overlay:** Dot grid or geometric lines at `blue-500/20` opacity
- **Text:** `text-4xl font-extrabold` (larger)
- **Buttons:** Pill shape — white solid + white outline
- **Animation:** Fade-in on scroll

---

## 10. ContactForm (Redesigned)

**Current:** Gray background with basic form.

**New:**
- **Card:** Centered `max-w-2xl`, `shadow-xl rounded-2xl` with white background
- **Inputs:** Defined borders, focus state with blue ring glow (`ring-2 ring-blue-500/50`)
- **Submit button:** Blue pill, full width, hover glow effect
- **Background:** White with subtle dot grid pattern
- **Animation:** Form slides up on scroll entry

---

## 11. Footer (Refined)

**Current:** `bg-gray-900` with 4-column layout.

**New:**
- **Background:** `bg-gray-950` (darker)
- **Separator:** Thin `border-t border-gray-800` above footer
- **Typography:** Cleaner spacing, links with subtle hover underline transition
- **Layout:** Maintain current structure, refine spacing

---

## Global Design Tokens

### Colors
- Primary: `blue-500` (#3b82f6), `blue-600` (#2563eb)
- Dark backgrounds: `#0a1628` (hero), `slate-900` (trust), `gray-950` (footer)
- Text: `white` (on dark), `gray-900` (on light), `gray-600` (secondary)
- Accents: `red-500` (alerts), `green-400` (responses)

### Typography
- Font: Inter (unchanged)
- Hero H1: `text-5xl md:text-7xl font-extrabold`
- Section titles: `text-3xl md:text-4xl font-bold`
- Body: `text-base` to `text-lg`

### Spacing
- Sections: `py-24` (unchanged)
- Max width: `max-w-7xl` (unchanged)
- Cards: `p-8` to `p-10` padding

### Effects
- Pill buttons: `rounded-full` everywhere
- Shadows: Blue-tinted for primary elements (`shadow-blue-500/25`)
- Transitions: `transition-all duration-300`
- Scroll animations: Framer Motion `whileInView` + `staggerChildren`

### Performance
- 3D scenes wrapped in `<Suspense>` with fallbacks
- `prefers-reduced-motion` disables 3D animations
- Mobile: Reduced particle count, lower shadow quality
- Lazy load 3D components with `next/dynamic`
