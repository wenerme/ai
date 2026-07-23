---
description: API reference for rtk-name-tag component (Angular Library)
title: rtk-name-tag
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-name-tag

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-name-tag/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which shows a participant's name.

## Properties

| Property      | Type              | Required | Default         | Description                               |
| ------------- | ----------------- | -------- | --------------- | ----------------------------------------- |
| iconPack      | IconPack          | ❌        | defaultIconPack | Icon pack                                 |
| isScreenShare | boolean           | ✅        | \-              | Whether it is used in a screen share view |
| meeting       | Meeting           | ✅        | \-              | Meeting object                            |
| participant   | Peer              | ✅        | \-              | Participant object                        |
| size          | Size              | ✅        | \-              | Size                                      |
| t             | RtkI18n           | ❌        | useLanguage()   | Language                                  |
| variant       | RtkNameTagVariant | ✅        | \-              | Name tag variant                          |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-name-tag></rtk-name-tag>
```

### With Properties

```html
<!-- component.html -->
<rtk-name-tag
 [isScreenShare]="true"
 [meeting]="meeting"
 [participant]="participant">
</rtk-name-tag>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-name-tag/#page","headline":"rtk-name-tag · Cloudflare Realtime docs","description":"API reference for rtk-name-tag component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-name-tag/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
