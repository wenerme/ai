---
description: API reference for rtk-participant component (Angular Library)
title: rtk-participant
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-participant

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A participant entry component used inside `rtk-participants` which shows data like: name, picture and media device status. You can perform privileged actions on the participant too.

## Properties

| Property    | Type                | Required | Default               | Description              |
| ----------- | ------------------- | -------- | --------------------- | ------------------------ |
| config      | UIConfig1           | ❌        | createDefaultConfig() | Config object            |
| iconPack    | IconPack            | ❌        | defaultIconPack       | Icon pack                |
| meeting     | Meeting             | ✅        | \-                    | Meeting object           |
| participant | Peer                | ✅        | \-                    | Participant object       |
| states      | States1             | ✅        | \-                    | States                   |
| t           | RtkI18n             | ❌        | useLanguage()         | Language                 |
| view        | ParticipantViewMode | ✅        | \-                    | Show participant summary |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-participant></rtk-participant>
```

### With Properties

```html
<!-- component.html -->
<rtk-participant
 [meeting]="meeting"
 [participant]="participant"
 [view]="participantviewmode">
</rtk-participant>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/#page","headline":"rtk-participant · Cloudflare Realtime docs","description":"API reference for rtk-participant component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
