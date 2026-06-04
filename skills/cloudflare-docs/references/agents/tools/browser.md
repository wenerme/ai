---
title: Browser
description: Give Agents full Chrome DevTools Protocol access to inspect pages, scrape data, and capture screenshots with Browser Run.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser

Agents can use [Browser Run](https://developers.cloudflare.com/browser-run/) to inspect and interact with web pages through the [Chrome DevTools Protocol (CDP)](https://developers.cloudflare.com/browser-run/cdp/). Beta Browser tools are useful when an agent needs to understand rendered pages, capture screenshots, debug frontend behavior, or extract information that is only available after JavaScript runs.

Use browser tools when you want an agent to:

* Open and inspect live web pages.
* Capture screenshots or page state.
* Scrape rendered content that is not present in static HTML.
* Debug frontend issues using CDP commands.
* Combine page inspection with other tools, such as RAG or Sandbox.

## How it works

Browser Run provides isolated browser sessions that agents can control with CDP. The agent can navigate pages, evaluate JavaScript, read DOM state, capture screenshots, and inspect network or console output.

Because browser sessions run outside the Worker isolate, use them for work that needs a real browser environment rather than lightweight HTTP fetches.

## Basic pattern

Create browser tools with the Browser Run and Worker Loader bindings, then pass those tools to your model call.

* [  JavaScript ](#tab-panel-5894)
* [  TypeScript ](#tab-panel-5895)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createBrowserTools } from "agents/browser/ai";

import { streamText, convertToModelMessages, stepCountIs } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class BrowserAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const browserTools = createBrowserTools({

      browser: this.env.BROWSER,

      loader: this.env.LOADER,

    });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      system: "You can inspect web pages with browser tools.",

      messages: await convertToModelMessages(this.messages),

      tools: browserTools,

      stopWhen: stepCountIs(10),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createBrowserTools } from "agents/browser/ai";

import { streamText, convertToModelMessages, stepCountIs } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class BrowserAgent extends AIChatAgent<Env> {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const browserTools = createBrowserTools({

      browser: this.env.BROWSER,

      loader: this.env.LOADER,

    });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      system: "You can inspect web pages with browser tools.",

      messages: await convertToModelMessages(this.messages),

      tools: browserTools,

      stopWhen: stepCountIs(10),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

Browser tools expose two capabilities:

| Tool             | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| browser\_search  | Query the CDP specification to discover commands, events, and types. |
| browser\_execute | Run CDP commands against a live browser session.                     |

## Configuration

Add the Browser Run and Worker Loader bindings to `wrangler.jsonc`.

* [  wrangler.jsonc ](#tab-panel-5892)
* [  wrangler.toml ](#tab-panel-5893)

JSONC

```

{

  "compatibility_flags": ["nodejs_compat"],

  "browser": {

    "binding": "BROWSER"

  },

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


[browser]

binding = "BROWSER"


[[worker_loaders]]

binding = "LOADER"


```

## Build a browser agent

For a complete walkthrough, including Browser Run setup, tool definitions, and screenshot capture, use the browser agent example.

[ Browser agent ](https://developers.cloudflare.com/agents/examples/browser-agent/) Build an agent that can browse the web, inspect pages, capture screenshots, and debug frontend issues. 

## Related resources

[ Browser Run ](https://developers.cloudflare.com/browser-run/) Run browser automation on Cloudflare. 

[ Chrome DevTools Protocol ](https://developers.cloudflare.com/browser-run/cdp/) Use CDP commands, events, and types with Browser Run. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/browser/","name":"Browser"}}]}
```
