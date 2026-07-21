---
description: API reference for rtk-paginated-list component (Web Components (HTML) Library)
title: rtk-paginated-list
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  rtk-paginated-list

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property       | Type                                                 | Required | Default         | Description                                    |
| -------------- | ---------------------------------------------------- | -------- | --------------- | ---------------------------------------------- |
| autoScroll     | boolean                                              | ✅        | \-              | auto scroll list to bottom                     |
| createNodes    | (data: unknown\[\])                                  | ✅        | \-              | Create nodes                                   |
| emptyListLabel | string                                               | ✅        | \-              | label to show when empty                       |
| fetchData      | (timestamp: number, size: number, reversed: boolean) | ✅        | \-              | Fetch the data                                 |
| iconPack       | IconPack                                             | ❌        | defaultIconPack | Icon pack                                      |
| pageSize       | number                                               | ✅        | \-              | Page Size                                      |
| pagesAllowed   | number                                               | ✅        | \-              | Number of pages allowed to be shown            |
| rerenderList   | ()                                                   | ✅        | \-              | Rerender paginated list                        |
| reset          | (timestamp?: number)                                 | ❌        | \-              | Resets the paginated list to a given timestamp |
| t              | RtkI18n                                              | ❌        | useLanguage()   | Language                                       |

## Usage Examples

### Basic Usage

```html
<rtk-paginated-list></rtk-paginated-list>
```

### With Properties

```html
<rtk-paginated-list
 emptyListLabel="example">
</rtk-paginated-list>
```

```html
<script>
  const el = document.querySelector("rtk-paginated-list");

  el.autoScroll= true;
  el.createNodes= [];
</script>
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/#page","headline":"rtk-paginated-list · Cloudflare Realtime docs","description":"API reference for rtk-paginated-list component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
