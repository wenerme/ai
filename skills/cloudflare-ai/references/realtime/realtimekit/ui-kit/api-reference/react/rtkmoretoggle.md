---
description: API reference for RtkMoreToggle component (React Library)
title: RtkMoreToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMoreToggle

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmoretoggle/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A button which toggles visibility of a more menu. When clicked it emits a `rtkStateUpdate` event with the data:

```ts
{ activeMoreMenu: boolean; }
```

## Properties

| Property | Type     | Required | Default         | Description   |
| -------- | -------- | -------- | --------------- | ------------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack     |
| size     | Size     | ✅        | \-              | Size          |
| states   | States   | ✅        | \-              | States object |
| t        | RtkI18n  | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```tsx
import { RtkMoreToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkMoreToggle />;
}
```

### With Properties

```tsx
import { RtkMoreToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkMoreToggle
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmoretoggle/#page","headline":"RtkMoreToggle · Cloudflare Realtime docs","description":"API reference for RtkMoreToggle component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmoretoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
