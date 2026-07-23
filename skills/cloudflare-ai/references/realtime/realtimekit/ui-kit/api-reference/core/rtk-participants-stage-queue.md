---
description: API reference for rtk-participants-stage-queue component (Web Components (HTML) Library)
title: rtk-participants-stage-queue
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-participants-stage-queue

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-queue/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type                 | Required | Default               | Description                     |
| -------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config   | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| iconPack | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting  | Meeting              | ✅        | \-                    | Meeting object                  |
| size     | Size1                | ✅        | \-                    | Size                            |
| t        | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view     | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```html
<rtk-participants-stage-queue></rtk-participants-stage-queue>
```

### With Properties

```html
<rtk-participants-stage-queue
 size="md">
</rtk-participants-stage-queue>
```

```html
<script>
  const el = document.querySelector("rtk-participants-stage-queue");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-queue/#page","headline":"rtk-participants-stage-queue · Cloudflare Realtime docs","description":"API reference for rtk-participants-stage-queue component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-queue/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
