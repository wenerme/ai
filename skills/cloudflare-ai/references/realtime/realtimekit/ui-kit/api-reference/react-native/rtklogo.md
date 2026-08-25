---
description: API reference for RtkLogo component (React Native Library)
title: RtkLogo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLogo

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtklogo/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Displays a logo from a URL (SVG format) in the meeting header.

## Properties

| Property | Type       | Required | Default | Description                                 |
| -------- | ---------- | -------- | ------- | ------------------------------------------- |
| meeting  | any        | ❌        | \-      | The RealtimeKit meeting instance            |
| config   | UIConfig   | ❌        | \-      | UI configuration object                     |
| logoUrl  | string     | ❌        | \-      | URL of the logo SVG to display              |
| style    | StyleProps | ❌        | \-      | Style object with width/height for the logo |
| t        | RtkI18n    | ❌        | \-      | i18n translation function                   |

## Usage Examples

### Basic Usage

```tsx
import { RtkLogo } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkLogo logoUrl="https://example.com/logo.svg" />;
}
```

### With Properties

```tsx
import { RtkLogo } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkLogo
			logoUrl="https://example.com/logo.svg"
			style={{ width: 120, height: 40 }}
			config={customConfig}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtklogo/#page","headline":"RtkLogo · Cloudflare Realtime docs","description":"API reference for RtkLogo component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtklogo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
