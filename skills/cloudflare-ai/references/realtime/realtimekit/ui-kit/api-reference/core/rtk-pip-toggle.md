---
description: API reference for rtk-pip-toggle component (Web Components (HTML) Library)
title: rtk-pip-toggle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-pip-toggle

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type              | Required | Default               | Description    |
| -------- | ----------------- | -------- | --------------------- | -------------- |
| config   | UIConfig1         | ❌        | createDefaultConfig() | Config         |
| iconPack | IconPack1         | ❌        | defaultIconPack       | Icon pack      |
| meeting  | Meeting           | ✅        | \-                    | Meeting object |
| size     | Size1             | ✅        | \-                    | Size           |
| states   | States1           | ✅        | \-                    | States object  |
| t        | RtkI18n           | ❌        | useLanguage()         | Language       |
| variant  | ControlBarVariant | ✅        | \-                    | Variant        |

## Usage Examples

### Basic Usage

```html
<rtk-pip-toggle></rtk-pip-toggle>
```

### With Properties

```html
<rtk-pip-toggle
 size="md"
 variant"button">
</rtk-pip-toggle>
```

```html
<script>
  const el = document.querySelector("rtk-pip-toggle");

  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/#page","headline":"rtk-pip-toggle · Cloudflare Realtime docs","description":"API reference for rtk-pip-toggle component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
