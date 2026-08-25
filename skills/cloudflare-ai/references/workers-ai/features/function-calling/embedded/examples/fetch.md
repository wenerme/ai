---
description: Learn how to use the fetch() handler in Cloudflare Workers AI to enable LLMs to perform API calls, like retrieving a 5-day weather forecast using function calling.
title: Use fetch() handler
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Use fetch() handler

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A very common use case is to provide the LLM with the ability to perform API calls via function calling.

In this example the LLM will retrieve the weather forecast for the next 5 days. To do so a `getWeather` function is defined that is passed to the LLM as tool.

The `getWeather`function extracts the user's location from the request and calls the external weather API via the Workers' [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) and returns the result.

```ts
import { runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const getWeather = async (args: { numDays: number }) => {
			const { numDays } = args;
      // Location is extracted from request based on
      // https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
      const lat = request.cf?.latitude
      const long = request.cf?.longitude

      // Interpolate values for external API call
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,precipitation_sum&timezone=GMT&forecast_days=${numDays}`
			);
			return response.text();
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			'@hf/nousresearch/hermes-2-pro-mistral-7b',
			{
				// Messages
				messages: [
					{
						role: 'user',
						content: 'What the weather like the next 5 days? Respond as text',
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: 'getWeather',
						description: 'Get the weather for the next [numDays] days',
						parameters: {
							type: 'object',
							properties: {
								numDays: { type: 'numDays', description: 'number of days for the weather forecast' },
							},
							required: ['numDays'],
						},
						// reference to previously defined function
						function: getWeather,
					},
				],
			}
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/#page","headline":"Use fetch() handler · Cloudflare Workers AI docs","description":"Learn how to use the fetch() handler in Cloudflare Workers AI to enable LLMs to perform API calls, like retrieving a 5-day weather forecast using function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
