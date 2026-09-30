---
description: Run Claude Code on a GitHub repository in a Linux sandbox and read its changes as a diff.
title: Run Claude Code in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/claude-code/og.png?v=5d1ddb61effd08f2
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Claude Code in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/claude-code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Run [Claude Code ↗︎](https://code.claude.com/docs/en/overview) in a Linux sandbox to edit a GitHub repository from a prompt, then read its changes as a diff. Claude Code calls Anthropic models through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Your Worker adds the gateway token to those requests, and the sandbox can reach only your gateway and `github.com`.

## Prerequisites

- The `sandbox-coding-agent` project from [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/). The tutorial builds the runner with Claude Code. Use this page to switch back to Claude Code after you run another agent, or to change its settings.
- Anthropic credentials in AI Gateway, either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an Anthropic API key stored as a [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Switch the Worker to Claude Code

1. Replace the `Dockerfile`:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
   	&& rm -rf /var/lib/apt/lists/*

   RUN npm install --global @anthropic-ai/claude-code@2.1.280

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   WORKDIR /workspace
   CMD ["sleep", "infinity"]
   ```

   The install script from the Claude Code package puts its native binary in place. The image pins the version, because the flags and event format of Claude Code can change between releases.
2. In `wrangler.jsonc`, set `MODEL` to an Anthropic model ID that your gateway can serve:

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


3. In `src/outbound.ts`, make sure the `Outbound` entrypoint removes the `x-api-key` header before it adds the gateway token:

   *src/outbound.tsts*



   ```ts
   const headers = new Headers(request.headers);
   headers.delete("x-api-key");
   headers.set("cf-aig-authorization", `Bearer ${this.env.AI_GATEWAY_TOKEN}`);
   ```

   Claude Code sends a placeholder API key. If the `x-api-key` header stays, AI Gateway forwards it to Anthropic, and the model request fails with `Invalid API key`.
4. In `src/sandbox.ts`, replace the `ResultEvent` constant with a schema for the final event from Claude Code:

   *src/sandbox.tsts*



   ```ts
   const ResultEvent = z.object({
   	type: z.literal("result"),
   	subtype: z.string(),
   	is_error: z.boolean(),
   	result: z.string().optional(),
   });
   ```


5. Replace the `agentCommand()` and `agentEnv()` methods:

   *src/sandbox.tsts*



   ```ts
   	private agentCommand(prompt: string): string[] {
   		return [
   			"claude",
   			"--print",
   			"--output-format",
   			"stream-json",
   			"--verbose",
   			"--dangerously-skip-permissions",
   			"--no-session-persistence",
   			"--model",
   			this.env.MODEL,
   			"--",
   			prompt,
   		];
   	}

   	private agentEnv(): Record<string, string> {
   		return {
   			ANTHROPIC_BASE_URL: `https://gateway.ai.cloudflare.com/v1/${this.env.AI_GATEWAY_ACCOUNT_ID}/${this.env.AI_GATEWAY_ID}/anthropic`,
   			ANTHROPIC_API_KEY: "provided-by-worker",
   			CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
   			IS_SANDBOX: "1",
   		};
   	}
   ```


   - `--print` runs Claude Code without an interactive terminal.
   - `--output-format stream-json --verbose` writes one JSON event per line, including a final `result` event.
   - `--dangerously-skip-permissions` lets Claude Code run commands and edit files without asking. The container limits what its commands can reach. Claude Code requires `IS_SANDBOX=1` to allow this as `root`.
   - `ANTHROPIC_BASE_URL` sends model requests to the Anthropic endpoint of your gateway.
   - `ANTHROPIC_API_KEY` is a placeholder, because Claude Code does not start without an API key.
   - `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` turns off update checks, telemetry, and error reporting, so Claude Code calls only your gateway.

   If the repository has a `CLAUDE.md` file, Claude Code reads it, so the instructions in that file apply to the task.
6. Replace the `outcome()` method:

   *src/sandbox.tsts*



   ```ts
   export class AgentSandbox extends DurableObject<Env> {
   	// ...

   	private async outcome(exitCode: number): Promise<TaskStatus> {
   		let result: z.infer<typeof ResultEvent> | undefined;
   		const events = await this.files.readFile(eventsPath);

   		for await (const line of readLines(events.body)) {
   			const parsed = ResultEvent.safeParse(parseJson(line));

   			if (parsed.success) {
   				result = parsed.data;
   			}
   		}

   		if (result === undefined) {
   			const stderr = (await this.readOptionalText(stderrPath)) ?? "";
   			return {
   				state: "failed",
   				error: `claude exited with ${exitCode}: ${stderr.slice(-2000)}`,
   			};
   		}

   		if (result.is_error) {
   			return { state: "failed", error: result.result ?? result.subtype };
   		}

   		return { state: "succeeded", result: result.result ?? "" };
   	}
   }
   ```

   Claude Code exits successfully even when a model request fails, so the outcome comes from the `is_error` field of the final `result` event instead of the exit code. Claude Code retries a failing model request 10 times. A rejected gateway token fails the task after about three minutes with `Failed to authenticate. API Error: 401 Unauthorized`.
7. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   A running container keeps the image it started with, so use a new sandbox name for Claude Code.

## Run a task

1. Clone a repository into a sandbox named `claude-1`:

   ```sh
   curl "$WORKER_URL/sandboxes/claude-1/repository" \
   	--json '{"url": "https://github.com/octocat/Hello-World"}'
   ```


2. Start a task:

   ```sh
   curl "$WORKER_URL/sandboxes/claude-1/task" \
   	--data "Add a file NOTES.md with a one-sentence summary of this repository. Do not commit."
   ```


3. Check the task until its state is `succeeded` or `failed`:

   ```sh
   curl "$WORKER_URL/sandboxes/claude-1/task"
   ```

   A `succeeded` task includes the final reply from Claude Code.
4. Read the changes:

   ```sh
   curl "$WORKER_URL/sandboxes/claude-1/diff"
   ```

   The diff shows the new `NOTES.md` file.

## Related resources

- [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/): how the runner starts the sandbox, runs the task, and reads the diff.
- [Claude Code example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/claude-code): a separate deployable Worker that runs Claude Code.
- [Claude Code in AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/): route Claude Code through AI Gateway from other environments.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/claude-code/#page","headline":"Run Claude Code in a sandbox","description":"Run Claude Code on a GitHub repository in a Linux sandbox and read its changes as a diff.","url":"https://developers.cloudflare.com/sandbox/coding-agents/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/claude-code/og.png?v=5d1ddb61effd08f2","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
