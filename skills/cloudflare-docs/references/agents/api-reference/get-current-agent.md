---
title: getCurrentAgent()
description: The getCurrentAgent() function allows you to access the current agent context from anywhere in your code, including external utility functions and libraries. This is useful when you need agent information in functions that do not have direct access to this.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/get-current-agent.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# getCurrentAgent()

The `getCurrentAgent()` function allows you to access the current agent context from anywhere in your code, including external utility functions and libraries. This is useful when you need agent information in functions that do not have direct access to `this`.

## Automatic context for custom methods

All custom methods automatically have full agent context. The framework automatically detects and wraps your custom methods during initialization, ensuring `getCurrentAgent()` works everywhere.

## How it works

* [  JavaScript ](#tab-panel-2374)
* [  TypeScript ](#tab-panel-2375)

JavaScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


export class MyAgent extends AIChatAgent {

  async customMethod() {

    const { agent } = getCurrentAgent();

    // agent is automatically available

    console.log(agent.name);

  }


  async anotherMethod() {

    // This works too - no setup needed

    const { agent } = getCurrentAgent();

    return agent.state;

  }

}


```

TypeScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


export class MyAgent extends AIChatAgent {

  async customMethod() {

    const { agent } = getCurrentAgent();

    // agent is automatically available

    console.log(agent.name);

  }


  async anotherMethod() {

    // This works too - no setup needed

    const { agent } = getCurrentAgent();

    return agent.state;

  }

}


```

No configuration is required. The framework automatically:

1. Scans your agent class for custom methods.
2. Wraps them with agent context during initialization.
3. Ensures `getCurrentAgent()` works in all external functions called from your methods.

## Real-world example

* [  JavaScript ](#tab-panel-2390)
* [  TypeScript ](#tab-panel-2391)

JavaScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


// External utility function that needs agent context

async function processWithAI(prompt) {

  const { agent } = getCurrentAgent();

  // External functions can access the current agent


  return await generateText({

    model: openai("gpt-4"),

    prompt: `Agent ${agent?.name}: ${prompt}`,

  });

}


export class MyAgent extends AIChatAgent {

  async customMethod(message) {

    // Use this.* to access agent properties directly

    console.log("Agent name:", this.name);

    console.log("Agent state:", this.state);


    // External functions automatically work

    const result = await processWithAI(message);

    return result.text;

  }

}


```

TypeScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


// External utility function that needs agent context

async function processWithAI(prompt: string) {

  const { agent } = getCurrentAgent();

  // External functions can access the current agent


  return await generateText({

    model: openai("gpt-4"),

    prompt: `Agent ${agent?.name}: ${prompt}`,

  });

}


export class MyAgent extends AIChatAgent {

  async customMethod(message: string) {

    // Use this.* to access agent properties directly

    console.log("Agent name:", this.name);

    console.log("Agent state:", this.state);


    // External functions automatically work

    const result = await processWithAI(message);

    return result.text;

  }

}


```

### Built-in vs custom methods

* **Built-in methods** (`onRequest`, `onEmail`, `onStateChanged`): Already have context.
* **Custom methods** (your methods): Automatically wrapped during initialization.
* **External functions**: Access context through `getCurrentAgent()`.

### The context flow

* [  JavaScript ](#tab-panel-2372)
* [  TypeScript ](#tab-panel-2373)

JavaScript

```

// When you call a custom method:

agent.customMethod();

// → automatically wrapped with agentContext.run()

// → your method executes with full context

// → external functions can use getCurrentAgent()


```

TypeScript

```

// When you call a custom method:

agent.customMethod();

// → automatically wrapped with agentContext.run()

// → your method executes with full context

// → external functions can use getCurrentAgent()


```

## Common use cases

### Working with AI SDK tools

* [  JavaScript ](#tab-panel-2384)
* [  TypeScript ](#tab-panel-2385)

JavaScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


export class MyAgent extends AIChatAgent {

  async generateResponse(prompt) {

    // AI SDK tools automatically work

    const response = await generateText({

      model: openai("gpt-4"),

      prompt,

      tools: {

        // Tools that use getCurrentAgent() work perfectly

      },

    });


    return response.text;

  }

}


```

TypeScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { generateText } from "ai";

import { openai } from "@ai-sdk/openai";


export class MyAgent extends AIChatAgent {

  async generateResponse(prompt: string) {

    // AI SDK tools automatically work

    const response = await generateText({

      model: openai("gpt-4"),

      prompt,

      tools: {

        // Tools that use getCurrentAgent() work perfectly

      },

    });


    return response.text;

  }

}


```

### Calling external libraries

* [  JavaScript ](#tab-panel-2382)
* [  TypeScript ](#tab-panel-2383)

JavaScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


async function saveToDatabase(data) {

  const { agent } = getCurrentAgent();

  // Can access agent info for logging, context, etc.

  console.log(`Saving data for agent: ${agent?.name}`);

}


export class MyAgent extends AIChatAgent {

  async processData(data) {

    // External functions automatically have context

    await saveToDatabase(data);

  }

}


```

TypeScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


async function saveToDatabase(data: any) {

  const { agent } = getCurrentAgent();

  // Can access agent info for logging, context, etc.

  console.log(`Saving data for agent: ${agent?.name}`);

}


export class MyAgent extends AIChatAgent {

  async processData(data: any) {

    // External functions automatically have context

    await saveToDatabase(data);

  }

}


```

### Accessing request and connection context

* [  JavaScript ](#tab-panel-2386)
* [  TypeScript ](#tab-panel-2387)

JavaScript

```

import { getCurrentAgent } from "agents";


function logRequestInfo() {

  const { agent, connection, request } = getCurrentAgent();


  if (request) {

    console.log("Request URL:", request.url);

    console.log("Request method:", request.method);

  }


  if (connection) {

    console.log("Connection ID:", connection.id);

  }

}


```

TypeScript

```

import { getCurrentAgent } from "agents";


function logRequestInfo() {

  const { agent, connection, request } = getCurrentAgent();


  if (request) {

    console.log("Request URL:", request.url);

    console.log("Request method:", request.method);

  }


  if (connection) {

    console.log("Connection ID:", connection.id);

  }

}


```

## API reference

### `getCurrentAgent()`

Gets the current agent from any context where it is available.

* [  JavaScript ](#tab-panel-2376)
* [  TypeScript ](#tab-panel-2377)

JavaScript

```

import { getCurrentAgent } from "agents";


```

TypeScript

```

import { getCurrentAgent } from "agents";


function getCurrentAgent<T extends Agent>(): {

  agent: T | undefined;

  connection: Connection | undefined;

  request: Request | undefined;

  email: AgentEmail | undefined;

};


```

#### Returns:

| Property   | Type                    | Description                                                   |
| ---------- | ----------------------- | ------------------------------------------------------------- |
| agent      | T \| undefined          | The current agent instance                                    |
| connection | Connection \| undefined | The WebSocket connection (if called from a WebSocket handler) |
| request    | Request \| undefined    | The HTTP request (if called from a request handler)           |
| email      | AgentEmail \| undefined | The email (if called from an email handler)                   |

#### Usage:

* [  JavaScript ](#tab-panel-2388)
* [  TypeScript ](#tab-panel-2389)

JavaScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


export class MyAgent extends AIChatAgent {

  async customMethod() {

    const { agent, connection, request } = getCurrentAgent();

    // agent is properly typed as MyAgent

    // connection and request available if called from a request handler

  }

}


```

TypeScript

```

import { AIChatAgent } from "agents/ai-chat-agent";

import { getCurrentAgent } from "agents";


export class MyAgent extends AIChatAgent {

  async customMethod() {

    const { agent, connection, request } = getCurrentAgent<MyAgent>();

    // agent is properly typed as MyAgent

    // connection and request available if called from a request handler

  }

}


```

### Context availability

The context available depends on how the method was invoked:

| Invocation              | agent | connection | request | email   |
| ----------------------- | ----- | ---------- | ------- | ------- |
| onRequest()             | Yes   | No         | Yes     | No      |
| onConnect()             | Yes   | Yes        | Yes     | No      |
| onMessage()             | Yes   | Yes        | No      | No      |
| onEmail()               | Yes   | No         | No      | Yes     |
| Custom method (via RPC) | Yes   | Yes        | No      | No      |
| Scheduled task          | Yes   | No         | No      | No      |
| Queue callback          | Yes   | Depends    | Depends | Depends |

## Best practices

1. **Use `this` when possible**: Inside agent methods, prefer `this.name`, `this.state`, etc. over `getCurrentAgent()`.
2. **Use `getCurrentAgent()` in external functions**: When you need agent context in utility functions or libraries that do not have access to `this`.
3. **Check for undefined**: The returned values may be `undefined` if called outside an agent context.  
   * [  JavaScript ](#tab-panel-2380)  
   * [  TypeScript ](#tab-panel-2381)  
JavaScript  
```  
const { agent } = getCurrentAgent();  
if (agent) {  
  // Safe to use agent  
  console.log(agent.name);  
}  
```  
TypeScript  
```  
const { agent } = getCurrentAgent();  
if (agent) {  
  // Safe to use agent  
  console.log(agent.name);  
}  
```
4. **Type the agent**: Pass your agent class as a type parameter for proper typing.  
   * [  JavaScript ](#tab-panel-2378)  
   * [  TypeScript ](#tab-panel-2379)  
JavaScript  
```  
const { agent } = getCurrentAgent();  
// agent is typed as MyAgent | undefined  
```  
TypeScript  
```  
const { agent } = getCurrentAgent<MyAgent>();  
// agent is typed as MyAgent | undefined  
```

## Next steps

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

[ Callable methods ](https://developers.cloudflare.com/agents/api-reference/callable-methods/) Expose methods to clients via RPC. 

[ State management ](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) Manage and sync agent state. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/get-current-agent/","name":"getCurrentAgent()"}}]}
```
