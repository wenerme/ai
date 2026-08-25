---
description: Access runtime information in Workflows steps using the WorkflowStepContext object, including step name and retry attempt.
title: Step context
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Step context

Last updated Jul 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workflows/build/step-context/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every `step.do` callback receives a **context object** (`WorkflowStepContext`) as its first argument. The context gives your step code runtime information about the step itself, the current retry attempt, and the resolved configuration for that step.

## WorkflowStepContext

```ts
type WorkflowStepContext = {
	step: {
		name: string;
		count: number;
	};
	attempt: number;
	config: WorkflowStepConfig;
};
```

### Properties

| Property   | Type                                                                                                    | Description                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| step.name  | string                                                                                                  | The name you passed to step.do.                                                                                                             |
| step.count | number                                                                                                  | How many times step.do has been called with this name so far in the current Workflow run. Starts at 1 for the first call with a given name. |
| attempt    | number                                                                                                  | The current attempt number (1-indexed). 1 on the first try, 2 on the first retry, and so on.                                                |
| config     | [WorkflowStepConfig](https://developers.cloudflare.com/workflows/build/workers-api/#workflowstepconfig) | The resolved retry and timeout configuration for this step, including any defaults applied by the runtime.                                  |

If a step config's `retries.delay` is a function, the dynamic delay is not exposed on `ctx.config.retries.delay`. The delay function receives its own context object with the current step context and the error that caused the retry.

## Access the context

Pass a parameter to your `step.do` callback to receive the context object:

```ts
await step.do("my-step", async (ctx) => {
	console.log(ctx.step.name); // "my-step"
	console.log(ctx.step.count); // 1
	console.log(ctx.attempt); // 1 on first try, 2 on first retry, etc.
	console.log(ctx.config); // { retries: { limit: 5, ... }, timeout: "10 minutes" }
});
```

The context is also available when you pass a custom `WorkflowStepConfig`:

```ts
await step.do(
	"call an API",
	{
		retries: {
			limit: 10,
			delay: "10 seconds",
			backoff: "exponential",
		},
		timeout: "30 minutes",
	},
	async (ctx) => {
		console.log(ctx.config.retries.limit); // 10
		console.log(ctx.config.timeout); // "30 minutes"
	},
);
```

To configure delay functions, refer to [Set a dynamic retry delay](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/#set-a-dynamic-retry-delay).

## Examples

### Adjust behavior based on retry attempt

Use `ctx.attempt` to change how your step behaves on retries. For example, you might use a fallback endpoint after a certain number of retries:

```ts
await step.do(
	"fetch data",
	{ retries: { limit: 5, delay: "5 seconds", backoff: "linear" } },
	async (ctx) => {
		const url =
			ctx.attempt <= 3
				? "https://api.example.com/primary"
				: "https://api.example.com/fallback";

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}
		return await response.json();
	},
);
```

### Log step metadata for observability

Use `ctx.step` to add structured metadata to your logs:

```ts
await step.do("process-order", async (ctx) => {
	console.log(
		JSON.stringify({
			step: ctx.step.name,
			stepCount: ctx.step.count,
			attempt: ctx.attempt,
			retryLimit: ctx.config.retries?.limit,
		}),
	);

	// Your step logic here
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/step-context/#page","headline":"Step context · Cloudflare Workflows docs","description":"Access runtime information in Workflows steps using the WorkflowStepContext object, including step name and retry attempt.","url":"https://developers.cloudflare.com/workflows/build/step-context/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
