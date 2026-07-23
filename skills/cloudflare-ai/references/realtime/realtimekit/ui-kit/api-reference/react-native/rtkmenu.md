---
description: API reference for RtkMenu component (React Native Library)
title: RtkMenu
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkMenu

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A menu container component with placement options.

## Properties

| Property  | Type                     | Required       | Default | Description  |              |              |             |               |       |           |             |   |    |                                    |
| --------- | ------------------------ | -------------- | ------- | ------------ | ------------ | ------------ | ----------- | ------------- | ----- | --------- | ----------- | - | -- | ---------------------------------- |
| children  | ReactNode                | ✅              | \-      | Menu content |              |              |             |               |       |           |             |   |    |                                    |
| size      | 'lg' \| 'md'             | 'sm'           | 'xl'    | ✅            | \-           | Size variant |             |               |       |           |             |   |    |                                    |
| placement | 'bottom' \| 'bottom-end' | 'bottom-start' | 'left'  | 'left-end'   | 'left-start' | 'right'      | 'right-end' | 'right-start' | 'top' | 'top-end' | 'top-start' | ✅ | \- | Menu placement relative to trigger |

## Usage Examples

### Basic Usage

```tsx
import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkMenu size="md" placement="bottom">
			<Text>Menu content</Text>
		</RtkMenu>
	);
}
```

### With Properties

```tsx
import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkMenu size="lg" placement="bottom-start">
			<Text>Menu content</Text>
		</RtkMenu>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/#page","headline":"RtkMenu · Cloudflare Realtime docs","description":"API reference for RtkMenu component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
