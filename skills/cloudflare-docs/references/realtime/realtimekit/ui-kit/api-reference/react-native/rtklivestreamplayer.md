---
title: RtkLiveStreamPlayer
description: API reference for RtkLiveStreamPlayer component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkLiveStreamPlayer

IVS (Amazon Interactive Video Service) player for viewing livestream playback. Requires `amazon-ivs-react-native-player` peer dependency.

## Properties

This component does not accept any props. It reads the livestream URL from the meeting context.

## Usage Examples

### Basic Usage

```

import { RtkLiveStreamPlayer } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkLiveStreamPlayer />;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtklivestreamplayer/","name":"RtkLiveStreamPlayer"}}]}
```
