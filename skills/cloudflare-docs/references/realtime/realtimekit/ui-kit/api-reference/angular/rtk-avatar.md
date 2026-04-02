---
title: rtk-avatar
description: API reference for rtk-avatar component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-avatar.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# rtk-avatar

Avatar component which renders a participant's image or their initials.

## Properties

| Property    | Type                          | Required                          | Default         | Description |                    |
| ----------- | ----------------------------- | --------------------------------- | --------------- | ----------- | ------------------ |
| iconPack    | IconPack                      | ❌                                 | defaultIconPack | Icon pack   |                    |
| participant | Peer \| WaitlistedParticipant | { name: string; picture: string } | ✅               | \-          | Participant object |
| size        | Size                          | ✅                                 | \-              | Size        |                    |
| t           | RtkI18n                       | ❌                                 | useLanguage()   | Language    |                    |
| variant     | AvatarVariant                 | ✅                                 | \-              | Avatar type |                    |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-avatar></rtk-avatar>


```

### With Properties

```

<!-- component.html -->

<rtk-avatar

 participant="example"

 size="md"

 variant="circular">

</rtk-avatar>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-avatar/","name":"rtk-avatar"}}]}
```
