# Prompt Templates

Detailed prompt templates for each scenario with style-specific overrides.

## Prompt File Format

Use YAML frontmatter + structured body:

```yaml
---
type: infographic
style: blueprint
aspect: 16:9
---

[Structured prompt content]
```

## Universal Rules

### Default Composition (append to ALL prompts)
> Clean composition with generous white space. Simple or no background. Main elements centered or positioned by content needs.

### Character Rendering (append when humans appear)
> Human figures: simplified stylized silhouettes or symbolic representations, not photorealistic.

### Text in Images
- Large, prominent, immediately readable
- Handwritten fonts preferred for warmth
- Concise keywords and core concepts only
- Match content language

## Type Templates

### Infographic

```
[Title] - Data Visualization

Layout: [grid/radial/hierarchical]

ZONES:
- Zone 1: [data point with specific values]
- Zone 2: [comparison with metrics]
- Zone 3: [summary/conclusion]

LABELS: [specific numbers, percentages, terms from source]
COLORS: [semantic color mapping]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Scene

```
[Title] - Atmospheric Scene

FOCAL POINT: [main subject]
ATMOSPHERE: [lighting, mood, environment]
MOOD: [emotion to convey]
COLOR TEMPERATURE: [warm/cool/neutral]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Flowchart

```
[Title] - Process Flow

Layout: [left-right/top-down/circular]

STEPS:
1. [Step name] - [brief description]
2. [Step name] - [brief description]
...

CONNECTIONS: [arrow types, decision points]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Comparison

```
[Title] - Comparison View

LEFT SIDE - [Option A]:
- [Point 1 with data]
- [Point 2 with data]

RIGHT SIDE - [Option B]:
- [Point 1 with data]
- [Point 2 with data]

DIVIDER: [visual separator description]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Framework

```
[Title] - Conceptual Framework

STRUCTURE: [hierarchical/network/matrix]

NODES:
- [Concept 1] - [role in framework]
- [Concept 2] - [role in framework]

RELATIONSHIPS: [how nodes connect]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Timeline

```
[Title] - Chronological View

DIRECTION: [horizontal/vertical]

EVENTS:
- [Date/Period 1]: [milestone]
- [Date/Period 2]: [milestone]

MARKERS: [visual indicators for each event]
STYLE: [style characteristics]
ASPECT: 16:9
```

### Cover Image

```
[Title] - Cover Image

TYPE: [hero/conceptual/typography/metaphor/scene/minimal]

FOCAL ELEMENT: [main visual element]
TITLE TEXT: "[exact title]" in [language]
TEXT LEVEL: [none/title-only/title-subtitle]

PALETTE: [warm/elegant/cool/dark/earth/vivid/pastel/mono/retro/duotone]
RENDERING: [flat-vector/hand-drawn/painterly/digital/pixel/chalk/screen-print]
MOOD: [subtle/balanced/bold]
FONT: [clean/handwritten/serif/display]

COMPOSITION:
- [40-60% white space]
- [Main element position]
- [Visual anchor description]

ASPECT: 16:9
```

### Infographic (Full Template)

```
Create a professional infographic following these specifications:

- Type: Infographic
- Layout: [LAYOUT]
- Style: [STYLE]
- Aspect Ratio: [RATIO]
- Language: [LANGUAGE]

Core Principles:
- Follow layout structure precisely
- Apply style consistently throughout
- Keep information concise, highlight keywords
- Use ample whitespace for visual clarity
- Maintain clear visual hierarchy

Layout Guidelines:
[Insert layout-specific structure from layouts.md]

Style Guidelines:
[Insert style-specific rules from styles.md]

Content:
[Structured content with labels in target language]
```

## Style-Specific Overrides

### vector-illustration override
```
Flat vector illustration. Clean black outlines on all elements.
COLORS: Cream background (#F5F0E6), Coral Red (#E07A5F), Mint Green (#81B29A), Mustard Yellow (#F2CC8F)
ELEMENTS: Geometric simplified icons, no gradients, playful decorative elements (dots, stars)
```

### screen-print override
```
Screen print / silkscreen poster art. Flat color blocks, NO gradients.
COLORS: 2-5 colors maximum. [duotone pair or limited palette]
TEXTURE: Halftone dot patterns, slight color layer misregistration, paper grain
COMPOSITION: Bold silhouettes, geometric framing, negative space as storytelling element
FIGURES: Silhouettes only, no detailed faces, stencil-cut edges
TYPOGRAPHY: Bold condensed sans-serif integrated into composition (not overlaid)
```

### blueprint override
```
Technical blueprint style. Engineering precision.
COLORS: Off-White bg (#FAF8F5), Engineering Blue (#2563EB), Navy (#1E3A5F)
ELEMENTS: Precise lines, 90-degree angles, grid alignment, dimension indicators
CONNECTIONS: Straight lines only, no curves
```

### craft-handmade override
```
Hand-drawn paper craft aesthetic.
COLORS: Light cream bg (#FFF8F0), warm pastels, craft paper tones
ELEMENTS: Slightly imperfect lines, layered shadows, simple cartoon icons
RULE: Strictly hand-drawn—no realistic or photographic elements
```
