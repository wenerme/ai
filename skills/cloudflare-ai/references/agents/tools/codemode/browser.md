---
title: Browser integration
description: Run model-generated code against browser-owned tools with the Code Mode iframe executor and an Agent chat UI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Browser integration

Use `@cloudflare/codemode/browser` when your browser owns the tools that the model must orchestrate. For example, these tools might read page state, access browser APIs, or update data held by your application.

Code Mode is useful when the model must call several client tools with loops, conditions, or intermediate results. For a single browser action, use a standard client-side tool instead.

Code Mode presents those tools to the model as typed functions. The model writes one JavaScript async arrow function that can call several tools, combine their results, and apply control flow. `IframeSandboxExecutor` runs that generated code in a sandboxed iframe on the page.

This integration does not give an agent control of a remote browser. To inspect websites, capture screenshots, or automate pages with the Chrome DevTools Protocol (CDP), refer to [Browser tools](https://developers.cloudflare.com/agents/tools/browser/).

## Install Code Mode

Install the package in your client application:

 npm  yarn  pnpm  bun

```
npm i @cloudflare/codemode
```

```
yarn add @cloudflare/codemode
```

```
pnpm add @cloudflare/codemode
```

```
bun add @cloudflare/codemode
```

The `@cloudflare/codemode/browser` entry point uses JSON Schema and browser APIs. It does not require the AI SDK or Zod peer dependencies used by `@cloudflare/codemode/ai`.

## Add Code Mode to an Agent chat UI

The browser creates the Code Mode tool and registers it as a dynamic client tool. The Agent receives the tool schema, but the tool implementation remains in the browser.

1. Define the browser-owned tools with JSON Schema and an `execute` function.

  * [  JavaScript ](#tab-panel-7055)
  * [  TypeScript ](#tab-panel-7056)

**src/browser-tools.js**
```js
export const browserTools = {
  getPageInfo: {
    description: "Get information about the current browser page",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    execute: async () => ({
      title: document.title,
      url: window.location.href,
    }),
  },
  getSelectionText: {
    description: "Get the user's current text selection",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    execute: async () => ({
      text: window.getSelection()?.toString() ?? "",
    }),
  },
};
```

**src/browser-tools.ts**
```ts
import type { JsonSchemaExecutableToolDescriptors } from "@cloudflare/codemode/browser";
export const browserTools: JsonSchemaExecutableToolDescriptors = {
  getPageInfo: {
    description: "Get information about the current browser page",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    execute: async () => ({
      title: document.title,
      url: window.location.href
    })
  },
  getSelectionText: {
    description: "Get the user's current text selection",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    execute: async () => ({
      text: window.getSelection()?.toString() ?? ""
    })
  }
};
```
JSON Schema supplies the types shown to the model. `createBrowserCodeTool()` does not use the schema to validate arguments at runtime. Validate untrusted inputs inside each `execute` function when required.
2. Create the Code Mode descriptor with an iframe executor.

  * [  JavaScript ](#tab-panel-7053)
  * [  TypeScript ](#tab-panel-7054)

**src/codemode-tool.js**
```js
import {
  IframeSandboxExecutor,
  createBrowserCodeTool,
} from "@cloudflare/codemode/browser";
import { browserTools } from "./browser-tools";
export const codemodeTool = createBrowserCodeTool({
  tools: browserTools,
  executor: new IframeSandboxExecutor(),
});
```

**src/codemode-tool.ts**
```ts
import {
  IframeSandboxExecutor,
  createBrowserCodeTool
} from "@cloudflare/codemode/browser";
import { browserTools } from "./browser-tools";
export const codemodeTool = createBrowserCodeTool({
  tools: browserTools,
  executor: new IframeSandboxExecutor()
});
```
`createBrowserCodeTool()` returns a plain descriptor named `codemode`. Its description includes generated TypeScript definitions for the browser tools. Its input contains the model-generated JavaScript in a `code` property.
The `executor` option is optional. When omitted, `createBrowserCodeTool()` creates an `IframeSandboxExecutor` with default settings.
3. Register the descriptor with `useAgentChat()` and execute client tool calls.

  * [  JavaScript ](#tab-panel-7059)
  * [  TypeScript ](#tab-panel-7060)

**src/client.jsx**
```js
import { useAgentChat } from "@cloudflare/ai-chat/react";
import { useAgent } from "agents/react";
import { useMemo } from "react";
import { codemodeTool } from "./codemode-tool";
function BrowserCodeModeChat() {
  const agent = useAgent({ agent: "browser-codemode" });
  const tools = useMemo(
    () => ({
      codemode: {
        description: codemodeTool.description,
        parameters: codemodeTool.inputSchema,
        execute: (input) => codemodeTool.execute(input),
      },
    }),
    [],
  );
  const { messages, sendMessage } = useAgentChat({
    agent,
    tools,
    onToolCall: async ({ toolCall, addToolOutput }) => {
      const tool = tools[toolCall.toolName];
      if (!tool?.execute) return;
      try {
        const output = await tool.execute(toolCall.input);
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          output,
        });
      } catch (error) {
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          state: "output-error",
          errorText: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });
  // Render messages and call sendMessage() from your chat UI.
}
```

**src/client.tsx**
```ts
import { useAgentChat, type AITool } from "@cloudflare/ai-chat/react";
import { useAgent } from "agents/react";
import { useMemo } from "react";
import { codemodeTool } from "./codemode-tool";
function BrowserCodeModeChat() {
  const agent = useAgent({ agent: "browser-codemode" });
  const tools = useMemo<Record<string, AITool>>(
    () => ({
      codemode: {
        description: codemodeTool.description,
        parameters: codemodeTool.inputSchema,
        execute: (input) =>
          codemodeTool.execute(input as { code: string })
      }
    }),
    []
  );
  const { messages, sendMessage } = useAgentChat({
    agent,
    tools,
    onToolCall: async ({ toolCall, addToolOutput }) => {
      const tool = tools[toolCall.toolName];
      if (!tool?.execute) return;
      try {
        const output = await tool.execute(toolCall.input);
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          output
        });
      } catch (error) {
        addToolOutput({
          toolCallId: toolCall.toolCallId,
          state: "output-error",
          errorText: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  // Render messages and call sendMessage() from your chat UI.
}
```
`useAgentChat()` sends the registered client tool schema to the Agent. When the model calls `codemode`, `onToolCall` executes the descriptor in the browser and adds its output to the conversation.
4. On the Agent, convert the client schemas into model tools.

  * [  JavaScript ](#tab-panel-7057)
  * [  TypeScript ](#tab-panel-7058)

**src/server.js**
```js
import { AIChatAgent, createToolsFromClientSchemas } from "@cloudflare/ai-chat";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { createWorkersAI } from "workers-ai-provider";
export class BrowserCodemode extends AIChatAgent {
  async onChatMessage(_onFinish, options) {
    const workersai = createWorkersAI({ binding: this.env.AI });
    const result = streamText({
      model: workersai("@cf/moonshotai/kimi-k2.7-code"),
      system:
        "Use the codemode tool to write JavaScript that calls browser-provided tools.",
      messages: await convertToModelMessages(this.messages),
      tools: createToolsFromClientSchemas(options?.clientTools),
      stopWhen: stepCountIs(10),
    });
    return result.toUIMessageStreamResponse();
  }
}
```

**src/server.ts**
```ts
import { AIChatAgent, createToolsFromClientSchemas } from "@cloudflare/ai-chat";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { createWorkersAI } from "workers-ai-provider";
export class BrowserCodemode extends AIChatAgent<Env> {
  async onChatMessage(
    _onFinish?: unknown,
    options?: {
      clientTools?: Parameters<typeof createToolsFromClientSchemas>[0];
    }
  ) {
    const workersai = createWorkersAI({ binding: this.env.AI });
    const result = streamText({
      model: workersai("@cf/moonshotai/kimi-k2.7-code"),
      system:
        "Use the codemode tool to write JavaScript that calls browser-provided tools.",
      messages: await convertToModelMessages(this.messages),
      tools: createToolsFromClientSchemas(options?.clientTools),
      stopWhen: stepCountIs(10)
    });
    return result.toUIMessageStreamResponse();
  }
}
```
The Agent advertises the client-provided schema to the model. It does not run the generated code or the browser tool implementations.

If your browser tool set changes at runtime, create a new Code Mode descriptor and register the updated descriptor with your client tool layer.

## Iframe execution and security

`IframeSandboxExecutor` creates a hidden iframe for each execution. The iframe uses `sandbox="allow-scripts"` and receives the generated code through `postMessage`. Tool calls return to the parent page, which runs the matching browser-owned `execute` function.

Messages are scoped to the current iframe and an execution nonce. The executor removes the iframe and message listener after completion, failure, or timeout.

The executor accepts these options:

| Option  | Type   | Default                                                       | Behavior                                                        |
| ------- | ------ | ------------------------------------------------------------- | --------------------------------------------------------------- |
| timeout | number | 30000                                                         | Ends an execution after the specified number of milliseconds.   |
| csp     | string | default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; | Sets the Content Security Policy (CSP) for the iframe document. |

The default CSP blocks resources except the inline and evaluated scripts required to execute generated code. Pass a custom policy only when your generated code needs additional iframe capabilities.

Relaxing directives such as `connect-src`, `img-src`, or `form-action` can let generated iframe code communicate with external systems. That code could expose values returned by browser tools. Keep outbound destinations narrow, and do not place secrets in tool results. Browser-owned tools execute separately in the parent page with the capabilities their implementations provide.

Warning

The timeout cannot interrupt a tight synchronous loop such as `while (true) {}`. That code blocks the browser event loop, so the timeout callback cannot run. Browser-owned tools also execute in the parent page and retain the capabilities you give them.

## Approval constraints

`createBrowserCodeTool()` excludes any tool whose `needsApproval` value is `true` or a function. Code Mode does not pause iframe execution to request approval for those tools.

Keep approval-gated actions outside the Code Mode descriptor. Register them as standard tools and use the [useAgentChat() approval flow](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#tool-approval-human-in-the-loop) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/codemode/browser/#page","headline":"Browser integration · Cloudflare Agents docs","description":"Run model-generated code against browser-owned tools with the Code Mode iframe executor and an Agent chat UI.","url":"https://developers.cloudflare.com/agents/tools/codemode/browser/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/codemode/","name":"Code Mode"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/codemode/browser/","name":"Browser integration"}}]}
```
