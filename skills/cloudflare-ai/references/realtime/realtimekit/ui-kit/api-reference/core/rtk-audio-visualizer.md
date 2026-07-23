---
description: API reference for rtk-audio-visualizer component (Web Components (HTML) Library)
title: rtk-audio-visualizer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-audio-visualizer

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

An audio visualizer component which visualizes a participants audio. Commonly used inside `rtk-name-tag`.

## Properties

| Property      | Type                   | Required | Default         | Description                                                                                   |
| ------------- | ---------------------- | -------- | --------------- | --------------------------------------------------------------------------------------------- |
| hideMuted     | boolean                | ✅        | \-              | Hide the visualizer if audio is muted                                                         |
| iconPack      | IconPack               | ❌        | defaultIconPack | Icon pack                                                                                     |
| isScreenShare | boolean                | ✅        | \-              | Audio visualizer for screensharing, it will use screenShareTracks.audio instead of audioTrack |
| participant   | Peer                   | ✅        | \-              | Participant object                                                                            |
| size          | Size                   | ✅        | \-              | Size                                                                                          |
| t             | RtkI18n                | ❌        | useLanguage()   | Language                                                                                      |
| variant       | AudioVisualizerVariant | ✅        | \-              | Variant                                                                                       |

## Usage Examples

### Basic Usage

```html
<rtk-audio-visualizer></rtk-audio-visualizer>
```

### With Properties

```html
<rtk-audio-visualizer>
</rtk-audio-visualizer>
```

```html
<script>
  const el = document.querySelector("rtk-audio-visualizer");

  el.hideMuted= true;
  el.isScreenShare= true;
  el.participant= participant
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/#page","headline":"rtk-audio-visualizer · Cloudflare Realtime docs","description":"API reference for rtk-audio-visualizer component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
