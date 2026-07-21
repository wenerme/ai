---
description: API reference for RtkNotifications component (React Native Library)
title: RtkNotifications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkNotifications

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtknotifications/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Container that manages and displays meeting notifications (participant join/leave, chat messages, polls, network status) with sound effects.

## Properties

| Property | Type              | Required | Default         | Description                      |      |              |
| -------- | ----------------- | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| config   | UIConfig          | ✅        | defaultConfig   | UI configuration object          |      |              |
| iconPack | IconPack          | ✅        | defaultIconPack | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ✅                                | 'sm' | Size variant |
| states   | States            | ✅        | \-              | UI state object                  |      |              |
| t        | RtkI18n           | ✅        | \-              | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```tsx
import {
	RtkNotifications,
	useLanguage,
} from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	const t = useLanguage();
	return (
		<RtkNotifications
			meeting={meeting}
			config={config}
			iconPack={iconPack}
			size="sm"
			states={states}
			t={t}
		/>
	);
}
```

### With Properties

```tsx
import {
	RtkNotifications,
	defaultConfig,
	defaultIconPack,
	useLanguage,
} from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	const t = useLanguage();
	return (
		<RtkNotifications
			meeting={meeting}
			config={defaultConfig}
			iconPack={defaultIconPack}
			size="md"
			states={states}
			t={t}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtknotifications/#page","headline":"RtkNotifications · Cloudflare Realtime docs","description":"API reference for RtkNotifications component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtknotifications/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
