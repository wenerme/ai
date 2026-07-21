---
description: Set up and deploy your first Workers AI project with embedded function calling.
title: Get Started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Get Started

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/get-started/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide will instruct you through setting up and deploying your first Workers AI project with embedded function calling. You will use Workers, a Workers AI binding, the [ai-utils package ↗](https://github.com/cloudflare/ai-utils), and a large language model (LLM) to deploy your first AI-powered application on the Cloudflare global network with embedded function calling.

## 1\. Create a Worker project with Workers AI

Follow the [Workers AI Get Started Guide](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/) until step 2.

## 2\. Install additional npm package

Next, run the following command in your project repository to install the Worker AI utilities package.

 npm  yarn  pnpm  bun

```
npm i @cloudflare/ai-utils
```

```
yarn add @cloudflare/ai-utils
```

```
pnpm add @cloudflare/ai-utils
```

```
bun add @cloudflare/ai-utils
```

## 3\. Add Workers AI Embedded function calling

Update the `index.ts` file in your application directory with the following code:

```js
import { runWithTools } from "@cloudflare/ai-utils";

export default {
	async fetch(request, env, ctx) {
		// Define function
		const sum = (args) => {
			const { a, b } = args;
			return Promise.resolve((a + b).toString());
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				// Messages
				messages: [
					{
						role: "user",
						content: "What the result of 123123123 + 10343030?",
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: "sum",
						description: "Sum up two numbers and returns the result",
						parameters: {
							type: "object",
							properties: {
								a: { type: "number", description: "the first number" },
								b: { type: "number", description: "the second number" },
							},
							required: ["a", "b"],
						},
						// reference to previously defined function
						function: sum,
					},
				],
			},
		);
		return new Response(JSON.stringify(response));
	},
};
```

```ts
import { runWithTools } from "@cloudflare/ai-utils";

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const sum = (args: { a: number; b: number }): Promise<string> => {
			const { a, b } = args;
			return Promise.resolve((a + b).toString());
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				// Messages
				messages: [
					{
						role: "user",
						content: "What the result of 123123123 + 10343030?",
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: "sum",
						description: "Sum up two numbers and returns the result",
						parameters: {
							type: "object",
							properties: {
								a: { type: "number", description: "the first number" },
								b: { type: "number", description: "the second number" },
							},
							required: ["a", "b"],
						},
						// reference to previously defined function
						function: sum,
					},
				],
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

This example imports the utils with `import { runWithTools} from "@cloudflare/ai-utils"` and follows the API reference below.

Moreover, in this example we define and describe a list of tools that the LLM can leverage to respond to the user query. Here, the list contains of only one tool, the `sum` function.

Abstracted by the `runWithTools` function, the following steps occur:

sequenceDiagram
    participant Worker as Worker
    participant WorkersAI as Workers AI

    Worker->>+WorkersAI: Send messages, function calling prompt, and available tools
    WorkersAI->>+Worker: Select tools and arguments for function calling
    Worker-->>-Worker: Execute function
    Worker-->>+WorkersAI: Send messages, function calling prompt and function result
    WorkersAI-->>-Worker: Send response incorporating function output

The `ai-utils package` is also open-sourced on [Github ↗](https://github.com/cloudflare/ai-utils).

## 4\. Local development & deployment

Follow steps 4 and 5 of the [Workers AI Get Started Guide](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/) for local development and deployment.

Workers AI Embedded Function Calling charges

Embedded function calling runs Workers AI inference requests. Standard charges for inference (e.g. tokens) usage will be charged. Resources consumed (e.g. CPU time) during embedded functions' code execution will be charged just as any other Worker's code execution.

## API reference

For more details, refer to [API reference](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/get-started/#page","headline":"Get Started · Cloudflare Workers AI docs","description":"Set up and deploy your first Workers AI project with embedded function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
