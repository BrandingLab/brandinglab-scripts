# brandinglab-scripts

Custom GSAP animation scripts for [brandinglab.io](https://brandinglab.io)

## Quick Start

Add to your Webflow project:

**Head (Custom Code):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BrandingLab/brandinglab-scripts@main/brandinglab-gsap-preload.css">
```

**Footer (Custom Code):**
```html
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- Optional: SplitText for text animations (Club GreenSock) -->
<script src="YOUR_SPLITTEXT_CDN_URL"></script>

<!-- BrandingLab Animations -->
<script src="https://cdn.jsdelivr.net/gh/BrandingLab/brandinglab-scripts@main/brandinglab-gsap.js"></script>
```

---

## Available Animations

### Scroll Animations

| Attribute | Effect |
|-----------|--------|
| `data-gsap="fade-up"` | Fade in from below |
| `data-gsap="fade-down"` | Fade in from above |
| `data-gsap="fade-left"` | Fade in from right |
| `data-gsap="fade-right"` | Fade in from left |
| `data-gsap="zoom-in"` | Scale up with bounce |
| `data-gsap="scale-up"` | Scale up smoothly |
| `data-gsap="stagger-children"` | Animate children sequentially |

**Optional modifiers:**
- `data-gsap-delay="0.2"` — Delay in seconds
- `data-gsap-duration="1"` — Animation duration
- `data-gsap-start="top 80%"` — ScrollTrigger start position
- `data-gsap-stagger="0.15"` — Stagger amount (for stagger-children)

### Hero Animations (No scroll trigger)

| Attribute | Effect |
|-----------|--------|
| `data-gsap="hero-badge"` | Eyebrow/badge fade down |
| `data-gsap="hero-text"` | Headline fade up |
| `data-gsap="hero-image"` | Image scale reveal |

### Text Animations

| Attribute | Effect |
|-----------|--------|
| `data-gsap="split-text"` | Word/character stagger reveal |
| `data-highlight-text` | Scrubbed highlight on scroll |

**Split text options:**
- `data-gsap-split="words"` (default) or `"chars"`

**Highlight text options:**
- `data-highlight-fade="0.2"` — Faded opacity
- `data-highlight-stagger="0.1"` — Character stagger

### Hover Animations

| Attribute | Effect |
|-----------|--------|
| `data-gsap-hover="glow"` | Orange glow on hover |
| `data-gsap-hover="grow"` | Scale up on hover |
| `data-gsap-hover="magnetic"` | Magnetic cursor follow |

**Optional:**
- `data-gsap-hover-scale="1.1"` — Custom scale amount
- `data-gsap-magnetic-strength="0.3"` — Magnetic pull strength

### Counter Animation

```html
<span data-gsap="counter" data-gsap-target="500" data-gsap-suffix="+">0</span>
```

---

## Footer Parallax

Creates a reveal effect where the footer appears to slide into view as you scroll.

### Setup

**1. HTML Structure:**
```html
<div data-footer-parallax class="footer-parallax-wrapper">
  <footer data-footer-parallax-inner class="footer-section">
    <!-- Your footer content -->
  </footer>
</div>
```

**2. Required Wrapper Styles (in Webflow):**
- `position: relative`
- `overflow: hidden`
- `z-index: 0`

The CSS file includes these styles automatically via `[data-footer-parallax]`.

### Configuration

The parallax can be customized via `window.BrandingLabGSAP.config.footerParallax`:

| Option | Default | Description |
|--------|---------|-------------|
| `parallaxAmount` | `0.3` | Movement intensity (0-1) |
| `mobileBreakpoint` | `768` | Disable below this width |
| `markers` | `false` | Show ScrollTrigger markers |

---

## Page Transitions

Pixelated grid transition between pages.

### Setup

Add this HTML structure to every page (usually in a symbol):
```html
<div class="transition">
  <!-- Blocks are generated automatically -->
</div>
```

The CSS file includes required styles. Transitions trigger automatically on internal links.

**Disable for specific links:**
```html
<a href="/page" data-transition-prevent>No transition</a>
```

---

## Reduced Motion

All animations respect `prefers-reduced-motion`. Users with this preference will see content without animation.

---

## Debugging

Access via browser console:
```javascript
// Refresh ScrollTrigger after dynamic content
BrandingLabGSAP.refresh();

// View configuration
BrandingLabGSAP.config;

// Re-initialize
BrandingLabGSAP.init();
```

---

## Version History

- **v2.1.0** — Added footer parallax effect
- **v2.0.0** — Initial release with full animation system

---

## License

MIT © BrandingLab
