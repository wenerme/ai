---
title: Agent tools
description: Run Think and AIChatAgent sub-agents as retained, streaming tools from a parent agent.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agent tools

Agent tools let one chat agent dispatch another chat-capable sub-agent as part of its work. The child is a real sub-agent with its own Durable Object storage, messages, tools, resumable stream, and drill-in URL. The parent keeps a small run registry so clients can render the child timeline, replay it after refresh, and clean it up later.

Agent tools support `@cloudflare/think` agents and `AIChatAgent` subclasses. `AIChatAgent` children run headlessly through `saveMessages()`, so they should use server-side tools. Browser-provided client tools are not available during an agent-tool turn unless you model that interaction as server-side state or a separate parent-mediated workflow.

## Agent tools vs sub-agent RPC

Use `subAgent(...).chat()` when parent code needs direct streaming RPC to a specific child and your code owns forwarding, cancellation, and replay policy.

Use `agentTool()` or `runAgentTool()` when a parent model or workflow delegates work to a child agent and you want retained child runs, event replay, abort bridging, and UI drill-in. For Think-specific turn choices, refer to [Choose a turn API](https://developers.cloudflare.com/agents/api-reference/think/#choose-a-turn-api).

## Use an agent as an AI SDK tool

Use `agentTool()` when the parent model should decide when to call the helper.

* [  JavaScript ](#tab-panel-3234)
* [  TypeScript ](#tab-panel-3235)

JavaScript

```

import { Think } from "@cloudflare/think";

import { agentTool } from "agents/agent-tools";

import { z } from "zod";


export class Researcher extends Think {

  getSystemPrompt() {

    return "Research the user's topic and end with a concise summary.";

  }

}


export class Assistant extends Think {

  getTools() {

    return {

      research: agentTool(Researcher, {

        description: "Research one topic in depth.",

        displayName: "Researcher",

        inputSchema: z.object({

          query: z.string().min(3),

        }),

      }),

    };

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { agentTool } from "agents/agent-tools";

import { z } from "zod";


export class Researcher extends Think<Env> {

  getSystemPrompt() {

    return "Research the user's topic and end with a concise summary.";

  }

}


export class Assistant extends Think<Env> {

  getTools() {

    return {

      research: agentTool(Researcher, {

        description: "Research one topic in depth.",

        displayName: "Researcher",

        inputSchema: z.object({

          query: z.string().min(3),

        }),

      }),

    };

  }

}


```

The child can also be an `AIChatAgent`:

* [  JavaScript ](#tab-panel-3238)
* [  TypeScript ](#tab-panel-3239)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { agentTool } from "agents/agent-tools";

import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { z } from "zod";


export class Summarizer extends AIChatAgent {

  formatAgentToolInput(input, request) {

    return {

      id: `agent-tool-${request.runId}-input`,

      role: "user",

      parts: [{ type: "text", text: `Summarize:\n\n${input.text}` }],

    };

  }


  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


export class Assistant extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: {

        summarize: agentTool(Summarizer, {

          description: "Summarize long text in a separate retained agent.",

          inputSchema: z.object({ text: z.string() }),

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { agentTool } from "agents/agent-tools";

import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { z } from "zod";


export class Summarizer extends AIChatAgent<Env> {

  protected override formatAgentToolInput(input: { text: string }, request) {

    return {

      id: `agent-tool-${request.runId}-input`,

      role: "user",

      parts: [{ type: "text", text: `Summarize:\n\n${input.text}` }],

    };

  }


  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


export class Assistant extends AIChatAgent<Env> {

  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: {

        summarize: agentTool(Summarizer, {

          description: "Summarize long text in a separate retained agent.",

          inputSchema: z.object({ text: z.string() }),

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

The generated tool calls `this.runAgentTool(ChildAgent, ...)`, streams `agent-tool-event` frames on the parent WebSocket, and returns the child summary to the parent model. If the run fails, aborts, or is interrupted, the tool returns a structured failure instead of an empty success value.

For Think children that do workflow-style work without user-facing assistant text, override `getAgentToolOutput()` and, if needed, `getAgentToolSummary()`. Assistant text remains the default summary when present, but a Think agent-tool run can complete successfully without emitting text chunks.

Persist any structured output before the child turn finishes, because `getAgentToolOutput()` is read as soon as `saveMessages()` resolves. Keep `getAgentToolSummary()` concise for display; the full structured value is stored separately as the tool output.

* [  JavaScript ](#tab-panel-3228)
* [  TypeScript ](#tab-panel-3229)

JavaScript

```

export class Extractor extends Think {

  getAgentToolOutput(runId) {

    const rows = this.sql`

      SELECT result_json FROM extraction_runs WHERE id = ${runId}

    `;

    return rows[0] ? JSON.parse(rows[0].result_json) : undefined;

  }


  getAgentToolSummary(_runId, output) {

    return output ? "Extraction complete" : "";

  }

}


```

TypeScript

```

export class Extractor extends Think<Env> {

  protected override getAgentToolOutput(runId: string) {

    const rows = this.sql<{ result_json: string }>`

      SELECT result_json FROM extraction_runs WHERE id = ${runId}

    `;

    return rows[0] ? JSON.parse(rows[0].result_json) : undefined;

  }


  protected override getAgentToolSummary(_runId: string, output: unknown) {

    return output ? "Extraction complete" : "";

  }

}


```

## Run an agent tool imperatively

Use `runAgentTool()` for deterministic workflows, scheduled work, HTTP handlers, or fan-out code.

* [  JavaScript ](#tab-panel-3232)
* [  TypeScript ](#tab-panel-3233)

JavaScript

```

const [a, b] = await Promise.allSettled([

  this.runAgentTool(Researcher, {

    input: { query: "HTTP/3" },

    parentToolCallId: toolCallId,

    displayOrder: 0,

  }),

  this.runAgentTool(Researcher, {

    input: { query: "gRPC" },

    parentToolCallId: toolCallId,

    displayOrder: 1,

  }),

]);


```

TypeScript

```

const [a, b] = await Promise.allSettled([

  this.runAgentTool(Researcher, {

    input: { query: "HTTP/3" },

    parentToolCallId: toolCallId,

    displayOrder: 0,

  }),

  this.runAgentTool(Researcher, {

    input: { query: "gRPC" },

    parentToolCallId: toolCallId,

    displayOrder: 1,

  }),

]);


```

`runAgentTool()` is idempotent by `runId`. Passing the same `runId` never starts a duplicate child turn. Completed, failed, aborted, and interrupted runs are retained until you explicitly clear them.

## Render child timelines in React

`useAgentToolEvents()` is a headless hook. It subscribes to the existing parent connection, deduplicates replay/live races, applies child `UIMessageChunk` bodies to message parts, and groups sibling runs by parent tool call ID.

* [  JavaScript ](#tab-panel-3236)
* [  TypeScript ](#tab-panel-3237)

JavaScript

```

import { useAgent, useAgentToolEvents } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


const agent = useAgent({ agent: "Assistant", name: userId });

const { messages } = useAgentChat({ agent });

const agentTools = useAgentToolEvents({ agent });


for (const message of messages) {

  for (const part of message.parts) {

    if (part.type === "tool-call") {

      const runs = agentTools.getRunsForToolCall(part.toolCallId);

      // Render the child runs beside this tool call.

    }

  }

}


```

TypeScript

```

import { useAgent, useAgentToolEvents } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


const agent = useAgent({ agent: "Assistant", name: userId });

const { messages } = useAgentChat({ agent });

const agentTools = useAgentToolEvents({ agent });


for (const message of messages) {

  for (const part of message.parts) {

    if (part.type === "tool-call") {

      const runs = agentTools.getRunsForToolCall(part.toolCallId);

      // Render the child runs beside this tool call.

    }

  }

}


```

Imperative runs without a parent tool call are available as `agentTools.unboundRuns`.

## Drill in and gate access

Agent tools are normal sub-agents. Connect to a retained child through the parent route:

* [  JavaScript ](#tab-panel-3226)
* [  TypeScript ](#tab-panel-3227)

JavaScript

```

useAgent({

  agent: "Assistant",

  name: userId,

  sub: [{ agent: "Researcher", name: runId }],

});


```

TypeScript

```

useAgent({

  agent: "Assistant",

  name: userId,

  sub: [{ agent: "Researcher", name: runId }],

});


```

Gate external access with the parent registry so guessed run IDs cannot spawn fresh child facets:

TypeScript

```

override async onBeforeSubAgent(_request, child) {

  if (!this.hasAgentToolRun(child.className, child.name)) {

    return new Response("Not found", { status: 404 });

  }

}


```

## Clear retained runs

Runs and child facets are retained by default for refresh, drill-in, and later inspection. Delete them explicitly when clearing chat history or applying your own retention policy:

* [  JavaScript ](#tab-panel-3230)
* [  TypeScript ](#tab-panel-3231)

JavaScript

```

await this.clearAgentToolRuns();

await this.clearAgentToolRuns({

  status: ["completed", "error", "aborted", "interrupted"],

});

await this.clearAgentToolRuns({ olderThan: Date.now() - 7 * 24 * 60 * 60_000 });


```

TypeScript

```

await this.clearAgentToolRuns();

await this.clearAgentToolRuns({

  status: ["completed", "error", "aborted", "interrupted"],

});

await this.clearAgentToolRuns({ olderThan: Date.now() - 7 * 24 * 60 * 60_000 });


```

If a retained run is still `starting` or `running`, cleanup cancels the child before deleting its facet.

## Example

[ Agents as tools example ](https://github.com/cloudflare/agents/tree/main/examples/agents-as-tools) Run chat-capable sub-agents as retained tools, stream their timelines inline, and drill into child agents. 

## Related

[ Sub-agents ](https://developers.cloudflare.com/agents/api-reference/sub-agents/) Spawn child agents with isolated storage, typed RPC, and nested client routing. 

[ Chat agents ](https://developers.cloudflare.com/agents/api-reference/chat-agents/) Build AI chat interfaces with AIChatAgent and useAgentChat. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/agent-tools/","name":"Agent tools"}}]}
```
