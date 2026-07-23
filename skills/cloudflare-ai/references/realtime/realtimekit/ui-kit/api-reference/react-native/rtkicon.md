---
description: API reference for RtkIcon component (React Native Library)
title: RtkIcon
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkIcon

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkicon/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Renders an SVG icon from an icon string, applying the current theme text color.

## Properties

| Property | Type   | Required | Default | Description               |
| -------- | ------ | -------- | ------- | ------------------------- |
| icon     | string | ✅        | \-      | SVG icon string to render |

## Usage Examples

### Basic Usage

```tsx
import { RtkIcon } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkIcon icon={svgIconString} />;
}
```

### With Properties

```tsx
import {
	RtkIcon,
	defaultIconPack,
} from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkIcon icon={defaultIconPack.mic_on} />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkicon/#page","headline":"RtkIcon · Cloudflare Realtime docs","description":"API reference for RtkIcon component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkicon/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
