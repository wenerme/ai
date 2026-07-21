---
description: API reference for RtkFileMessage component (React Native Library)
title: RtkFileMessage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkFileMessage

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkfilemessage/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Renders a file message in chat with file name, size, extension, and download button.

## Properties

| Property    | Type     | Required | Default         | Description                                         |
| ----------- | -------- | -------- | --------------- | --------------------------------------------------- |
| message     | Message  | ✅        | \-              | The chat message object                             |
| isContinued | boolean  | ❌        | false           | Whether this message continues from the same sender |
| now         | Date     | ❌        | new Date()      | Current time for relative timestamps                |
| iconPack    | IconPack | ❌        | defaultIconPack | Custom icon pack                                    |

## Usage Examples

### Basic Usage

```tsx
import { RtkFileMessage } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkFileMessage message={message} />;
}
```

### With Properties

```tsx
import { RtkFileMessage } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkFileMessage message={message} isContinued={true} now={new Date()} />
	);
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkfilemessage/#page","headline":"RtkFileMessage · Cloudflare Realtime docs","description":"API reference for RtkFileMessage component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkfilemessage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
