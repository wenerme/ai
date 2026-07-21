---
description: API reference for RtkGrid component (React Library)
title: RtkGrid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkGrid

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The main grid component which abstracts all the grid handling logic and renders it for you.

## Properties

| Property    | Type       | Required | Default               | Description                          |
| ----------- | ---------- | -------- | --------------------- | ------------------------------------ |
| aspectRatio | string     | ✅        | \-                    | The aspect ratio of each participant |
| config      | UIConfig   | ❌        | createDefaultConfig() | Config object                        |
| gap         | number     | ✅        | \-                    | Gap between participants             |
| gridSize    | GridSize   | ✅        | \-                    | Grid size                            |
| iconPack    | IconPack   | ❌        | defaultIconPack       | Icon pack                            |
| layout      | GridLayout | ✅        | \-                    | Grid Layout                          |
| meeting     | Meeting    | ✅        | \-                    | Meeting object                       |
| overrides   | any        | ✅        | \-                    | @deprecated                          |
| size        | Size       | ✅        | \-                    | Size                                 |
| states      | States     | ✅        | \-                    | States                               |
| t           | RtkI18n    | ❌        | useLanguage()         | Language                             |

## Usage Examples

### Basic Usage

```tsx
import { RtkGrid } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkGrid />;
}
```

### With Properties

```tsx
import { RtkGrid } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkGrid
      aspectRatio="example"
      gap={42}
      gridSize="md"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/#page","headline":"RtkGrid · Cloudflare Realtime docs","description":"API reference for RtkGrid component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
