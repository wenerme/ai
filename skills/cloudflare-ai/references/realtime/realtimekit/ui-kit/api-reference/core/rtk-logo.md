---
description: API reference for rtk-logo component (Web Components (HTML) Library)
title: rtk-logo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-logo

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-logo/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which loads the logo from your config, or via the `logo-url` attribute.

## Properties

| Property | Type     | Required | Default               | Description    |
| -------- | -------- | -------- | --------------------- | -------------- |
| config   | UIConfig | ❌        | createDefaultConfig() | Config object  |
| logoUrl  | string   | ✅        | \-                    | Logo URL       |
| meeting  | Meeting  | ✅        | \-                    | Meeting object |
| t        | RtkI18n  | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```html
<rtk-logo></rtk-logo>
```

### With Properties

```html
<rtk-logo
 logoUrl="example">
</rtk-logo>
```

```html
<script>
  const el = document.querySelector("rtk-logo");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-logo/#page","headline":"rtk-logo · Cloudflare Realtime docs","description":"API reference for rtk-logo component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-logo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
