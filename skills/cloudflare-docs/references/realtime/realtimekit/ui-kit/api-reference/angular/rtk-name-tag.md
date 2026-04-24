---
title: rtk-name-tag
description: API reference for rtk-name-tag component (Angular Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-name-tag.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-name-tag

A component which shows a participant's name.

## Properties

| Property      | Type              | Required | Default         | Description                               |
| ------------- | ----------------- | -------- | --------------- | ----------------------------------------- |
| iconPack      | IconPack          | ❌        | defaultIconPack | Icon pack                                 |
| isScreenShare | boolean           | ✅        | \-              | Whether it is used in a screen share view |
| meeting       | Meeting           | ✅        | \-              | Meeting object                            |
| participant   | Peer              | ✅        | \-              | Participant object                        |
| size          | Size              | ✅        | \-              | Size                                      |
| t             | RtkI18n           | ❌        | useLanguage()   | Language                                  |
| variant       | RtkNameTagVariant | ✅        | \-              | Name tag variant                          |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-name-tag></rtk-name-tag>


```

### With Properties

```

<!-- component.html -->

<rtk-name-tag

 [isScreenShare]="true"

 [meeting]="meeting"

 [participant]="participant">

</rtk-name-tag>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-name-tag/","name":"rtk-name-tag"}}]}
```
