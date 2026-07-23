---
description: API reference for RtkAudioTile component (React Library)
title: RtkAudioTile
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAudioTile

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkaudiotile/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property    | Type      | Required | Default         | Description        |
| ----------- | --------- | -------- | --------------- | ------------------ |
| config      | UIConfig  | ✅        | \-              | Config             |
| iconPack    | IconPack1 | ❌        | defaultIconPack | Icon pack          |
| meeting     | Meeting   | ✅        | \-              | Meeting            |
| participant | Peer      | ✅        | \-              | Participant object |
| size        | Size      | ✅        | \-              | Size               |
| states      | States1   | ✅        | \-              | States             |
| t           | RtkI18n1  | ❌        | useLanguage()   | Language           |

## Usage Examples

### Basic Usage

```tsx
import { RtkAudioTile } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkAudioTile />;
}
```

### With Properties

```tsx
import { RtkAudioTile } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkAudioTile
      config={defaultUiConfig}
      meeting={meeting}
      participant={participant}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkaudiotile/#page","headline":"RtkAudioTile · Cloudflare Realtime docs","description":"API reference for RtkAudioTile component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkaudiotile/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
