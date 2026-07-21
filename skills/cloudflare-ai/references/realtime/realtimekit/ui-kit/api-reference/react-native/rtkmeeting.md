---
description: API reference for RtkMeeting component (React Native Library)
title: RtkMeeting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMeeting

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmeeting/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The top-level meeting component that orchestrates the entire meeting UI. Manages meeting lifecycle (idle, setup, joined, ended, waiting states), applies design system, handles room join/leave events, and renders the appropriate screen. With this component, you do not have to handle all the states, dialogs, and other smaller bits of managing the application.

## Properties

| Property              | Type              | Required | Default       | Description                                                              |
| --------------------- | ----------------- | -------- | ------------- | ------------------------------------------------------------------------ |
| meeting               | RealtimeKitClient | ✅        | \-            | The RealtimeKit meeting instance                                         |
| applyDesignSystem     | boolean           | ❌        | true          | Whether to apply the preset design system colors from the meeting config |
| config                | UIConfig          | ❌        | defaultConfig | UI configuration object                                                  |
| iconPackUrl           | string            | ❌        | ''            | URL to fetch a custom icon pack from                                     |
| showSetupScreen       | boolean           | ❌        | true          | Whether to show the setup/preview screen before joining                  |
| iOSScreenshareEnabled | boolean           | ❌        | false         | Turn on screenshare on iOS (requires additional native setup)            |
| t                     | RtkI18n           | ❌        | \-            | i18n translation function                                                |

## Usage Examples

### Basic Usage

```tsx
import { RtkMeeting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkMeeting meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkMeeting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkMeeting
			meeting={meeting}
			applyDesignSystem={true}
			showSetupScreen={true}
			iOSScreenshareEnabled={false}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmeeting/#page","headline":"RtkMeeting · Cloudflare Realtime docs","description":"API reference for RtkMeeting component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmeeting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
