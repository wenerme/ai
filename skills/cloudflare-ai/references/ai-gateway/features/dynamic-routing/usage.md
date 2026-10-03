---
description: Send requests through an AI Gateway dynamic route using the OpenAI SDK, a direct HTTP request, or the AI binding in a Worker.
title: Using a dynamic route
image: https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/og.png?v=de61370a8a90a71e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Using a dynamic route

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution

Ensure your gateway has [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) turned on and you have your upstream providers keys stored with [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

Use the route name in place of the model, in the form `dynamic/<your-dynamic-route-name>`. Dynamic routes accept the OpenAI chat completions request shape only — other formats, such as Anthropic Messages, return a `400` error.

Routes are scoped to the gateway you created them on. On the REST API and the AI binding, name that gateway explicitly, otherwise the request resolves against your default gateway and returns a `404` error.

## Examples

### REST API

Send the route name as the `model` to [`/ai/v1/chat/completions`](https://developers.cloudflare.com/ai-gateway/usage/rest-api/#aiv1chatcompletions-openai-compatible), and set `cf-aig-gateway-id` to the gateway that owns the route.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions" \
  --header 'Authorization: Bearer {CLOUDFLARE_API_TOKEN}' \
  --header 'cf-aig-gateway-id: {gateway_id}' \
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

### OpenAI SDK

Point the SDK at the OpenAI-compatible endpoint on your gateway.

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

Call a dynamic route from a Worker with the [AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/). Pass the route name as the model and the gateway that owns the route in the `gateway` options.

*index.tsts*

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const response = await env.AI.run(
			"dynamic/<your-dynamic-route-name>",
			{
				messages: [{ role: "user", content: "What is Cloudflare?" }],
			},
			{
				gateway: {
					id: "{gateway_id}",
				},
			},
		);
		return Response.json(response);
	},
};
```

## Response Metadata

The response from a dynamic route is the same as the response from a model. There is additional metadata used to notify the model and provider used, you can check the following headers

- `cf-aig-model` - The model used
- `cf-aig-provider` - The slug of provider used

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/#page","headline":"Using a dynamic route","description":"Send requests through an AI Gateway dynamic route using the OpenAI SDK, a direct HTTP request, or the AI binding in a Worker.","url":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/og.png?v=de61370a8a90a71e","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
