---
title: Deepgram
description: Deepgram provides Voice AI APIs for speech-to-text, text-to-speech, and voice agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/deepgram.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Deepgram

[Deepgram ↗](https://developers.deepgram.com/home) provides Voice AI APIs for speech-to-text, text-to-speech, and voice agents.

Note

Deepgram is also available through Workers AI, see [Deepgram Workers AI](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/realtime-api/#deepgram-workers-ai).

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram


```

## URL Structure

When making requests to Deepgram, replace `https://api.deepgram.com/` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram/`.

## Prerequisites

When making requests to Deepgram, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Deepgram API token.

## Example

### SDK

TS

```

import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";


const deepgram = createClient("{deepgram_api_key}", {

    global: {

      websocket: {

        options: {

          url: "wss://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram/",

          _nodeOnlyHeaders: {

            "cf-aig-authorization": "Bearer {CF_AIG_TOKEN}"

          }

        }

      }

    }

});


const connection = deepgram.listen.live({

    model: "nova-3",

    language: "en-US",

    smart_format: true,

});


connection.send(...);


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/deepgram/","name":"Deepgram"}}]}
```
