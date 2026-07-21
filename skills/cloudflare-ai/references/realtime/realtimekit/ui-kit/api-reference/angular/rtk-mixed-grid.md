---
description: API reference for rtk-mixed-grid component (Angular Library)
title: rtk-mixed-grid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-mixed-grid

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-mixed-grid/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A grid component which handles screenshares, plugins and participants.

## Properties

| Property                | Type          | Required | Default               | Description                                           |
| ----------------------- | ------------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio             | string        | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config                  | UIConfig      | ❌        | createDefaultConfig() | UI Config                                             |
| gap                     | number        | ✅        | \-                    | Gap between participant tiles                         |
| gridSize                | GridSize1     | ✅        | \-                    | Grid size                                             |
| iconPack                | IconPack      | ❌        | defaultIconPack       | Icon Pack                                             |
| layout                  | GridLayout1   | ✅        | \-                    | Grid Layout                                           |
| meeting                 | Meeting       | ✅        | \-                    | Meeting object                                        |
| participants            | Peer\[\]      | ✅        | \-                    | Participants                                          |
| pinnedParticipants      | Peer\[\]      | ✅        | \-                    | Pinned Participants                                   |
| plugins                 | RTKPlugin\[\] | ✅        | \-                    | Active Plugins                                        |
| screenShareParticipants | Peer\[\]      | ✅        | \-                    | Screenshare Participants                              |
| size                    | Size          | ✅        | \-                    | Size                                                  |
| states                  | States        | ✅        | \-                    | States object                                         |
| t                       | RtkI18n       | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-mixed-grid></rtk-mixed-grid>
```

### With Properties

```html
<!-- component.html -->
<rtk-mixed-grid
 aspectRatio="example"
 gap="42"
 gridSize="md">
</rtk-mixed-grid>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-mixed-grid/#page","headline":"rtk-mixed-grid · Cloudflare Realtime docs","description":"API reference for rtk-mixed-grid component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-mixed-grid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
