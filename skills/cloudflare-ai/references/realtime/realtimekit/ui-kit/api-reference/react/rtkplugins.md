---
description: API reference for RtkPlugins component (React Library)
title: RtkPlugins
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPlugins

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkplugins/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which lists all available plugins from their preset, and ability to enable or disable plugins.

## Properties

| Property | Type     | Required | Default               | Description    |
| -------- | -------- | -------- | --------------------- | -------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | Config         |
| iconPack | IconPack | ❌        | defaultIconPack       | Icon pack      |
| meeting  | Meeting  | ✅        | \-                    | Meeting object |
| size     | Size     | ✅        | \-                    | Size           |
| t        | RtkI18n  | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```tsx
import { RtkPlugins } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkPlugins />;
}
```

### With Properties

```tsx
import { RtkPlugins } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkPlugins
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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkplugins/#page","headline":"RtkPlugins · Cloudflare Realtime docs","description":"API reference for RtkPlugins component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkplugins/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
