---
title: Universal Endpoint
description: You can use the Universal Endpoint to contact every provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/universal.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Universal Endpoint

Note

It is recommended to use the Dynamic Routes to implement model fallback feature

You can use the Universal Endpoint to contact every provider.

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}


```

AI Gateway offers multiple endpoints for each Gateway you create - one endpoint per provider, and one Universal Endpoint. The Universal Endpoint requires some adjusting to your schema, but supports additional features. Some of these features are, for example, retrying a request if it fails the first time, or configuring a [fallback model/provider](https://developers.cloudflare.com/ai-gateway/configuration/fallbacks/).

You can use the Universal endpoint to contact every provider. The payload is expecting an array of message, and each message is an object with the following parameters:

* `provider` : the name of the provider you would like to direct this message to. Can be OpenAI, workers-ai, or any of our supported providers.
* `endpoint`: the pathname of the provider API you’re trying to reach. For example, on OpenAI it can be `chat/completions`, and for Workers AI this might be [@cf/meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct/). See more in the sections that are specific to [each provider](https://developers.cloudflare.com/ai-gateway/usage/providers/).
* `authorization`: the content of the Authorization HTTP Header that should be used when contacting this provider. This usually starts with 'Token' or 'Bearer'.
* `query`: the payload as the provider expects it in their official API.

## cURL example

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id} \

  --header 'Content-Type: application/json' \

  --data '[

  {

    "provider": "workers-ai",

    "endpoint": "@cf/meta/llama-3.1-8b-instruct",

    "headers": {

      "Authorization": "Bearer {cloudflare_token}",

      "Content-Type": "application/json"

    },

    "query": {

      "messages": [

        {

          "role": "system",

          "content": "You are a friendly assistant"

        },

        {

          "role": "user",

          "content": "What is Cloudflare?"

        }

      ]

    }

  },

  {

    "provider": "openai",

    "endpoint": "chat/completions",

    "headers": {

      "Authorization": "Bearer {open_ai_token}",

      "Content-Type": "application/json"

    },

    "query": {

      "model": "gpt-4o-mini",

      "stream": true,

      "messages": [

        {

          "role": "user",

          "content": "What is Cloudflare?"

        }

      ]

    }

  }

]'


```

The above will send a request to Workers AI Inference API, if it fails it will proceed to OpenAI. You can add as many fallbacks as you need, just by adding another JSON in the array.

## WebSockets API beta

The Universal Endpoint can also be accessed via a [WebSockets API](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/) which provides a single persistent connection, enabling continuous communication. This API supports all AI providers connected to AI Gateway, including those that do not natively support WebSockets.

## WebSockets example

JavaScript

```

import WebSocket from "ws";

const ws = new WebSocket(

  "wss://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/",

  {

    headers: {

      "cf-aig-authorization": "Bearer AI_GATEWAY_TOKEN",

    },

  },

);


ws.send(

  JSON.stringify({

    type: "universal.create",

    request: {

      eventId: "my-request",

      provider: "workers-ai",

      endpoint: "@cf/meta/llama-3.1-8b-instruct",

      headers: {

        Authorization: "Bearer WORKERS_AI_TOKEN",

        "Content-Type": "application/json",

      },

      query: {

        prompt: "tell me a joke",

      },

    },

  }),

);


ws.on("message", function incoming(message) {

  console.log(message.toString());

});


```

## Workers Binding example

* [  wrangler.jsonc ](#tab-panel-3088)
* [  wrangler.toml ](#tab-panel-3089)

JSONC

```

{

  "ai": {

    "binding": "AI",

  },

}


```

TOML

```

[ai]

binding = "AI"


```

src/index.ts

```

type Env = {

  AI: Ai;

};


export default {

  async fetch(request: Request, env: Env) {

    return env.AI.gateway("my-gateway").run({

      provider: "workers-ai",

      endpoint: "@cf/meta/llama-3.1-8b-instruct",

      headers: {

        authorization: "Bearer my-api-token",

      },

      query: {

        prompt: "tell me a joke",

      },

    });

  },

};


```

## Header configuration hierarchy

The Universal Endpoint allows you to set fallback models or providers and customize headers for each provider or request. You can configure headers at three levels:

1. **Provider level**: Headers specific to a particular provider.
2. **Request level**: Headers included in individual requests.
3. **Gateway settings**: Default headers configured in your gateway dashboard.

Since the same settings can be configured in multiple locations, AI Gateway applies a hierarchy to determine which configuration takes precedence:

* **Provider-level headers** override all other configurations.
* **Request-level headers** are used if no provider-level headers are set.
* **Gateway-level settings** are used only if no headers are configured at the provider or request levels.

This hierarchy ensures consistent behavior, prioritizing the most specific configurations. Use provider-level and request-level headers for fine-tuned control, and gateway settings for general defaults.

## Hierarchy example

This example demonstrates how headers set at different levels impact caching behavior:

* **Request-level header**: The `cf-aig-cache-ttl` is set to `3600` seconds, applying this caching duration to the request by default.
* **Provider-level header**: For the fallback provider (OpenAI), `cf-aig-cache-ttl` is explicitly set to `0` seconds, overriding the request-level header and disabling caching for responses when OpenAI is used as the provider.

This shows how provider-level headers take precedence over request-level headers, allowing for granular control of caching behavior.

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id} \

  --header 'Content-Type: application/json' \

  --header 'cf-aig-cache-ttl: 3600' \

  --data '[

    {

      "provider": "workers-ai",

      "endpoint": "@cf/meta/llama-3.1-8b-instruct",

      "headers": {

        "Authorization": "Bearer {cloudflare_token}",

        "Content-Type": "application/json"

      },

      "query": {

        "messages": [

          {

            "role": "system",

            "content": "You are a friendly assistant"

          },

          {

            "role": "user",

            "content": "What is Cloudflare?"

          }

        ]

      }

    },

    {

      "provider": "openai",

      "endpoint": "chat/completions",

      "headers": {

        "Authorization": "Bearer {open_ai_token}",

        "Content-Type": "application/json",

        "cf-aig-cache-ttl": "0"

      },

      "query": {

        "model": "gpt-4o-mini",

        "stream": true,

        "messages": [

          {

            "role": "user",

            "content": "What is Cloudflare?"

          }

        ]

      }

    }

  ]'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/universal/","name":"Universal Endpoint"}}]}
```
