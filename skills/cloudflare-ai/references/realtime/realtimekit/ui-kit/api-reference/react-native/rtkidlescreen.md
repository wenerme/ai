---
description: API reference for RtkIdleScreen component (React Native Library)
title: RtkIdleScreen
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkIdleScreen

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkidlescreen/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Loading/idle screen displayed while the meeting is initializing, showing a logo and spinner.

## Properties

| Property | Type     | Required | Default | Description                                 |
| -------- | -------- | -------- | ------- | ------------------------------------------- |
| config   | UIConfig | ✅        | \-      | UI configuration object (used for logo URL) |

## Usage Examples

### Basic Usage

```tsx
import { RtkIdleScreen } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkIdleScreen config={config} />;
}
```

### With Properties

```tsx
import {
	RtkIdleScreen,
	defaultConfig,
} from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkIdleScreen config={defaultConfig} />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkidlescreen/#page","headline":"RtkIdleScreen · Cloudflare Realtime docs","description":"API reference for RtkIdleScreen component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkidlescreen/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
