---
description: Run the OpenCode coding agent on a GitHub repository in a Linux sandbox and read its changes as a diff.
title: Run OpenCode in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/opencode/og.png?v=3b97c1f136b8dfe8
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run OpenCode in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/opencode/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run [OpenCode ↗︎](https://opencode.ai) in a Linux sandbox to edit a GitHub repository from a prompt, then read its changes as a diff. OpenCode calls models through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Your Worker adds the gateway token to those requests, and the sandbox can reach only your gateway and `github.com`.

## Prerequisites

- The `sandbox-coding-agent` project from [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/). This page replaces the image, the model, and the parts of the Durable Object that are specific to the agent.
- Anthropic credentials in AI Gateway, either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an Anthropic API key stored as a [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Switch the Worker to OpenCode

1. Replace the `Dockerfile`. Only the highlighted lines differ from the `Dockerfile` in the tutorial:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
   	&& rm -rf /var/lib/apt/lists/*

   RUN npm install --global --ignore-scripts opencode-linux-x64-baseline@1.18.32 \
   	&& ln -s /usr/local/lib/node_modules/opencode-linux-x64-baseline/bin/opencode /usr/local/bin/opencode

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   WORKDIR /workspace
   CMD ["sleep", "infinity"]
   ```

   The image installs the baseline x64 OpenCode binary directly. The baseline binary runs on every x64 CPU. The `opencode-ai` package picks a binary for the CPU of the machine that builds the image. An `amd64` build on another architecture runs under an emulator, where the package can pick the wrong binary.

   OpenCode searches files with `rg` from the image. Without `ripgrep`, it tries to download `rg` from GitHub. The image pins the OpenCode version, because the model list and event format of OpenCode can change between releases.
2. In `wrangler.jsonc`, set `MODEL` to an OpenCode model ID for AI Gateway:

   ```jsonc
   {
   	"vars": {
   		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
   		"AI_GATEWAY_ID": "default",
   		"MODEL": "cloudflare-ai-gateway/anthropic/claude-sonnet-5",
   	},
   }
   ```

   ```toml
   [vars]
   AI_GATEWAY_ACCOUNT_ID = "<ACCOUNT_ID>"
   AI_GATEWAY_ID = "default"
   MODEL = "cloudflare-ai-gateway/anthropic/claude-sonnet-5"
   ```

   OpenCode model IDs for AI Gateway have the form `cloudflare-ai-gateway/<PROVIDER>/<MODEL>`. OpenCode uses the model list built into the pinned release. To print that list, run `opencode models cloudflare-ai-gateway` with the same OpenCode version.
3. In `src/sandbox.ts`, replace the `ResultEvent` constant with a schema for the OpenCode events that carry the reply and errors:

   *src/sandbox.tsts*



   ```ts
   const OpencodeEvent = z.union([
   	z.object({ type: z.literal("text"), part: z.object({ text: z.string() }) }),
   	z.object({
   		type: z.literal("error"),
   		error: z.object({
   			name: z.string(),
   			data: z.object({ message: z.string().optional() }).optional(),
   		}),
   	}),
   ]);
   ```


4. Replace the `agentCommand()` and `agentEnv()` methods:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private agentCommand(prompt: string): string[] {
   		return [
   			"opencode",
   			// Run one task without an interactive terminal
   			"run",
   			// Write one JSON event per line to the events file
   			"--format",
   			"json",
   			"--auto",
   			// Select the AI Gateway model from `MODEL`
   			"--model",
   			this.env.MODEL,
   			"--",
   			prompt,
   		];
   	}

   	private agentEnv(): Record<string, string> {
   		return {
   			CLOUDFLARE_API_TOKEN: "provided-by-worker",
   			CLOUDFLARE_ACCOUNT_ID: this.env.AI_GATEWAY_ACCOUNT_ID,
   			CLOUDFLARE_GATEWAY_ID: this.env.AI_GATEWAY_ID,
   			OPENCODE_DISABLE_MODELS_FETCH: "1",
   			OPENCODE_DISABLE_AUTOUPDATE: "1",
   			OPENCODE_DISABLE_DEFAULT_PLUGINS: "1",
   			OPENCODE_DISABLE_LSP_DOWNLOAD: "1",
   			OPENCODE_DISABLE_SHARE: "1",
   		};
   	}
   }
   ```

   `--auto` approves every tool call that the OpenCode configuration does not deny. Without it, OpenCode rejects permission requests in a run without a terminal. The container limits what commands from OpenCode can reach.

   The built-in `cloudflare-ai-gateway` provider in OpenCode reads the account and gateway IDs from the environment. For Anthropic models, it sends requests to the universal endpoint of the gateway: the gateway path with no suffix. The `Outbound` entrypoint in the runner allows that path and the paths under it. `CLOUDFLARE_API_TOKEN` is a placeholder, because OpenCode does not start without a token. The `Outbound` entrypoint replaces the token header with the gateway token.

   The `OPENCODE_DISABLE_*` variables make OpenCode use the model list built into the binary and turn off its update check, default plugins, language server downloads, and sharing. OpenCode still tries to install `@opencode-ai/plugin` from npm in the background. That request gets a `403` response from the `Outbound` entrypoint, and OpenCode continues.
5. Replace the `outcome()` method:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private async outcome(exitCode: number): Promise<TaskStatus> {
   		let text = "";
   		let error: string | undefined;
   		const events = await this.files.readFile(eventsPath);

   		for await (const line of readLines(events.body)) {
   			const parsed = OpencodeEvent.safeParse(parseJson(line));

   			if (!parsed.success) {
   				continue;
   			}

   			if (parsed.data.type === "text") {
   				text = parsed.data.part.text;
   			} else {
   				error = parsed.data.error.data?.message ?? parsed.data.error.name;
   			}
   		}

   		if (exitCode === 0) {
   			return { state: "succeeded", result: text };
   		}

   		if (error === undefined) {
   			const stderr = (await this.readOptionalText(stderrPath)) ?? "";
   			return {
   				state: "failed",
   				error: `opencode exited with ${exitCode}: ${stderr.slice(-2000)}`,
   			};
   		}

   		return { state: "failed", error };
   	}
   }
   ```

   OpenCode exits with a nonzero code on any model or session error, so the exit code decides the outcome. A successful task returns the last `text` event. A failed task returns the message from the last `error` event, such as the message from the gateway for a rejected token or missing Unified Billing credits.
6. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   The `AI_GATEWAY_TOKEN` secret from the tutorial stays in place. A running container keeps the image it started with, so use a new sandbox name for OpenCode.

## Run a task

1. Clone a repository into a sandbox named `opencode-1`:

   ```sh
   curl "$WORKER_URL/sandboxes/opencode-1/repository" \
   	--json '{"url": "https://github.com/octocat/Hello-World"}'
   ```


2. Start a task:

   ```sh
   curl "$WORKER_URL/sandboxes/opencode-1/task" \
   	--data "Add a file NOTES.md with a one-sentence summary of this repository. Do not commit."
   ```


3. Check the task until its state is `succeeded` or `failed`:

   ```sh
   curl "$WORKER_URL/sandboxes/opencode-1/task"
   ```

   A `succeeded` task includes the last text reply from OpenCode.
4. Read the changes:

   ```sh
   curl "$WORKER_URL/sandboxes/opencode-1/diff"
   ```

   The diff shows the new `NOTES.md` file.

## Related resources

- [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/): how the runner starts the sandbox, runs the task, and reads the diff.
- [OpenCode example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/opencode): a separate deployable Worker that runs OpenCode.
- [OpenCode documentation ↗︎](https://opencode.ai/docs/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/opencode/#page","headline":"Run OpenCode in a sandbox","description":"Run the OpenCode coding agent on a GitHub repository in a Linux sandbox and read its changes as a diff.","url":"https://developers.cloudflare.com/sandbox/coding-agents/opencode/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/opencode/og.png?v=3b97c1f136b8dfe8","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
