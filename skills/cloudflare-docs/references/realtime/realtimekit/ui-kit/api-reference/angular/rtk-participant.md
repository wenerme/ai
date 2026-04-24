---
title: rtk-participant
description: API reference for rtk-participant component (Angular Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

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

<!-- component.html -->

<rtk-participant></rtk-participant>


```

### With Properties

```

<!-- component.html -->

<rtk-participant

 [meeting]="meeting"

 [participant]="participant"

 [view]="participantviewmode">

</rtk-participant>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/","name":"rtk-participant"}}]}
```
