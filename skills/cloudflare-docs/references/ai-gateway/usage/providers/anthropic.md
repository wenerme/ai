---
title: Anthropic
description: Route Anthropic API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/anthropic.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Anthropic

[Anthropic ↗](https://www.anthropic.com/) helps build reliable, interpretable, and steerable AI systems.

## Endpoint

**Base URL**

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic


```

## Examples

### cURL

With API Key in Request

* [ With Authenticated Gateway ](#tab-panel-5133)
* [ Unauthenticated Gateway ](#tab-panel-5134)

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'x-api-key: {anthropic_api_key}' \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

Explain Code

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'x-api-key: {anthropic_api_key}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

Explain Code

With Stored Keys (BYOK) / Unified Billing

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

Explain Code

### Anthropic SDK

With Key in Request

* [ With Authenticated Gateway ](#tab-panel-5135)
* [ Unauthenticated Gateway ](#tab-panel-5136)

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  apiKey: "{ANTHROPIC_API_KEY}",

  baseURL,

  defaultHeaders: {

    Authorization: `Bearer {cf_api_token}`,

  },

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

Explain Code

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  apiKey: "{ANTHROPIC_API_KEY}",

  baseURL,

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

Explain Code

With Stored Keys (BYOK) / Unified Billing

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  baseURL,

  defaultHeaders: {

    Authorization: `Bearer {cf_api_token}`,

  },

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

Explain Code

## OpenAI-Compatible Endpoint

You can also use the [OpenAI-compatible endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) (`/ai-gateway/usage/chat-completion/`) to access Anthropic models using the OpenAI API schema. To do so, send your requests to:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions


```

Specify:

```

{

  "model": "anthropic/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/anthropic/","name":"Anthropic"}}]}
```
