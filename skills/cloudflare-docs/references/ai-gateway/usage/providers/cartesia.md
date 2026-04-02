---
title: Cartesia
description: Cartesia provides advanced text-to-speech services with customizable voice models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/cartesia.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cartesia

[Cartesia ↗](https://docs.cartesia.ai/) provides advanced text-to-speech services with customizable voice models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cartesia


```

## URL Structure

When making requests to Cartesia, replace `https://api.cartesia.ai/v1` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cartesia`.

## Prerequisites

When making requests to Cartesia, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Cartesia API token.
* The model ID and voice ID for the Cartesia voice model you want to use.

## Example

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cartesia/tts/bytes \

  --header 'Content-Type: application/json' \

  --header 'Cartesia-Version: 2024-06-10' \

  --header 'X-API-Key: {cartesia_api_token}' \

  --data '{

    "transcript": "Welcome to Cloudflare - AI Gateway!",

    "model_id": "sonic-english",

    "voice": {

        "mode": "id",

        "id": "694f9389-aac1-45b6-b726-9d9369183238"

    },

    "output_format": {

        "container": "wav",

        "encoding": "pcm_f32le",

        "sample_rate": 44100

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/cartesia/","name":"Cartesia"}}]}
```
