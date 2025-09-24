# 3D Carousel Interactivity Safety Guide

A permanent reference to avoid the interaction “dead zones” we hit at 72° and 288° (Skills/Contact sides).

## TL;DR
- Do NOT put scrolling or blur on the main 3D-transformed panels.
- If you need scrolling, apply it to inner containers only.
- If you need blur, blur a child overlay (or use a pseudo-element), not the 3D-transformed container.

## The Main Culprits (Never do these on `.carousel-panel`)
- `overflow-y: auto` (biggest interactivity killer on 3D-transformed elements)
- `backdrop-filter: blur(...)` (any value)
- `filter: blur(...)` on the active/interactive 3D-transformed element

These create new stacking/scroll contexts and GPU layers that block pointer events when combined with 3D transforms at specific angles (72°, 288°).

## Safe Alternatives
- Use `opacity` for background panels (e.g., 0.2–0.4) and `opacity: 1` on the front panel.
- Put `overflow-y: scroll` ONLY on inner content wrappers (e.g., `.skills-grid`, `.tools-section`), not on `.carousel-panel`.
- If you want blur, render it on an absolutely-positioned child overlay with `pointer-events: none`, not on the 3D container itself.

## Recommended Patterns

### 1) Front vs Background State
```css
/* Background panels (non-front) */
.carousel-panel {
  opacity: 0.2;          /* visibility only */
  pointer-events: auto;  /* keep interactions enabled */
}

/* Active/front panel */
.carousel-panel.front-panel {
  opacity: 1;
  /* no blur here */
}
```

### 2) Safe Scrolling
```css
/* Never on .carousel-panel */
/* .carousel-panel { overflow-y: auto; }  <-- NO */

/* Do this instead */
.skills-grid {
  max-height: 250px;
  overflow-y: scroll; /* safe on inner containers */
}
.tools-section {
  max-height: 100px;
  overflow-y: scroll; /* safe on inner containers */
}
```

### 3) Safe Blur (Overlay/Pseudo-element)
```css
/* Apply blur to a child overlay, not the 3D-transformed panel */
.carousel-panel {
  position: relative;
  /* no filter/backdrop-filter here */
}

.carousel-panel .blur-overlay {
  position: absolute;
  inset: 0;
  /* Use filter blur on the overlay layer */
  filter: blur(2px);
  pointer-events: none;  /* never block clicks */
}

/* Front panel removes/lessens the blur */
.carousel-panel.front-panel .blur-overlay {
  filter: none; /* or filter: blur(0) */
}
```

## Why It Broke (Root Cause)
- 3D transforms create new stacking contexts.
- `overflow: auto` and blur (`filter`/`backdrop-filter`) force extra layers and scroll contexts.
- At specific angles (72°, 288°), these stack in ways that block pointer events.

## Guardrails (Optional but Recommended)

### Stylelint rules (disallow risky declarations globally)
```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "overflow-y": ["auto"],
      "backdrop-filter": ["/blur\\(.+\\)/"]
    },
    "property-disallowed-list": ["backdrop-filter"]
  }
}
```

### Pre-commit checklist
- [ ] No `overflow-y: auto` on `.carousel-panel` (or any 3D-transformed element)
- [ ] No `backdrop-filter` anywhere in carousel panels
- [ ] No `filter: blur(...)` on active/interactive 3D elements
- [ ] Scrolling only on inner containers (skills/tools/projects lists)
- [ ] Front panel uses `.front-panel` class to control visibility, not blur

---

Keep this file nearby and skim it before making visual changes to carousel panels.
