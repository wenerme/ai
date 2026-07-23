---
description: API reference for RtkUIProvider component (React Native Library)
title: RtkUIProvider
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkUIProvider

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkuiprovider/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Context provider component that wraps the meeting UI. Provides SafeAreaView, state management, and back button handling. Must wrap all Rtk UI components.

## Properties

| Property | Type      | Required | Default | Description              |
| -------- | --------- | -------- | ------- | ------------------------ |
| children | ReactNode | ✅        | \-      | Child components to wrap |

## Usage Examples

### Basic Usage

```tsx
import {
	RtkUIProvider,
	RtkMeeting,
} from "@cloudflare/realtimekit-react-native-ui";

function App() {
	return (
		<RtkUIProvider>
			<RtkMeeting meeting={meeting} />
		</RtkUIProvider>
	);
}
```

### With Properties

```tsx
import {
	RtkUIProvider,
	RtkGrid,
	RtkControlbar,
	RtkHeader,
} from "@cloudflare/realtimekit-react-native-ui";

function App() {
	return (
		<RtkUIProvider>
			<RtkHeader meeting={meeting} />
			<RtkGrid meeting={meeting} />
			<RtkControlbar meeting={meeting} />
		</RtkUIProvider>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkuiprovider/#page","headline":"RtkUIProvider · Cloudflare Realtime docs","description":"API reference for RtkUIProvider component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkuiprovider/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
