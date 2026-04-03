---
title: Workers AI
description: Use AI Gateway for analytics, caching, and security on requests to Workers AI. Workers AI integrates seamlessly with AI Gateway, allowing you to execute AI inference via API requests or through an environment binding for Workers scripts. The binding simplifies the process by routing requests through your AI Gateway with minimal setup.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/workersai.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers AI

Use AI Gateway for analytics, caching, and security on requests to [Workers AI](https://developers.cloudflare.com/workers-ai/). Workers AI integrates seamlessly with AI Gateway, allowing you to execute AI inference via API requests or through an environment binding for Workers scripts. The binding simplifies the process by routing requests through your AI Gateway with minimal setup.

## Prerequisites

When making requests to Workers AI, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Workers AI API token.
* The name of the Workers AI model you want to use.

## REST API

To interact with a REST API, update the URL used for your request:

* **Previous**:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_id}


```

* **New**:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/{model_id}


```

For these parameters:

* `{account_id}` is your Cloudflare [account ID](https://developers.cloudflare.com/workers-ai/get-started/rest-api/#1-get-api-token-and-account-id).
* `{gateway_id}` refers to the name of your existing [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/).
* `{model_id}` refers to the model ID of the [Workers AI model](https://developers.cloudflare.com/workers-ai/models/).

## Examples

First, generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Workers AI Read` access and use it in your request.

Request to Workers AI llama model

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/meta/llama-3.1-8b-instruct \

 --header 'Authorization: Bearer {cf_api_token}' \

 --header 'Content-Type: application/json' \

 --data '{"prompt": "What is Cloudflare?"}'


```

Request to Workers AI text classification model

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/huggingface/distilbert-sst-2-int8 \

  --header 'Authorization: Bearer {cf_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{ "text": "Cloudflare docs are amazing!" }'


```

### OpenAI compatible endpoints

Workers AI supports OpenAI compatible endpoints for [text generation](https://developers.cloudflare.com/workers-ai/models/) (`/v1/chat/completions`) and [text embedding models](https://developers.cloudflare.com/workers-ai/models/) (`/v1/embeddings`). This allows you to use the same code as you would for your OpenAI commands, but swap in Workers AI easily.

  
Request to OpenAI compatible endpoint

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/v1/chat/completions \

 --header 'Authorization: Bearer {cf_api_token}' \

 --header 'Content-Type: application/json' \

 --data '{

      "model": "@cf/meta/llama-3.1-8b-instruct",

      "messages": [

        {

          "role": "user",

          "content": "What is Cloudflare?"

        }

      ]

    }

'


```

## Workers Binding

You can integrate Workers AI with AI Gateway using an environment binding. To include an AI Gateway within your Worker, add the gateway as an object in your Workers AI request.

* [  JavaScript ](#tab-panel-3086)
* [  TypeScript ](#tab-panel-3087)

JavaScript

```

export default {

  async fetch(request, env) {

    const response = await env.AI.run(

      "@cf/meta/llama-3.1-8b-instruct",

      {

        prompt: "Why should you use Cloudflare for your AI inference?",

      },

      {

        gateway: {

          id: "{gateway_id}",

          skipCache: false,

          cacheTtl: 3360,

        },

      },

    );

    return new Response(JSON.stringify(response));

  },

};


```

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const response = await env.AI.run(

      "@cf/meta/llama-3.1-8b-instruct",

      {

        prompt: "Why should you use Cloudflare for your AI inference?",

      },

      {

        gateway: {

          id: "{gateway_id}",

          skipCache: false,

          cacheTtl: 3360,

        },

      },

    );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

For a detailed step-by-step guide on integrating Workers AI with AI Gateway using a binding, see [Integrations in AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/).

Workers AI supports the following parameters for AI gateways:

* `id` string  
   * Name of your existing [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/). Must be in the same account as your Worker.
* `skipCache` boolean(default: false)  
   * Controls whether the request should [skip the cache](https://developers.cloudflare.com/ai-gateway/features/caching/#skip-cache-cf-aig-skip-cache).
* `cacheTtl` number  
   * Controls the [Cache TTL](https://developers.cloudflare.com/ai-gateway/features/caching/#cache-ttl-cf-aig-cache-ttl).

## OpenAI-Compatible Endpoint

You can also use the [OpenAI-compatible endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) (`/ai-gateway/usage/chat-completion/`) to access Workers AI models using the OpenAI API schema. To do so, send your requests to:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions


```

Specify:

```

{

"model": "workers-ai/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/workersai/","name":"Workers AI"}}]}
```
