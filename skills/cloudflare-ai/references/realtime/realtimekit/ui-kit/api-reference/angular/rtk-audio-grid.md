---
description: API reference for rtk-audio-grid component (Angular Library)
title: rtk-audio-grid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-audio-grid

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-audio-grid/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type      | Required | Default         | Description                      |
| -------- | --------- | -------- | --------------- | -------------------------------- |
| config   | UIConfig1 | ✅        | \-              | Config                           |
| hideSelf | boolean   | ✅        | \-              | Whether to hide self in the grid |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon Pack                        |
| meeting  | Meeting   | ✅        | \-              | Meeting                          |
| size     | Size1     | ✅        | \-              | Size                             |
| states   | States1   | ✅        | \-              | States                           |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language                         |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-audio-grid></rtk-audio-grid>
```

### With Properties

```html
<!-- component.html -->
<rtk-audio-grid
 [config]="defaultUiConfig"
 [hideSelf]="true"
 [meeting]="meeting">
</rtk-audio-grid>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-audio-grid/#page","headline":"rtk-audio-grid · Cloudflare Realtime docs","description":"API reference for rtk-audio-grid component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-audio-grid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
