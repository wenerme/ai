---
title: Grok Voice
description: xAI's real-time voice conversation model with low-latency audio input and output streaming.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok Voice

websocket • xAI

`xai/grok-voice`

xAI's real-time voice conversation model with low-latency audio input and output streaming.

| Model Info        |                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                    |
| More information  | [link ↗](https://docs.x.ai/developers/rest-api-reference/inference/voice)                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-voice) |

## Usage

* [ TypeScript ](#tab-panel-2296)
* [ cURL ](#tab-panel-2297)

**TypeScript**

```ts
// Establish WebSocket connection
const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run?model=xai/grok-voice`,
  {
    method: 'GET',
    headers: {
      'Authorization': `Bearer $CLOUDFLARE_API_TOKEN`,
      'Upgrade': 'websocket'
    }
  }
)


const ws = response.webSocket
ws.accept()


// Send audio chunks
ws.send(JSON.stringify({
  type: 'input_audio_buffer.append',
  audio: audioBase64
}))


// Receive transcriptions and audio responses
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  console.log(data)
})
```

```bash
# Note: WebSocket connections require a WebSocket client
# curl does not support WebSocket upgrade
# Use wscat, websocat, or a programming language WebSocket library


wscat -c 'wss://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run?model=xai/grok-voice' \
  -H 'Authorization: Bearer $CLOUDFLARE_API_TOKEN'
```

```json
{
  "websocket": {
    "url": "wss://api.x.ai/v1/realtime?model=grok-voice-latest",
    "headers": {
      "Authorization": "Bearer [ephemeral_token]"
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-2298)
* [ Output ](#tab-panel-2299)

websocket

`boolean`Enable real-time WebSocket connection for voice conversations. When true, establishes a bidirectional WebSocket for speech-to-speech interaction with Grok voice models.

url

`string`WebSocket URL for the realtime connection (e.g., wss://...)

▶headers{}

`object`Optional headers to include when establishing the WebSocket connection (e.g., Authorization)

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-voice/#page","headline":"Grok Voice (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's real-time voice conversation model with low-latency audio input and output streaming.","url":"https://developers.cloudflare.com/ai/models/xai/grok-voice/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
