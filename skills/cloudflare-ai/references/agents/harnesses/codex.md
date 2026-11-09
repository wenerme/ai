---
description: Explore an experimental example that runs the Codex agent loop as WebAssembly in a Durable Object, with persistent conversations, files, and recovery.
title: Codex
image: https://developers.cloudflare.com/agents/harnesses/codex/og.png?v=51919774a7b02c3d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Codex

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/codex/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The experimental [Codex harness example ↗︎](https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/codex) adapts Codex's Rust turn-processing and protocol code to WebAssembly inside a Cloudflare Durable Object. Agents SDK capabilities provide persistent conversations, file tools, and recovery after interruptions.

`CodexHarness` is example code, not an exported Agents SDK harness. It uses internal SDK APIs. Start from the complete example, which includes its TypeScript source and WebAssembly build. For the full Codex CLI with a Linux shell and repository tools, use the [Container harness](https://developers.cloudflare.com/agents/harnesses/container/) for durable session orchestration, or refer to [Run Codex in a sandbox](https://developers.cloudflare.com/sandbox/coding-agents/codex/).

## Run the example

You need Git, Node.js 24 or later, pnpm, rustup, and a Cloudflare account. Model calls use remote [Workers AI](https://developers.cloudflare.com/workers-ai/) through your account, including during local development.

1. Clone the Agents SDK repository and open its root directory:

   ```sh
   git clone https://github.com/cloudflare/agents.git
   cd agents
   ```

2. Install dependencies and build the local SDK:pnpm

   ```
   pnpm install
   ```

   pnpm

   ```
   pnpm nx run agents:build
   ```

3. Open the example directory and install its Rust toolchain:

   ```sh
   cd examples/next/harnesses/codex
   rustup toolchain install 1.95.0 --target wasm32-unknown-unknown
   ```

4. Sign in with the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/), then start the app:

   ```sh
   cf auth login
   ```

   pnpm

   ```
   pnpm run start
   ```

   The start script builds the WebAssembly module before starting Vite. If you have access to multiple accounts, set `CLOUDFLARE_ACCOUNT_ID` before starting.
5. Open the printed local URL and send a prompt:

   ```txt
   Write a short README to /codex/result.txt, then read it back.
   ```

   After the turn finishes, reload the page. The conversation and file remain available from durable storage.

## Configure the harness

The harness owns its `Tasks`, [Sessions](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/), and `Streams` capabilities. Supply a model and a `Workspace` from `@cloudflare/computer`, then call `install()` to register the harness and its capabilities with [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) before startup. Configure the harness in `src/server.ts` with `createAI`:

```js
import { DurableObject } from "cloudflare:workers";
import { Workspace } from "@cloudflare/computer";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { CodexHarness } from "./codex-harness";

export class Coder extends DurableObject {
	workspace = new Workspace({ storage: this.ctx.storage });

	codex = new CodexHarness({
		workspace: this.workspace,
		model: createAI({ binding: this.env.AI, id: "default" })(
			"openai/gpt-6.1-sol",
		),
	});

	lifecycle = this.codex.install(Lifecycle.install(this));
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Workspace } from "@cloudflare/computer";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { CodexHarness } from "./codex-harness";

export class Coder extends DurableObject<Env> {
	workspace = new Workspace({ storage: this.ctx.storage });

	codex = new CodexHarness({
		workspace: this.workspace,
		model: createAI({ binding: this.env.AI, id: "default" })(
			"openai/gpt-6.1-sol",
		),
	});

	lifecycle = this.codex.install(Lifecycle.install(this));
}
```

The complete server also installs `WebSockets` for the browser connection. Its Wrangler configuration includes the `AI` binding and a SQLite-backed `Coder` Durable Object.

### Models

The harness accepts an AI SDK `LanguageModelV4`. Use [`createAI`](https://developers.cloudflare.com/agents/models/ai-sdk/) to configure Workers AI or AI Gateway models. The configuration above uses OpenAI's GPT-6.1 Sol through AI Gateway. To use it, configure the `default` gateway with [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a [stored OpenAI API key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

The adapter supports text, reasoning, and function tools. It does not support file responses, provider-executed tools, or tool approval requests.

### File tools

The example stores files in the Durable Object's SQLite-backed Workspace. It exposes two tools to the model:

| Tool | Inputs | Behavior |
| --- | --- | --- |
| Write | `path`, `content` | Write UTF-8 text, replacing the file if it exists. |
| Read | `path`, optional `offset` and `max_bytes` | Read text by byte range. Use the returned `next_offset` to continue reading a large file. |

The example registers these tools as `workspace_write` and `workspace_read`.

## Submit a turn

Inside a method on the example's `Coder` object, submit a prompt:

```js
const receipt = await this.codex.submit({
	prompt: "Write a short README to /codex/result.txt.",
	operationId: "readme-1",
});

const operation = await this.codex.snapshot(receipt.operationId);
```

```ts
const receipt = await this.codex.submit({
	prompt: "Write a short README to /codex/result.txt.",
	operationId: "readme-1",
});

const operation = await this.codex.snapshot(receipt.operationId);
```

`submit()` returns after durably accepting the prompt, before the model finishes. Its receipt contains `operationId`, `streamId`, and `accepted`. Reuse an operation ID when retrying the same prompt; an existing operation returns `accepted: false`.

Use `snapshot()` to check whether the operation is `queued`, `running`, `completed`, or `failed`. A completed operation includes `output`; a failed operation includes `error`.

## Events and recovery

The browser connects with `useAgent` from `agents/react`. The example's [session hook ↗︎](https://github.com/cloudflare/agents/blob/main/examples/next/harnesses/codex/src/use-codex-session.ts) receives a snapshot, subscribes to operation events, and resumes from the next unread sequence after reconnecting.

`Streams` persists the events for replay. Model response events become available after that model round finishes.

`Tasks` journals model and tool steps. After a restart, completed steps reuse their stored results. Interrupted steps can execute again, including model calls. Tools with external side effects need their own retry and deduplication strategy.

`Sessions` stores the transcript and compacts the model context. Configure `compaction` in `CodexHarness` options to adjust this behavior.

`maxRounds` sets the **maximum number of model rounds per turn**, with a default of `128`. A model round consists of one model call and any tool calls it requests.

## Deploy

From the example directory, run:

pnpm

```
pnpm run deploy
```

The script builds the WebAssembly module and Worker before deploying. The example routes are unauthenticated. Add authentication before exposing user sessions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/harnesses/codex/#page","headline":"Codex","description":"Explore an experimental example that runs the Codex agent loop as WebAssembly in a Durable Object, with persistent conversations, files, and recovery.","url":"https://developers.cloudflare.com/agents/harnesses/codex/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/codex/og.png?v=51919774a7b02c3d","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
