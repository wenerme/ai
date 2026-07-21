---
description: xAI's real-time voice conversation model with low-latency audio input and output streaming.
title: Grok Voice
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok Voice

 websocket • xAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/xai/grok-voice/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` xai/grok-voice `

* Third-party

xAI's real-time voice conversation model with low-latency audio input and output streaming.

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                     |
| More information  | [link ↗](https://docs.x.ai/developers/rest-api-reference/inference/voice)                                         |
| Pricing           | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-voice) |

## Usage

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

websocket

`boolean`Enable real-time WebSocket connection for voice conversations. When true, establishes a bidirectional WebSocket for speech-to-speech interaction with Grok voice models.

url

`string`WebSocket URL for the realtime connection (e.g., wss://...)

▶headers{}

`object`Optional headers to include when establishing the WebSocket connection (e.g., Authorization)

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-voice/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-voice/#page","headline":"Grok Voice (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's real-time voice conversation model with low-latency audio input and output streaming.","url":"https://developers.cloudflare.com/ai/models/xai/grok-voice/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
