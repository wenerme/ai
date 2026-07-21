---
description: API reference for RtkGrid component (React Native Library)
title: RtkGrid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkGrid

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgrid/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The main participant grid that automatically switches between simple, mixed, spotlight, and livestream layouts based on meeting state.

## Properties

| Property    | Type              | Required | Default         | Description                      |      |              |
| ----------- | ----------------- | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting     | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| config      | UIConfig          | ❌        | defaultConfig   | UI configuration object          |      |              |
| states      | States            | ❌        | \-              | UI state object                  |      |              |
| t           | RtkI18n           | ❌        | \-              | i18n translation function        |      |              |
| aspectRatio | string            | ❌        | '3:4'           | Aspect ratio for grid tiles      |      |              |
| gap         | number            | ❌        | 8               | Gap between grid tiles in pixels |      |              |
| iconPack    | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |      |              |
| size        | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | 'sm' | Size variant |

## Usage Examples

### Basic Usage

```tsx
import { RtkGrid } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkGrid meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkGrid } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkGrid meeting={meeting} aspectRatio="16:9" gap={12} size="md" />;
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgrid/#page","headline":"RtkGrid · Cloudflare Realtime docs","description":"API reference for RtkGrid component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgrid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
