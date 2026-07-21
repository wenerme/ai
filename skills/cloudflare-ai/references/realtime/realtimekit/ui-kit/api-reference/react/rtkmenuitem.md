---
description: API reference for RtkMenuItem component (React Library)
title: RtkMenuItem
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMenuItem

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmenuitem/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A menu item component.

## Properties

| Property    | Type                     | Required | Default         | Description |
| ----------- | ------------------------ | -------- | --------------- | ----------- |
| iconPack    | IconPack                 | ❌        | defaultIconPack | Icon pack   |
| menuVariant | 'primary' \| 'secondary' | ✅        | \-              | Variant     |
| size        | Size                     | ✅        | \-              | Size        |
| t           | RtkI18n                  | ❌        | useLanguage()   | Language    |

## Usage Examples

### Basic Usage

```tsx
import { RtkMenuItem } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkMenuItem />;
}
```

### With Properties

```tsx
import { RtkMenuItem } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkMenuItem
      menuVariant={'primary' | 'secondary'}
      size="md"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmenuitem/#page","headline":"RtkMenuItem · Cloudflare Realtime docs","description":"API reference for RtkMenuItem component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkmenuitem/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
