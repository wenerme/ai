---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: API reference for RtkLeaveMeeting component (React Native Library)
title: RtkLeaveMeeting
image: https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkleavemeeting/og.png?v=137f2448c398f78a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkLeaveMeeting

Leave meeting confirmation dialog with options to leave or end the meeting for all (if host).

## Properties

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `meeting` | `RealtimeKitClient` | ✅ | - | The RealtimeKit meeting instance |
| `onClose` | `any` | ✅ | - | Callback to close the dialog |
| `iconPack` | `IconPack` | ❌ | `defaultIconPack` | Custom icon pack |
| `states` | `States` | ❌ | - | UI state object |
| `t` | `RtkI18n` | ❌ | - | i18n translation function |

## Usage Examples

### Basic Usage

```tsx
import { RtkLeaveMeeting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkLeaveMeeting meeting={meeting} onClose={() => setOpen(false)} />;
}
```

### With Properties

```tsx
import { RtkLeaveMeeting } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return (
		<RtkLeaveMeeting
			meeting={meeting}
			onClose={() => setOpen(false)}
			states={states}
		/>
	);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkleavemeeting/#page","headline":"RtkLeaveMeeting","description":"API reference for RtkLeaveMeeting component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkleavemeeting/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/react-native/rtkleavemeeting/og.png?v=137f2448c398f78a","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
