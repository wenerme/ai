---
title: OpenAI
description: OpenAI helps you build with GPT models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/openai.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# OpenAI

[OpenAI ↗](https://openai.com/about/) helps you build with GPT models.

## Endpoint

**Base URL**

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai


```

When making requests to OpenAI, replace `https://api.openai.com/v1` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai`.

**Chat completions endpoint**

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions`

**Responses endpoint**

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/responses`

## Examples

### OpenAI SDK

With Key in Request

* [ With Authenticated Gateway ](#tab-panel-3064)
* [ Unauthenticated Gateway ](#tab-panel-3065)

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "YOUR_OPENAI_API_KEY",

  defaultHeaders: {

    "cf-aig-authorization": `Bearer {cf_api_token}`,

  },

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",

});


const response = await client.chat.completions.create({

  model: "gpt-4o-mini",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "YOUR_OPENAI_API_KEY",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",

});


const response = await client.chat.completions.create({

  model: "gpt-4o-mini",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

With Stored Keys (BYOK) / Unified Billing

```

import OpenAI from "openai";


const client = new OpenAI({

  apiKey: "{cf_api_token}",

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",

});


// Ensure your OpenAI API key is stored with BYOK

// or Unified Billing has credits

const response = await client.chat.completions.create({

  model: "gpt-4o-mini",

  messages: [{ role: "user", content: "Hello, world!" }],

});


```

### cURL

Responses API with API Key in Request

* [ With Authenticated Gateway ](#tab-panel-3066)
* [ Unauthenticated Gateway ](#tab-panel-3067)

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/responses \

  --header 'Authorization: Bearer {OPENAI_API_KEY}' \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-5.1",

    "input": [

      {

        "role": "user",

        "content": "Write a one-sentence bedtime story about a unicorn."

      }

    ]

  }'


```

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/responses \

  --header 'Authorization: Bearer {OPENAI_API_KEY}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-5.1",

    "input": [

      {

        "role": "user",

        "content": "Write a one-sentence bedtime story about a unicorn."

      }

    ]

  }'


```

Chat Completions with API Key in Request

* [ With Authenticated Gateway ](#tab-panel-3068)
* [ Unauthenticated Gateway ](#tab-panel-3069)

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'Authorization: Bearer {OPENAI_API_KEY}' \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-4o-mini",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'Authorization: Bearer {OPENAI_API_KEY}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-4o-mini",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

Responses API with Stored Keys (BYOK) / Unified Billing

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/responses \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-5.1",

    "input": [

      {

        "role": "user",

        "content": "Write a one-sentence bedtime story about a unicorn."

      }

    ]

  }'


```

Chat Completions with Stored Keys (BYOK) / Unified Billing

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-4o-mini",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/openai/","name":"OpenAI"}}]}
```
