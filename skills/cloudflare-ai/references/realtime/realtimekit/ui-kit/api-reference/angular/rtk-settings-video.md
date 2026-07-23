---
description: API reference for rtk-settings-video component (Angular Library)
title: rtk-settings-video
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-settings-video

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-settings-video/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which lets to manage your camera devices and your video preferences. Emits `rtkStateUpdate` event with data for toggling mirroring of self video:

```ts
{
 prefs: {
   mirrorVideo: boolean
 }
}
```

## Properties

| Property | Type     | Required | Default         | Description    |
| -------- | -------- | -------- | --------------- | -------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting  | ✅        | \-              | Meeting object |
| size     | Size     | ✅        | \-              | Size           |
| states   | States   | ✅        | \-              | States object  |
| t        | RtkI18n  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-settings-video></rtk-settings-video>
```

### With Properties

```html
<!-- component.html -->
<rtk-settings-video
 [meeting]="meeting"
 size="md">
</rtk-settings-video>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-settings-video/#page","headline":"rtk-settings-video · Cloudflare Realtime docs","description":"API reference for rtk-settings-video component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-settings-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
