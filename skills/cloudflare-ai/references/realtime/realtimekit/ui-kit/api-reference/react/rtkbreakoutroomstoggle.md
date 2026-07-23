---
description: API reference for RtkBreakoutRoomsToggle component (React Library)
title: RtkBreakoutRoomsToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkBreakoutRoomsToggle

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomstoggle/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button which toggles visibility of breakout rooms. You need to pass the `meeting` object to it.

## Properties

| Property | Type              | Required | Default | Description    |
| -------- | ----------------- | -------- | ------- | -------------- |
| iconPack | IconPack          | ✅        | \-      | Icon pack      |
| meeting  | Meeting           | ✅        | \-      | Meeting object |
| size     | Size              | ✅        | \-      | Size           |
| states   | States            | ✅        | \-      | States object  |
| t        | RtkI18n           | ✅        | \-      | Language       |
| variant  | ControlBarVariant | ✅        | \-      | Variant        |

## Usage Examples

### Basic Usage

```tsx
import { RtkBreakoutRoomsToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkBreakoutRoomsToggle />;
}
```

### With Properties

```tsx
import { RtkBreakoutRoomsToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkBreakoutRoomsToggle
      iconPack={defaultIconPack}
      meeting={meeting}
      size="md"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomstoggle/#page","headline":"RtkBreakoutRoomsToggle · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomsToggle component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroomstoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
