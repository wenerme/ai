---
description: API reference for RtkSimpleGrid component (React Library)
title: RtkSimpleGrid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkSimpleGrid

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtksimplegrid/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A grid component which renders only the participants in a simple grid.

## Properties

| Property     | Type     | Required | Default               | Description                                           |
| ------------ | -------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio  | string   | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config       | UIConfig | ❌        | createDefaultConfig() | UI Config                                             |
| gap          | number   | ✅        | \-                    | Gap between participant tiles                         |
| iconPack     | IconPack | ❌        | defaultIconPack       | Icon Pack                                             |
| meeting      | Meeting  | ✅        | \-                    | Meeting object                                        |
| participants | Peer\[\] | ✅        | \-                    | Participants                                          |
| size         | Size     | ✅        | \-                    | Size                                                  |
| states       | States   | ✅        | \-                    | States object                                         |
| t            | RtkI18n  | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```tsx
import { RtkSimpleGrid } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkSimpleGrid />;
}
```

### With Properties

```tsx
import { RtkSimpleGrid } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkSimpleGrid
      aspectRatio="example"
      gap={42}
      meeting={meeting}
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtksimplegrid/#page","headline":"RtkSimpleGrid · Cloudflare Realtime docs","description":"API reference for RtkSimpleGrid component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtksimplegrid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
