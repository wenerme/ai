---
title: AI Gateway Binding Methods
description: This guide provides an overview of how to use the latest Cloudflare Workers AI Gateway binding methods. You will learn how to set up an AI Gateway binding, access new methods, and integrate them into your Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Bindings ](https://developers.cloudflare.com/search/?tags=Bindings) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/integrations/worker-binding-methods.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# AI Gateway Binding Methods

**Last reviewed:**  about 1 year ago 

This guide provides an overview of how to use the latest Cloudflare Workers AI Gateway binding methods. You will learn how to set up an AI Gateway binding, access new methods, and integrate them into your Workers.

## 1\. Add an AI Binding to your Worker

To connect your Worker to Workers AI, add the following to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-3060)
* [  wrangler.toml ](#tab-panel-3061)

JSONC

```

{

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

[ai]

binding = "AI"


```

This configuration sets up the AI binding accessible in your Worker code as `env.AI`.

If you're using TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you modify your Wrangler configuration file. This generates types for the `env` object based on your bindings, as well as [runtime types](https://developers.cloudflare.com/workers/languages/typescript/).

## 2\. Basic Usage with Workers AI + Gateway

To perform an inference task using Workers AI and an AI Gateway, you can use the following code:

src/index.ts

```

const resp = await env.AI.run(

  "@cf/meta/llama-3.1-8b-instruct",

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

Additionally, you can access the latest request log ID with:

TypeScript

```

const myLogId = env.AI.aiGatewayLogId;


```

## 3\. Access the Gateway Binding

You can access your AI Gateway binding using the following code:

TypeScript

```

const gateway = env.AI.gateway("my-gateway");


```

Once you have the gateway instance, you can use the following methods:

### 3.1\. `patchLog`: Send Feedback

The `patchLog` method allows you to send feedback, score, and metadata for a specific log ID. All object properties are optional, so you can include any combination of the parameters:

TypeScript

```

gateway.patchLog("my-log-id", {

  feedback: 1,

  score: 100,

  metadata: {

    user: "123",

  },

});


```

* **Returns**: `Promise<void>` (Make sure to `await` the request.)
* **Example Use Case**: Update a log entry with user feedback or additional metadata.

### 3.2\. `getLog`: Read Log Details

The `getLog` method retrieves details of a specific log ID. It returns an object of type `Promise<AiGatewayLog>`. If this type is missing, ensure you have run [wrangler types](https://developers.cloudflare.com/workers/languages/typescript/#generate-types).

TypeScript

```

const log = await gateway.getLog("my-log-id");


```

* **Returns**: `Promise<AiGatewayLog>`
* **Example Use Case**: Retrieve log information for debugging or analytics.

### 3.3\. `getUrl`: Get Gateway URLs

The `getUrl` method allows you to retrieve the base URL for your AI Gateway, optionally specifying a provider to get the provider-specific endpoint.

TypeScript

```

// Get the base gateway URL

const baseUrl = await gateway.getUrl();

// Output: https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/


// Get a provider-specific URL

const openaiUrl = await gateway.getUrl("openai");

// Output: https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/openai


```

* **Parameters**: Optional `provider` (string or `AIGatewayProviders` enum)
* **Returns**: `Promise<string>`
* **Example Use Case**: Dynamically construct URLs for direct API calls or debugging configurations.

#### SDK Integration Examples

The `getUrl` method is particularly useful for integrating with popular AI SDKs:

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

### 3.4\. `run`: Universal Requests

The `run` method allows you to execute universal requests. Users can pass either a single universal request object or an array of them. This method supports all AI Gateway providers.

Refer to the [Universal endpoint documentation](https://developers.cloudflare.com/ai-gateway/usage/universal/) for details about the available inputs.

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

* **Returns**: `Promise<Response>`
* **Example Use Case**: Perform a [universal request](https://developers.cloudflare.com/ai-gateway/usage/universal/) to any supported provider.

## Conclusion

With these AI Gateway binding methods, you can now:

* Send feedback and update metadata with `patchLog`.
* Retrieve detailed log information using `getLog`.
* Get gateway URLs for direct API access with `getUrl`, making it easy to integrate with popular AI SDKs.
* Execute universal requests to any AI Gateway provider with `run`.

These methods offer greater flexibility and control over your AI integrations, empowering you to build more sophisticated applications on the Cloudflare Workers platform.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/worker-binding-methods/","name":"AI Gateway Binding Methods"}}]}
```
