---
title: rtk-participant
description: API reference for rtk-participant component (Web Components (HTML) Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/core/rtk-participant.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-participant

A participant entry component used inside `rtk-participants` which shows data like: name, picture and media device status. You can perform privileged actions on the participant too.

## Properties

| Property    | Type                | Required | Default               | Description              |
| ----------- | ------------------- | -------- | --------------------- | ------------------------ |
| config      | UIConfig1           | ❌        | createDefaultConfig() | Config object            |
| iconPack    | IconPack            | ❌        | defaultIconPack       | Icon pack                |
| meeting     | Meeting             | ✅        | \-                    | Meeting object           |
| participant | Peer                | ✅        | \-                    | Participant object       |
| states      | States1             | ✅        | \-                    | States                   |
| t           | RtkI18n             | ❌        | useLanguage()         | Language                 |
| view        | ParticipantViewMode | ✅        | \-                    | Show participant summary |

## Usage Examples

### Basic Usage

```

<rtk-participant></rtk-participant>


```

### With Properties

```

<rtk-participant>

</rtk-participant>


```

```

<script>

  const el = document.querySelector("rtk-participant");


  el.meeting= meeting

  el.participant= participant

</script>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-participant/","name":"rtk-participant"}}]}
```
