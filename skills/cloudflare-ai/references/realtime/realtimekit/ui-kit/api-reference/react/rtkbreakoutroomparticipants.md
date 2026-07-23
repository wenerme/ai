---
description: API reference for RtkBreakoutRoomParticipants component (React Library)
title: RtkBreakoutRoomParticipants
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkBreakoutRoomParticipants

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomparticipants/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

```tsx
import { RtkBreakoutRoomParticipants } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkBreakoutRoomParticipants />;
}
```

### With Properties

```tsx
import { RtkBreakoutRoomParticipants } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkBreakoutRoomParticipants
      meeting={meeting}
      participantIds="example"
      selectedParticipantIds="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomparticipants/#page","headline":"RtkBreakoutRoomParticipants · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomParticipants component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomparticipants/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
