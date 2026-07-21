---
description: API reference for rtk-network-indicator component (Angular Library)
title: rtk-network-indicator
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-network-indicator

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-network-indicator/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property      | Type      | Required | Default         | Description         |
| ------------- | --------- | -------- | --------------- | ------------------- |
| iconPack      | IconPack1 | ❌        | defaultIconPack | Icon pack           |
| isScreenShare | boolean   | ✅        | \-              | Is for screenshare  |
| meeting       | Meeting   | ✅        | \-              | Meeting             |
| participant   | Peer      | ✅        | \-              | Participant or Self |
| t             | RtkI18n1  | ❌        | useLanguage()   | Language            |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-network-indicator></rtk-network-indicator>
```

### With Properties

```html
<!-- component.html -->
<rtk-network-indicator
 [isScreenShare]="true"
 [meeting]="meeting"
 [participant]="participant">
</rtk-network-indicator>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-network-indicator/#page","headline":"rtk-network-indicator · Cloudflare Realtime docs","description":"API reference for rtk-network-indicator component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-network-indicator/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
