---
title: Using AI Models
description: Call AI models from Workers AI, OpenAI, Anthropic, Google Gemini, or any provider within Cloudflare Agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

# Using AI Models

Agents can call AI models from any provider. [Workers AI](https://developers.cloudflare.com/workers-ai/) is built in and requires no API keys. You can also use [OpenAI ↗](https://platform.openai.com/docs/quickstart?language=javascript), [Anthropic ↗](https://docs.anthropic.com/en/api/client-sdks#typescript), [Google Gemini ↗](https://ai.google.dev/gemini-api/docs/openai), or any service that exposes an OpenAI-compatible API.

The [AI SDK ↗](https://sdk.vercel.ai/docs/introduction) provides a unified interface across all of these providers, and is what `AIChatAgent` and the starter template use under the hood. You can also use the model routing features in [AI Gateway](https://developers.cloudflare.com/ai-gateway/) to route across providers, eval responses, and manage rate limits.

## Calling AI Models

You can call models from any method within an Agent, including from HTTP requests using the [onRequest](https://developers.cloudflare.com/agents/api-reference/agents-api/) handler, when a [scheduled task](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) runs, when handling a WebSocket message in the [onMessage](https://developers.cloudflare.com/agents/api-reference/websockets/) handler, or from any of your own methods.

Agents can call AI models on their own — autonomously — and can handle long-running responses that take minutes (or longer) to respond in full. If a client disconnects mid-stream, the Agent keeps running and can catch the client up when it reconnects.

### Streaming over WebSockets

Modern reasoning models can take some time to both generate a response _and_ stream the response back to the client. Instead of buffering the entire response, you can stream it back over [WebSockets](https://developers.cloudflare.com/agents/api-reference/websockets/).

* [  JavaScript ](#tab-panel-4948)
* [  TypeScript ](#tab-panel-4949)

src/index.js

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent {

  async onConnect(connection, ctx) {

    //

  }


  async onMessage(connection, message) {

    let msg = JSON.parse(message);

    await this.queryReasoningModel(connection, msg.prompt);

  }


  async queryReasoningModel(connection, userPrompt) {

    try {

      const workersai = createWorkersAI({ binding: this.env.AI });

      const result = streamText({

        model: workersai("@cf/zai-org/glm-4.7-flash"),

        prompt: userPrompt,

      });


      for await (const chunk of result.textStream) {

        if (chunk) {

          connection.send(JSON.stringify({ type: "chunk", content: chunk }));

        }

      }


      connection.send(JSON.stringify({ type: "done" }));

    } catch (error) {

      connection.send(JSON.stringify({ type: "error", error: error }));

    }

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


interface Env {

  AI: Ai;

}


export class MyAgent extends Agent<Env> {

  async onConnect(connection: Connection, ctx: ConnectionContext) {

    //

  }


  async onMessage(connection: Connection, message: WSMessage) {

    let msg = JSON.parse(message);

    await this.queryReasoningModel(connection, msg.prompt);

  }


  async queryReasoningModel(connection: Connection, userPrompt: string) {

    try {

      const workersai = createWorkersAI({ binding: this.env.AI });

      const result = streamText({

        model: workersai("@cf/zai-org/glm-4.7-flash"),

        prompt: userPrompt,

      });


      for await (const chunk of result.textStream) {

        if (chunk) {

          connection.send(JSON.stringify({ type: "chunk", content: chunk }));

        }

      }


      connection.send(JSON.stringify({ type: "done" }));

    } catch (error) {

      connection.send(JSON.stringify({ type: "error", error: error }));

    }

  }

}


```

Explain Code

You can also persist AI model responses back to [Agent state](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) using `this.setState`. If a user disconnects, read the message history back and send it to the user when they reconnect.

## Workers AI

You can use [any of the models available in Workers AI](https://developers.cloudflare.com/workers-ai/models/) within your Agent by [configuring a binding](https://developers.cloudflare.com/workers-ai/configuration/bindings/). No API keys are required.

Workers AI supports streaming responses by setting `stream: true`. Use streaming to avoid buffering and delaying responses, especially for larger models or reasoning models.

* [  JavaScript ](#tab-panel-4942)
* [  TypeScript ](#tab-panel-4943)

src/index.js

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async onRequest(request) {

    const stream = await this.env.AI.run(

      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",

      {

        prompt: "Build me a Cloudflare Worker that returns JSON.",

        stream: true,

      },

    );


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";


interface Env {

  AI: Ai;

}


export class MyAgent extends Agent<Env> {

  async onRequest(request: Request) {

    const stream = await this.env.AI.run(

      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",

      {

        prompt: "Build me a Cloudflare Worker that returns JSON.",

        stream: true,

      },

    );


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  }

}


```

Explain Code

Your Wrangler configuration needs an `ai` binding:

* [  wrangler.jsonc ](#tab-panel-4936)
* [  wrangler.toml ](#tab-panel-4937)

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

### Model routing

You can use [AI Gateway](https://developers.cloudflare.com/ai-gateway/) directly from an Agent by specifying a [gateway configuration](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/) when calling the AI binding. Model routing lets you route requests across providers based on availability, rate limits, or cost budgets.

* [  JavaScript ](#tab-panel-4946)
* [  TypeScript ](#tab-panel-4947)

src/index.js

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async onRequest(request) {

    const response = await this.env.AI.run(

      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",

      {

        prompt: "Build me a Cloudflare Worker that returns JSON.",

      },

      {

        gateway: {

          id: "{gateway_id}",

          skipCache: false,

          cacheTtl: 3360,

        },

      },

    );


    return Response.json(response);

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";


interface Env {

  AI: Ai;

}


export class MyAgent extends Agent<Env> {

  async onRequest(request: Request) {

    const response = await this.env.AI.run(

      "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",

      {

        prompt: "Build me a Cloudflare Worker that returns JSON.",

      },

      {

        gateway: {

          id: "{gateway_id}",

          skipCache: false,

          cacheTtl: 3360,

        },

      },

    );


    return Response.json(response);

  }

}


```

Explain Code

The `ai` binding in your Wrangler configuration is shared across both Workers AI and AI Gateway.

* [  wrangler.jsonc ](#tab-panel-4938)
* [  wrangler.toml ](#tab-panel-4939)

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

Visit the [AI Gateway documentation](https://developers.cloudflare.com/ai-gateway/) to learn how to configure a gateway and retrieve a gateway ID.

## AI SDK

The [AI SDK ↗](https://sdk.vercel.ai/docs/introduction) provides a unified API for text generation, tool calling, structured responses, and more. It works with any provider that has an AI SDK adapter, including Workers AI via [workers-ai-provider ↗](https://www.npmjs.com/package/workers-ai-provider).

 npm  yarn  pnpm  bun 

```
npm i ai workers-ai-provider
```

```
yarn add ai workers-ai-provider
```

```
pnpm add ai workers-ai-provider
```

```
bun add ai workers-ai-provider
```

* [  JavaScript ](#tab-panel-4944)
* [  TypeScript ](#tab-panel-4945)

src/index.js

```

import { Agent } from "agents";

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent {

  async onRequest(request) {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "Build me an AI agent on Cloudflare Workers",

    });


    return Response.json({ modelResponse: text });

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


interface Env {

  AI: Ai;

}


export class MyAgent extends Agent<Env> {

  async onRequest(request: Request): Promise<Response> {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "Build me an AI agent on Cloudflare Workers",

    });


    return Response.json({ modelResponse: text });

  }

}


```

Explain Code

You can swap the provider to use OpenAI, Anthropic, or any other AI SDK-compatible adapter:

 npm  yarn  pnpm  bun 

```
npm i ai @ai-sdk/openai
```

```
yarn add ai @ai-sdk/openai
```

```
pnpm add ai @ai-sdk/openai
```

```
bun add ai @ai-sdk/openai
```

* [  JavaScript ](#tab-panel-4940)
* [  TypeScript ](#tab-panel-4941)

src/index.js

```

import { Agent } from "agents";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


export class MyAgent extends Agent {

  async onRequest(request) {

    const { text } = await generateText({

      model: openai("gpt-4o"),

      prompt: "Build me an AI agent on Cloudflare Workers",

    });


    return Response.json({ modelResponse: text });

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


export class MyAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const { text } = await generateText({

      model: openai("gpt-4o"),

      prompt: "Build me an AI agent on Cloudflare Workers",

    });


    return Response.json({ modelResponse: text });

  }

}


```

Explain Code

## OpenAI-compatible endpoints

Agents can call models across any service that supports the OpenAI API. For example, you can use the OpenAI SDK to call one of [Google's Gemini models ↗](https://ai.google.dev/gemini-api/docs/openai#node.js) directly from your Agent.

Agents can stream responses back over HTTP using Server-Sent Events (SSE) from within an `onRequest` handler, or by using the native [WebSocket API](https://developers.cloudflare.com/agents/api-reference/websockets/) to stream responses back to a client.

* [  JavaScript ](#tab-panel-4950)
* [  TypeScript ](#tab-panel-4951)

src/index.js

```

import { Agent } from "agents";

import { OpenAI } from "openai";


export class MyAgent extends Agent {

  async onRequest(request) {

    const client = new OpenAI({

      apiKey: this.env.GEMINI_API_KEY,

      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",

    });


    let { readable, writable } = new TransformStream();

    let writer = writable.getWriter();

    const textEncoder = new TextEncoder();


    this.ctx.waitUntil(

      (async () => {

        const stream = await client.chat.completions.create({

          model: "gemini-2.0-flash",

          messages: [

            { role: "user", content: "Write me a Cloudflare Worker." },

          ],

          stream: true,

        });


        for await (const part of stream) {

          writer.write(

            textEncoder.encode(part.choices[0]?.delta?.content || ""),

          );

        }

        writer.close();

      })(),

    );


    return new Response(readable);

  }

}


```

Explain Code

src/index.ts

```

import { Agent } from "agents";

import { OpenAI } from "openai";


export class MyAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const client = new OpenAI({

      apiKey: this.env.GEMINI_API_KEY,

      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",

    });


    let { readable, writable } = new TransformStream();

    let writer = writable.getWriter();

    const textEncoder = new TextEncoder();


    this.ctx.waitUntil(

      (async () => {

        const stream = await client.chat.completions.create({

          model: "gemini-2.0-flash",

          messages: [

            { role: "user", content: "Write me a Cloudflare Worker." },

          ],

          stream: true,

        });


        for await (const part of stream) {

          writer.write(

            textEncoder.encode(part.choices[0]?.delta?.content || ""),

          );

        }

        writer.close();

      })(),

    );


    return new Response(readable);

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/using-ai-models/","name":"Using AI Models"}}]}
```
