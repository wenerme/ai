---
title: Create a durable Code Mode runtime
description: Create a Code Mode runtime with connectors, durable approvals, rollback, execution history, and reusable snippets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Create a durable Code Mode runtime

This guide adds a durable Code Mode runtime to an Agents SDK application. The runtime stores execution history, pending approvals, and snippets across Durable Object hibernation.

Warning

Code Mode is experimental and may introduce breaking changes. Use caution in production.

## Prerequisites

You need an existing Agents SDK application that uses `AIChatAgent`, Vite, and the AI SDK.

## Integrate Code Mode

1. Install the Code Mode package:
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
2. Add a Worker Loader binding. `DynamicWorkerExecutor` uses this binding to run model-generated code in isolated Workers:

  * [  wrangler.jsonc ](#tab-panel-6591)
  * [  wrangler.toml ](#tab-panel-6592)
JSONC
```
{  "$schema": "./node_modules/wrangler/config-schema.json",  // Set this to today's date  "compatibility_date": "2026-06-24",  "compatibility_flags": [    "nodejs_compat"  ],  "worker_loaders": [    {      "binding": "LOADER"    }  ]}
```
TOML
```
# Set this to today's datecompatibility_date = "2026-06-24"compatibility_flags = ["nodejs_compat"]
[[worker_loaders]]binding = "LOADER"
```
3. Add the Agents and Code Mode plugins to `vite.config.ts`:

  * [  JavaScript ](#tab-panel-6593)
  * [  TypeScript ](#tab-panel-6594)
vite.config.js
```
import { cloudflare } from "@cloudflare/vite-plugin";import codemode from "@cloudflare/codemode/vite";import agents from "agents/vite";import { defineConfig } from "vite";
export default defineConfig({  plugins: [agents(), codemode(), cloudflare()],});
```
vite.config.ts
```
import { cloudflare } from "@cloudflare/vite-plugin";import codemode from "@cloudflare/codemode/vite";import agents from "agents/vite";import { defineConfig } from "vite";
export default defineConfig({  plugins: [agents(), codemode(), cloudflare()],});
```
The plugin exports the `CodemodeRuntime` facet class from your Worker entry module. The runtime stores execution state in a Durable Object facet, and the Workers runtime requires facet classes to be available through `ctx.exports`. If you do not use the plugin, add the export manually:
TypeScript
```
export { CodemodeRuntime } from "@cloudflare/codemode";
```
4. Create a connector. Connectors are plain classes — they need no special file name or import syntax. This example stores notes in the Agent's Durable Object storage:

  * [  JavaScript ](#tab-panel-6595)
  * [  TypeScript ](#tab-panel-6596)
src/notes-connector.js
```
import { CodemodeConnector } from "@cloudflare/codemode";
export class NotesConnector extends CodemodeConnector {  storage;
  constructor(ctx, env) {    super(ctx, env);    this.storage = ctx.storage;  }
  name() {    return "notes";  }
  instructions() {    return "Use this connector to list and create saved notes.";  }
  tools() {    return {      listNotes: {        description: "List saved notes.",        execute: async () => (await this.storage.get("notes")) ?? [],      },      createNote: {        description: "Create a saved note.",        inputSchema: {          type: "object",          properties: { text: { type: "string" } },          required: ["text"],        },        requiresApproval: true,        execute: async (input) => {          const { text } = input;          const note = { id: crypto.randomUUID(), text };          const notes = (await this.storage.get("notes")) ?? [];          await this.storage.put("notes", [...notes, note]);          return note;        },        revert: async (_input, result) => {          const { id } = result;          const notes = (await this.storage.get("notes")) ?? [];          await this.storage.put(            "notes",            notes.filter((note) => note.id !== id),          );        },      },    };  }}
```
src/notes-connector.ts
```
import {  CodemodeConnector,  type ConnectorTools,} from "@cloudflare/codemode";
type Note = { id: string; text: string };
export class NotesConnector extends CodemodeConnector<Env> {  private storage: DurableObjectStorage;
  constructor(ctx: DurableObjectState, env: Env) {    super(ctx, env);    this.storage = ctx.storage;  }
  override name() {    return "notes";  }
  protected override instructions() {    return "Use this connector to list and create saved notes.";  }
  protected override tools(): ConnectorTools {    return {      listNotes: {        description: "List saved notes.",        execute: async () =>          (await this.storage.get<Note[]>("notes")) ?? [],      },      createNote: {        description: "Create a saved note.",        inputSchema: {          type: "object",          properties: { text: { type: "string" } },          required: ["text"],        },        requiresApproval: true,        execute: async (input) => {          const { text } = input as { text: string };          const note = { id: crypto.randomUUID(), text };          const notes = (await this.storage.get<Note[]>("notes")) ?? [];          await this.storage.put("notes", [...notes, note]);          return note;        },        revert: async (_input, result) => {          const { id } = result as Note;          const notes = (await this.storage.get<Note[]>("notes")) ?? [];          await this.storage.put(            "notes",            notes.filter((note) => note.id !== id),          );        },      },    };  }}
```
The `name()` result becomes the sandbox global, in this case `notes`. `requiresApproval: true` pauses before `createNote` executes. The optional `revert` function lets `runtime.rollback()` compensate for an applied call.
Use `McpConnector` for MCP tools or `OpenApiConnector` for OpenAPI operations. For MCP-specific setup, refer to [Use MCP tools with Code Mode](https://developers.cloudflare.com/agents/tools/codemode/mcp/).
5. Import the connector and create a runtime in your Agent:

  * [  JavaScript ](#tab-panel-6597)
  * [  TypeScript ](#tab-panel-6598)
src/server.js
```
import { AIChatAgent } from "@cloudflare/ai-chat";import {  createCodemodeRuntime,  DynamicWorkerExecutor,} from "@cloudflare/codemode";import { callable } from "agents";import { convertToModelMessages, stepCountIs, streamText } from "ai";import { NotesConnector } from "./notes-connector";import { model } from "./model";
export class Chat extends AIChatAgent {  #runtime() {    return createCodemodeRuntime({      ctx: this.ctx,      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),      connectors: [new NotesConnector(this.ctx, this.env)],    });  }
  async onChatMessage() {    const result = streamText({      model,      messages: await convertToModelMessages(this.messages),      tools: { codemode: this.#runtime().tool() },      stopWhen: stepCountIs(10),    });
    return result.toUIMessageStreamResponse();  }
  @callable()  async pendingApprovals() {    return this.#runtime().pending();  }
  @callable()  async approveExecution(executionId) {    return this.#runtime().approve({ executionId });  }
  @callable()  async rejectExecution(executionId, seq) {    return this.#runtime().reject({ executionId, seq });  }
  @callable()  async rollbackExecution(executionId) {    await this.#runtime().rollback({ executionId });  }
  @callable()  async executionHistory() {    return this.#runtime().executions(20);  }
  @callable()  async saveSnippet(name, description, executionId) {    const runtime = this.#runtime();    const execution = (await runtime.executions()).find(      (item) => item.id === executionId,    );    if (execution?.status !== "completed") {      throw new Error("Only completed executions can be saved as snippets.");    }
    return runtime.saveSnippet(name, { description, executionId });  }
  @callable()  async snippets() {    return this.#runtime().snippets();  }}
```
src/server.ts
```
import { AIChatAgent } from "@cloudflare/ai-chat";import {  createCodemodeRuntime,  DynamicWorkerExecutor,  type CodemodeRuntimeHandle,  type ExecutionState,  type PendingAction,  type Snippet,} from "@cloudflare/codemode";import { callable } from "agents";import { convertToModelMessages, stepCountIs, streamText } from "ai";import { NotesConnector } from "./notes-connector";import { model } from "./model";
export class Chat extends AIChatAgent<Env> {  #runtime(): CodemodeRuntimeHandle {    return createCodemodeRuntime({      ctx: this.ctx,      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),      connectors: [new NotesConnector(this.ctx, this.env)],    });  }
  async onChatMessage() {    const result = streamText({      model,      messages: await convertToModelMessages(this.messages),      tools: { codemode: this.#runtime().tool() },      stopWhen: stepCountIs(10),    });
    return result.toUIMessageStreamResponse();  }
  @callable()  async pendingApprovals(): Promise<PendingAction[]> {    return this.#runtime().pending();  }
  @callable()  async approveExecution(executionId: string) {    return this.#runtime().approve({ executionId });  }
  @callable()  async rejectExecution(executionId: string, seq: number): Promise<boolean> {    return this.#runtime().reject({ executionId, seq });  }
  @callable()  async rollbackExecution(executionId: string): Promise<void> {    await this.#runtime().rollback({ executionId });  }
  @callable()  async executionHistory(): Promise<ExecutionState[]> {    return this.#runtime().executions(20);  }
  @callable()  async saveSnippet(    name: string,    description: string,    executionId: string,  ): Promise<Snippet> {    const runtime = this.#runtime();    const execution = (await runtime.executions()).find(      (item) => item.id === executionId,    );    if (execution?.status !== "completed") {      throw new Error("Only completed executions can be saved as snippets.");    }
    return runtime.saveSnippet(name, { description, executionId });  }
  @callable()  async snippets(): Promise<Snippet[]> {    return this.#runtime().snippets();  }}
```
Replace the `model` import with the existing model setup in your application.

## Verify the integration

Ask the model to list saved notes. The model receives one `codemode` tool and can discover connector methods inside the sandbox:

JavaScript

```
async () => {  const matches = await codemode.search("list saved notes");  const docs = await codemode.describe(matches.results[0].path);  const savedNotes = await notes.listNotes();
  return { docs, savedNotes };};
```

When the model calls `notes.createNote()`, the execution pauses. Use `pendingApprovals()` to show the pending action. Pass its `executionId` to `approveExecution()`, or pass both `executionId` and `seq` to `rejectExecution()`.

Approval resumes the same script through replay. Completed calls return recorded results instead of running again. Rejection ends the paused execution without undoing earlier actions.

Call `rollbackExecution()` to compensate for applied calls whose currently configured connector provides `revert`. Save only completed executions as snippets.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/#page","headline":"Create a durable Code Mode runtime · Cloudflare Agents docs","description":"Create a Code Mode runtime with connectors, durable approvals, rollback, execution history, and reusable snippets.","url":"https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/codemode/","name":"Code Mode"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/codemode/durable-runtime/","name":"Create a durable Code Mode runtime"}}]}
```
