---
description: API reference for RtkLivestreamIndicator component (React Library)
title: RtkLivestreamIndicator
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLivestreamIndicator

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtklivestreamindicator/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type      | Required | Default         | Description    |
| -------- | --------- | -------- | --------------- | -------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting   | ✅        | \-              | Meeting object |
| size     | Size1     | ✅        | \-              | Size           |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```tsx
import { RtkLivestreamIndicator } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkLivestreamIndicator />;
}
```

### With Properties

```tsx
import { RtkLivestreamIndicator } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkLivestreamIndicator
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtklivestreamindicator/#page","headline":"RtkLivestreamIndicator · Cloudflare Realtime docs","description":"API reference for RtkLivestreamIndicator component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtklivestreamindicator/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
