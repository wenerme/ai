---
description: Route Workers AI requests through AI Gateway for analytics, caching, and rate limiting.
title: Workers AI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers AI

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use AI Gateway as a unified control layer for [Workers AI](https://developers.cloudflare.com/workers-ai/) requests, with analytics, logging, caching, security, and prepaid billing. To use prepaid [AI Gateway credits](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), set the gateway's [Workers AI billing setting](https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/#configure-workers-ai-billing) to **Unified billing**. Requests to frontier models billed with prepaid credits receive [higher rate limits](https://developers.cloudflare.com/workers-ai/platform/limits/#frontier-models).

## REST API

Use the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) to call Workers AI models. Workers AI models use the `@cf/` prefix in the model name and require the `cf-aig-gateway-id` header to specify which gateway to route through.

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "cf-aig-gateway-id: default" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/moonshotai/kimi-k2.6",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Workers binding

You can integrate Workers AI with AI Gateway using an environment binding. To include an AI Gateway within your Worker, add the gateway as an object in your Workers AI request.

```js
export default {
	async fetch(request, env) {
		const response = await env.AI.run(
			"@cf/meta/llama-3.1-8b-instruct",
			{
				prompt: "Why should you use Cloudflare for your AI inference?",
			},
			{
				gateway: {
					id: "{gateway_id}",
					skipCache: false,
					cacheTtl: 3360,
				},
			},
		);
		return new Response(JSON.stringify(response));
	},
};
```

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const response = await env.AI.run(
			"@cf/meta/llama-3.1-8b-instruct",
			{
				prompt: "Why should you use Cloudflare for your AI inference?",
			},
			{
				gateway: {
					id: "{gateway_id}",
					skipCache: false,
					cacheTtl: 3360,
				},
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

For a detailed step-by-step guide on integrating Workers AI with AI Gateway using a binding, refer to [Integrations in AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/).

Workers AI supports the following parameters for AI gateways:

* `id` string
  * Name of your existing [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/). Must be in the same account as your Worker.
* `skipCache` boolean(default: false)
  * Controls whether the request should [skip the cache](https://developers.cloudflare.com/ai-gateway/features/caching/#skip-cache-cf-aig-skip-cache).
* `cacheTtl` number
  * Controls the [Cache TTL](https://developers.cloudflare.com/ai-gateway/features/caching/#cache-ttl-cf-aig-cache-ttl).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/#page","headline":"Workers AI · Cloudflare AI Gateway docs","description":"Route Workers AI requests through AI Gateway for analytics, caching, and rate limiting.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
