# Auto-Selection Rules

When dimensions are omitted, select based on content signals.

## Content → Type

| Content Signals | Type |
|----------------|------|
| Data, metrics, comparison, numbers, statistics | `infographic` |
| API, architecture, framework, system, model | `framework` |
| How-to, steps, workflow, process, tutorial | `flowchart` |
| vs, pros/cons, before/after, alternatives | `comparison` |
| Story, journey, emotion, experience, narrative | `scene` |
| History, timeline, progress, evolution | `timeline` |
| Product launch, announcement, release | `hero` (cover) |
| Quote, opinion, insight, statement | `typography` (cover) |
| Philosophy, growth, abstract, reflection | `metaphor` (cover) |
| Zen, focus, essential, pure, simple | `minimal` (cover) |

## Content → Style (Illustrations)

| Content Signals | Style |
|----------------|-------|
| Knowledge, concept, tutorial, guide | `vector-illustration`, `notion` |
| Tech, AI, programming, code | `blueprint`, `vector-illustration` |
| Productivity, SaaS, tool, app | `notion`, `vector-illustration` |
| Business, professional, strategy | `elegant` |
| Story, emotion, personal, human | `warm`, `watercolor` |
| How-to, steps, process | `vector-illustration`, `notion` |
| Opinion, editorial, culture, cinematic | `screen-print` |
| Biology, chemistry, medical | `scientific` |
| Explainer, journalism, magazine | `editorial` |
| Education, teaching, classroom | `chalkboard` |

## Content → Palette (Covers)

| Content Signals | Palette |
|----------------|---------|
| Personal story, emotion, lifestyle | `warm` |
| Business, professional, luxury | `elegant` |
| Architecture, system, API, technical | `cool` |
| Entertainment, premium, cinematic | `dark` |
| Nature, wellness, eco, organic | `earth` |
| Product launch, gaming, promotion | `vivid` |
| Fantasy, children, gentle, creative | `pastel` |
| Zen, focus, essential, pure | `mono` |
| History, vintage, retro, classic | `retro` |
| Movie poster, album, dramatic | `duotone` |

## Content → Rendering (Covers)

| Content Signals | Rendering |
|----------------|-----------|
| Clean, modern, tech, icon-based | `flat-vector` |
| Sketch, personal, casual, doodle | `hand-drawn` |
| Art, watercolor, soft, dreamy | `painterly` |
| Data, dashboard, SaaS, polished | `digital` |
| Gaming, retro, 8-bit | `pixel` |
| Education, tutorial, classroom | `chalk` |
| Poster, movie, album, concert | `screen-print` |

## Content → Text Level (Covers)

| Content Signals | Text Level |
|----------------|------------|
| Visual-only, photography, abstract | `none` |
| Article, blog, standard cover | `title-only` (default) |
| Series, tutorial with context | `title-subtitle` |
| Announcement, features, multiple points | `text-rich` |

## Content → Mood (Covers)

| Content Signals | Mood |
|----------------|------|
| Professional, corporate, academic, luxury | `subtle` |
| General, educational, blog, documentation | `balanced` (default) |
| Launch, announcement, promotion, gaming | `bold` |

## Type → Default Style

| Type | Primary Style | Alternatives |
|------|---------------|-------------|
| infographic | `vector-illustration` | `notion`, `blueprint`, `editorial` |
| scene | `warm` | `watercolor`, `elegant` |
| flowchart | `vector-illustration` | `notion`, `blueprint` |
| comparison | `vector-illustration` | `notion`, `elegant` |
| framework | `blueprint` | `vector-illustration`, `notion` |
| timeline | `elegant` | `warm`, `editorial` |

## Infographic Layout → Default Style

| Layout | Default Style | Alternatives |
|--------|---------------|-------------|
| `bento-grid` | `craft-handmade` | `corporate-memphis`, `pixel-art` |
| `linear-progression` | `craft-handmade` | `ikea-manual`, `corporate-memphis` |
| `binary-comparison` | `corporate-memphis` | `bold-graphic` |
| `hierarchical-layers` | `craft-handmade` | `technical-schematic` |
| `dashboard` | `corporate-memphis` | `technical-schematic` |
| `dense-modules` | `morandi-journal` | `pop-laboratory`, `retro-pop-grid` |
