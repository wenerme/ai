---
description: Run Claude Code on Cloudflare. The CLI runs in a Container, with its own plugins, mods, and settings, and a Durable Object keeps its sessions and credentials.
title: Claude Code
image: https://developers.cloudflare.com/agents/harnesses/claude-code/og.png?v=081c02aa56fbbf43
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Code

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/claude-code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run [Claude Code ↗︎](https://docs.anthropic.com/en/docs/claude-code/overview) on Cloudflare, with its plugins, mods, and settings, the way it runs on your laptop.

Claude Code runs in a [Cloudflare Container](https://developers.cloudflare.com/containers/), and a [Durable Object](https://developers.cloudflare.com/durable-objects/) drives it with `ContainerHarness` from `agents/harness/container`:

- **The CLI owns the loop.** It keeps its own tools, plugins, settings, and session format, the same as on your laptop.
- **The Durable Object owns the record.** The harness stores sessions, operations, transcripts, and the CLI's session files in the object's SQLite database. [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) jobs reconnect to a running container after an eviction or a deploy.
- **Credentials stay outside the container.** The CLI calls a placeholder host with a placeholder key. `ContainerEgress`, a Worker entrypoint in your Worker, adds the real credentials to each model request after it leaves the container.

No Dockerfile is needed. The harness starts the `cloudflare/debian-trixie` image, installs Claude Code on first use, and snapshots the filesystem for later starts.

Experimental

`agents/harness/container` is experimental. Its API may change in any release.

To start from a complete app, with HTTP routes and event streaming, use the [Container harness example ↗︎](https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/container).

## Create a project

You need Node.js 24 or later, the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/), and an Anthropic API key. Local container development also needs Docker running.

1. Create a Worker project:

   ```sh
   cf init claude-code-agent
   cd claude-code-agent
   ```

2. Install the Agents SDK:npmyarnpnpmbun

   ```
   npm i agents@latest
   ```

   ```
   yarn add agents@latest
   ```

   ```
   pnpm add agents@latest
   ```

   ```
   bun add agents@latest
   ```

Replace `cloudflare.config.ts`. It declares a SQLite-backed Durable Object with a container on the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), the `ContainerEgress` entrypoint, and the API key secret:

*cloudflare.config.tsts*

```ts
import { bindings, defineConfig, defineContainer, exports } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

const container = defineContainer({
	name: "claude-code",
	schedulingPolicy: "durable-object",
});

export default defineConfig({
	worker: {
		name: "claude-code-agent",
		entrypoint,
		compatibilityDate: "2026-11-06",
		compatibilityFlags: ["nodejs_compat"],
		exports: {
			ClaudeCodeAgent: exports.durableObject({ storage: "sqlite", container }),
			ContainerEgress: exports.worker(),
		},
		env: {
			ANTHROPIC_API_KEY: bindings.secret(),
		},
	},
	containers: [container],
});
```

## Create the agent

Create the harness with the `claudeCode()` preset, and add it to the Lifecycle:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, claudeCode } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class ClaudeCodeAgent extends DurableObject {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		egress: this.ctx.exports.ContainerEgress,
		agent: claudeCode({ apiKey: this.env.ANTHROPIC_API_KEY }),
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request) {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { prompt } = await request.json();
		const result = await this.harness.prompt(prompt);
		return Response.json({ status: result.status, text: result.text });
	}
}

function containerOf(ctx) {
	if (!ctx.container)
		throw new Error("Configure a container for ClaudeCodeAgent");
	return ctx.container;
}

export default {
	async fetch(request, _env, ctx) {
		return ctx.exports.ClaudeCodeAgent.getByName("demo").fetch(request);
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, claudeCode } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class ClaudeCodeAgent extends DurableObject<Env> {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		egress: this.ctx.exports.ContainerEgress,
		agent: claudeCode({ apiKey: this.env.ANTHROPIC_API_KEY }),
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { prompt } = await request.json<{ prompt: string }>();
		const result = await this.harness.prompt(prompt);
		return Response.json({ status: result.status, text: result.text });
	}
}

function containerOf(ctx: DurableObjectState): Container {
	if (!ctx.container) throw new Error("Configure a container for ClaudeCodeAgent");
	return ctx.container;
}

export default {
	async fetch(request: Request, _env: Env, ctx: ExecutionContext) {
		return ctx.exports.ClaudeCodeAgent.getByName("demo").fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

To send model requests through [AI Gateway](https://developers.cloudflare.com/ai-gateway/), pass the gateway's Anthropic URL as `baseUrl`. With [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), pass the gateway token as `apiKey`. With [stored provider keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), pass it in a `cf-aig-authorization` header in `headers` instead.

## Customize Claude Code

`claudeCode()` takes Claude Code's own options:

| Option | Description |
| --- | --- |
| `model` | The model new sessions start with. `session.setModel()` changes it |
| `appendSystemPrompt` | Passed to `--append-system-prompt` |
| `allowedTools` | Passed to `--allowedTools` |
| `disallowedTools` | Passed to `--disallowedTools` |
| `maxTurns` | Passed to `--max-turns` |
| `version` | The `@anthropic-ai/claude-code` version to install |
| `setup` | Commands that run once on the first start, kept in the snapshot |

Use `setup` to install plugins and mods, and to write `CLAUDE.md`, `~/.claude/settings.json`, or skills. A step with `user: "agent"` runs as the user Claude Code runs as, in its home. Every session's home starts as a copy of that home:

```js
claudeCode({
	apiKey: this.env.ANTHROPIC_API_KEY,
	appendSystemPrompt: "Run the tests before you report a change as done.",
	setup: [
		{
			name: "install review plugin",
			user: "agent",
			command: [
				"sh",
				"-c",
				"claude plugin marketplace add my-org/plugins && claude plugin install review@plugins",
			],
		},
		{
			name: "write CLAUDE.md",
			user: "agent",
			command: [
				"sh",
				"-c",
				"mkdir -p ~/.claude && printf '%s\\n' 'Use pnpm. Keep commits small.' > ~/.claude/CLAUDE.md",
			],
		},
	],
});
```

```ts
claudeCode({
	apiKey: this.env.ANTHROPIC_API_KEY,
	appendSystemPrompt: "Run the tests before you report a change as done.",
	setup: [
		{
			name: "install review plugin",
			user: "agent",
			command: [
				"sh",
				"-c",
				"claude plugin marketplace add my-org/plugins && claude plugin install review@plugins",
			],
		},
		{
			name: "write CLAUDE.md",
			user: "agent",
			command: [
				"sh",
				"-c",
				"mkdir -p ~/.claude && printf '%s\\n' 'Use pnpm. Keep commits small.' > ~/.claude/CLAUDE.md",
			],
		},
	],
});
```

Changing `setup` or `version` takes effect when a container next starts. That container sets up from scratch, without the previous snapshot. A token that a setup step uses stays in the snapshot, where the agent can read it.

## Run locally

Add your API key to `.dev.vars`, and keep that file out of version control:

*.dev.varstxt*

```txt
ANTHROPIC_API_KEY="<ANTHROPIC_API_KEY>"
```

Start Docker, then run `cf dev`. Send a prompt to the agent named `demo`, using the port that `cf dev` prints:

```sh
curl http://localhost:5173/ \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"Write hello.txt containing hi, then read it back."}'
```

The first prompt takes longer, because the harness installs Claude Code and takes the setup snapshot. Later containers start from that snapshot.

## Sessions and recovery

`prompt()` submits work and waits for the answer. `submit()` returns once the prompt is stored, and `wait()` picks up the result later, in another request to the same object. Pass an `operationId` to deduplicate a submission:

```js
const receipt = await this.harness.submit("Add tests for parse()", {
	operationId: "parse-tests-1",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId);
if (result.status === "done") console.log(result.text);
else console.log(result.reason);
```

```ts
const receipt = await this.harness.submit("Add tests for parse()", {
	operationId: "parse-tests-1",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId);
if (result.status === "done") console.log(result.text);
else console.log(result.reason);
```

`harness.sessions.create()` starts an independent session, and `harness.sessions.fork(id)` branches one. `session.events()` returns a snapshot of the session followed by live events, which you can forward to a client.

Recovery depends on what stopped:

- **The Durable Object is evicted or redeployed.** A Lifecycle job reattaches to the running container and replays the events it missed.
- **The container goes idle.** After five minutes, the harness snapshots the filesystem and stops it. The next prompt restores the snapshot and resumes the CLI's session.
- **The container dies during a turn.** The turn ends with `status: "unanswered"` and `reason: "container_lost"`, and the session survives. Pass `onContainerLost: "retry"` to run the turn again instead, when its side effects are safe to repeat.

Files in the container come back from the last snapshot, so edits made after it can be lost. Keep files that must survive in separate durable storage.

## Security

The container is the sandbox. Both CLIs run without their own permission prompts, so treat everything in the container as readable by the agent. Keep credentials out of it, and put [authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/) in front of every route that reaches the harness. Each prompt can run commands and spend model credit.

Use `allowedTools` and `disallowedTools` to limit what Claude Code can do.

## Deploy

After you add authentication, deploy with the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/) and supply the secret from a [secrets file](https://developers.cloudflare.com/cf/projects/#deploy):

```sh
cf auth login
cf deploy --secrets-file .dev.vars
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/claude-code/#page","headline":"Claude Code","description":"Run Claude Code on Cloudflare. The CLI runs in a Container, with its own plugins, mods, and settings, and a Durable Object keeps its sessions and credentials.","url":"https://developers.cloudflare.com/agents/harnesses/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/claude-code/og.png?v=081c02aa56fbbf43","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
