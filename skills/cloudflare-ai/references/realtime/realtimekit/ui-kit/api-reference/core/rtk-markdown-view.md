---
description: API reference for rtk-markdown-view component (Web Components (HTML) Library)
title: rtk-markdown-view
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-markdown-view

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-markdown-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property  | Type   | Required | Default | Description                              |
| --------- | ------ | -------- | ------- | ---------------------------------------- |
| maxLength | number | ✅        | \-      | max length of text to render as markdown |
| text      | string | ✅        | \-      | raw text to render as markdown           |

## Usage Examples

### Basic Usage

```html
<rtk-markdown-view></rtk-markdown-view>
```

### With Properties

```html
<rtk-markdown-view
 text="example">
</rtk-markdown-view>
```

```html
<script>
  const el = document.querySelector("rtk-markdown-view");

  el.maxLength= 42;
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-markdown-view/#page","headline":"rtk-markdown-view · Cloudflare Realtime docs","description":"API reference for rtk-markdown-view component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-markdown-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
