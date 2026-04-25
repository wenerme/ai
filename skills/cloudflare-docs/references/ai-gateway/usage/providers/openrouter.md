---
title: OpenRouter
description: Route OpenRouter API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# OpenRouter

[OpenRouter ↗](https://openrouter.ai/) is a platform that provides a unified interface for accessing and using large language models (LLMs).

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter


```

## URL structure

When making requests to [OpenRouter ↗](https://openrouter.ai/), replace `https://openrouter.ai/api/v1/chat/completions` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/chat/completions`.

## Prerequisites

When making requests to OpenRouter, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active OpenRouter API token or a token from the original model provider.
* The name of the OpenRouter model you want to use.

## Examples

### cURL

Request

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/v1/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer OPENROUTER_TOKEN' \

 --data '{

    "model": "openai/gpt-5-mini",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

Explain Code

### Use OpenAI SDK with JavaScript

If you are using the OpenAI SDK with JavaScript, you can set your endpoint like this:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: env.OPENROUTER_TOKEN,

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openrouter",

});


try {

  const chatCompletion = await openai.chat.completions.create({

    model: "openai/gpt-5-mini",

    messages: [{ role: "user", content: "What is Cloudflare?" }],

  });


  const response = chatCompletion.choices[0].message;


  return new Response(JSON.stringify(response));

} catch (e) {

  return new Response(e);

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/openrouter/","name":"OpenRouter"}}]}
```
