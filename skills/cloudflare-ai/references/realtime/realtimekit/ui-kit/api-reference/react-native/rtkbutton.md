---
description: API reference for RtkButton component (React Native Library)
title: RtkButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A general-purpose button component with multiple variants and sizes.

## Properties

| Property | Type                | Required  | Default     | Description                      |             |                      |
| -------- | ------------------- | --------- | ----------- | -------------------------------- | ----------- | -------------------- |
| children | ReactNode           | ❌         | \-          | Button content/label             |             |                      |
| onClick  | any                 | ✅         | \-          | Press handler callback           |             |                      |
| kind     | 'button' \| 'icon'  | 'wide'    | ❌           | 'button'                         | Button kind |                      |
| variant  | 'danger' \| 'ghost' | 'primary' | 'secondary' | ❌                                | \-          | Visual style variant |
| size     | 'lg' \| 'md'        | 'sm'      | 'xl'        | ❌                                | \-          | Button size          |
| reverse  | boolean             | ❌         | false       | Reverse the button content order |             |                      |
| disabled | boolean             | ❌         | \-          | Whether the button is disabled   |             |                      |
| style    | StyleProp<any>      | ❌         | \-          | Custom React Native styles       |             |                      |

## Usage Examples

### Basic Usage

```tsx
import { RtkButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkButton onClick={() => console.log("pressed")}>Press Me</RtkButton>;
}
```

### With Properties

```tsx
import { RtkButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkButton
			onClick={() => console.log("pressed")}
			variant="primary"
			size="md"
			kind="wide"
		>
			Join Meeting
		</RtkButton>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
