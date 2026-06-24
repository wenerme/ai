---
name: daisyui-v5
description: "USE THIS SKILL WHEN writing HTML/JSX with daisyUI v5, Tailwind CSS 4 component library. Covers installation, component class names (btn, card, modal, drawer, menu, tab, table, form inputs), color system (primary, secondary, accent, neutral, base, info/success/warning/error), theming with @plugin syntax, config options, and all 53 component APIs with syntax and rules. Triggers on: daisyui, daisyUI, daisy-ui, Tailwind CSS components, btn class, card class."
---

# daisyUI 5

CSS component library for Tailwind CSS 4. Provides semantic class names for common UI components.

- [Docs](https://daisyui.com) | [v5 Release Notes](https://daisyui.com/docs/v5/) | [v4→v5 Upgrade](https://daisyui.com/docs/upgrade/)
- Source: [llms.txt](https://daisyui.com/llms.txt) from [saadeghi/daisyui](https://github.com/saadeghi/daisyui)

CRITICAL: grep `references/` for component details before answering.

## Install

Requires **Tailwind CSS 4**. No `tailwind.config.js` — TW4 uses CSS-only config.

```css
@import "tailwindcss";
@plugin "daisyui";
```

```bash
npm i -D daisyui@latest
```

CDN alternative:
```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

## Usage Rules

1. Style elements by combining: **component** class + optional **part/style/color/size/modifier** classes
2. Customize with Tailwind utility classes (e.g. `btn px-10`). Use `!` suffix for specificity override as last resort
3. Only use daisyUI class names or Tailwind CSS utilities — no custom CSS needed
4. Use `flex`/`grid` with responsive prefixes for layout
5. **NEVER** add `bg-base-100 text-base-content` to body unless necessary
6. **NEVER** use `dark:` prefix with daisyUI colors — themes handle dark mode automatically

### Class Name Categories

| Category    | Purpose                                  | Example              |
|-------------|------------------------------------------|----------------------|
| component   | Required base class                      | `btn`, `card`        |
| part        | Child element within component           | `card-body`          |
| style       | Visual variant                           | `btn-outline`        |
| color       | Semantic color                           | `btn-primary`        |
| size        | Size variant                             | `btn-sm`, `btn-lg`   |
| behavior    | State modifier                           | `btn-active`         |
| placement   | Position                                 | `toast-top`          |
| direction   | Orientation                              | `divider-horizontal` |
| modifier    | Shape/layout modifier                    | `btn-circle`         |
| variant     | Conditional prefix                       | `is-drawer-open:`    |

## Color System

### Semantic Colors

| Color              | Purpose                              |
|--------------------|--------------------------------------|
| `primary`          | Main brand color                     |
| `secondary`        | Secondary brand color                |
| `accent`           | Accent brand color                   |
| `neutral`          | Non-saturated UI elements            |
| `base-100/200/300` | Surface colors (light→dark)          |
| `base-content`     | Text on base surfaces                |
| `info`             | Informational messages               |
| `success`          | Success/safe messages                |
| `warning`          | Warning/caution messages             |
| `error`            | Error/danger messages                |
| `*-content`        | Foreground text for each color       |

### Color Rules

- Use daisyUI colors (not Tailwind `red-500` etc.) so they adapt to themes
- `*-content` colors provide contrast against their paired color
- No `dark:` prefix needed — colors change with theme automatically
- Use `base-*` for majority of page, `primary` for important elements

## Config

```css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
  root: ":root";
  include: ;
  exclude: ;
  prefix: ;
  logs: true;
}
```

Built-in themes: `light`, `dark`, `cupcake`, `bumblebee`, `emerald`, `corporate`, `synthwave`, `retro`, `cyberpunk`, `valentine`, `halloween`, `garden`, `forest`, `aqua`, `lofi`, `pastel`, `fantasy`, `wireframe`, `black`, `luxury`, `dracula`, `cmyk`, `autumn`, `business`, `acid`, `lemonade`, `night`, `coffee`, `winter`, `dim`, `nord`, `sunset`, `caramellatte`, `abyss`, `silk`

Switch themes: `data-theme="THEME_NAME"` on `<html>`.

## Component Quick Reference

| Component | Class | Common Modifiers |
|-----------|-------|-----------------|
| Button | `btn` | `btn-primary` `btn-outline` `btn-sm/lg` `btn-circle` |
| Card | `card` | `card-body` `card-title` `card-border` `card-side` |
| Modal | `modal` | `modal-box` `modal-action` `modal-open` |
| Drawer | `drawer` | `drawer-toggle` `drawer-content` `drawer-side` |
| Navbar | `navbar` | `navbar-start` `navbar-center` `navbar-end` |
| Menu | `menu` | `menu-horizontal` `menu-sm` `menu-title` |
| Tab | `tab` | `tab-active` `tab-bordered` `tab-lifted` |
| Table | `table` | `table-zebra` `table-pin-rows` `table-sm` |
| Input | `input` | `input-bordered` `input-primary` `input-sm` |
| Select | `select` | `select-bordered` `select-primary` `select-sm` |
| Badge | `badge` | `badge-primary` `badge-outline` `badge-sm` |
| Alert | `alert` | `alert-info` `alert-success` `alert-warning` |
| Toast | `toast` | `toast-top` `toast-end` |
| Loading | `loading` | `loading-spinner` `loading-dots` `loading-ring` |
| Toggle | `toggle` | `toggle-primary` `toggle-sm` |
| Tooltip | `tooltip` | `tooltip-open` `tooltip-top/bottom/left/right` |

## References

- `references/components.md` — All 53 components: class names, HTML syntax, rules
- `references/themes.md` — Custom theme creation, CSS variables, OKLCH colors
