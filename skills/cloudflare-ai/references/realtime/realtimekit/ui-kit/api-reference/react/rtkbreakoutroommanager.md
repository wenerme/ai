---
description: API reference for RtkBreakoutRoomManager component (React Library)
title: RtkBreakoutRoomManager
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkBreakoutRoomManager

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property              | Type               | Required | Default         | Description                      |
| --------------------- | ------------------ | -------- | --------------- | -------------------------------- |
| allowDelete           | boolean            | ✅        | \-              | allow room delete                |
| assigningParticipants | boolean            | ✅        | \-              | Enable updating participants     |
| defaultExpanded       | boolean            | ✅        | \-              | display expanded card by default |
| iconPack              | IconPack           | ❌        | defaultIconPack | Icon pack                        |
| isDragMode            | boolean            | ✅        | \-              | Drag mode                        |
| meeting               | Meeting            | ✅        | \-              | Meeting object                   |
| mode                  | 'edit' \| 'create' | ✅        | \-              | Mode in which selector is used   |
| room                  | DraftMeeting       | ✅        | \-              | Connected Room Config Object     |
| states                | States             | ✅        | \-              | States object                    |
| t                     | RtkI18n            | ❌        | useLanguage()   | Language                         |

## Usage Examples

### Basic Usage

```tsx
import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkBreakoutRoomManager />;
}
```

### With Properties

```tsx
import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkBreakoutRoomManager
      allowDelete={true}
      assigningParticipants={true}
      defaultExpanded={true}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/#page","headline":"RtkBreakoutRoomManager · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomManager component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
