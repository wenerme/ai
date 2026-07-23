---
description: API reference for rtk-spotlight-grid component (Web Components (HTML) Library)
title: rtk-spotlight-grid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-spotlight-grid

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A grid component that renders two lists of participants: `pinnedParticipants` and `participants`. You can customize the layout to a `column` view, by default is is `row`.

* Participants from `pinnedParticipants[]` are rendered inside a larger grid.
* Participants from `participants[]` array are rendered in a smaller grid.

## Properties

| Property           | Type        | Required | Default               | Description                                           |
| ------------------ | ----------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio        | string      | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config             | UIConfig    | ❌        | createDefaultConfig() | UI Config                                             |
| gap                | number      | ✅        | \-                    | Gap between participant tiles                         |
| gridSize           | GridSize1   | ✅        | \-                    | Grid size                                             |
| iconPack           | IconPack    | ❌        | defaultIconPack       | Icon Pack                                             |
| layout             | GridLayout1 | ✅        | \-                    | Grid Layout                                           |
| meeting            | Meeting     | ✅        | \-                    | Meeting object                                        |
| participants       | Peer\[\]    | ✅        | \-                    | Participants                                          |
| pinnedParticipants | Peer\[\]    | ✅        | \-                    | Pinned Participants                                   |
| size               | Size        | ✅        | \-                    | Size                                                  |
| states             | States      | ✅        | \-                    | States object                                         |
| t                  | RtkI18n     | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```html
<rtk-spotlight-grid></rtk-spotlight-grid>
```

### With Properties

```html
<rtk-spotlight-grid
 aspectRatio="example"
 gridSize="md">
</rtk-spotlight-grid>
```

```html
<script>
  const el = document.querySelector("rtk-spotlight-grid");

  el.gap= 42;
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/#page","headline":"rtk-spotlight-grid · Cloudflare Realtime docs","description":"API reference for rtk-spotlight-grid component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
