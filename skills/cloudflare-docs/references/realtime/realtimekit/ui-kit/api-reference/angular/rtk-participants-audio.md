---
title: rtk-participants-audio
description: API reference for rtk-participants-audio component (Angular Library)
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-audio.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# rtk-participants-audio

A component which plays all the audio from participants and screenshares.

## Properties

| Property           | Type             | Required | Default         | Description                 |
| ------------------ | ---------------- | -------- | --------------- | --------------------------- |
| iconPack           | IconPack         | ❌        | defaultIconPack | Icon pack                   |
| meeting            | Meeting          | ✅        | \-              | Meeting object              |
| preloadedAudioElem | HTMLAudioElement | ✅        | \-              | Pass existing audio element |
| t                  | RtkI18n          | ❌        | useLanguage()   | Language                    |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-participants-audio></rtk-participants-audio>


```

### With Properties

```

<!-- component.html -->

<rtk-participants-audio

 [meeting]="meeting"

 [preloadedAudioElem]="htmlaudioelement">

</rtk-participants-audio>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-audio/","name":"rtk-participants-audio"}}]}
```
