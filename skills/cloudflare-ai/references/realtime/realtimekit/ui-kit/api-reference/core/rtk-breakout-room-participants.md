---
description: API reference for rtk-breakout-room-participants component (Web Components (HTML) Library)
title: rtk-breakout-room-participants
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-breakout-room-participants

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-breakout-room-participants/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which lists all participants, with ability to run privileged actions on each participant according to your permissions.

## Properties

| Property               | Type       | Required | Default         | Description           |
| ---------------------- | ---------- | -------- | --------------- | --------------------- |
| iconPack               | IconPack   | ❌        | defaultIconPack | Icon pack             |
| meeting                | Meeting    | ✅        | \-              | Meeting object        |
| participantIds         | string\[\] | ✅        | \-              | Participant ids       |
| selectedParticipantIds | string\[\] | ✅        | \-              | selected participants |
| t                      | RtkI18n    | ❌        | useLanguage()   | Language              |

## Usage Examples

### Basic Usage

```html
<rtk-breakout-room-participants></rtk-breakout-room-participants>
```

### With Properties

```html
<rtk-breakout-room-participants
 participantIds="example"
 selectedParticipantIds="example">
</rtk-breakout-room-participants>
```

```html
<script>
  const el = document.querySelector("rtk-breakout-room-participants");

  el.meeting= meeting
  el.participantIds= [];
  el.selectedParticipantIds= [];
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-breakout-room-participants/#page","headline":"rtk-breakout-room-participants · Cloudflare Realtime docs","description":"API reference for rtk-breakout-room-participants component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-breakout-room-participants/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
