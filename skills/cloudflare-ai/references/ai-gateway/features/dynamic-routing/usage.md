---
description: Send requests through an AI Gateway dynamic route using the OpenAI SDK, a direct HTTP request, or the Workers AI binding.
title: Using a dynamic route
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Using a dynamic route

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution

Ensure your gateway has [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) turned on and you have your upstream providers keys stored with [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Examples

### OpenAI SDK

```js
import OpenAI from "openai";

const cloudflareToken = "CF_AIG_TOKEN";
const accountId = "{account_id}";
const gatewayId = "{gateway_id}";
const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`;

const openai = new OpenAI({
	apiKey: cloudflareToken,
	baseURL,
});

try {
	const model = "dynamic/<your-dynamic-route-name>";
	const messages = [{ role: "user", content: "What is a neuron?" }];
	const chatCompletion = await openai.chat.completions.create({
		model,
		messages,
	});
	const response = chatCompletion.choices[0].message;
	console.log(response);
} catch (e) {
	console.error(e);
}
```

### Fetch

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/<your-dynamic-route-name>",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

### Workers

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const response = await env.AI.gateway("default").run({
			provider: "compat",
			endpoint: "chat/completions",
			headers: {},
			query: {
				model: "dynamic/<your-dynamic-route-name>",
				messages: [
					{
						role: "user",
						content: "What is Cloudflare?",
					},
				],
			},
		});
		return Response(response);
	},
};
```

## Response Metadata

The response from a dynamic route is the same as the response from a model. There is additional metadata used to notify the model and provider used, you can check the following headers

* `cf-aig-model` \- The model used
* `cf-aig-provider` \- The slug of provider used

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/#page","headline":"Using a dynamic route · Cloudflare AI Gateway docs","description":"Send requests through an AI Gateway dynamic route using the OpenAI SDK, a direct HTTP request, or the Workers AI binding.","url":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
