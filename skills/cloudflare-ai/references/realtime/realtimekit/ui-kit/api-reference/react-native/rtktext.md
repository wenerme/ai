---
description: API reference for RtkText component (React Native Library)
title: RtkText
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkText

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Themed text component that applies the design system's colors, font family, and font size.

## Properties

| Property   | Type                 | Required | Default | Description                                        |       |                                        |       |       |       |       |   |          |             |
| ---------- | -------------------- | -------- | ------- | -------------------------------------------------- | ----- | -------------------------------------- | ----- | ----- | ----- | ----- | - | -------- | ----------- |
| children   | ReactNode            | ✅        | \-      | Text content                                       |       |                                        |       |       |       |       |   |          |             |
| size       | 'sm' \| 'md'         | 'lg'     | 'xl'    | ❌                                                  | 'md'  | Font size (sm=14, md=16, lg=18, xl=20) |       |       |       |       |   |          |             |
| fontWeight | 'normal' \| 'bold'   | '100'    | '200'   | '300'                                              | '400' | '500'                                  | '600' | '700' | '800' | '900' | ❌ | 'normal' | Font weight |
| style      | StyleProp<TextStyle> | ❌        | \\{\\}  | Custom text styles                                 |       |                                        |       |       |       |       |   |          |             |
| onBrand    | boolean              | ❌        | false   | Use brand text color instead of default text color |       |                                        |       |       |       |       |   |          |             |

## Usage Examples

### Basic Usage

```tsx
import { RtkText } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkText>Hello World</RtkText>;
}
```

### With Properties

```tsx
import { RtkText } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkText size="lg" fontWeight="bold" onBrand={true}>
			Meeting Title
		</RtkText>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/#page","headline":"RtkText · Cloudflare Realtime docs","description":"API reference for RtkText component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
