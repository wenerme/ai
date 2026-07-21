---
description: API reference for rtk-participant-setup component (Angular Library)
title: rtk-participant-setup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-participant-setup

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant-setup/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property        | Type                  | Required       | Default               | Description                      |             |              |   |    |                      |
| --------------- | --------------------- | -------------- | --------------------- | -------------------------------- | ----------- | ------------ | - | -- | -------------------- |
| config          | UIConfig              | ❌              | createDefaultConfig() | Config object                    |             |              |   |    |                      |
| iconPack        | IconPack              | ❌              | defaultIconPack       | Icon pack                        |             |              |   |    |                      |
| isPreview       | boolean               | ✅              | \-                    | Whether tile is used for preview |             |              |   |    |                      |
| nameTagPosition | \| 'bottom-left'      | 'bottom-right' | 'bottom-center'       | 'top-left'                       | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant     | Peer                  | ✅              | \-                    | Participant object               |             |              |   |    |                      |
| size            | Size                  | ✅              | \-                    | Size                             |             |              |   |    |                      |
| states          | States                | ✅              | \-                    | States object                    |             |              |   |    |                      |
| t               | RtkI18n               | ❌              | useLanguage()         | Language                         |             |              |   |    |                      |
| variant         | 'solid' \| 'gradient' | ✅              | \-                    | Variant                          |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-participant-setup></rtk-participant-setup>
```

### With Properties

```html
<!-- component.html -->
<rtk-participant-setup
 [isPreview]="true"
 [nameTagPosition]="| 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top-left'
    | 'top-right'
    | 'top-center'"
 [participant]="participant">
</rtk-participant-setup>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant-setup/#page","headline":"rtk-participant-setup · Cloudflare Realtime docs","description":"API reference for rtk-participant-setup component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
