---
description: Create a Code Mode runtime with connectors, direct host APIs, durable approvals, rollback, execution history, and reusable snippets.
title: Create a durable Code Mode runtime
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a durable Code Mode runtime

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide adds a durable Code Mode runtime to an Agents SDK application. The runtime stores execution history, pending approvals, and snippets across Durable Object hibernation.

Caution

Code Mode is experimental and may introduce breaking changes. Use caution in production.

## Prerequisites

You need an existing Agents SDK application with a Durable Object and Vite. The example uses `AIChatAgent` and the AI SDK.

## Integrate Code Mode

1. Install the Code Mode package:
npmyarnpnpmbun
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
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-07-22",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ]
}
```
```toml
# Set this to today's date
compatibility_date = "2026-07-22"
compatibility_flags = ["nodejs_compat"]
[[worker_loaders]]
binding = "LOADER"
```
3. Add the Agents and Code Mode plugins to `vite.config.ts`:
```js
import { cloudflare } from "@cloudflare/vite-plugin";
import codemode from "@cloudflare/codemode/vite";
import agents from "agents/vite";
import { defineConfig } from "vite";
export default defineConfig({
	plugins: [agents(), codemode(), cloudflare()],
});
```
```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import codemode from "@cloudflare/codemode/vite";
import agents from "agents/vite";
import { defineConfig } from "vite";
export default defineConfig({
	plugins: [agents(), codemode(), cloudflare()],
});
```
The plugin exports the `CodemodeRuntime` facet class from your Worker entry module. The runtime stores execution state in a Durable Object facet, and the Workers runtime requires facet classes to be available through `ctx.exports`. If you do not use the plugin, add the export manually:
```ts
export { CodemodeRuntime } from "@cloudflare/codemode";
```
4. Create a connector. Connectors are plain classes — they need no special file name or import syntax. This example stores notes in the Agent's Durable Object storage:
```js
import { CodemodeConnector } from "@cloudflare/codemode";
export class NotesConnector extends CodemodeConnector {
	storage;
	constructor(ctx, env) {
		super(ctx, env);
		this.storage = ctx.storage;
	}
	name() {
		return "notes";
	}
	instructions() {
		return "Use this connector to list and create saved notes.";
	}
	tools() {
		return {
			listNotes: {
				description: "List saved notes.",
				execute: async () => (await this.storage.get("notes")) ?? [],
			},
			createNote: {
				description: "Create a saved note.",
				inputSchema: {
					type: "object",
					properties: { text: { type: "string" } },
					required: ["text"],
				},
				requiresApproval: true,
				execute: async (input) => {
					const { text } = input;
					const note = { id: crypto.randomUUID(), text };
					const notes = (await this.storage.get("notes")) ?? [];
					await this.storage.put("notes", [...notes, note]);
					return note;
				},
				revert: async (_input, result) => {
					const { id } = result;
					const notes = (await this.storage.get("notes")) ?? [];
					await this.storage.put(
						"notes",
						notes.filter((note) => note.id !== id),
					);
				},
			},
		};
	}
}
```
```ts
import {
	CodemodeConnector,
	type ConnectorTools,
} from "@cloudflare/codemode";
type Note = { id: string; text: string };
export class NotesConnector extends CodemodeConnector<Env> {
	private storage: DurableObjectStorage;
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.storage = ctx.storage;
	}
	override name() {
		return "notes";
	}
	protected override instructions() {
		return "Use this connector to list and create saved notes.";
	}
	protected override tools(): ConnectorTools {
		return {
			listNotes: {
				description: "List saved notes.",
				execute: async () =>
					(await this.storage.get<Note[]>("notes")) ?? [],
			},
			createNote: {
				description: "Create a saved note.",
				inputSchema: {
					type: "object",
					properties: { text: { type: "string" } },
					required: ["text"],
				},
				requiresApproval: true,
				execute: async (input) => {
					const { text } = input as { text: string };
					const note = { id: crypto.randomUUID(), text };
					const notes = (await this.storage.get<Note[]>("notes")) ?? [];
					await this.storage.put("notes", [...notes, note]);
					return note;
				},
				revert: async (_input, result) => {
					const { id } = result as Note;
					const notes = (await this.storage.get<Note[]>("notes")) ?? [];
					await this.storage.put(
						"notes",
						notes.filter((note) => note.id !== id),
					);
				},
			},
		};
	}
}
```
The `name()` result becomes the sandbox global, in this case `notes`. `requiresApproval: true` pauses before `createNote` executes. The optional `revert` function lets `runtime.rollback()` compensate for an applied call.
Use `McpConnector` for MCP tools or `OpenApiConnector` for OpenAPI operations. For MCP-specific setup, refer to [Use MCP tools with Code Mode](https://developers.cloudflare.com/agents/tools/codemode/mcp/).
5. Import the connector and create a runtime in your Agent:
```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { callable } from "agents";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { NotesConnector } from "./notes-connector";
import { model } from "./model";
export class Chat extends AIChatAgent {
	#runtime() {
		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new NotesConnector(this.ctx, this.env)],
		});
	}
	async onChatMessage() {
		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: this.#runtime().tool() },
			stopWhen: stepCountIs(10),
		});
		return result.toUIMessageStreamResponse();
	}
	@callable()
	async pendingApprovals() {
		return this.#runtime().pending();
	}
	@callable()
	async approveExecution(executionId) {
		return this.#runtime().approve({ executionId });
	}
	@callable()
	async rejectExecution(executionId, seq) {
		return this.#runtime().reject({ executionId, seq });
	}
	@callable()
	async rollbackExecution(executionId) {
		await this.#runtime().rollback({ executionId });
	}
	@callable()
	async executionHistory() {
		return this.#runtime().executions(20);
	}
	@callable()
	async saveSnippet(name, description, executionId) {
		const runtime = this.#runtime();
		const execution = (await runtime.executions()).find(
			(item) => item.id === executionId,
		);
		if (execution?.status !== "completed") {
			throw new Error("Only completed executions can be saved as snippets.");
		}
		return runtime.saveSnippet(name, { description, executionId });
	}
	@callable()
	async snippets() {
		return this.#runtime().snippets();
	}
}
```
```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
	type CodemodeRuntimeHandle,
	type ExecutionState,
	type PendingAction,
	type Snippet,
} from "@cloudflare/codemode";
import { callable } from "agents";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { NotesConnector } from "./notes-connector";
import { model } from "./model";
export class Chat extends AIChatAgent<Env> {
	#runtime(): CodemodeRuntimeHandle {
		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new NotesConnector(this.ctx, this.env)],
		});
	}
	async onChatMessage() {
		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: this.#runtime().tool() },
			stopWhen: stepCountIs(10),
		});
		return result.toUIMessageStreamResponse();
	}
	@callable()
	async pendingApprovals(): Promise<PendingAction[]> {
		return this.#runtime().pending();
	}
	@callable()
	async approveExecution(executionId: string) {
		return this.#runtime().approve({ executionId });
	}
	@callable()
	async rejectExecution(executionId: string, seq: number): Promise<boolean> {
		return this.#runtime().reject({ executionId, seq });
	}
	@callable()
	async rollbackExecution(executionId: string): Promise<void> {
		await this.#runtime().rollback({ executionId });
	}
	@callable()
	async executionHistory(): Promise<ExecutionState[]> {
		return this.#runtime().executions(20);
	}
	@callable()
	async saveSnippet(
		name: string,
		description: string,
		executionId: string,
	): Promise<Snippet> {
		const runtime = this.#runtime();
		const execution = (await runtime.executions()).find(
			(item) => item.id === executionId,
		);
		if (execution?.status !== "completed") {
			throw new Error("Only completed executions can be saved as snippets.");
		}
		return runtime.saveSnippet(name, { description, executionId });
	}
	@callable()
	async snippets(): Promise<Snippet[]> {
		return this.#runtime().snippets();
	}
}
```
Replace the `model` import with the existing model setup in your application.

## Use the runtime without the AI SDK

Use `execute()`, `search()`, and `describe()` when an MCP server or another host invokes Code Mode without an AI SDK tool adapter:

```js
const runtime = this.#runtime();
const matches = await runtime.search("create note");
const method = matches.results[0];
const docs = await runtime.describe(method.path);
const outcome = await runtime.execute({
	code: `async () => notes.createNote({ text: "Follow up" })`,
});
```

```ts
const runtime = this.#runtime();
const matches = await runtime.search("create note");
const method = matches.results[0];
const docs = await runtime.describe(method.path);
const outcome = await runtime.execute({
	code: `async () => notes.createNote({ text: "Follow up" })`,
});
```

`search()` and `describe()` do not run sandbox code. Their results include `requiresApproval: true` for connector methods that pause before execution.

`execute()` returns the same durable result as the model-facing tool. A result can complete, pause, or contain an execution error. Resolve a paused result with `approve()` or `reject()`.

## Verify the integration

Ask the model to list saved notes. The model receives one `codemode` tool and can discover connector methods inside the sandbox:

```js
async () => {
	const matches = await codemode.search("list saved notes");
	const docs = await codemode.describe(matches.results[0].path);
	const savedNotes = await notes.listNotes();

	return { docs, savedNotes };
};
```

When the model calls `notes.createNote()`, the execution pauses. Use `pendingApprovals()` to show the pending action. Pass its `executionId` to `approveExecution()`, or pass both `executionId` and `seq` to `rejectExecution()`.

Approval resumes the same script through replay. Completed calls return recorded results instead of running again. Rejection ends the paused execution without undoing earlier actions.

Call `rollbackExecution()` to compensate for applied calls whose currently configured connector provides `revert`. Save only completed executions as snippets.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/#page","headline":"Create a durable Code Mode runtime · Cloudflare Agents docs","description":"Create a Code Mode runtime with connectors, direct host APIs, durable approvals, rollback, execution history, and reusable snippets.","url":"https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
