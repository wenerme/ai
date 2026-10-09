---
description: Let a Workers AI model write JavaScript and run it in a Dynamic Worker sandbox.
title: Build an AI code interpreter
image: https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/og.png?v=7b150c445b3ba3bc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Build an AI code interpreter

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In this tutorial, you will build a Worker that answers questions by running code. A [Workers AI](https://developers.cloudflare.com/workers-ai/) model writes JavaScript, a [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/) runs it without network access, and the model uses the result in its answer.

When you finish, the Worker answers a question about prime numbers and returns the code the model ran:

```json
{
	"answer": "There are 9,592 prime numbers below 100,000.",
	"runs": [
		{
			"code": "function isPrime(n){if(n<2)return false; if(n%2===0) return n===2; for(let i=3;i*i<=n;i+=2){if(n%i===0) return false;} return true;} let count=0; for(let i=2;i<100000;i++){ if(isPrime(i)) count++; } return count;",
			"output": { "result": 9592, "logs": [] }
		}
	]
}
```

You will learn how to:

- Run model-generated JavaScript in a Dynamic Worker with no network access and a CPU time limit.
- Give a model a tool that runs code and returns the result.
- Send code errors back to the model so it can fix its code.

## Prerequisites

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js` ↗︎](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

<details>

<summary>

Node.js version manager

</summary>

Use a Node version manager like <a href="https://volta.sh/">Volta ↗︎</a> or <a href="https://github.com/nvm-sh/nvm">nvm ↗︎</a> to avoid permission issues and change Node.js versions. <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler</a>, discussed later in this guide, requires a Node version of <code>16.17.0</code> or later.

</details>

## 1. Create the project

1. Create a Worker project:npmyarnpnpm

   ```
   npm create cloudflare@latest -- sandbox-code-interpreter --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```

   ```
   yarn create cloudflare sandbox-code-interpreter --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```

   ```
   pnpm create cloudflare@latest sandbox-code-interpreter --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents
   ```

2. Change into the project directory:

   ```sh
   cd sandbox-code-interpreter
   ```

3. Install the [AI SDK ↗︎](https://ai-sdk.dev/), the [Workers AI provider](https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/), and [Zod ↗︎](https://zod.dev/):npmyarnpnpmbun

   ```
   npm i ai workers-ai-provider zod
   ```

   ```
   yarn add ai workers-ai-provider zod
   ```

   ```
   pnpm add ai workers-ai-provider zod
   ```

   ```
   bun add ai workers-ai-provider zod
   ```

4. Replace `wrangler.jsonc` to add a Workers AI binding and a Worker Loader binding:

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "sandbox-code-interpreter",
   	"main": "src/index.ts",
   	// Set this to today's date
   	"compatibility_date": "2026-10-09",
   	"observability": {
   		"enabled": true,
   	},
   	"upload_source_maps": true,
   	"ai": {
   		"binding": "AI",
   	},
   	"worker_loaders": [
   		{
   			"binding": "LOADER",
   		},
   	],
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "sandbox-code-interpreter"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-10-09"
   upload_source_maps = true

   [observability]
   enabled = true

   [ai]
   binding = "AI"

   [[worker_loaders]]
   binding = "LOADER"
   ```

   `AI` calls Workers AI models. `LOADER` creates Dynamic Workers at runtime.
5. Generate types for the bindings:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

## 2. Run code in a sandbox

Create `src/sandbox.ts`. The `runJavaScript()` function loads the code into a new Dynamic Worker and returns its result and logs. It throws if the code does not finish within five seconds:

*src/sandbox.jsjs*

```js
const timeoutMs = 5_000;

export async function runJavaScript(env, code) {
	const sandbox = env.LOADER.load({
		compatibilityDate: "2026-10-09",
		mainModule: "code.js",
		modules: {
			"code.js": `
				import { WorkerEntrypoint } from "cloudflare:workers";

				function format(value) {
					return typeof value === "string" ? value : JSON.stringify(value);
				}

				export class Code extends WorkerEntrypoint {
					async run() {
						const logs = [];
						const console = {
							log: (...values) => logs.push(values.map(format).join(" ")),
						};
						const result = await (async () => {
							${code}
						})();
						return { result, logs };
					}
				}
			`,
		},
		globalOutbound: null,
		limits: { cpuMs: 50 },
	});

	let timer = null;
	const timeout = new Promise((_, reject) => {
		timer = setTimeout(() => {
			reject(new Error(`The code did not finish within ${timeoutMs} ms`));
		}, timeoutMs);
	});

	try {
		return await Promise.race([sandbox.getEntrypoint("Code").run(), timeout]);
	} finally {
		clearTimeout(timer);
	}
}
```

*src/sandbox.tsts*

```ts
import type { WorkerEntrypoint } from "cloudflare:workers";

export type Output = {
	result?: unknown;
	logs: string[];
};

type CodeEntrypoint = WorkerEntrypoint & {
	run(): Promise<Output>;
};

const timeoutMs = 5_000;

export async function runJavaScript(env: Env, code: string): Promise<Output> {
	const sandbox = env.LOADER.load({
		compatibilityDate: "2026-10-09",
		mainModule: "code.js",
		modules: {
			"code.js": `
				import { WorkerEntrypoint } from "cloudflare:workers";

				function format(value) {
					return typeof value === "string" ? value : JSON.stringify(value);
				}

				export class Code extends WorkerEntrypoint {
					async run() {
						const logs = [];
						const console = {
							log: (...values) => logs.push(values.map(format).join(" ")),
						};
						const result = await (async () => {
							${code}
						})();
						return { result, logs };
					}
				}
			`,
		},
		globalOutbound: null,
		limits: { cpuMs: 50 },
	});

	let timer: number | null = null;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => {
			reject(new Error(`The code did not finish within ${timeoutMs} ms`));
		}, timeoutMs);
	});

	try {
		return await Promise.race([
			sandbox.getEntrypoint<CodeEntrypoint>("Code").run(),
			timeout,
		]);
	} finally {
		clearTimeout(timer);
	}
}
```

The Dynamic Worker limits what the generated code can do:

- `globalOutbound: null` makes `fetch()` and `connect()` throw, so the code has no network access.
- The Dynamic Worker receives no `env`, so the code cannot call Workers AI or any other resource your Worker can reach.
- `limits: { cpuMs: 50 }` stops code that uses more than 50 milliseconds of CPU time. Refer to [Custom resource limits](https://developers.cloudflare.com/dynamic-workers/usage/limits/).
- If the code waits without using CPU, such as in a long `setTimeout()`, the five-second timeout stops your Worker from waiting for it. The timer runs in your Worker, so the generated code cannot change it.
- Each call to `load()` creates a new Dynamic Worker, so values from one run are not available in the next.

The generated code becomes the body of an async function, so it can use `await` and must `return` its result. A local `console` object collects `console.log()` output. The code can still change anything inside the Dynamic Worker, including the wrapper around it, but it cannot reach anything the Dynamic Worker does not receive.

## 3. Let the model run code

Replace `src/index.ts`. The Worker gives the model a `runJavaScript` tool and returns the answer from the model with every piece of code the model ran:

*src/index.jsjs*

```js
import { generateText, isStepCount, tool } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";
import { runJavaScript } from "./sandbox";

const model = "@cf/openai/gpt-oss-120b";

const Question = z.object({ question: z.string().min(1) });

const instructions = `Answer the question.
Always call the runJavaScript tool before you answer. Do not calculate, count, or sort in your head.
Write the body of an async JavaScript function and return the value you need.
If the tool returns an error, fix the code and run it again.
Answer in one or two plain-text sentences.`;

export default {
	async fetch(request, env) {
		if (request.method !== "POST") {
			return new Response("Send a POST request", { status: 405 });
		}

		const body = Question.safeParse(await request.json().catch(() => null));

		if (!body.success) {
			return Response.json(
				{ error: "Send a JSON body with a question" },
				{ status: 400 },
			);
		}

		const workersai = createWorkersAI({ binding: env.AI });
		const runs = [];

		try {
			const result = await generateText({
				model: workersai(model),
				instructions,
				prompt: body.data.question,
				tools: {
					runJavaScript: tool({
						description:
							"Run JavaScript in a sandbox with no network access. The code is the body of an async function. Return a JSON-serializable value. console.log output is captured.",
						inputSchema: z.object({
							code: z.string().describe("Body of an async JavaScript function"),
						}),
						execute: async ({ code }) => {
							try {
								const output = await runJavaScript(env, code);
								runs.push({ code, output });
								return output;
							} catch (error) {
								const message =
									error instanceof Error ? error.message : String(error);
								runs.push({ code, error: message });
								return { error: message };
							}
						},
					}),
				},
				// Stop after five model steps, so a model that keeps failing cannot
				// run code indefinitely
				stopWhen: isStepCount(5),
			});

			return Response.json({ answer: result.text, runs });
		} catch (error) {
			console.error("Model request failed", error);
			return Response.json(
				{ error: "The model request failed. Try again later.", runs },
				{ status: 502 },
			);
		}
	},
};
```

*src/index.tsts*

```ts
import { generateText, isStepCount, tool } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";
import { runJavaScript, type Output } from "./sandbox";

const model = "@cf/openai/gpt-oss-120b";

const Question = z.object({ question: z.string().min(1) });

const instructions = `Answer the question.
Always call the runJavaScript tool before you answer. Do not calculate, count, or sort in your head.
Write the body of an async JavaScript function and return the value you need.
If the tool returns an error, fix the code and run it again.
Answer in one or two plain-text sentences.`;

type Run = { code: string } & ({ output: Output } | { error: string });

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Send a POST request", { status: 405 });
		}

		const body = Question.safeParse(await request.json().catch(() => null));

		if (!body.success) {
			return Response.json(
				{ error: "Send a JSON body with a question" },
				{ status: 400 },
			);
		}

		const workersai = createWorkersAI({ binding: env.AI });
		const runs: Run[] = [];

		try {
			const result = await generateText({
				model: workersai(model),
				instructions,
				prompt: body.data.question,
				tools: {
					runJavaScript: tool({
						description:
							"Run JavaScript in a sandbox with no network access. The code is the body of an async function. Return a JSON-serializable value. console.log output is captured.",
						inputSchema: z.object({
							code: z.string().describe("Body of an async JavaScript function"),
						}),
						execute: async ({ code }) => {
							try {
								const output = await runJavaScript(env, code);
								runs.push({ code, output });
								return output;
							} catch (error) {
								const message =
									error instanceof Error ? error.message : String(error);
								runs.push({ code, error: message });
								return { error: message };
							}
						},
					}),
				},
				// Stop after five model steps, so a model that keeps failing cannot
				// run code indefinitely
				stopWhen: isStepCount(5),
			});

			return Response.json({ answer: result.text, runs });
		} catch (error) {
			console.error("Model request failed", error);
			return Response.json(
				{ error: "The model request failed. Try again later.", runs },
				{ status: 502 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

`generateText()` sends the question to the model. When the model calls `runJavaScript`, the AI SDK runs `execute()` and sends the return value back to the model. The model can then run more code or answer.

If the code throws, exceeds the CPU time limit or the timeout, or calls `fetch()`, `execute()` returns the error message instead of failing the request. The model reads the error and can fix its code.

The Worker validates the request body with Zod before it calls the model. If a Workers AI request fails, for example because of a [rate limit](https://developers.cloudflare.com/workers-ai/platform/limits/), the Worker logs the error and responds with `502` and the code that already ran. `observability` in `wrangler.jsonc` keeps those logs in [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).

## 4. Test locally

1. Start a local development server:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   During `wrangler dev`, the Dynamic Worker runs locally. Workers AI requests always run on Cloudflare and count toward your [Workers AI usage](https://developers.cloudflare.com/workers-ai/platform/pricing/).
2. POST a question to the URL Wrangler prints. The default is `http://localhost:8787`:

   ```sh
   curl http://localhost:8787 --json '{"question":"How many prime numbers are there below 100,000?"}'
   ```

   The response includes the answer and the code the model ran:

   ```json
   {
   	"answer": "There are 9,592 prime numbers below 100,000.",
   	"runs": [
   		{
   			"code": "function isPrime(n){if(n<2)return false; if(n%2===0) return n===2; for(let i=3;i*i<=n;i+=2){if(n%i===0) return false;} return true;} let count=0; for(let i=2;i<100000;i++){ if(isPrime(i)) count++; } return count;",
   			"output": { "result": 9592, "logs": [] }
   		}
   	]
   }
   ```

   The model writes different code and wording each time. `result` is `9592`.
3. Ask a question that needs sorting:

   ```sh
   curl http://localhost:8787 --json '{"question":"Sort these words by length, then alphabetically: pear, fig, banana, kiwi, apple, date."}'
   ```

   The answer lists `fig, date, kiwi, pear, apple, banana`.

## 5. Deploy

Caution

The Worker does not authenticate requests. Anyone with the URL can send questions and use your Workers AI allowance. Authenticate callers before you share the URL. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/).

1. Deploy your Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

2. POST a question to the `workers.dev` URL Wrangler prints:

   ```sh
   curl https://sandbox-code-interpreter.<YOUR_SUBDOMAIN>.workers.dev --json '{"question":"How many prime numbers are there below 100,000?"}'
   ```

   The response has the same shape as the local response.

## Next steps

- Let generated code call methods that your Worker provides. Refer to [Bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/).
- Let a model call typed tools from generated code. Refer to [Code Mode](https://developers.cloudflare.com/agents/tools/codemode/).
- Run shell commands or other Linux tools. Refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).
- Choose a different model. Refer to [Workers AI models](https://developers.cloudflare.com/workers-ai/models/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/#page","headline":"Build an AI code interpreter","description":"Let a Workers AI model write JavaScript and run it in a Dynamic Worker sandbox.","url":"https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/og.png?v=7b150c445b3ba3bc","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
