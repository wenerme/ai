---
description: Use @cloudflare/codemode/tanstack-ai to expose namespaced TanStack AI server tools through chat().
title: Use Code Mode with TanStack AI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

#  Use Code Mode with TanStack AI

Last updated Jun 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/agents/tools/codemode/tanstack-ai/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use the `@cloudflare/codemode/tanstack-ai` entry point to give `chat()` one Code Mode tool. The model can then write JavaScript that calls your TanStack AI server tools.

## Prerequisites

You need an existing Workers project and a configured TanStack AI model adapter. This example uses the OpenAI adapter.

## Add Code Mode

1. Install Code Mode, TanStack AI, the OpenAI adapter, and Zod:
 npm  yarn  pnpm  bun
```
npm i @cloudflare/codemode @tanstack/ai @tanstack/ai-openai zod
```
```
yarn add @cloudflare/codemode @tanstack/ai @tanstack/ai-openai zod
```
```
pnpm add @cloudflare/codemode @tanstack/ai @tanstack/ai-openai zod
```
```
bun add @cloudflare/codemode @tanstack/ai @tanstack/ai-openai zod
```
2. Add a Worker Loader binding to your Wrangler configuration:
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "tanstack-codemode",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-21",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ]
}
```
```toml
name = "tanstack-codemode"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-21"
compatibility_flags = ["nodejs_compat"]
[[worker_loaders]]
binding = "LOADER"
```
3. Define TanStack AI server tools, group them into namespaces, and pass the Code Mode tool to `chat()`:
```js
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import {
	createCodeTool,
	tanstackTools,
} from "@cloudflare/codemode/tanstack-ai";
import { chat, toolDefinition, toHttpResponse } from "@tanstack/ai";
import { openaiText } from "@tanstack/ai-openai";
import { z } from "zod";
const getWeather = toolDefinition({
	name: "get_weather",
	description: "Get the current weather for a city",
	inputSchema: z.object({
		city: z.string().meta({ description: "City name" }),
	}),
	outputSchema: z.object({
		city: z.string(),
		temperatureCelsius: z.number(),
		conditions: z.string(),
	}),
}).server(async ({ city }) => ({
	city,
	temperatureCelsius: 22,
	conditions: "sunny",
}));
const findContacts = toolDefinition({
	name: "find_contacts",
	description: "Find contacts for a team",
	inputSchema: z.object({
		team: z.string().meta({ description: "Team name" }),
	}),
	outputSchema: z.array(
		z.object({
			name: z.string(),
			email: z.string(),
		}),
	),
}).server(async ({ team }) => [
	{
		name: `${team} contact`,
		email: "team@example.com",
	},
]);
function startChat(env, prompt) {
	const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
	const codeTool = createCodeTool({
		tools: [
			tanstackTools([getWeather], "weather"),
			tanstackTools([findContacts], "directory"),
		],
		executor,
	});
	return chat({
		adapter: openaiText("gpt-4o"),
		messages: [{ role: "user", content: prompt }],
		tools: [codeTool],
	});
}
export default {
	async fetch(request, env) {
		const prompt = await request.text();
		return toHttpResponse(startChat(env, prompt));
	},
};
```
```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import {
	createCodeTool,
	tanstackTools,
} from "@cloudflare/codemode/tanstack-ai";
import { chat, toolDefinition, toHttpResponse } from "@tanstack/ai";
import { openaiText } from "@tanstack/ai-openai";
import { z } from "zod";
const getWeather = toolDefinition({
	name: "get_weather",
	description: "Get the current weather for a city",
	inputSchema: z.object({
		city: z.string().meta({ description: "City name" }),
	}),
	outputSchema: z.object({
		city: z.string(),
		temperatureCelsius: z.number(),
		conditions: z.string(),
	}),
}).server(async ({ city }) => ({
	city,
	temperatureCelsius: 22,
	conditions: "sunny",
}));
const findContacts = toolDefinition({
	name: "find_contacts",
	description: "Find contacts for a team",
	inputSchema: z.object({
		team: z.string().meta({ description: "Team name" }),
	}),
	outputSchema: z.array(
		z.object({
			name: z.string(),
			email: z.string(),
		}),
	),
}).server(async ({ team }) => [
	{
		name: `${team} contact`,
		email: "team@example.com",
	},
]);
function startChat(env: Env, prompt: string) {
	const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
	const codeTool = createCodeTool({
		tools: [
			tanstackTools([getWeather], "weather"),
			tanstackTools([findContacts], "directory"),
		],
		executor,
	});
	return chat({
		adapter: openaiText("gpt-4o"),
		messages: [{ role: "user", content: prompt }],
		tools: [codeTool],
	});
}
export default {
	async fetch(request, env): Promise<Response> {
		const prompt = await request.text();
		return toHttpResponse(startChat(env, prompt));
	},
} satisfies ExportedHandler<Env>;
```

`createCodeTool()` returns a TanStack AI `ServerTool` named `codemode_execute`. Its description contains the generated types for both namespaces. The model can write code similar to this:

```js
async () => {
	const weatherResult = await weather.get_weather({ city: "London" });
	const contacts = await directory.find_contacts({ team: "travel" });
	return { weatherResult, contacts };
};
```

## Namespace behavior

`tanstackTools(tools, name)` converts an array of TanStack AI tools into a Code Mode tool provider. It uses each tool name as the method name and generates types from its input and output schemas.

The optional second argument sets the sandbox namespace. For example, `tanstackTools([getWeather], "weather")` exposes `weather.get_weather()`. If you omit the name, Code Mode uses the default `codemode` namespace:

```js
const codeTool = createCodeTool({
	tools: [tanstackTools([getWeather])],
	executor,
});

// Available to model-generated code as codemode.get_weather().
```

```ts
const codeTool = createCodeTool({
	tools: [tanstackTools([getWeather])],
	executor,
});

// Available to model-generated code as codemode.get_weather().
```

Use distinct namespace names when you combine tool groups. Each provider contributes its generated declarations and executable server tools to the same Code Mode tool.

## Approval behavior

The `createCodeTool()` integration does not pause execution for TanStack AI approvals. `tanstackTools()` excludes a tool when its `needsApproval` property is `true` or a function. The excluded tool does not appear in generated type declarations and cannot run in the sandbox.

Tools with `needsApproval: false` remain available. The durable Code Mode runtime supports paused approvals through connector `requiresApproval` annotations, but this `createCodeTool()` integration does not use that approval flow.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/codemode/tanstack-ai/#page","headline":"Use Code Mode with TanStack AI · Cloudflare Agents docs","description":"Use @cloudflare/codemode/tanstack-ai to expose namespaced TanStack AI server tools through chat().","url":"https://developers.cloudflare.com/agents/tools/codemode/tanstack-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
