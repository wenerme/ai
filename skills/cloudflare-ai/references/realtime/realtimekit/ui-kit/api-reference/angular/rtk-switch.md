---
description: API reference for rtk-switch component (Angular Library)
title: rtk-switch
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-switch

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-switch/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A switch component which follows RTK Design System.

## Properties

| Property | Type     | Required | Default         | Description                           |
| -------- | -------- | -------- | --------------- | ------------------------------------- |
| checked  | boolean  | ✅        | \-              | Whether the switch is enabled/checked |
| disabled | boolean  | ✅        | \-              | Whether switch is readonly            |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack                             |
| readonly | boolean  | ✅        | \-              | Whether switch is readonly            |
| t        | RtkI18n  | ❌        | useLanguage()   | Language                              |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-switch></rtk-switch>
```

### With Properties

```html
<!-- component.html -->
<rtk-switch
 [checked]="true"
 [disabled]="true"
 [readonly]="true">
</rtk-switch>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-switch/#page","headline":"rtk-switch · Cloudflare Realtime docs","description":"API reference for rtk-switch component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-switch/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
