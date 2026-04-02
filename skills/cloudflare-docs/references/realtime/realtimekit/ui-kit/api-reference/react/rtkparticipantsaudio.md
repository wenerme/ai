---
title: RtkParticipantsAudio
description: API reference for RtkParticipantsAudio component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/react/RtkParticipantsAudio.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkParticipantsAudio

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

import { RtkParticipantsAudio } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkParticipantsAudio />;

}


```

### With Properties

```

import { RtkParticipantsAudio } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkParticipantsAudio

      meeting={meeting}

      preloadedAudioElem={htmlaudioelement}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkparticipantsaudio/","name":"RtkParticipantsAudio"}}]}
```
