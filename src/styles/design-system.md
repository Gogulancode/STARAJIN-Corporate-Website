# Starajin Design System

Central source of visual tokens and typography helpers. Aligns with Tailwind configuration but exposes a programmatic API for components, headless UI patterns, and future theming.

## Brand Colors

Primary (#023EDA)  
Secondary (#ffc700)

Extended palette lives in `design-tokens.ts` under `colors`.

Usage examples (Tailwind):
```
<button className="bg-primary text-white hover:bg-starajin-blue/90" />
<span className="text-secondary" />
```

Usage examples (tokens):
```ts
import { token } from '../styles/design-tokens';
const accent = token.color('primary');
```

## Spacing Scale
Token names map to pixel values (see `spacing` export). Prefer Tailwind spacing utilities; use tokens for JS-driven inline layouts or calculations.

## Typography
Font stacks & presets in `font-config.ts`:
```ts
import { textPresets } from '../styles/font-config';
<h1 style={textPresets.headingLg}>Heading</h1>
```

Line heights: tight (1.15), snug (1.25), normal (1.5), relaxed (1.625).

## Motion
Durations and easing curves exposed in `durations` and `easing`. Example:
```ts
import { durations, easing } from '../styles/design-tokens';
const style = { transition: `opacity ${durations.fast}ms ${easing.out}` };
```

## Shadows and Radii
Consistent depth via `shadows` (xs–xl). Rounded shapes via `radii` (sm–pill). Use for custom canvas elements or libraries without Tailwind classes.

## Z-Index Strategy
`zIndices` defines layering: dropdown < sticky < overlay < modal < popover < toast.

## Implementation Guidelines
- Prefer Tailwind utilities for speed; fall back to tokens for dynamic styles.
- Keep additions backwards compatible; extend tokens instead of mutating existing names.
- When changing a brand color, update Tailwind config AND `design-tokens.ts`.

## Future Enhancements
- Dark mode palette tokens
- Semantic color layer (e.g. `surface`, `border`, `textPrimary`)
- Component-level tokens (button, card, input)
- Theming via CSS variables generated from tokens

---
Source of truth: `design-tokens.ts` & `font-config.ts`.
