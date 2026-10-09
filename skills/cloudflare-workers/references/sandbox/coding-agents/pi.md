---
description: Run the Pi coding agent on a GitHub repository in a Linux sandbox and read its changes as a diff.
title: Run Pi in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/pi/og.png?v=2d72440c72a2ce5d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Pi in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/pi/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run the [Pi ↗︎](https://github.com/earendil-works/pi) coding agent in a Linux sandbox to edit a GitHub repository from a prompt, then read its changes as a diff. Pi calls models through [AI Gateway](https://developers.cloudflare.com/ai-gateway/) with its built-in provider. Your Worker adds the gateway token to those requests, and the sandbox can reach only your gateway and `github.com`.

## Prerequisites

- The `sandbox-coding-agent` project from [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/). This page replaces the image, the model, and the parts of the Durable Object that are specific to the agent.
- Anthropic credentials in AI Gateway, either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an Anthropic API key stored as a [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Switch the Worker to Pi

1. Replace the `Dockerfile`. Only the highlighted line differs from the `Dockerfile` in the tutorial:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
   	&& rm -rf /var/lib/apt/lists/*

   RUN npm install --global --ignore-scripts @earendil-works/pi-coding-agent@0.87.1

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   WORKDIR /workspace
   CMD ["sleep", "infinity"]
   ```

   The image pins the version, because the flags and event format of Pi can change between releases.
2. In `wrangler.jsonc`, set `MODEL` to a model ID from the `cloudflare-ai-gateway` provider in Pi:

   ```jsonc
   {
   	"vars": {
   		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
   		"AI_GATEWAY_ID": "default",
   		"MODEL": "claude-sonnet-5",
   	},
   }
   ```

   ```toml
   [vars]
   AI_GATEWAY_ACCOUNT_ID = "<ACCOUNT_ID>"
   AI_GATEWAY_ID = "default"
   MODEL = "claude-sonnet-5"
   ```

   Use a model from a provider such as Anthropic. For most Workers AI models in its catalog, Pi 0.87.1 requests as many output tokens as the context window. Workers AI rejects those requests.
3. In `src/sandbox.ts`, replace the `ResultEvent` constant with a schema for the Pi events that report the outcome:

   *src/sandbox.tsts*



   ```ts
   const PiEvent = z.union([
   	z.object({ type: z.literal("agent_settled") }),
   	z.object({
   		type: z.literal("message_end"),
   		message: z.object({
   			role: z.literal("assistant"),
   			content: z.array(
   				z.object({ type: z.string(), text: z.string().optional() }),
   			),
   			stopReason: z.string(),
   			errorMessage: z.string().optional(),
   		}),
   	}),
   ]);

   type PiMessage = Extract<
   	z.infer<typeof PiEvent>,
   	{ type: "message_end" }
   >["message"];
   ```

4. Replace the `agentCommand()` and `agentEnv()` methods:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private agentCommand(prompt: string): string[] {
   		return [
   			"pi",
   			// Run one task, write one JSON event per line to the events file, and exit
   			"--mode",
   			"json",
   			// Keep the session in memory instead of saving it to disk
   			"--no-session",
   			// Select the built-in AI Gateway provider in Pi, which reads the account
   			// and gateway IDs from the environment
   			"--provider",
   			"cloudflare-ai-gateway",
   			// Select the model from `MODEL`
   			"--model",
   			this.env.MODEL,
   			"--",
   			prompt,
   		];
   	}

   	private agentEnv(): Record<string, string> {
   		return {
   			CLOUDFLARE_API_KEY: "provided-by-worker",
   			CLOUDFLARE_ACCOUNT_ID: this.env.AI_GATEWAY_ACCOUNT_ID,
   			CLOUDFLARE_GATEWAY_ID: this.env.AI_GATEWAY_ID,
   			PI_OFFLINE: "1",
   			PI_SKIP_VERSION_CHECK: "1",
   			PI_TELEMETRY: "0",
   		};
   	}
   }
   ```

   Pi runs its tools without approval prompts. The container limits what commands from Pi can reach.

   Pi does not start without an API key, so `CLOUDFLARE_API_KEY` is a placeholder. Pi sends the key in the `cf-aig-authorization` header, and the `Outbound` entrypoint replaces it with the gateway token. `PI_OFFLINE`, `PI_SKIP_VERSION_CHECK`, and `PI_TELEMETRY` turn off the model catalog refresh, version check, and telemetry in Pi.

   Pi still loads `AGENTS.md` and `CLAUDE.md` files from the repository. Without the `--approve` flag, it skips the protected project resources in the `.pi` directory of the repository. Leave `--approve` off for repositories you do not trust.
5. Replace the `outcome()` method:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private async outcome(exitCode: number): Promise<TaskStatus> {
   		if (exitCode !== 0) {
   			const stderr = (await this.readOptionalText(stderrPath)) ?? "";
   			return {
   				state: "failed",
   				error: `pi exited with ${exitCode}: ${stderr.slice(-2000)}`,
   			};
   		}

   		let settled = false;
   		let final: PiMessage | undefined;
   		const events = await this.files.readFile(eventsPath);

   		for await (const line of readLines(events.body)) {
   			const parsed = PiEvent.safeParse(parseJson(line));

   			if (!parsed.success) {
   				continue;
   			}

   			if (parsed.data.type === "agent_settled") {
   				settled = true;
   			} else {
   				final = parsed.data.message;
   			}
   		}

   		if (!settled || final === undefined) {
   			return { state: "failed", error: "pi exited before the agent settled" };
   		}

   		if (final.stopReason === "error" || final.stopReason === "aborted") {
   			return {
   				state: "failed",
   				error: final.errorMessage ?? `pi stopped: ${final.stopReason}`,
   			};
   		}

   		const text = final.content.flatMap((block) =>
   			block.type === "text" ? [block.text ?? ""] : [],
   		);
   		return { state: "succeeded", result: text.join("") };
   	}
   }
   ```

   Pi exits successfully even when a model request fails, so the outcome comes from its events. The task succeeds when Pi sends an `agent_settled` event and its last assistant message has a `stopReason` other than `error` or `aborted`. Otherwise, the task fails with the error message from Pi.
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

   The `AI_GATEWAY_TOKEN` secret from the tutorial stays in place. A running container keeps the image it started with, so use a new sandbox name for Pi.

## Run a task

1. Clone a repository into a sandbox named `pi-1`:

   ```sh
   curl "$WORKER_URL/sandboxes/pi-1/repository" \
   	--json '{"url": "https://github.com/octocat/Hello-World"}'
   ```

2. Start a task:

   ```sh
   curl "$WORKER_URL/sandboxes/pi-1/task" \
   	--data "Add a file NOTES.md with a one-sentence summary of this repository. Do not commit."
   ```

3. Check the task until its state is `succeeded` or `failed`:

   ```sh
   curl "$WORKER_URL/sandboxes/pi-1/task"
   ```

   A `succeeded` task includes the text of the last reply from Pi.
4. Read the changes:

   ```sh
   curl "$WORKER_URL/sandboxes/pi-1/diff"
   ```

   The diff shows the new `NOTES.md` file.

## Related resources

- [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/): how the runner starts the sandbox, runs the task, and reads the diff.
- [Pi example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/pi): a separate deployable Worker that runs Pi.
- [Pi in AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/): route Pi through AI Gateway from your own terminal.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/pi/#page","headline":"Run Pi in a sandbox","description":"Run the Pi coding agent on a GitHub repository in a Linux sandbox and read its changes as a diff.","url":"https://developers.cloudflare.com/sandbox/coding-agents/pi/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/pi/og.png?v=2d72440c72a2ce5d","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
