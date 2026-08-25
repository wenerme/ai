---
description: API reference for RtkImageViewer component (React Native Library)
title: RtkImageViewer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkImageViewer

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkimageviewer/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Image viewer with fullscreen toggle and download functionality for chat images.

## Properties

| Property    | Type             | Required | Default         | Description                                         |    |              |
| ----------- | ---------------- | -------- | --------------- | --------------------------------------------------- | -- | ------------ |
| image       | any              | ✅        | \-              | The image message object                            |    |              |
| size        | 'lg' \| 'md'     | 'sm'     | 'xl'            | ❌                                                   | \- | Size variant |
| iconPack    | IconPack         | ❌        | defaultIconPack | Custom icon pack                                    |    |              |
| t           | RtkI18n          | ❌        | \-              | i18n translation function                           |    |              |
| isContinued | boolean          | ❌        | false           | Whether this message continues from the same sender |    |              |
| \_id        | string \| number | ❌        | \-              | Unique identifier for fullscreen tracking           |    |              |

## Usage Examples

### Basic Usage

```tsx
import { RtkImageViewer } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkImageViewer image={imageMessage} />;
}
```

### With Properties

```tsx
import { RtkImageViewer } from "@cloudflare/realtimekit-react-native-ui";

function MyComponent() {
	return <RtkImageViewer image={imageMessage} size="md" _id="viewer-1" />;
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkimageviewer/#page","headline":"RtkImageViewer · Cloudflare Realtime docs","description":"API reference for RtkImageViewer component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkimageviewer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
