# Section Redesign Design

## Problem
All sections below the Hero follow the same AI-generated pattern: centered title + subtitle + uniform grid of cards. This makes the page feel generic and repetitive.

## Approach
Layout variation + subtle 3D touches. Each section gets a unique layout to break monotony. 3D is used sparingly (HowItWorks scene, Pricing tilt, CTA particles, ContactForm decoration).

## Section Designs

### 1. HowItWorks
- **Layout:** Two columns. Left: 3D scene (network nodes — central red emitter, blue receivers with pulse animation). Right: 3 steps stacked vertically.
- **Tech:** R3F Canvas, simplified version of existing HeroScene node system.

### 2. TargetAudience
- **Layout:** Full-width zigzag alternating sections. Large icon/visual on one side, text on the other. Alternating direction per item.
- **Tech:** Framer Motion for scroll reveal, CSS grid.

### 3. Features
- **Layout:** Bento grid. First 2 features span 2 columns with dark gradient backgrounds and white text. Rest are standard cells.
- **Tech:** CSS grid with `grid-column: span 2`.

### 4. TrustBadges
- **Layout:** Horizontal marquee/ticker with infinite auto-scroll. Badges repeat in a seamless loop.
- **Tech:** CSS animation (translateX), duplicated content for seamless loop.

### 5. Pricing
- **Layout:** Same 3-column grid but cards have mouse-tracking 3D tilt effect (CSS transforms: rotateX/rotateY). Popular card has stronger elevation + glow.
- **Tech:** CSS perspective + onMouseMove event handler for tilt.

### 6. CallToAction
- **Layout:** Reuse ParticleBackground component from Hero as background. Dark theme with drop-shadow text.
- **Tech:** Existing ParticleBackground component.

### 7. ContactForm
- **Layout:** 50/50 split. Left: form (light bg). Right: dark panel with contact info + small decorative 3D shield (static, branding).
- **Tech:** R3F for decorative shield, Formspree for form.

### 8. Footer
- **Layout:** Minimal and clean. Logo + essential links + copyright.
- **Tech:** Standard HTML/CSS.

## Constraints
- Keep page performant: R3F scenes are lazy-loaded with dynamic imports
- Spanish language maintained for all UI copy
- Existing dependencies only (Three.js, R3F, drei, Framer Motion already installed)
