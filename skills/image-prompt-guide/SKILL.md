---
name: image-prompt-guide
description: "USE THIS SKILL WHEN writing prompts for AI image generation: creating illustrations, cover images, infographics, diagrams, or any visual content. Covers prompt structure, visual styles, color palettes, layout types, composition principles, and scenario-specific templates. Triggers on: image prompt, generate image, illustration, cover image, infographic, 配图, 封面图, 信息图, dall-e prompt, midjourney prompt, image generation."
---

# Image Prompt Guide

A provider-agnostic guide for crafting effective AI image generation prompts. Covers illustrations, covers, infographics, and general imagery.

CRITICAL: grep `references/` for detailed style/layout/palette specs and prompt templates.

## Core Principles

Good image prompts follow **structure first, aesthetics second**:

1. **Layout/Composition** — Describe spatial arrangement, zones, flow direction
2. **Specific Content** — Use actual data, labels, terms (not vague descriptions)
3. **Visual Relationships** — How elements connect and relate
4. **Semantic Colors** — Meaning-based color choices (red=warning, green=success)
5. **Style Characteristics** — Line treatment, texture, mood
6. **Aspect Ratio + Quality** — End with dimensions and detail level

### Universal Prompt Suffix

Always append to prompts:
> Clean composition with generous white space. Simple or no background. Main elements centered or positioned by content needs.

### What to Avoid
- Vague descriptions ("a nice image", "something beautiful")
- Literal metaphor illustrations (visualize the *concept*, not the metaphor)
- Missing concrete labels/annotations
- Photorealistic human faces (use simplified silhouettes)
- Overly complex backgrounds

## Two-Dimensional Design System

All image generation uses **two independent dimensions** that combine freely:

| Dimension | Controls | Question |
|-----------|----------|----------|
| **Type/Layout** | Information structure | *How is content organized?* |
| **Style** | Visual aesthetics | *What does it look like?* |

Example: `infographic` (type) × `blueprint` (style) = technical data visualization with engineering aesthetics.

## Quick Reference: Type Selection

| Content | Recommended Type |
|---------|-----------------|
| Data, metrics, comparisons | `infographic` |
| Stories, emotions, atmosphere | `scene` |
| Processes, workflows, how-to | `flowchart` |
| A vs B, pros/cons | `comparison` |
| Architecture, models, concepts | `framework` |
| History, evolution, milestones | `timeline` |
| Product launch, announcements | `hero` (cover) |
| Multiple topics overview | `bento-grid` (infographic) |
| Abstract concept visualization | `conceptual` (cover) |

## Quick Reference: Style Selection

| Content Tone | Recommended Style |
|-------------|------------------|
| Knowledge, tutorials, tech | `vector-illustration` or `blueprint` |
| SaaS, productivity | `notion` (minimal line art) |
| Personal, lifestyle | `warm` or `watercolor` |
| Opinion, editorial, cultural | `screen-print` or `editorial` |
| Education, teaching | `chalkboard` or `craft-handmade` |
| Business, professional | `elegant` |
| Fun, casual, playful | `flat-doodle` or `kawaii` |
| Retro, nostalgic | `pixel-art` or `retro` |

## Quick Reference: Color Palette

| Mood | Palette | Key Colors |
|------|---------|------------|
| Friendly, warm | `warm` | Orange #ED8936, Golden #F6AD55, Cream bg |
| Professional | `elegant` | Slate #475569, Gold #D4AF37, Ivory bg |
| Technical | `cool` | Blue #2563EB, Teal #0D9488, Light bg |
| Premium, cinematic | `dark` | Charcoal #1A1A2E, Purple #7C3AED, Dark bg |
| Natural, organic | `earth` | Green #059669, Brown #92400E, Warm bg |
| Bold, energetic | `vivid` | Red #EF4444, Cyan #06B6D4, White bg |
| Gentle, creative | `pastel` | Pink #FCA5A5, Lavender #C4B5FD, Soft bg |
| Zen, minimal | `mono` | Grays + one accent, White bg |

## Scenario Templates

### Infographic / Data Visualization

```
[Title] - Data Visualization

Layout: [grid/radial/hierarchical]

ZONES:
- Zone 1: [data point with specific values]
- Zone 2: [comparison with metrics]
- Zone 3: [summary/conclusion]

LABELS: [specific numbers, percentages, terms]
COLORS: [semantic color mapping]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Scene / Atmospheric

```
[Title] - Atmospheric Scene

FOCAL POINT: [main subject]
ATMOSPHERE: [lighting, mood, environment]
MOOD: [emotion to convey]
COLOR TEMPERATURE: [warm/cool/neutral]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Flowchart / Process

```
[Title] - Process Flow

Layout: [left-right/top-down/circular]

STEPS:
1. [Step] - [description]
2. [Step] - [description]

CONNECTIONS: [arrow types, decision points]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Comparison

```
[Title] - Comparison View

LEFT SIDE - [Option A]:
- [Point 1]
- [Point 2]

RIGHT SIDE - [Option B]:
- [Point 1]
- [Point 2]

DIVIDER: [visual separator]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Cover Image

```
[Title] - Cover Image

TYPE: [hero/conceptual/typography/metaphor/scene/minimal]
FOCAL ELEMENT: [main visual]
TITLE TEXT: [exact title, language]
TEXT LEVEL: [none/title-only/title-subtitle]
PALETTE: [color scheme]
RENDERING: [flat-vector/hand-drawn/painterly/digital]
MOOD: [subtle/balanced/bold]
ASPECT: 16:9
```

## Composition Principles

| Principle | Guideline |
|-----------|-----------|
| **White space** | 40-60% breathing room |
| **Visual anchor** | Main element centered or offset left |
| **Characters** | Simplified silhouettes, NOT realistic humans |
| **Text** | Large, prominent, handwritten fonts preferred |
| **Title** | Use exact title from source, never invent |
| **Hierarchy** | Size = importance |

## References

- `references/styles.md` — 28+ visual styles with descriptions, color palettes, and compatibility matrix
- `references/layouts.md` — 21 infographic layouts with structure, best-for, and visual elements
- `references/palettes.md` — 10 color palettes with hex values, decorative hints, and use cases
- `references/templates.md` — Detailed prompt templates with style-specific overrides
- `references/auto-selection.md` — Content signal → dimension mapping rules
- `references/sd-styles.csv` — 1062 image generation style presets (name, prompt, negative_prompt) merged from 7 sources (Douleb 850+, Fooocus 200+, BBrother, rocketingdatascience, twri/sdxl_prompt_styler, jheidt)
