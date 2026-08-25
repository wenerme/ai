---
description: API reference for rtk-tooltip component (Web Components (HTML) Library)
title: rtk-tooltip
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-tooltip

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Tooltip component which follows RTK Design System.

## Properties

| Property  | Type           | Required | Default | Description                      |
| --------- | -------------- | -------- | ------- | -------------------------------- |
| delay     | number         | ✅        | \-      | Delay before showing the tooltip |
| disabled  | boolean        | ✅        | \-      | Disabled                         |
| kind      | TooltipKind    | ✅        | \-      | Tooltip kind                     |
| label     | string         | ✅        | \-      | Tooltip label                    |
| open      | boolean        | ✅        | \-      | Open                             |
| placement | Placement      | ✅        | \-      | Placement of menu                |
| size      | Size           | ✅        | \-      | Size                             |
| variant   | TooltipVariant | ✅        | \-      | Tooltip variant                  |

## Usage Examples

### Basic Usage

```html
<rtk-tooltip></rtk-tooltip>
```

### With Properties

```html
<rtk-tooltip>
</rtk-tooltip>
```

```html
<script>
  const el = document.querySelector("rtk-tooltip");

  el.delay= 42;
  el.disabled= true;
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/#page","headline":"rtk-tooltip · Cloudflare Realtime docs","description":"API reference for rtk-tooltip component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
