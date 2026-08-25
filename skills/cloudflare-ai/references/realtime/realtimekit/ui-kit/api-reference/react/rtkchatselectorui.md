---
description: API reference for RtkChatSelectorUi component (React Library)
title: RtkChatSelectorUi
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkChatSelectorUi

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselectorui/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property        | Type                   | Required | Default         | Description          |
| --------------- | ---------------------- | -------- | --------------- | -------------------- |
| groups          | ChatGroup\[\]          | ✅        | \-              | Participants         |
| iconPack        | IconPack1              | ❌        | defaultIconPack | Icon pack            |
| selectedGroupId | string                 | ✅        | \-              | Selected participant |
| selfUserId      | string                 | ✅        | \-              | Self User ID         |
| t               | RtkI18n                | ❌        | useLanguage()   | Language             |
| unreadCounts    | Record<string, number> | ✅        | \-              | Unread counts        |

## Usage Examples

### Basic Usage

```tsx
import { RtkChatSelectorUi } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkChatSelectorUi />;
}
```

### With Properties

```tsx
import { RtkChatSelectorUi } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkChatSelectorUi
      groups={[]}
      selectedGroupId="example"
      selfUserId="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselectorui/#page","headline":"RtkChatSelectorUi · Cloudflare Realtime docs","description":"API reference for RtkChatSelectorUi component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselectorui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
