---
description: API reference for RtkPoll component (React Library)
title: RtkPoll
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPoll

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpoll/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A poll component. Shows a poll where a user can vote.

## Properties

| Property    | Type                 | Required | Default         | Description        |
| ----------- | -------------------- | -------- | --------------- | ------------------ |
| iconPack    | IconPack             | ❌        | defaultIconPack | Icon pack          |
| permissions | RTKPermissionsPreset | ✅        | \-              | Permissions Object |
| poll        | Poll                 | ✅        | \-              | Poll               |
| self        | string               | ✅        | \-              | Self ID            |
| t           | RtkI18n              | ❌        | useLanguage()   | Language           |

## Usage Examples

### Basic Usage

```tsx
import { RtkPoll } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return <RtkPoll />;
}
```

### With Properties

```tsx
import { RtkPoll } from '@cloudflare/realtimekit-react-ui';

function MyComponent() {
  return (
    <RtkPoll
      permissions={rtkpermissionspreset}
      poll={poll}
      self="example"
    />
  );
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpoll/#page","headline":"RtkPoll · Cloudflare Realtime docs","description":"API reference for RtkPoll component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkpoll/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
