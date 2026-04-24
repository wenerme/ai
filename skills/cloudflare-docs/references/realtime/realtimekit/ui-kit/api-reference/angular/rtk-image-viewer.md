---
title: rtk-image-viewer
description: API reference for rtk-image-viewer component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-image-viewer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-image-viewer

A component which shows an image sent via chat.

## Properties

| Property | Type         | Required | Default         | Description   |
| -------- | ------------ | -------- | --------------- | ------------- |
| iconPack | IconPack     | ❌        | defaultIconPack | Icon pack     |
| image    | ImageMessage | ✅        | \-              | Image message |
| size     | Size         | ✅        | \-              | Size          |
| t        | RtkI18n      | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-image-viewer></rtk-image-viewer>


```

### With Properties

```

<!-- component.html -->

<rtk-image-viewer

 [image]="imagemessage"

 size="md">

</rtk-image-viewer>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-image-viewer/","name":"rtk-image-viewer"}}]}
```
