---
description: API reference for RtkControlbarButton component (React Native Library)
title: RtkControlbarButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkControlbarButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A reusable button for the control bar with icon, label, loading state, and warning indicator support.

## Properties

| Property    | Type                     | Required | Default         | Description                          |      |           |
| ----------- | ------------------------ | -------- | --------------- | ------------------------------------ | ---- | --------- |
| label       | string                   | ✅        | ' '             | Button label text                    |      |           |
| icon        | string                   | ✅        | \-              | SVG icon string                      |      |           |
| iconPack    | IconPack                 | ❌        | defaultIconPack | Custom icon pack                     |      |           |
| isLoading   | boolean                  | ❌        | false           | Show loading spinner instead of icon |      |           |
| disabled    | boolean                  | ❌        | false           | Whether the button is disabled       |      |           |
| onClick     | () => void               | ❌        | \-              | Press handler callback               |      |           |
| showWarning | boolean                  | ❌        | false           | Show warning indicator               |      |           |
| variant     | 'button' \| 'horizontal' | ❌        | 'button'        | Layout variant                       |      |           |
| size        | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                                    | 'sm' | Icon size |

## Usage Examples

### Basic Usage

```tsx
import { RtkControlbarButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkControlbarButton label="Mute" icon={muteIcon} />;
}
```

### With Properties

```tsx
import { RtkControlbarButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkControlbarButton
			label="Mute"
			icon={muteIcon}
			variant="horizontal"
			size="md"
			onClick={() => console.log("pressed")}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/#page","headline":"RtkControlbarButton · Cloudflare Realtime docs","description":"API reference for RtkControlbarButton component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
