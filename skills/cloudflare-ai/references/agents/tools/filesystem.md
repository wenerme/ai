---
description: Give an agent a virtual file system stored in its Durable Object, with file tools for the model and an optional JavaScript runtime.
title: File system
image: https://developers.cloudflare.com/agents/tools/filesystem/og.png?v=d015b763134c08dd
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# File system

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/tools/filesystem/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare Computer ↗︎](https://github.com/cloudflare/computer) gives an agent a persistent working directory backed by SQLite, along with the standard set of tools for working with the file system, including `read`, `write`, `edit`, and `grep`. An optional `exec` tool lets the agent manipulate the file system and run tools programmatically.

Use a file system when an agent needs to:

- Keep notes, drafts, plans, or generated files across turns and restarts.
- Read, search, and edit text files with tools built for a model.
- Write and run JavaScript against files, without starting a container.
- Provide skills, source files, and other external documents to the agent without filling its context window.

## How it works

A `Workspace` lives inside a Durable Object and keeps every file in the SQLite storage of that object. Files remain after the Durable Object is evicted or restarted, with no external storage to configure.

`workspace.fs` reads, writes, lists, searches, and deletes files. `workspace.runtime` runs code against the same files through an execution backend. Computer includes a JavaScript runtime, as well as an experimental container-based runtime for running shell commands.

## Install

npmyarnpnpmbun

```
npm i @cloudflare/computer zod
```

```
yarn add @cloudflare/computer zod
```

```
pnpm add @cloudflare/computer zod
```

```
bun add @cloudflare/computer zod
```

Every tool entry point requires `zod`. What else you need depends on how your agent calls tools:

- **[Think](https://developers.cloudflare.com/agents/harnesses/think/)** includes the workspace tools. Install `@cloudflare/computer` alongside it.
- **[AI SDK ↗︎](https://ai-sdk.dev/)** tools also require `ai`.
- **[Pi](https://developers.cloudflare.com/agents/harnesses/pi/)** and **[OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/)** use the Pi AI tools, which need nothing beyond `zod`.

Your Worker needs the `nodejs_compat` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/).

## Add a workspace to a Durable Object

Create a `Workspace` in your Durable Object class and pass it the `storage` object. The file system is ready to use immediately.

```js
import { Workspace } from "@cloudflare/computer";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject {
	workspace = new Workspace({ storage: this.ctx.storage });

	async addTodo(item) {
		const path = "/workspace/notes/todo.md";
		await this.workspace.fs.mkdir("/workspace/notes", { recursive: true });

		let todo = "";
		try {
			todo = await this.workspace.fs.readFile(path, "utf8");
		} catch (error) {
			// A missing file means there are no to-do items yet.
			if (error.code !== "ENOENT") throw error;
		}

		todo += `- [ ] ${item}\n`;
		await this.workspace.fs.writeFile(path, todo);
		return todo;
	}
}

export default {
	async fetch(request, env) {
		const agent = env.NotesAgent.getByName("user-123");
		return new Response(await agent.addTodo("Ship it"));
	},
};
```

```ts
import { Workspace } from "@cloudflare/computer";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject<Env> {
	workspace = new Workspace({ storage: this.ctx.storage });

	async addTodo(item: string) {
		const path = "/workspace/notes/todo.md";
		await this.workspace.fs.mkdir("/workspace/notes", { recursive: true });

		let todo = "";
		try {
			todo = await this.workspace.fs.readFile(path, "utf8");
		} catch (error) {
			// A missing file means there are no to-do items yet.
			if ((error as { code?: string }).code !== "ENOENT") throw error;
		}

		todo += `- [ ] ${item}\n`;
		await this.workspace.fs.writeFile(path, todo);
		return todo;
	}
}

export default {
	async fetch(request: Request, env: Env) {
		const agent = env.NotesAgent.getByName("user-123");
		return new Response(await agent.addTodo("Ship it"));
	},
} satisfies ExportedHandler<Env>;
```

Configure the Durable Object binding and a SQLite migration in your Wrangler configuration:

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-10-16",
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "NotesAgent",
				"name": "NotesAgent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["NotesAgent"]
		}
	]
}
```

```toml
# Set this to today's date
compatibility_date = "2026-10-16"
compatibility_flags = [ "nodejs_compat" ]

[[durable_objects.bindings]]
class_name = "NotesAgent"
name = "NotesAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "NotesAgent" ]
```

### Work with files

The `workspace.fs` object provides common methods for working with the file system. It accepts `string` or binary `Uint8Array` content. Use a `ReadableStream` to read or write large files.

```js
const { fs } = this.workspace;

// Write a string, bytes, or a stream.
await fs.writeFile("/workspace/data/blob.bin", new Uint8Array([1, 2, 3]));
await fs.writeFile("/workspace/uploads/report.csv", request.body);

// Read a file as text, or as a stream when you omit the encoding.
const text = await fs.readFile("/workspace/uploads/report.csv", "utf8");
const stream = await fs.readFile("/workspace/uploads/report.csv");

// List, search, and remove.
for (const entry of await fs.readdir("/workspace/notes")) {
	console.log(entry.isDirectory ? `d ${entry.name}` : `f ${entry.name}`);
}
const matches = await fs.grep("TODO", "/workspace", { ignoreCase: true });
await fs.rm("/workspace/notes", { recursive: true });
```

```ts
const { fs } = this.workspace;

// Write a string, bytes, or a stream.
await fs.writeFile("/workspace/data/blob.bin", new Uint8Array([1, 2, 3]));
await fs.writeFile("/workspace/uploads/report.csv", request.body!);

// Read a file as text, or as a stream when you omit the encoding.
const text = await fs.readFile("/workspace/uploads/report.csv", "utf8");
const stream = await fs.readFile("/workspace/uploads/report.csv");

// List, search, and remove.
for (const entry of await fs.readdir("/workspace/notes")) {
	console.log(entry.isDirectory ? `d ${entry.name}` : `f ${entry.name}`);
}
const matches = await fs.grep("TODO", "/workspace", { ignoreCase: true });
await fs.rm("/workspace/notes", { recursive: true });
```

For every file operation, refer to [`workspace.fs`](#workspacefs) in the API reference.

## Give the model file tools

Computer builds one set of file tools for a workspace, with adapters for different agent libraries:

| Tool | What it does |
| --- | --- |
| `read` | Reads a text file by line, or passes an image or PDF to a model that accepts it. |
| `ls` | Lists one directory, page by page. |
| `find` | Finds paths with `*`, `**`, and `?` globs. |
| `grep` | Searches file contents with a regular expression or a fixed string. |
| `write` | Writes a whole file. |
| `edit` | Replaces targeted text in a file and returns a diff. |
| `delete` | Deletes a file or directory. |
| `exec` | Runs code on an execution backend. Present only when the workspace has one. |

Harnesses

[Think](#think) adds these tools to every turn with no configuration. The [Pi](#pi) and [OpenCode](#opencode) harnesses take the Pi AI tools through a small adapter. Any other agent built on the [AI SDK](#ai-sdk) can use `createAITools()`.

### Think

Every [Think](https://developers.cloudflare.com/agents/harnesses/think/) agent has a Computer `Workspace` at `this.workspace`, and Think adds the workspace tools to every turn. To change the workspace, override `workspace`. A custom tool from `getTools()` with the same name as a workspace tool replaces it.

For more information, refer to [Built-in workspace tools](https://developers.cloudflare.com/agents/harnesses/think/tools/#built-in-workspace-tools).

### AI SDK

`createAITools()` from `@cloudflare/computer/tools/ai-sdk` returns an AI SDK `ToolSet` for a workspace. Pass it to `generateText()`, `streamText()`, or the `getTools()` method of an agent.

```js
import { Workspace } from "@cloudflare/computer";
import { createAITools } from "@cloudflare/computer/tools/ai-sdk";
import { generateText, stepCountIs } from "ai";
import { DurableObject } from "cloudflare:workers";
import { createWorkersAI } from "workers-ai-provider";

export class WriterAgent extends DurableObject {
	workspace = new Workspace({ storage: this.ctx.storage });

	async write(prompt) {
		const { text } = await generateText({
			model: createWorkersAI({ binding: this.env.AI })(
				"@cf/moonshotai/kimi-k2.6",
			),
			system:
				"You are a writing assistant. Keep drafts and notes as files under /workspace.",
			prompt,
			tools: createAITools({
				workspace: this.workspace,
				read: { maxBytes: 32 * 1024, maxLines: 800 },
			}),
			stopWhen: stepCountIs(20),
		});
		return text;
	}
}
```

```ts
import { Workspace } from "@cloudflare/computer";
import { createAITools } from "@cloudflare/computer/tools/ai-sdk";
import { generateText, stepCountIs } from "ai";
import { DurableObject } from "cloudflare:workers";
import { createWorkersAI } from "workers-ai-provider";

export class WriterAgent extends DurableObject<Env> {
	workspace = new Workspace({ storage: this.ctx.storage });

	async write(prompt: string) {
		const { text } = await generateText({
			model: createWorkersAI({ binding: this.env.AI })(
				"@cf/moonshotai/kimi-k2.6",
			),
			system:
				"You are a writing assistant. Keep drafts and notes as files under /workspace.",
			prompt,
			tools: createAITools({
				workspace: this.workspace,
				read: { maxBytes: 32 * 1024, maxLines: 800 },
			}),
			stopWhen: stepCountIs(20),
		});
		return text;
	}
}
```

### Pi

`createPiTools()` from `@cloudflare/computer/tools/pi-ai` returns Pi AI tool declarations and one `execute` function that runs a call by name. [Pi Durable](https://developers.cloudflare.com/agents/harnesses/pi/) runs the agent loop itself and expects each tool to carry its own `execute`, so pair them up as `ToolRegistration` objects:

*src/workspace-tools.jsjs*

```js
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";

// Running these again after an eviction is harmless.
const REPLAY_SAFE = new Set(["read", "ls", "find", "grep", "write", "delete"]);

export function workspaceTools(workspace) {
	const { tools, execute } = createPiTools({ workspace });
	return tools.map((tool) => ({
		name: tool.name,
		description: tool.description,
		parameters: tool.parameters,
		replay: REPLAY_SAFE.has(tool.name) ? "safe" : "unsafe",
		async execute(args, api, context) {
			const { content, isError } = await execute(
				{ id: api.callId, name: tool.name, arguments: args },
				{ abortSignal: context.abortSignal },
			);
			return { content, isError };
		},
	}));
}
```

*src/workspace-tools.tsts*

```ts
import type { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";
import type { ToolRegistration } from "@earendil-works/pi-durable";

// Running these again after an eviction is harmless.
const REPLAY_SAFE = new Set(["read", "ls", "find", "grep", "write", "delete"]);

export function workspaceTools(workspace: Workspace): ToolRegistration[] {
	const { tools, execute } = createPiTools({ workspace });
	return tools.map((tool): ToolRegistration => ({
		name: tool.name,
		description: tool.description,
		parameters: tool.parameters,
		replay: REPLAY_SAFE.has(tool.name) ? "safe" : "unsafe",
		async execute(args, api, context) {
			const { content, isError } = await execute(
				{ id: api.callId, name: tool.name, arguments: args },
				{ abortSignal: context.abortSignal },
			);
			return { content, isError };
		},
	}));
}
```

Install the tools in an [extension](https://developers.cloudflare.com/agents/harnesses/pi/extensions/) inside the harness factory, before `Harness.open()`:

```js
this.registry.install({
	name: "workspace",
	tools: workspaceTools(this.workspace),
});
```

```ts
this.registry.install({
	name: "workspace",
	tools: workspaceTools(this.workspace),
});
```

`execute` validates the arguments against the schema of the tool and reports failures as `isError` results, so the model can retry.

### OpenCode

[OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) receives tools through plugins. The following plugin replaces the OpenCode tools that need a local file system with the workspace tools:

*src/workspace-plugin.jsjs*

```js
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";

// OpenCode tools that need a local file system or process.
const LOCAL_TOOLS = ["read", "write", "edit", "patch", "glob", "grep", "shell"];

export function workspacePlugin(workspace) {
	const { tools, execute } = createPiTools({ workspace });
	return {
		id: "workspace",
		async setup(ctx) {
			await ctx.tool.transform((editor) => {
				for (const id of LOCAL_TOOLS) editor.remove(id);
				for (const tool of tools) {
					editor.add({
						name: tool.name,
						description: tool.description,
						input: tool.parameters,
						// Offer each tool by name instead of through OpenCode's code mode.
						options: { codemode: false },
						async execute(input, context) {
							const { content, isError } = await execute(
								{ id: context.id, name: tool.name, arguments: input },
								{ abortSignal: context.signal },
							);
							const text = content
								.map((part) => (part.type === "text" ? part.text : ""))
								.join("\n");
							if (isError) throw new Error(text || `${tool.name} failed`);
							return { content: text };
						},
					});
				}
			});
		},
	};
}
```

*src/workspace-plugin.tsts*

```ts
import type { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";
import type { Plugin } from "@opencode/plugin";

// OpenCode tools that need a local file system or process.
const LOCAL_TOOLS = ["read", "write", "edit", "patch", "glob", "grep", "shell"];

export function workspacePlugin(workspace: Workspace): Plugin.Plugin {
	const { tools, execute } = createPiTools({ workspace });
	return {
		id: "workspace",
		async setup(ctx) {
			await ctx.tool.transform((editor) => {
				for (const id of LOCAL_TOOLS) editor.remove(id);
				for (const tool of tools) {
					editor.add({
						name: tool.name,
						description: tool.description,
						input: tool.parameters,
						// Offer each tool by name instead of through OpenCode's code mode.
						options: { codemode: false },
						async execute(input, context) {
							const { content, isError } = await execute(
								{ id: context.id, name: tool.name, arguments: input },
								{ abortSignal: context.signal },
							);
							const text = content
								.map((part) => (part.type === "text" ? part.text : ""))
								.join("\n");
							if (isError) throw new Error(text || `${tool.name} failed`);
							return { content: text };
						},
					});
				}
			});
		},
	};
}
```

Add the plugin to the `plugins` array that you pass to `OpenCodeWorkerd.create()` in the harness factory:

```js
OpenCodeWorkerd.create({
	storage,
	plugins: [this.ai.plugin, workspacePlugin(this.workspace)],
});
```

```ts
OpenCodeWorkerd.create({
	storage,
	plugins: [this.ai.plugin, workspacePlugin(this.workspace)],
});
```

### Configure the tools

`createAITools()`, `createPiTools()`, and `createTanStackTools()` accept the same options:

| Option | Default | Description |
| --- | --- | --- |
| `workspace` | Required | A `Workspace`, or a client from `getWorkspace()`. |
| `readonly` | `false` | Offers only `read`, `ls`, `find`, and `grep`. |
| `read` | Default caps | Limits for `read`, such as `maxBytes`, `maxLines`, and `includeLineNumbers`. |
| `write` | Default caps | Limits for `write`. |
| `edit` | Default caps | Limits for `edit`. |
| `exec` | Every backend | A map from backend ID to `{ description }`. Pass `{}` to leave out the `exec` tool. |

To let the model read and search files but not change them, pass `readonly: true`:

```js
createAITools({ workspace: this.workspace, readonly: true });
```

```ts
createAITools({ workspace: this.workspace, readonly: true });
```

## Run JavaScript in the workspace

Add a `WorkerJavaScriptBackend` to let the agent, or the model, run JavaScript against workspace files. Each run is an ECMAScript module that executes in a new [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/). It is faster and cheaper to run than a container. Network access is configurable but off by default, and the module reaches the workspace through `node:fs/promises`.

```js
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [new WorkerJavaScriptBackend({ loader: this.env.LOADER })],
	});
}
```

```ts
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { DurableObject } from "cloudflare:workers";

export class NotesAgent extends DurableObject<Env> {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [new WorkerJavaScriptBackend({ loader: this.env.LOADER })],
	});
}
```

In a Think agent, set the same `Workspace` as `override workspace`. Once the workspace has a backend, every tool adapter includes `exec`.

The backend needs a [Worker Loader binding](https://developers.cloudflare.com/dynamic-workers/):

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-10-16",
	"compatibility_flags": ["nodejs_compat"],
	"worker_loaders": [
		{
			"binding": "LOADER"
		}
	]
}
```

```toml
# Set this to today's date
compatibility_date = "2026-10-16"
compatibility_flags = [ "nodejs_compat" ]

[[worker_loaders]]
binding = "LOADER"
```

The `exec` tool describes the backend to the model, including the modules that its code can import, so the model can write a module like the following without further instructions:

```js
import fs from "node:fs/promises";

export default async function (input) {
	const names = await fs.readdir("/workspace/notes");
	const counts = {};
	for (const name of names) {
		const text = await fs.readFile(`/workspace/notes/${name}`, "utf8");
		counts[name] = text.split(/\s+/).filter(Boolean).length;
	}
	return counts;
}
```

The module must have a default export. A default-exported function is called with the input of the run, and its return value becomes the result. Put file and module calls inside that function. The Workers runtime does not allow I/O while a module loads, so accessing the file system at the top level of the module fails the run.

### Run code from the agent

Your own code can run a module through `workspace.runtime.exec()`. Pass structured data as `input`, and read the return value from `value`:

```js
using run = await this.workspace.runtime.exec(
	`
	import fs from "node:fs/promises";

	export default async function ({ path }) {
		const text = await fs.readFile(path, "utf8");
		return { lines: text.split("\\n").length };
	}
	`,
	{ input: { path: "/workspace/notes/todo.md" }, encoding: "utf8" },
);

const { exitCode, value, stdout, stderr } = await run.result();
```

```ts
using run = await this.workspace.runtime.exec(
	`
	import fs from "node:fs/promises";

	export default async function ({ path }) {
		const text = await fs.readFile(path, "utf8");
		return { lines: text.split("\\n").length };
	}
	`,
	{ input: { path: "/workspace/notes/todo.md" }, encoding: "utf8" },
);

const { exitCode, value, stdout, stderr } = await run.result();
```

`console.log()` writes to `stdout`, and `console.error()` writes to `stderr`. The input and the return value must be JSON-compatible plain data. A module can also import other files in the workspace with relative imports, such as `import { summarize } from "./lib/summarize.js"`, which resolve from the `cwd` option of the run.

### Configure the backend

`WorkerJavaScriptBackend` accepts the following common options:

| Option | Default | Description |
| --- | --- | --- |
| `loader` | Required | The Worker Loader binding. |
| `id` | `"worker-javascript"` | The backend ID that `exec` and `runtime.exec()` use to select this backend. |
| `root` | `/workspace` | The directory that code can access. Paths outside it are rejected. |
| `access` | `"read-write"` | Set to `"read"` to let code read files but not change them. |
| `defaultTimeoutMs` | `60000` | How long a run can take when the caller does not set a timeout. |
| `maxTimeoutMs` | `180000` | The longest timeout that a caller can request. |
| `globalOutbound` | `null` | A `Fetcher` that receives every outbound request from the code. `null` blocks network access. |
| `modules` | — | Extra modules that code can import, such as bundled libraries or functions that run in the agent. |

### Give code access to your own functions

Custom modules can be registered under the `ws:` namespace. Use these modules to give the model access to your application logic or file system tools, or to perform external actions.

```js
// In the `backends` list of the workspace.
new WorkerJavaScriptBackend({
	loader: this.env.LOADER,
	modules: {
		"ws:orders": {
			// Arguments arrive as an array of JSON-compatible values.
			lookup: ([orderId]) => this.lookUpOrder(String(orderId)),
		},
	},
});
```

```ts
// In the `backends` list of the workspace.
new WorkerJavaScriptBackend({
	loader: this.env.LOADER,
	modules: {
		"ws:orders": {
			// Arguments arrive as an array of JSON-compatible values.
			lookup: ([orderId]) => this.lookUpOrder(String(orderId)),
		},
	},
});
```

Code imports the module like any other:

```js
import { lookup } from "ws:orders";

export default async function ({ ids }) {
	return Promise.all(ids.map((id) => lookup(id)));
}
```

Always validate input to your module functions, because it comes directly from the model. Computer also includes prebuilt host modules for Git, [Artifacts](https://developers.cloudflare.com/artifacts/), and the agent's own tools. For more information, refer to [Host modules](#host-modules) in the API reference.

## Limits

- Each workspace shares the storage of its Durable Object. For storage limits, refer to [Durable Objects limits](https://developers.cloudflare.com/durable-objects/platform/limits/). Size workspaces for an agent's working files, not for full monorepos or large dependency trees.
- The JavaScript backend runs ECMAScript modules, not shell commands or native binaries. When an agent needs a Linux environment, use a [sandbox](https://developers.cloudflare.com/agents/tools/sandbox/).
- Each JavaScript run is bounded in CPU time, wall-clock time, output size, and the number and size of file operations. Completed runs are kept for 60 minutes by default.

## Security considerations

The model reads everything that the file tools and `exec` return. A file can contain text written to steer the model, such as an instruction to delete other files. Check tool results before the agent acts on them outside the workspace, and require [approval](https://developers.cloudflare.com/agents/harnesses/think/tools/#tool-approval) for tools with side effects.

Code that the JavaScript backend runs cannot read the environment variables, bindings, or storage of the agent. It reaches only the files under `root`, the modules you configure, and the network when you pass a `globalOutbound`. Host modules run with the full access of the agent, so expose only the functions that model-written code needs.

Every user who talks to the same agent instance shares its workspace. Give each user their own agent instance when their files must stay apart.

## API reference

### `Workspace`

`new Workspace(options)` from `@cloudflare/computer` creates a workspace. It accepts the following options:

| Option | Description |
| --- | --- |
| `storage` | Required. The storage of the Durable Object, `this.ctx.storage`. |
| `backends` | Execution backends, such as `WorkerJavaScriptBackend`. The first backend is the default. |
| `mounts` | Read-only content mounted at a path, from an R2 bucket (`R2Bucket()`) or the Worker bundle (`WorkerBundle()`). |
| `git` | A Git client from `createGitClient()` in `@cloudflare/computer/git`, which turns on `workspace.git`. |
| `defaultGitIdentity` | The `{ name, email }` that Git commits use. |
| `artifacts` | An [Artifacts](https://developers.cloudflare.com/artifacts/) binding, as `{ binding }`. |
| `output` | Where long command output is saved, and how much `result()` keeps. |

### `workspace.fs`

Every path is absolute. Every method returns a promise.

| Method | Description |
| --- | --- |
| `readFile(path, encoding?)` | Reads a file. Returns a string with `"utf8"`, or a `ReadableStream` without an encoding. Accepts `{ byteOffset, byteLength }` to read part of a file. |
| `writeFile(path, content, options?)` | Writes a string, `Uint8Array`, or `ReadableStream`. Set `options.mode` for permissions. |
| `mkdir(path, options?)` | Creates a directory. Set `recursive: true` to create parents. |
| `readdir(path)` | Lists a directory as entries with `name`, `parentPath`, `isFile`, and `isDirectory`. |
| `stat(path)` | Returns `name`, `mode`, `mtime`, `size`, `isFile`, and `isDirectory`, following symbolic links. |
| `lstat(path)` | Like `stat`, but reports a symbolic link itself, with `isSymbolicLink`. |
| `rm(path, options?)` | Removes a file or directory. Set `recursive: true` for a non-empty directory, and `force: true` to ignore a missing path. |
| `rename(oldPath, newPath)` | Moves a file, directory, or symbolic link in one transaction. |
| `symlink(target, path)` | Creates a symbolic link at `path` that points to `target`. |
| `readlink(path)` | Returns the target of a symbolic link. |
| `chmod(path, mode)` | Changes the permission bits of a path. |
| `find(directory, pattern?, options?)` | Finds paths that match a glob, relative to `directory`. Accepts `exclude`, `limit`, and `offset`. |
| `ls(prefix)` | Lists every file at or under `prefix`. |
| `grep(pattern, path, options?)` | Searches file contents. Accepts `regex`, `ignoreCase`, `context`, `include`, `exclude`, `limit`, and `offset`. |

Failed operations reject with an error whose `code` is a POSIX error code, such as `ENOENT` for a missing path.

### `workspace.runtime`

| Method | Description |
| --- | --- |
| `exec(source, options?)` | Runs `source` on a backend and returns a handle. Call `result()` on the handle for the final result. |
| `getExec(id, options?)` | Reattaches to a run by ID. |
| `killExec(id, options?)` | Stops a run. |
| `disposeExec(id, options?)` | Discards a completed run. |
| `backends()` | Lists the backends and the description that each gives to the model. |

`exec()` accepts the following options:

| Option | Description |
| --- | --- |
| `backend` | The backend ID to run on. Defaults to the first backend. |
| `input` | JSON-compatible data passed to the default export of a JavaScript module. |
| `encoding` | Set to `"utf8"` to receive `stdout` and `stderr` as strings instead of bytes. |
| `cwd` | The working directory, and the base for relative imports. |
| `env` | Environment variables for this run, available to JavaScript as `process.env`. |
| `stdin` | Standard input, as a string or `Uint8Array`. |
| `timeoutMs` | How long the run can take, up to the backend's `maxTimeoutMs`. |

The result contains `status` (`"completed"`, `"failed"`, or `"cancelled"`), `exitCode`, `stdout`, `stderr`, and `value`, the return value of a JavaScript module. When output is too long, `truncated` names the workspace file that holds all of it.

Declare handles from `exec()` with `using` so they are disposed when they go out of scope.

### Tool functions

| Function | Entry point | Returns |
| --- | --- | --- |
| `createAITools()` | `@cloudflare/computer/tools/ai-sdk` | An AI SDK `ToolSet`. |
| `createPiTools()` | `@cloudflare/computer/tools/pi-ai` | Pi AI tool declarations and an `execute` function. |
| `createTanStackTools()` | `@cloudflare/computer/tools/tanstack-ai` | A list of [TanStack AI ↗︎](https://tanstack.com/ai) tools. |

### Host modules

Pass these to the `modules` option of `WorkerJavaScriptBackend`:

| Function | Entry point | Module | Description |
| --- | --- | --- | --- |
| `createGitModule()` | `@cloudflare/computer/modules/git` | `ws:git` | Git operations on the workspace. Requires the `git` workspace option. Pass `{ allowNetwork: true }` to clone, fetch, and push. |
| `createArtifactsModule()` | `@cloudflare/computer/modules/artifacts` | `ws:artifacts` | [Artifacts](https://developers.cloudflare.com/artifacts/) repositories. Requires the `artifacts` workspace option. |
| `createToolBindings()` | `@cloudflare/computer/modules/tools` | `ws:tools` | The agent's own tools, callable from code. Build the bindings with `forAISDKTools()` or `forPiTools()`. |

For the full interfaces, refer to the [Computer design documentation ↗︎](https://github.com/cloudflare/computer/tree/main/docs).

## Related resources

### [Cloudflare Computer](https://github.com/cloudflare/computer)

Source code, examples, and design documentation for @cloudflare/computer.

### [Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/)

Give an agent a Linux sandbox to run shell commands, scripts, and tests.

### [Think tools](https://developers.cloudflare.com/agents/harnesses/think/tools/)

Built-in workspace tools, custom tools, and approvals for Think agents.

### [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/)

Load and run Workers on demand from another Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/filesystem/#page","headline":"File system","description":"Give an agent a virtual file system stored in its Durable Object, with file tools for the model and an optional JavaScript runtime.","url":"https://developers.cloudflare.com/agents/tools/filesystem/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/tools/filesystem/og.png?v=d015b763134c08dd","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
