---
description: API reference for rtk-header component (Web Components (HTML) Library)
title: rtk-header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-header

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component that houses all the header components.

## Properties

| Property      | Type               | Required | Default               | Description                      |
| ------------- | ------------------ | -------- | --------------------- | -------------------------------- |
| config        | UIConfig1          | ❌        | createDefaultConfig() | Config                           |
| disableRender | boolean            | ✅        | \-                    | Whether to render the default UI |
| iconPack      | IconPack1          | ❌        | defaultIconPack       | Icon Pack                        |
| meeting       | Meeting            | ✅        | \-                    | Meeting                          |
| size          | Size               | ✅        | \-                    | Size                             |
| states        | States             | ✅        | \-                    | States                           |
| t             | RtkI18n            | ❌        | useLanguage()         | Language                         |
| variant       | 'solid' \| 'boxed' | ✅        | \-                    | Variant                          |

## Usage Examples

### Basic Usage

```html
<rtk-header></rtk-header>
```

### With Properties

```html
<rtk-header
 size="md">
</rtk-header>
```

```html
<script>
  const el = document.querySelector("rtk-header");

  el.disableRender= true;
  el.meeting= meeting
</script>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/#page","headline":"rtk-header · Cloudflare Realtime docs","description":"API reference for rtk-header component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
