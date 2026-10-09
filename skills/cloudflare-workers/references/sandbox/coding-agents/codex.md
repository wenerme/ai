---
description: Run the Codex CLI on a GitHub repository in a Linux sandbox and read its changes as a diff.
title: Run Codex in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/codex/og.png?v=b387b053e2cfc995
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Codex in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/codex/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run the [Codex CLI ↗︎](https://developers.openai.com/codex/cli) in a Linux sandbox to edit a GitHub repository from a prompt, then read its changes as a diff. Codex calls OpenAI models through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Your Worker adds the gateway token to those requests, and the sandbox can reach only your gateway and `github.com`.

## Prerequisites

- The `sandbox-coding-agent` project from [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/). This page replaces the image, the model, and the parts of the Durable Object that are specific to the agent.
- OpenAI credentials in AI Gateway, either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an OpenAI API key stored as a [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Switch the Worker to Codex

1. Replace the `Dockerfile`. Only the highlighted line differs from the `Dockerfile` in the tutorial:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
   	&& rm -rf /var/lib/apt/lists/*

   RUN npm install --global --ignore-scripts @openai/codex@0.156.1

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   WORKDIR /workspace
   CMD ["sleep", "infinity"]
   ```

   The Codex npm package ships its native binaries as dependencies, so it installs without running install scripts. The image pins the version, because the flags and event format of Codex can change between releases.
2. In `wrangler.jsonc`, set `MODEL` to an OpenAI model ID that your gateway can serve:

   ```jsonc
   {
   	"vars": {
   		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
   		"AI_GATEWAY_ID": "default",
   		"MODEL": "gpt-6-sol",
   	},
   }
   ```

   ```toml
   [vars]
   AI_GATEWAY_ACCOUNT_ID = "<ACCOUNT_ID>"
   AI_GATEWAY_ID = "default"
   MODEL = "gpt-6-sol"
   ```

   Codex sends requests in the OpenAI Responses format, so it works only with OpenAI models that support the Responses API.
3. In `src/sandbox.ts`, replace the `ResultEvent` constant with a path for the final message from Codex and a schema for its failure events:

   *src/sandbox.tsts*



   ```ts
   const lastMessagePath = `${taskDirectory}/last-message.txt`;

   const FailureEvent = z.union([
   	z.object({
   		type: z.literal("turn.failed"),
   		error: z.object({ message: z.string() }),
   	}),
   	z.object({ type: z.literal("error"), message: z.string() }),
   ]);
   ```

4. Replace the `agentCommand()` and `agentEnv()` methods:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private agentCommand(prompt: string): string[] {
   		const baseUrl = `https://gateway.ai.cloudflare.com/v1/${this.env.AI_GATEWAY_ACCOUNT_ID}/${this.env.AI_GATEWAY_ID}/openai`;

   		return [
   			"codex",
   			// Run one task without an interactive terminal
   			"exec",
   			// Write one JSON event per line to the events file
   			"--json",
   			// Skip the session files that Codex would otherwise save
   			"--ephemeral",
   			"--dangerously-bypass-approvals-and-sandbox",
   			// Write the final message to a file outside the repository
   			"--output-last-message",
   			lastMessagePath,
   			"--model",
   			this.env.MODEL,
   			// Add a custom provider that sends requests to the OpenAI endpoint of your gateway
   			"--config",
   			'model_provider="cloudflare-ai-gateway"',
   			"--config",
   			`model_providers.cloudflare-ai-gateway={ name = "Cloudflare AI Gateway", base_url = ${JSON.stringify(baseUrl)}, wire_api = "responses" }`,
   			// Stop the analytics and update requests from Codex
   			"--config",
   			"analytics.enabled=false",
   			"--config",
   			"check_for_update_on_startup=false",
   			// Stop Codex from syncing its plugin marketplace, which clones a
   			// repository from `github.com` on every run
   			"--config",
   			"features.plugins=false",
   			"--",
   			prompt,
   		];
   	}

   	private agentEnv(): Record<string, string> {
   		return {};
   	}
   }
   ```

   `--dangerously-bypass-approvals-and-sandbox` turns off the approval prompts and the built-in command sandbox of Codex. The container limits what commands from Codex can reach instead.

   A custom provider sends no API key, and the `Outbound` entrypoint adds the gateway token.

   Codex reads the certificate for intercepted HTTPS from `SSL_CERT_FILE`, which `trustEnv` in the runner sets.
5. Replace the `outcome()` method:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private async outcome(exitCode: number): Promise<TaskStatus> {
   		if (exitCode === 0) {
   			return {
   				state: "succeeded",
   				result: (await this.readOptionalText(lastMessagePath)) ?? "",
   			};
   		}

   		let failure: string | undefined;
   		const events = await this.files.readFile(eventsPath);

   		for await (const line of readLines(events.body)) {
   			const parsed = FailureEvent.safeParse(parseJson(line));

   			if (parsed.success) {
   				failure =
   					parsed.data.type === "error"
   						? parsed.data.message
   						: parsed.data.error.message;
   			}
   		}

   		if (failure === undefined) {
   			const stderr = (await this.readOptionalText(stderrPath)) ?? "";
   			return {
   				state: "failed",
   				error: `codex exited with ${exitCode}: ${stderr.slice(-2000)}`,
   			};
   		}

   		return { state: "failed", error: failure };
   	}
   }
   ```

   Codex exits with a nonzero code when its turn fails, so the exit code decides the outcome. A failed task returns the message from the last `turn.failed` or `error` event. Codex retries a failing model request five times, and the task fails after about 20 seconds.
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

   The `AI_GATEWAY_TOKEN` secret from the tutorial stays in place. A running container keeps the image it started with, so use a new sandbox name for Codex.

## Run a task

1. Clone a repository into a sandbox named `codex-1`:

   ```sh
   curl "$WORKER_URL/sandboxes/codex-1/repository" \
   	--json '{"url": "https://github.com/octocat/Hello-World"}'
   ```

2. Start a task:

   ```sh
   curl "$WORKER_URL/sandboxes/codex-1/task" \
   	--data "Add a file NOTES.md with a one-sentence summary of this repository. Do not commit."
   ```

3. Check the task until its state is `succeeded` or `failed`:

   ```sh
   curl "$WORKER_URL/sandboxes/codex-1/task"
   ```

   A `succeeded` task includes the final message that Codex wrote.
4. Read the changes:

   ```sh
   curl "$WORKER_URL/sandboxes/codex-1/diff"
   ```

   The diff shows the new `NOTES.md` file.

## Related resources

- [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/): how the runner starts the sandbox, runs the task, and reads the diff.
- [Codex example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/codex): a separate deployable Worker that runs Codex.
- [OpenAI Codex in AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/): route Codex through AI Gateway from your own terminal.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/codex/#page","headline":"Run Codex in a sandbox","description":"Run the Codex CLI on a GitHub repository in a Linux sandbox and read its changes as a diff.","url":"https://developers.cloudflare.com/sandbox/coding-agents/codex/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/codex/og.png?v=b387b053e2cfc995","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
