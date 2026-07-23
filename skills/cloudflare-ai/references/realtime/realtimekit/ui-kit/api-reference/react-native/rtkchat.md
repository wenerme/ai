---
description: API reference for RtkChat component (React Native Library)
title: RtkChat
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkChat

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkchat/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Full chat interface with message list, text input, image/file upload support, and pinned messages.

## Properties

| Property | Type              | Required | Default         | Description                      |      |              |
| -------- | ----------------- | -------- | --------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |      |              |
| config   | UIConfig          | ❌        | defaultConfig   | UI configuration object          |      |              |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |      |              |
| size     | 'lg' \| 'md'      | 'sm'     | 'xl'            | ❌                                | 'sm' | Size variant |
| t        | RtkI18n           | ❌        | \-              | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```tsx
import { RtkChat } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkChat meeting={meeting} />;
}
```

### With Properties

```tsx
import { RtkChat } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkChat meeting={meeting} size="md" config={customConfig} />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkchat/#page","headline":"RtkChat · Cloudflare Realtime docs","description":"API reference for RtkChat component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkchat/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
