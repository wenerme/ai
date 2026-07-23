---
description: API reference for RtkLeaveButton component (React Native Library)
title: RtkLeaveButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLeaveButton

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkleavebutton/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Button to trigger the leave meeting confirmation dialog.

## Properties

| Property | Type                     | Required | Default         | Description               |    |             |
| -------- | ------------------------ | -------- | --------------- | ------------------------- | -- | ----------- |
| variant  | 'button' \| 'horizontal' | ❌        | \-              | Layout variant            |    |             |
| size     | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                         | \- | Button size |
| iconPack | IconPack                 | ❌        | defaultIconPack | Custom icon pack          |    |             |
| t        | RtkI18n                  | ❌        | \-              | i18n translation function |    |             |

## Usage Examples

### Basic Usage

```tsx
import { RtkLeaveButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkLeaveButton />;
}
```

### With Properties

```tsx
import { RtkLeaveButton } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkLeaveButton variant="button" size="md" />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkleavebutton/#page","headline":"RtkLeaveButton · Cloudflare Realtime docs","description":"API reference for RtkLeaveButton component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkleavebutton/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
