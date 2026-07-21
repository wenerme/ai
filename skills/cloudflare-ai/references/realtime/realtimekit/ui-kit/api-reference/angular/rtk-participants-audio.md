---
description: API reference for rtk-participants-audio component (Angular Library)
title: rtk-participants-audio
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-participants-audio

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-audio/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A component which plays all the audio from participants and screenshares.

## Properties

| Property           | Type             | Required | Default         | Description                 |
| ------------------ | ---------------- | -------- | --------------- | --------------------------- |
| iconPack           | IconPack         | ❌        | defaultIconPack | Icon pack                   |
| meeting            | Meeting          | ✅        | \-              | Meeting object              |
| preloadedAudioElem | HTMLAudioElement | ✅        | \-              | Pass existing audio element |
| t                  | RtkI18n          | ❌        | useLanguage()   | Language                    |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-participants-audio></rtk-participants-audio>
```

### With Properties

```html
<!-- component.html -->
<rtk-participants-audio
 [meeting]="meeting"
 [preloadedAudioElem]="htmlaudioelement">
</rtk-participants-audio>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-audio/#page","headline":"rtk-participants-audio · Cloudflare Realtime docs","description":"API reference for rtk-participants-audio component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-audio/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
