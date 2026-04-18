---
title: Workers Bindings
description: Reference for the AI binding with AI Gateway. Call Workers AI and third-party models with env.AI.run(), access log IDs, and use gateway methods for feedback, logging, URLs, and universal requests.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI)[ Bindings ](https://developers.cloudflare.com/search/?tags=Bindings) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/integrations/worker-binding-methods.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Workers Bindings

The AI binding (`env.AI`) lets you call AI models and access AI Gateway features directly from your Worker.

For a step-by-step setup guide, refer to [Set up Workers AI with AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/).

## Configuration

Add an AI binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-5085)
* [  wrangler.toml ](#tab-panel-5086)

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

The binding is accessible in your Worker code as `env.AI`.

If you're using TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you modify your Wrangler configuration file. This generates types for the `env` object based on your bindings, as well as [runtime types](https://developers.cloudflare.com/workers/languages/typescript/).

## `env.AI.run()`

Runs an inference request through AI Gateway. Accepts Workers AI models (`@cf/` prefix) and third-party models (`{author}/{model}` format).

**Workers AI model:**

* [  JavaScript ](#tab-panel-5087)
* [  TypeScript ](#tab-panel-5088)

JavaScript

```

const resp = await env.AI.run(

  "@cf/moonshotai/kimi-k2.5",

  {

    prompt: "tell me a joke",

  },

  {

    gateway: {

      id: "my-gateway",

    },

  },

);


```

Explain Code

TypeScript

```

const resp = await env.AI.run(

  "@cf/moonshotai/kimi-k2.5",

  {

    prompt: "tell me a joke",

  },

  {

    gateway: {

      id: "my-gateway",

    },

  },

);


```

Explain Code

**Third-party model:**

* [  JavaScript ](#tab-panel-5089)
* [  TypeScript ](#tab-panel-5090)

JavaScript

```

const resp = await env.AI.run(

  "openai/gpt-4.1-mini",

  {

    messages: [{ role: "user", content: "tell me a joke" }],

  },

  {

    gateway: {

      id: "my-gateway",

    },

  },

);


```

Explain Code

TypeScript

```

const resp = await env.AI.run(

  "openai/gpt-4.1-mini",

  {

    messages: [{ role: "user", content: "tell me a joke" }],

  },

  {

    gateway: {

      id: "my-gateway",

    },

  },

);


```

Explain Code

Third-party models require an AI Gateway and use [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/). Cloudflare manages the provider credentials and deducts credits from your account. You do not need to supply your own API keys.

Note

[BYOK (Bring Your Own Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) is not supported for third-party models called through the AI binding. To use your own provider keys, use the [AI Gateway REST API](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the [chat completions endpoint](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) instead.

Browse available models in the [model catalog](https://developers.cloudflare.com/ai/models/).

### Gateway options

The third argument to `env.AI.run()` accepts a `gateway` object with the following parameters:

| Parameter  | Type    | Default    | Description                                                                                                                       |
| ---------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| id         | string  | _required_ | Name of your [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/). Must be in the same account as your Worker. |
| skipCache  | boolean | false      | Skip the [cache](https://developers.cloudflare.com/ai-gateway/features/caching/) for this request.                                |
| cacheTtl   | number  | —          | [Cache TTL](https://developers.cloudflare.com/ai-gateway/features/caching/) in seconds.                                           |
| cacheKey   | string  | —          | Custom [cache key](https://developers.cloudflare.com/ai-gateway/features/caching/) for this request.                              |
| collectLog | boolean | —          | Whether to [collect logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) for this request.                  |
| metadata   | object  | —          | [Custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) to attach to the log entry.        |

## `env.AI.aiGatewayLogId`

Returns the log ID from the most recent `env.AI.run()` request.

TypeScript

```

const myLogId = env.AI.aiGatewayLogId;


```

## `env.AI.gateway()`

Returns a gateway instance for accessing AI Gateway methods directly.

TypeScript

```

const gateway = env.AI.gateway("my-gateway");


```

The gateway instance exposes the following methods.

### `patchLog()`

Sends feedback, score, and metadata for a specific log entry. All properties in the second argument are optional.

TypeScript

```

await gateway.patchLog("my-log-id", {

  feedback: 1,

  score: 100,

  metadata: {

    user: "123",

  },

});


```

**Returns:** `Promise<void>`

### `getLog()`

Retrieves details of a specific log entry. If the `AiGatewayLog` type is missing, run [wrangler types](https://developers.cloudflare.com/workers/languages/typescript/#generate-types).

TypeScript

```

const log = await gateway.getLog("my-log-id");


```

**Returns:** `Promise<AiGatewayLog>`

### `getUrl()`

Returns the base URL for your AI Gateway. Pass an optional provider name to get the provider-specific endpoint.

TypeScript

```

const baseUrl = await gateway.getUrl();

// https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/


const openaiUrl = await gateway.getUrl("openai");

// https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/openai


```

**Parameters:** Optional `provider` (string or `AIGatewayProviders` enum)

**Returns:** `Promise<string>`

#### SDK integration examples

**OpenAI SDK:**

TypeScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: "my api key", // defaults to process.env["OPENAI_API_KEY"]

  baseURL: await env.AI.gateway("my-gateway").getUrl("openai"),

});


```

**Vercel AI SDK with OpenAI:**

TypeScript

```

import { createOpenAI } from "@ai-sdk/openai";


const openai = createOpenAI({

  baseURL: await env.AI.gateway("my-gateway").getUrl("openai"),

});


```

**Vercel AI SDK with Anthropic:**

TypeScript

```

import { createAnthropic } from "@ai-sdk/anthropic";


const anthropic = createAnthropic({

  baseURL: await env.AI.gateway("my-gateway").getUrl("anthropic"),

});


```

### `run()`

Executes a [universal request](https://developers.cloudflare.com/ai-gateway/usage/universal/) to any supported provider. Accepts a single request object or an array.

TypeScript

```

const resp = await gateway.run({

  provider: "workers-ai",

  endpoint: "@cf/meta/llama-3.1-8b-instruct",

  headers: {

    authorization: "Bearer my-api-token",

  },

  query: {

    prompt: "tell me a joke",

  },

});


```

Explain Code

**Returns:** `Promise<Response>`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/worker-binding-methods/","name":"Workers Bindings"}}]}
```
