---
description: API reference for RtkLeaveButton component (React Library)
title: RtkLeaveButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkLeaveButton

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkleavebutton/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A button which toggles visilibility of the leave confirmation dialog.

## Properties

| Property | Type              | Required | Default         | Description |
| -------- | ----------------- | -------- | --------------- | ----------- |
| iconPack | IconPack          | ❌        | defaultIconPack | Icon pack   |
| size     | Size              | ✅        | \-              | Size        |
| t        | RtkI18n           | ❌        | useLanguage()   | Language    |
| variant  | ControlBarVariant | ✅        | \-              | Variant     |

## Usage Examples

### Basic Usage

```tsx
import { RtkLeaveButton } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkLeaveButton />;
}
```

### With Properties

```tsx
import { RtkLeaveButton } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkLeaveButton
      size="md"
      variant="button"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkleavebutton/#page","headline":"RtkLeaveButton · Cloudflare Realtime docs","description":"API reference for RtkLeaveButton component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkleavebutton/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
