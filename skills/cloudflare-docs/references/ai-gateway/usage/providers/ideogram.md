---
title: Ideogram
description: Route Ideogram image generation requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Ideogram

[Ideogram ↗](https://ideogram.ai/) provides advanced text-to-image generation models with exceptional text rendering capabilities and visual quality.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/ideogram


```

## Prerequisites

When making requests to Ideogram, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Ideogram API key.
* The name of the Ideogram model you want to use (e.g., `V_3`).

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/ideogram/v1/ideogram-v3/generate \

  --header 'Api-Key: {ideogram_api_key}' \

  --header 'Content-Type: application/json' \

  --data '{

    "prompt": "A serene landscape with mountains and a lake at sunset",

    "model": "V_3"

  }'


```

### Use with JavaScript

JavaScript

```

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const ideogramApiKey = "{ideogram_api_key}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/ideogram`;


const response = await fetch(`${baseURL}/v1/ideogram-v3/generate`, {

  method: "POST",

  headers: {

    "Api-Key": ideogramApiKey,

    "Content-Type": "application/json",

  },

  body: JSON.stringify({

    prompt: "A serene landscape with mountains and a lake at sunset",

    model: "V_3",

  }),

});


const result = await response.json();

console.log(result);


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/ideogram/","name":"Ideogram"}}]}
```
