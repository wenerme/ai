---
description: API reference for RtkMenuList component (React Native Library)
title: RtkMenuList
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMenuList

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenulist/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A horizontal list container for menu items.

## Properties

| Property | Type      | Required | Default | Description       |
| -------- | --------- | -------- | ------- | ----------------- |
| children | ReactNode | ✅        | \-      | Menu list content |

## Usage Examples

### Basic Usage

```tsx
import {
	RtkMenuList,
	RtkMenuItem,
} from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkMenuList>
			<RtkMenuItem onClick={() => {}}>
				<Text>Item 1</Text>
			</RtkMenuItem>
			<RtkMenuItem onClick={() => {}}>
				<Text>Item 2</Text>
			</RtkMenuItem>
		</RtkMenuList>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenulist/#page","headline":"RtkMenuList · Cloudflare Realtime docs","description":"API reference for RtkMenuList component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenulist/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
