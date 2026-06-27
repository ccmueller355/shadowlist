# Aethelred Cybernetics — App Icon Brand Guide

**Version**: 1.0 | **Date**: 2026-06-27

## Brand Identity

Aethelred Cybernetics is a fictional corporation in the Shadowrun universe. The name
combines Old English "*aethelred*" (noble counsel) with "cybernetics" — ancient gravitas
meets bleeding-edge chrome. The visual identity reflects that fusion.

### Core Elements

| Element | Value |
|---------|-------|
| Base fill | `#121216` (near-black charcoal) |
| Primary outline | `#00f0ff` (neon cyan — HUD blue) |
| Secondary accent | `#ff6b00` (amber — warning, glitch signature) |
| Frame shape | Hexagonal (6-sided) bounding frame |
| Line style | Circuit traces — 45° angular cuts, no smooth curves |
| Signature detail | 1-2 pixel amber glitch artifact in lower-right corner |

### Frame

Every Aethelred app icon uses a hexagonal frame as the outer bounding shape.
Inside the hex, dark fill (`#121216`). The inner icon is rendered in cyan
circuit-trace style at 45° angles, with a single amber accent point.

### The Glitch Signature

A tiny amber artifact (1-2 pixels, single dot or short line) in the lower-right
quadrant of the hex frame. This is the Aethelred Cybernetics signature — it
identifies the app as genuine corpware. The glitch should look intentional but
imperfect, like a subtle Easter egg.

---

## App Icons

### ShadowLink — Messenger

**Inner icon**: Three connected nodes in a network graph layout.

```
     •───•
    /     \
   •       •
```

- Two outer nodes: cyan circuit-trace dots
- Center node: **amber** dot (the routing hub)
- Connection lines: 45° angled traces, not straight lines
- Amber glitch at lower-right of hex

**Concept**: Networked communication, data routing, encrypted relay.

---

### ShadowList — Shopping List ← **current focus**

**Inner icon**: Minimalist shopping cart silhouette in circuit-trace style.

```
   ┌──────┐
   │ ╱──╲ │
   │╱ ╲_╱ ╲│
   │ ●   ● │
   └───────┘
```

- Cart basket: angular, built from 45° circuit traces, not rounded curves
- Handle: cyan arc at top with an angular break (like a trace split)
- Left wheel: cyan dot
- Right wheel: **amber** dot (the Aethelred signature lives here)
- Amber glitch at lower-right of hex

**Concept**: Consumer cyberpunk — a shopping cart that looks like it belongs on
the Stuffer Shack terminal. The amber right wheel hints at "low stock alert."

---

### ShadowTrack — Logger / Activity Tracker

**Inner icon**: Hexagonal radar sweep / crosshairs.

```
      ▓
     ▓ ▓
    ▓   ▓
     ▓ ▓
      ▓
```

- Two concentric hexagons (thin circuit traces)
- One 90° quadrant of the outer ring is **amber** (active tracking)
- Center dot: cyan
- Sweep line: 45° angled line rotating from center to outer ring
- Amber glitch at lower-right of hex

**Concept**: Active tracking, scanning, logging in progress.

---

## AI Image Generation Prompts

### Base prompt (shared across all apps)

> **Platform**: Midjourney / DALL-E 3 / Stable Diffusion XL
>
> **Style**: "Mobile app icon, 1024x1024 square, centered on dark charcoal
> background #121216, hexagonal border frame in neon cyan #00f0ff, circuit
> board aesthetic with 45-degree angular traces, neon cyan outline on dark
> fill, single amber #ff6b00 accent pixel glitch in lower right corner,
> cyberpunk corporate identity, clean sharp vectors, no gradients, no
> shadows, high contrast, flat design with neon edges"

### ShadowList specific — Full prompt

Copy this into any AI image generator:

```
Mobile app icon, 1024x1024 square, centered on dark charcoal background
#121216. Hexagonal border frame in neon cyan #00f0ff. Inside the hex:
a minimalist shopping cart silhouette drawn in circuit board trace style -
all 45 degree angles, no curved lines. The cart's basket is an angular
trapezoid, the handle is a split circuit trace. Left wheel is a neon cyan
dot, right wheel is an amber #ff6b00 dot (warmer orange accent). 
One tiny amber glitch artifact pixel in the lower right of the hex frame.
Circuit board aesthetic, neon cyan outline on dark fill, cyberpunk corporate
identity, clean sharp vectors, no gradients, no shadows, high contrast,
flat design with neon edges.
```

---

## Implementation

### Asset sizes required

| File | Size | Purpose |
|------|------|---------|
| `assets/icon.png` | 1024×1024 | iOS home screen + Play Store |
| `assets/android-icon-foreground.png` | 1024×1024 | Android adaptive icon (foreground layer) |
| `assets/android-icon-background.png` | 1024×1024 | Android adaptive icon (background layer — solid #121216) |
| `assets/android-icon-monochrome.png` | 1024×1024 | Android monochrome variant |

### Replacement process

1. Generate image(s) from prompt above
2. Replace files in `assets/`
3. Run `npm run typecheck && npm test` to verify nothing broke
4. Build APK: `./scripts/build-android.sh preview`

### Android adaptive icon notes

- The `backgroundImage` layer should be a solid `#121216` fill (no transparency)
- The `foregroundImage` should contain the hexagonal frame + inner icon with
  transparency outside the hex
- Use `app.json` config already in place: `adaptiveIcon.backgroundColor: "#E6F4FE"`
  may need updating to `#121216` for theme consistency
