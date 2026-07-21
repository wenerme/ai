---
title: getCurrentAgent()
description: Access the current Agent context from external utility functions using getCurrentAgent() in the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# getCurrentAgent()

The `getCurrentAgent()` function allows you to access the current agent context from anywhere in your code, including external utility functions and libraries. This is useful when you need agent information in functions that do not have direct access to `this`.

## Automatic context for custom methods

The framework detects and wraps custom Agent methods during initialization so `getCurrentAgent()` can resolve the active agent inside them and the functions they call.

## How it works

* [  JavaScript ](#tab-panel-6811)
* [  TypeScript ](#tab-panel-6812)

**JavaScript**

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
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

**TypeScript**

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
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

* [  JavaScript ](#tab-panel-6827)
* [  TypeScript ](#tab-panel-6828)

**JavaScript**

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
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

**TypeScript**

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
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

* [  JavaScript ](#tab-panel-6809)
* [  TypeScript ](#tab-panel-6810)

**JavaScript**

```js
// When you call a custom method:
agent.customMethod();
// → automatically wrapped with agentContext.run()
// → your method executes with full context
// → external functions can use getCurrentAgent()
```

**TypeScript**

```ts
// When you call a custom method:
agent.customMethod();
// → automatically wrapped with agentContext.run()
// → your method executes with full context
// → external functions can use getCurrentAgent()
```

## Common use cases

### Working with AI SDK tools

* [  JavaScript ](#tab-panel-6821)
* [  TypeScript ](#tab-panel-6822)

**JavaScript**

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
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

**TypeScript**

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
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

* [  JavaScript ](#tab-panel-6817)
* [  TypeScript ](#tab-panel-6818)

**JavaScript**

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
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

**TypeScript**

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
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

* [  JavaScript ](#tab-panel-6823)
* [  TypeScript ](#tab-panel-6824)

**JavaScript**

```js
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

**TypeScript**

```ts
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

## When context is lost

The agent context only propagates along the call tree of the original invocation. Code reached outside that call tree starts with an empty context, so `getCurrentAgent()` returns an object whose fields are `undefined`. Common cases include:

* a host callback invoked through RPC from a Worker Loader child isolate, such as sandboxed Codemode execution;
* a service binding or Durable Object RPC entrypoint;
* a queue consumer or another entrypoint that retains an agent reference.

Route the callback through a public method on the agent. Custom methods are wrapped automatically, so calling `agent.someMethod()` re-enters that agent's context:

* [  JavaScript ](#tab-panel-6829)
* [  TypeScript ](#tab-panel-6830)

**JavaScript**

```js
import { RpcTarget } from "cloudflare:workers";


class HostCallbackBridge extends RpcTarget {
  agent;


  constructor(agent) {
    super();
    this.agent = agent;
  }


  // Invoked through RPC from a Worker Loader child isolate. There is no context
  // ancestry. Calling a public agent method restores it automatically.
  async invoke() {
    return this.agent.handleSandboxCallback();
  }
}


export class MyMcpAgent extends McpAgent {
  async handleSandboxCallback() {
    const { agent } = getCurrentAgent();
    // `agent` is available again.
  }
}
```

**TypeScript**

```ts
import { RpcTarget } from "cloudflare:workers";


class HostCallbackBridge extends RpcTarget {
  agent: MyMcpAgent;


  constructor(agent: MyMcpAgent) {
    super();
    this.agent = agent;
  }


  // Invoked through RPC from a Worker Loader child isolate. There is no context
  // ancestry. Calling a public agent method restores it automatically.
  async invoke() {
    return this.agent.handleSandboxCallback();
  }
}


export class MyMcpAgent extends McpAgent {
  async handleSandboxCallback() {
    const { agent } = getCurrentAgent<MyMcpAgent>();
    // `agent` is available again.
  }
}
```

Context restored this way has `connection`, `request`, and `email` unset. It is not tied to live client I/O.

Server-initiated MCP requests (`elicitInput`, `createMessage`, and `listRoots`) on `McpAgent` do not require this indirection because the MCP transport retains its owning agent.

## API reference

### `getCurrentAgent()`

Gets the current agent from any context where it is available.

* [  JavaScript ](#tab-panel-6813)
* [  TypeScript ](#tab-panel-6814)

**JavaScript**

```js
import { getCurrentAgent } from "agents";
```

**TypeScript**

```ts
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

* [  JavaScript ](#tab-panel-6825)
* [  TypeScript ](#tab-panel-6826)

**JavaScript**

```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import { getCurrentAgent } from "agents";


export class MyAgent extends AIChatAgent {
  async customMethod() {
    const { agent, connection, request } = getCurrentAgent();
    // agent is properly typed as MyAgent
    // connection and request available if called from a request handler
  }
}
```

**TypeScript**

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
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

  * [  JavaScript ](#tab-panel-6819)
  * [  TypeScript ](#tab-panel-6820)

**JavaScript**
```js
const { agent } = getCurrentAgent();
if (agent) {
  // Safe to use agent
  console.log(agent.name);
}
```

**TypeScript**
```ts
const { agent } = getCurrentAgent();
if (agent) {
  // Safe to use agent
  console.log(agent.name);
}
```
4. **Type the agent**: Pass your agent class as a type parameter for proper typing.

  * [  JavaScript ](#tab-panel-6815)
  * [  TypeScript ](#tab-panel-6816)

**JavaScript**
```js
const { agent } = getCurrentAgent();
// agent is typed as MyAgent | undefined
```

**TypeScript**
```ts
const { agent } = getCurrentAgent<MyAgent>();
// agent is typed as MyAgent | undefined
```

## Next steps

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK.

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) Expose methods to clients via RPC.

[ State management ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Manage and sync agent state.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/#page","headline":"getCurrentAgent() · Cloudflare Agents docs","description":"Access the current Agent context from external utility functions using getCurrentAgent() in the Agents SDK.","url":"https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/lifecycle/","name":"Lifecycle"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/lifecycle/get-current-agent/","name":"getCurrentAgent()"}}]}
```
