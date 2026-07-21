---
description: API reference for RtkCaptionToggle component (React Library)
title: RtkCaptionToggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkCaptionToggle

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcaptiontoggle/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type              | Required | Default               | Description    |
| -------- | ----------------- | -------- | --------------------- | -------------- |
| config   | UIConfig1         | ❌        | createDefaultConfig() | Config         |
| iconPack | IconPack1         | ❌        | defaultIconPack       | Icon pack      |
| meeting  | Meeting           | ✅        | \-                    | Meeting object |
| size     | Size1             | ✅        | \-                    | Size           |
| states   | States1           | ✅        | \-                    | States object  |
| t        | RtkI18n           | ❌        | useLanguage()         | Language       |
| variant  | ControlBarVariant | ✅        | \-                    | Variant        |

## Usage Examples

### Basic Usage

```tsx
import { RtkCaptionToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkCaptionToggle />;
}
```

### With Properties

```tsx
import { RtkCaptionToggle } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkCaptionToggle
      meeting={meeting}
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcaptiontoggle/#page","headline":"RtkCaptionToggle · Cloudflare Realtime docs","description":"API reference for RtkCaptionToggle component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkcaptiontoggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
