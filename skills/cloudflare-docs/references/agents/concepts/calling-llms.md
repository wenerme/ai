---
title: Calling LLMs
description: Call large language models from within a stateful Cloudflare Agent with persistent context and autonomous scheduling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/concepts/calling-llms.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Calling LLMs

Agents change how you work with LLMs. In a stateless Worker, every request starts from scratch — you reconstruct context, call a model, return the response, and forget everything. An Agent keeps state between calls, stays connected to clients over WebSocket, and can call models on its own schedule without a user present.

This page covers the patterns that become possible when your LLM calls happen inside a stateful Agent. For provider setup and code examples, refer to [Using AI Models](https://developers.cloudflare.com/agents/api-reference/using-ai-models/).

## State as context

Every Agent has a built-in [SQL database](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) and key-value state. Instead of passing an entire conversation history from the client on every request, the Agent stores it and builds prompts from its own storage.

* [  JavaScript ](#tab-panel-4824)
* [  TypeScript ](#tab-panel-4825)

JavaScript

```

import { Agent } from "agents";


export class ResearchAgent extends Agent {

  async buildPrompt(userMessage) {

    const history = this.sql`

      SELECT role, content FROM messages

      ORDER BY timestamp DESC LIMIT 50`;


    const preferences = this.sql`

      SELECT key, value FROM user_preferences`;


    return [

      { role: "system", content: this.systemPrompt(preferences) },

      ...history.reverse(),

      { role: "user", content: userMessage },

    ];

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";


export class ResearchAgent extends Agent<Env> {

  async buildPrompt(userMessage: string) {

    const history = this.sql<{ role: string; content: string }>`

      SELECT role, content FROM messages

      ORDER BY timestamp DESC LIMIT 50`;


    const preferences = this.sql<{ key: string; value: string }>`

      SELECT key, value FROM user_preferences`;


    return [

      { role: "system", content: this.systemPrompt(preferences) },

      ...history.reverse(),

      { role: "user", content: userMessage },

    ];

  }

}


```

Explain Code

This means the client does not need to send the full conversation on every message. The Agent owns the history, can prune it, enrich it with retrieved documents, or summarize older turns before sending to the model.

## Surviving disconnections

Reasoning models like DeepSeek R1 or GLM-4 can take 30 seconds to several minutes to respond. In a stateless request-response architecture, the client must stay connected the entire time. If the connection drops, the response is lost.

An Agent keeps running after the client disconnects. When the response arrives, the Agent can persist it to state and deliver it when the client reconnects — even hours or days later.

* [  JavaScript ](#tab-panel-4826)
* [  TypeScript ](#tab-panel-4827)

JavaScript

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent {

  async onMessage(connection, message) {

    const { prompt } = JSON.parse(message);

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt,

    });


    for await (const chunk of result.textStream) {

      connection.send(JSON.stringify({ type: "chunk", content: chunk }));

    }


    this.sql`INSERT INTO responses (prompt, response, timestamp)

      VALUES (${prompt}, ${await result.text}, ${Date.now()})`;

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent<Env> {

  async onMessage(connection: Connection, message: WSMessage) {

    const { prompt } = JSON.parse(message as string);

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt,

    });


    for await (const chunk of result.textStream) {

      connection.send(JSON.stringify({ type: "chunk", content: chunk }));

    }


    this.sql`INSERT INTO responses (prompt, response, timestamp)

      VALUES (${prompt}, ${await result.text}, ${Date.now()})`;

  }

}


```

Explain Code

With [AIChatAgent](https://developers.cloudflare.com/agents/api-reference/chat-agents/), this is handled automatically — messages are persisted to SQLite and streams resume on reconnect.

## Autonomous model calls

Agents do not need a user request to call a model. You can schedule model calls to run in the background — for nightly summarization, periodic classification, monitoring, or any task that should happen without human interaction.

* [  JavaScript ](#tab-panel-4828)
* [  TypeScript ](#tab-panel-4829)

JavaScript

```

import { Agent } from "agents";


export class DigestAgent extends Agent {

  async onStart() {

    this.schedule("0 8 * * *", "generateDailyDigest", {});

  }


  async generateDailyDigest() {

    const articles = this.sql`

      SELECT title, body FROM articles

      WHERE created_at > datetime('now', '-1 day')`;


    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Summarize these articles:\n${articles.map((a) => a.title + ": " + a.body).join("\n\n")}`,

    });


    this.sql`INSERT INTO digests (summary, created_at)

      VALUES (${text}, ${Date.now()})`;


    this.broadcast(JSON.stringify({ type: "digest", summary: text }));

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";


export class DigestAgent extends Agent<Env> {

  async onStart() {

    this.schedule("0 8 * * *", "generateDailyDigest", {});

  }


  async generateDailyDigest() {

    const articles = this.sql<{ title: string; body: string }>`

      SELECT title, body FROM articles

      WHERE created_at > datetime('now', '-1 day')`;


    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Summarize these articles:\n${articles.map((a) => a.title + ": " + a.body).join("\n\n")}`,

    });


    this.sql`INSERT INTO digests (summary, created_at)

      VALUES (${text}, ${Date.now()})`;


    this.broadcast(JSON.stringify({ type: "digest", summary: text }));

  }

}


```

Explain Code

## Multi-model pipelines

Because an Agent maintains state across calls, you can chain multiple models in a single method — using a fast model for classification, a reasoning model for planning, and an embedding model for retrieval — without losing context between steps.

* [  JavaScript ](#tab-panel-4832)
* [  TypeScript ](#tab-panel-4833)

JavaScript

```

import { Agent } from "agents";

import { generateText, embed } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class TriageAgent extends Agent {

  async triage(ticket) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const { text: category } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Classify this support ticket into one of: billing, technical, account. Ticket: ${ticket}`,

    });


    const { embedding } = await embed({

      model: workersai("@cf/baai/bge-base-en-v1.5"),

      value: ticket,

    });

    const similar = await this.env.VECTOR_DB.query(embedding, { topK: 5 });


    const { text: response } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Draft a response for this ${category} ticket. Similar resolved tickets: ${JSON.stringify(similar)}. Ticket: ${ticket}`,

    });


    this.sql`INSERT INTO tickets (content, category, response, created_at)

      VALUES (${ticket}, ${category}, ${response}, ${Date.now()})`;


    return { category, response };

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";

import { generateText, embed } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class TriageAgent extends Agent<Env> {

  async triage(ticket: string) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const { text: category } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Classify this support ticket into one of: billing, technical, account. Ticket: ${ticket}`,

    });


    const { embedding } = await embed({

      model: workersai("@cf/baai/bge-base-en-v1.5"),

      value: ticket,

    });

    const similar = await this.env.VECTOR_DB.query(embedding, { topK: 5 });


    const { text: response } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: `Draft a response for this ${category} ticket. Similar resolved tickets: ${JSON.stringify(similar)}. Ticket: ${ticket}`,

    });


    this.sql`INSERT INTO tickets (content, category, response, created_at)

      VALUES (${ticket}, ${category}, ${response}, ${Date.now()})`;


    return { category, response };

  }

}


```

Explain Code

Each intermediate result stays in the Agent's memory for the duration of the method, and the final result is persisted to SQL for future reference.

## Caching and cost control

Persistent storage means you can cache model responses and avoid redundant calls. This is especially useful for expensive operations like embeddings or long reasoning chains.

* [  JavaScript ](#tab-panel-4830)
* [  TypeScript ](#tab-panel-4831)

JavaScript

```

import { Agent } from "agents";


export class CachingAgent extends Agent {

  async cachedGenerate(prompt) {

    const cached = this.sql`

      SELECT response FROM llm_cache WHERE prompt = ${prompt}`;


    if (cached.length > 0) {

      return cached[0].response;

    }


    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt,

    });


    this.sql`INSERT INTO llm_cache (prompt, response, created_at)

      VALUES (${prompt}, ${text}, ${Date.now()})`;


    return text;

  }

}


```

Explain Code

TypeScript

```

import { Agent } from "agents";


export class CachingAgent extends Agent<Env> {

  async cachedGenerate(prompt: string) {

    const cached = this.sql<{ response: string }>`

      SELECT response FROM llm_cache WHERE prompt = ${prompt}`;


    if (cached.length > 0) {

      return cached[0].response;

    }


    const workersai = createWorkersAI({ binding: this.env.AI });

    const { text } = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt,

    });


    this.sql`INSERT INTO llm_cache (prompt, response, created_at)

      VALUES (${prompt}, ${text}, ${Date.now()})`;


    return text;

  }

}


```

Explain Code

For provider-level caching and rate limit management across multiple agents, use [AI Gateway](https://developers.cloudflare.com/ai-gateway/).

## Next steps

[ Using AI Models ](https://developers.cloudflare.com/agents/api-reference/using-ai-models/) Provider setup, streaming, and code examples for Workers AI, OpenAI, Anthropic, and more. 

[ Chat agents ](https://developers.cloudflare.com/agents/api-reference/chat-agents/) AIChatAgent handles message persistence, resumable streaming, and tools automatically. 

[ Store and sync state ](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) SQL database and key-value state APIs for building context and caching. 

[ Schedule tasks ](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) Run autonomous model calls on a delay, schedule, or cron. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/concepts/calling-llms/","name":"Calling LLMs"}}]}
```
