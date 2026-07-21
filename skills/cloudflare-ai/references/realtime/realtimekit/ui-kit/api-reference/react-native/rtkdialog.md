---
description: API reference for RtkDialog component (React Native Library)
title: RtkDialog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkDialog

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A modal dialog overlay component with optional close button.

## Properties

| Property         | Type              | Required | Default         | Description                      |    |              |
| ---------------- | ----------------- | -------- | --------------- | -------------------------------- | -- | ------------ |
| children         | ReactNode         | ✅        | \-              | Dialog content                   |    |              |
| meeting          | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |    |              |
| onRtkDialogClose | any               | ✅        | \-              | Callback when dialog is closed   |    |              |
| config           | UIConfig          | ❌        | defaultConfig   | UI configuration object          |    |              |
| hideCloseButton  | boolean           | ❌        | false           | Hide the close button            |    |              |
| open             | boolean           | ❌        | \-              | Whether the dialog is visible    |    |              |
| size             | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | \- | Size variant |
| states           | States            | ❌        | \-              | UI state object                  |    |              |
| iconPack         | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |    |              |
| t                | RtkI18n           | ❌        | \-              | i18n translation function        |    |              |

## Usage Examples

### Basic Usage

```tsx
import { RtkDialog } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkDialog meeting={meeting} onRtkDialogClose={() => setOpen(false)}>
			<Text>Dialog content</Text>
		</RtkDialog>
	);
}
```

### With Properties

```tsx
import { RtkDialog } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkDialog
			meeting={meeting}
			open={isOpen}
			onRtkDialogClose={() => setOpen(false)}
			hideCloseButton={false}
			size="md"
		>
			<Text>Dialog content</Text>
		</RtkDialog>
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/#page","headline":"RtkDialog · Cloudflare Realtime docs","description":"API reference for RtkDialog component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkdialog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
