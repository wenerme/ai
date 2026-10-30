---
description: Build your first agent on Cloudflare. Run the Pi harness in a Durable Object with the Lifecycle, give it a Cloudflare Computer workspace, connect to it over WebSockets, and deploy it.
title: Build your first Durable Agent
image: https://developers.cloudflare.com/agents/getting-started/quick-start/og.png?v=1f23ec8012a49fb1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build your first Durable Agent

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/getting-started/quick-start/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A Durable Agent is a [Durable Object](https://developers.cloudflare.com/durable-objects/) with the Agents SDK [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) installed. The Lifecycle starts the [capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/) you add to the object. The most important one is the harness: the agent loop that calls the model, runs tools, and decides when the agent is done.

In this guide, you build an agent that:

- runs the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/) in a Durable Object,
- works on files in a [Cloudflare Computer workspace](https://developers.cloudflare.com/agents/tools/filesystem/), stored in the same object,
- talks to clients through the [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) capability.

You do not need an API key. The agent uses [Workers AI](https://developers.cloudflare.com/workers-ai/) through the `AI` binding.

## Prerequisites

- A [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up)
- Node.js 22.19 or later

## Create a project

1. Create a Worker project:npmyarnpnpm

   ```
   npm create cloudflare@latest -- my-agent --type=hello-world --lang=ts
   ```

   ```
   yarn create cloudflare my-agent --type=hello-world --lang=ts
   ```

   ```
   pnpm create cloudflare@latest my-agent --type=hello-world --lang=ts
   ```

2. Go to the project directory and install the Agents SDK, the Pi packages, and Cloudflare Computer:

   ```sh
   cd my-agent
   ```

   npmyarnpnpmbun

   ```
   npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
   ```

   ```
   yarn add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
   ```

   ```
   pnpm add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
   ```

   ```
   bun add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
   ```

   The Pi packages are optional peer dependencies of `agents`, at `~1.4.0`. Pi Durable is experimental and its API can change in minor releases, so each `agents` release supports one Pi minor version. Install the versions your package manager resolves for `agents`.

## Configure Wrangler

Add the `AI` binding and a SQLite-backed Durable Object to your Wrangler configuration file:

```jsonc
{
	"name": "my-agent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-10-30",
	"compatibility_flags": ["nodejs_compat"],
	"ai": {
		"binding": "AI",
	},
	"durable_objects": {
		"bindings": [{ "name": "Assistant", "class_name": "Assistant" }],
	},
	"exports": {
		"Assistant": { "type": "durable-object", "storage": "sqlite" },
	},
}
```

```toml
name = "my-agent"
main = "src/index.ts"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-10-30"
compatibility_flags = [ "nodejs_compat" ]

[ai]
binding = "AI"

[[durable_objects.bindings]]
name = "Assistant"
class_name = "Assistant"

[exports.Assistant]
type = "durable-object"
storage = "sqlite"
```

- `ai` adds the [Workers AI](https://developers.cloudflare.com/workers-ai/) binding as `env.AI`.
  - `exports` declares the class with `"storage": "sqlite"`. The [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) and its capabilities store their data in each object's SQLite database. Refer to [Durable Object class exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).
  - The `agents` package requires the `nodejs_compat` flag.

## Run a harness on a Durable Object

Replace `src/index.ts` with an `Assistant` Durable Object that runs the Pi harness:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";
import { routeAgentRequest } from "agents/routing";

export class Assistant extends DurableObject {
	// Workers AI models, through the AI binding
	ai = createAI({ binding: this.env.AI });
	// Pi's tools and prompt sections. Create one per object.
	registry = createRegistry();

	// The harness: the Pi agent loop, stored in this object's database
	harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// The Lifecycle starts the harness inside the Durable Object
	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request) {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { status, text } = await this.harness.prompt(await request.text());
		return Response.json({ status, text });
	}
}

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";
import { routeAgentRequest } from "agents/routing";

export class Assistant extends DurableObject<Env> {
	// Workers AI models, through the AI binding
	readonly ai = createAI({ binding: this.env.AI });
	// Pi's tools and prompt sections. Create one per object.
	readonly registry = createRegistry();

	// The harness: the Pi agent loop, stored in this object's database
	readonly harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// The Lifecycle starts the harness inside the Durable Object
	readonly lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { status, text } = await this.harness.prompt(await request.text());
		return Response.json({ status, text });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Here is what each part does:

- `Assistant` extends the platform `DurableObject`. Each named instance is one agent, with its own SQLite database.
- `PiHarness` is the harness. It runs the [Pi ↗︎](https://pi.dev/) agent loop, stores the transcript in the object's database, and keeps a run going after the object is evicted from memory.
- `createAI()` from `agents/models/pi-ai` connects Pi to Workers AI. `defaults.model` is the model a new session starts with.
- `Lifecycle.install(this)` takes over the object's `fetch` and `alarm` handlers, and `.use(this.harness)` adds the harness. Do not define `fetch()` or `alarm()` on the class yourself.
- `onRequest()` handles HTTP requests that no capability handled. A `POST` sends a prompt and waits for the answer. A `GET` returns the transcript.
- `routeAgentRequest()` sends requests for `/agents/assistant/:name` to the `Assistant` instance called `:name`. For more information, refer to [Routing](https://developers.cloudflare.com/agents/runtime/routing/).

Generate types for the `Env` interface:

```sh
npx wrangler types
```

## Run the agent locally

1. Start the development server:

   ```sh
   npx wrangler dev
   ```

   The `AI` binding always runs remotely, so Wrangler asks you to log in the first time.
2. In another terminal, send the agent called `demo` a prompt:

   ```sh
   curl -X POST http://localhost:8787/agents/assistant/demo \
     -d "What is 47 times 19? Reply with the number only."
   ```

   ```json
   { "status": "done", "text": "893" }
   ```

   `status` is `done` when the model answered, and `unanswered` when the run failed or was stopped.
3. Read the transcript:

   ```sh
   curl http://localhost:8787/agents/assistant/demo
   ```

The transcript lives in the `demo` instance's database. A request to `/agents/assistant/another-name` reaches a different agent, with an empty transcript.

## Give the agent a workspace

A [Cloudflare Computer](https://developers.cloudflare.com/agents/tools/filesystem/) `Workspace` is a durable filesystem. It stores its files in the same Durable Object's SQLite database, next to Pi's transcript, so the files survive eviction too.

`createPiTools()` turns the workspace into tools the model can call: `read`, `ls`, `find`, `grep`, `write`, `edit`, and `delete`. Install them in Pi's registry when the harness opens:

*src/index.jsjs*

```js
// ...
import { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";

export class Assistant extends DurableObject {
	ai = createAI({ binding: this.env.AI });
	registry = createRegistry();

	// A durable filesystem in the object's SQLite database
	workspace = new Workspace({ storage: this.ctx.storage });

	harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const { tools, execute } = createPiTools({ workspace: this.workspace });
			this.registry.install({
				name: "workspace",
				tools: tools.map((tool) => ({
					...tool,
					async execute(args, api, ctx) {
						const { content, isError } = await execute(
							{ id: api.callId, name: tool.name, arguments: args },
							{ abortSignal: ctx.abortSignal },
						);
						return { output: content, isError };
					},
				})),
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// lifecycle and onRequest() are unchanged
}
```

*src/index.tsts*

```ts
// ...
import { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";

export class Assistant extends DurableObject<Env> {
	readonly ai = createAI({ binding: this.env.AI });
	readonly registry = createRegistry();

	// A durable filesystem in the object's SQLite database
	readonly workspace = new Workspace({ storage: this.ctx.storage });

	readonly harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const { tools, execute } = createPiTools({ workspace: this.workspace });
			this.registry.install({
				name: "workspace",
				tools: tools.map((tool) => ({
					...tool,
					async execute(args, api, ctx) {
						const { content, isError } = await execute(
							{ id: api.callId, name: tool.name, arguments: args },
							{ abortSignal: ctx.abortSignal },
						);
						return { output: content, isError };
					},
				})),
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// lifecycle and onRequest() are unchanged
}
```

Ask the agent to use it:

```sh
curl -X POST http://localhost:8787/agents/assistant/demo \
  -d "Write a haiku about Durable Objects to haiku.md, then list the files."
```

Pi calls `write`, then `ls`, and answers with what it found. The file stays in the `demo` agent's workspace for the next prompt. For the other workspace options, such as running JavaScript, refer to [Filesystem tools](https://developers.cloudflare.com/agents/tools/filesystem/).

## Connect over WebSockets

So far you have talked to the agent over HTTP, one request at a time. The [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) capability keeps a connection open, so a browser or another client can send prompts and get replies as they happen. Idle connections hibernate, so an open connection does not keep the object in memory.

Add a [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) field and install it after the harness:

*src/index.jsjs*

```js
// ...
import { WebSockets } from "agents/websockets";

export class Assistant extends DurableObject {
	// ai, registry, workspace, and harness are unchanged

	// Clients send prompts and get replies over WebSockets
	webSockets = new WebSockets({
		handlers: {
			onMessage: async (connection, message) => {
				const { text } = await this.harness.prompt(String(message));
				connection.send(text ?? "");
			},
		},
	});

	lifecycle = Lifecycle.install(this).use(this.harness).use(this.webSockets);

	// onRequest() is unchanged
}
```

*src/index.tsts*

```ts
// ...
import { WebSockets } from "agents/websockets";

export class Assistant extends DurableObject<Env> {
	// ai, registry, workspace, and harness are unchanged

	// Clients send prompts and get replies over WebSockets
	readonly webSockets = new WebSockets({
		handlers: {
			onMessage: async (connection, message) => {
				const { text } = await this.harness.prompt(String(message));
				connection.send(text ?? "");
			},
		},
	});

	readonly lifecycle = Lifecycle.install(this)
		.use(this.harness)
		.use(this.webSockets);

	// onRequest() is unchanged
}
```

`WebSockets` accepts every WebSocket upgrade. HTTP requests still reach `onRequest()`, so the `curl` commands keep working.

Connect with [`wscat` ↗︎](https://github.com/websockets/wscat) and type a prompt:

```sh
npx wscat -c ws://localhost:8787/agents/assistant/demo
```

```txt
Connected (press CTRL+C to quit)
< {"type":"cf_agent_identity","name":"demo","agent":"assistant"}
> What is in haiku.md?
< ...
```

The first frame is the agent's identity, which clients such as `useAgent` and `AgentClient` read for you. For a React client, refer to the [client SDK](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/client-sdk/).

Here is the complete agent:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";
import { routeAgentRequest } from "agents/routing";
import { WebSockets } from "agents/websockets";

export class Assistant extends DurableObject {
	ai = createAI({ binding: this.env.AI });
	registry = createRegistry();

	// Tools: a durable filesystem in the object's SQLite database
	workspace = new Workspace({ storage: this.ctx.storage });

	// Harness: the Pi agent loop, with the workspace as its tools
	harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const { tools, execute } = createPiTools({ workspace: this.workspace });
			this.registry.install({
				name: "workspace",
				tools: tools.map((tool) => ({
					...tool,
					async execute(args, api, ctx) {
						const { content, isError } = await execute(
							{ id: api.callId, name: tool.name, arguments: args },
							{ abortSignal: ctx.abortSignal },
						);
						return { output: content, isError };
					},
				})),
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// Capability: clients send prompts and get replies over WebSockets
	webSockets = new WebSockets({
		handlers: {
			onMessage: async (connection, message) => {
				const { text } = await this.harness.prompt(String(message));
				connection.send(text ?? "");
			},
		},
	});

	// Runtime: the Lifecycle starts the harness and the capabilities, and
	// handles the object's fetch, alarm, and WebSocket events
	lifecycle = Lifecycle.install(this).use(this.harness).use(this.webSockets);

	async onRequest(request) {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { status, text } = await this.harness.prompt(await request.text());
		return Response.json({ status, text });
	}
}

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Workspace } from "@cloudflare/computer";
import { createPiTools } from "@cloudflare/computer/tools/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/pi-ai";
import { routeAgentRequest } from "agents/routing";
import { WebSockets } from "agents/websockets";

export class Assistant extends DurableObject<Env> {
	readonly ai = createAI({ binding: this.env.AI });
	readonly registry = createRegistry();

	// Tools: a durable filesystem in the object's SQLite database
	readonly workspace = new Workspace({ storage: this.ctx.storage });

	// Harness: the Pi agent loop, with the workspace as its tools
	readonly harness = new PiHarness({
		harness: ({ storage, context, onWake }) => {
			const { tools, execute } = createPiTools({ workspace: this.workspace });
			this.registry.install({
				name: "workspace",
				tools: tools.map((tool) => ({
					...tool,
					async execute(args, api, ctx) {
						const { content, isError } = await execute(
							{ id: api.callId, name: tool.name, arguments: args },
							{ abortSignal: ctx.abortSignal },
						);
						return { output: content, isError };
					},
				})),
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry, onWake },
				context,
			);
		},
		defaults: { model: this.ai("@cf/zai-org/glm-5.3-flash") },
	});

	// Capability: clients send prompts and get replies over WebSockets
	readonly webSockets = new WebSockets({
		handlers: {
			onMessage: async (connection, message) => {
				const { text } = await this.harness.prompt(String(message));
				connection.send(text ?? "");
			},
		},
	});

	// Runtime: the Lifecycle starts the harness and the capabilities, and
	// handles the object's fetch, alarm, and WebSocket events
	readonly lifecycle = Lifecycle.install(this)
		.use(this.harness)
		.use(this.webSockets);

	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { status, text } = await this.harness.prompt(await request.text());
		return Response.json({ status, text });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Deploy to Cloudflare

```sh
npx wrangler deploy
```

Your agent is now running on Cloudflare's global network at `https://my-agent.<YOUR_SUBDOMAIN>.workers.dev/agents/assistant/demo`.

Anyone who knows that URL can talk to your agent. Before you share it, check who is calling in your Worker. For more information, refer to [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/).

## Next steps

- [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/): stream events to clients, work with several sessions, and recover after eviction.
- [Pi extensions](https://developers.cloudflare.com/agents/harnesses/pi/extensions/): give the model more tools and system prompt sections.
- [`Scheduler`](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/): run the agent on a schedule, such as a plan every morning.
- [Capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/): everything else you can add to the Durable Object.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/getting-started/quick-start/#page","headline":"Build your first Durable Agent","description":"Build your first agent on Cloudflare. Run the Pi harness in a Durable Object with the Lifecycle, give it a Cloudflare Computer workspace, connect to it over WebSockets, and deploy it.","url":"https://developers.cloudflare.com/agents/getting-started/quick-start/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/getting-started/quick-start/og.png?v=1f23ec8012a49fb1","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
