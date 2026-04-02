---
title: Build Agents on Cloudflare
description: Most AI applications today are stateless — they process a request, return a response, and forget everything. Real agents need more. They need to remember conversations, act on schedules, call tools, coordinate with other agents, and stay connected to users in real-time. The Agents SDK gives you all of this as a TypeScript class.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Build Agents on Cloudflare

Most AI applications today are stateless — they process a request, return a response, and forget everything. Real agents need more. They need to remember conversations, act on schedules, call tools, coordinate with other agents, and stay connected to users in real-time. The Agents SDK gives you all of this as a TypeScript class.

Each agent runs on a [Durable Object](https://developers.cloudflare.com/durable-objects/) — a stateful micro-server with its own SQL database, WebSocket connections, and scheduling. Deploy once and Cloudflare runs your agents across its global network, scaling to tens of millions of instances. No infrastructure to manage, no sessions to reconstruct, no state to externalize.

### Get started

Three commands to a running agent. No API keys required — the starter uses [Workers AI](https://developers.cloudflare.com/workers-ai/) by default.

Terminal window

```

npx create-cloudflare@latest --template cloudflare/agents-starter

cd agents-starter && npm install

npm run dev


```

The starter includes streaming AI chat, server-side and client-side tools, human-in-the-loop approval, and task scheduling — a foundation you can build on or tear apart. You can also swap in [OpenAI, Anthropic, Google Gemini, or any other provider](https://developers.cloudflare.com/agents/api-reference/using-ai-models/).

[ Build a chat agent ](https://developers.cloudflare.com/agents/getting-started/build-a-chat-agent/) Step-by-step tutorial that walks through the starter and shows how to customize it. 

[ Add to an existing project ](https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/) Install the agents package into a Workers project and wire up routing. 

### What agents can do

* **Remember everything** — Every agent has a built-in [SQL database](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) and key-value state that syncs to connected clients in real-time. State survives restarts, deploys, and hibernation.
* **Build AI chat** — [AIChatAgent](https://developers.cloudflare.com/agents/api-reference/chat-agents/) gives you streaming AI chat with automatic message persistence, resumable streams, and tool support. Pair it with the [useAgentChat](https://developers.cloudflare.com/agents/api-reference/chat-agents/) React hook to build chat UIs in minutes.
* **Think with any model** — Call [any AI model](https://developers.cloudflare.com/agents/api-reference/using-ai-models/) — Workers AI, OpenAI, Anthropic, Gemini — and stream responses over [WebSockets](https://developers.cloudflare.com/agents/api-reference/websockets/) or [Server-Sent Events](https://developers.cloudflare.com/agents/api-reference/http-sse/). Long-running reasoning models that take minutes to respond work out of the box.
* **Use and serve tools** — Define server-side tools, client-side tools that run in the browser, and [human-in-the-loop](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/) approval flows. Expose your agent's tools to other agents and LLMs via [MCP](https://developers.cloudflare.com/agents/api-reference/mcp-agent-api/).
* **Act on their own** — [Schedule tasks](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) on a delay, at a specific time, or on a cron. Agents can wake themselves up, do work, and go back to sleep — without a user present.
* **Browse the web** — Spin up [headless browsers](https://developers.cloudflare.com/agents/api-reference/browse-the-web/) to scrape, screenshot, and interact with web pages.
* **Orchestrate work** — Run multi-step [workflows](https://developers.cloudflare.com/agents/api-reference/run-workflows/) with automatic retries, or coordinate across multiple agents.
* **React to events** — Handle [inbound email](https://developers.cloudflare.com/agents/api-reference/email/), HTTP requests, WebSocket messages, and state changes — all from the same class.

### How it works

An agent is a TypeScript class. Methods marked with `@callable()` become typed RPC that clients can call directly over WebSocket.

* [  JavaScript ](#tab-panel-2096)
* [  TypeScript ](#tab-panel-2097)

JavaScript

```

import { Agent, callable } from "agents";


export class CounterAgent extends Agent {

  initialState = { count: 0 };


  @callable()

  increment() {

    this.setState({ count: this.state.count + 1 });

    return this.state.count;

  }

}


```

TypeScript

```

import { Agent, callable } from "agents";


export class CounterAgent extends Agent<Env, { count: number }> {

  initialState = { count: 0 };


  @callable()

  increment() {

    this.setState({ count: this.state.count + 1 });

    return this.state.count;

  }

}


```

```

import { useAgent } from "agents/react";


function Counter() {

  const [count, setCount] = useState(0);

  const agent = useAgent({

    agent: "CounterAgent",

    onStateUpdate: (state) => setCount(state.count),

  });


  return <button onClick={() => agent.stub.increment()}>{count}</button>;

}


```

For AI chat, extend `AIChatAgent` instead. Messages are persisted automatically, streams resume on disconnect, and the React hook handles the UI.

* [  JavaScript ](#tab-panel-2098)
* [  TypeScript ](#tab-panel-2099)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createWorkersAI } from "workers-ai-provider";

import { streamText, convertToModelMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createWorkersAI } from "workers-ai-provider";

import { streamText, convertToModelMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


```

Refer to the [quick start](https://developers.cloudflare.com/agents/getting-started/quick-start/) for a full walkthrough, the [chat agents guide](https://developers.cloudflare.com/agents/api-reference/chat-agents/) for the full chat API, or the [Agents API reference](https://developers.cloudflare.com/agents/api-reference/agents-api/) for the complete SDK.

---

### Build on the Cloudflare Platform

**[Workers AI](https://developers.cloudflare.com/workers-ai/)** 

Run machine learning models, powered by serverless GPUs, on Cloudflare's global network. No API keys required.

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

**[AI Gateway](https://developers.cloudflare.com/ai-gateway/)** 

Observe and control your AI applications with caching, rate limiting, request retries, model fallback, and more.

**[Vectorize](https://developers.cloudflare.com/vectorize/)** 

Build full-stack AI applications with Vectorize, Cloudflare's vector database for semantic search, recommendations, and providing context to LLMs.

**[Workflows](https://developers.cloudflare.com/workflows/)** 

Build stateful agents that guarantee executions, including automatic retries, persistent state that runs for minutes, hours, days, or weeks.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}}]}
```
