---
description: Send web search requests through AI Gateway with the REST API or the Workers AI binding, bring your own provider key, and use web search as a tool for models.
title: How to use Web Search API
image: https://developers.cloudflare.com/web-search/how-to-use/og.png?v=d825d667b5bdb4f7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-search/llms.txt
> Use this file to discover all available pages before exploring further.

# How to use Web Search API

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/web-search/how-to-use/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can call Web Search API from any backend with the REST API, or from a Worker with the AI binding. Both methods route requests through an [AI Gateway](https://developers.cloudflare.com/ai-gateway/).

## Prerequisites

- A Cloudflare account. If you do not have one, [sign up ↗︎](https://dash.cloudflare.com/sign-up).
- An AI Gateway. Every account has a gateway named `default`, or you can [create a gateway](https://developers.cloudflare.com/ai-gateway/get-started/).
- [AI Gateway credits](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#load-credits) loaded on your account, or a [provider API key](#bring-your-own-key-byok) stored on your gateway.

## REST API

Send a `POST` request to the `/ai/websearch/` endpoint:

```txt
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/websearch/
```

Authenticate with a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) that has both of the following permissions:

- **Account** > **Workers AI** > **Read**
- **Account** > **AI Gateway** > **Read**

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/websearch/ \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "What are some fun things to do in Salt Lake City as fall approaches?",
    "provider": "ceramic",
    "limit": 5,
    "options": {
      "gateway": { "id": "default" }
    }
  }'
```

## Workers binding

Call Web Search API from a Worker with the `websearch()` method on the [AI binding](https://developers.cloudflare.com/workers-ai/configuration/bindings/).

1. Add an AI binding to your Wrangler configuration file:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "web-search-worker",
     "main": "src/index.ts",
     // Set this to today's date
     "compatibility_date": "2026-10-09",
     "ai": {
       "binding": "AI"
     }
   }
   ```

   ```toml
   name = "web-search-worker"
   main = "src/index.ts"
   # Set this to today's date
   compatibility_date = "2026-10-09"

   [ai]
   binding = "AI"
   ```

2. Call `env.AI.websearch()` with your gateway ID and query:

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request, env): Promise<Response> {
   		const response = await env.AI.websearch({
   			gatewayId: "default",
   			query:
   				"What are some fun things to do in Salt Lake City as fall approaches?",
   			provider: "exa",
   			limit: 5,
   		});

   		const results = await response.json();
   		return Response.json(results);
   	},
   } satisfies ExportedHandler<Env>;
   ```

`websearch()` returns a standard `Response` object. Call `response.json()` to read the results.

## Request parameters

Set `provider` to choose a [search provider](https://developers.cloudflare.com/web-search/providers/). If you do not set a provider, Web Search API uses Ceramic.ai as default.

```json
{
	"query": "What are some fun things to do in Salt Lake City as fall approaches?",
	"provider": "ceramic",
	"limit": 5,
	"options": {
		"gateway": { "id": "default" }
	}
}
```

query

`string`requiredminLength: 1maxLength: 1024The search query.

provider

`string`default: ceramicenum: ceramic, exa, linkupThe search provider to use.

limit

`integer`default: 10minimum: 1maximum: 10The maximum number of search results to return.

byokAlias

`string`pattern: ^\[A-Za-z0-9\_-]{1,64}$The alias of a provider API key stored on your gateway. If set, the request fails instead of falling back to AI Gateway credits when the key is not configured.

▶options{}

`object`requiredRequest options.

```ts
const response = await env.AI.websearch({
	gatewayId: "default",
	query: "What are some fun things to do in Salt Lake City as fall approaches?",
	provider: "ceramic",
	limit: 5,
});
```

gatewayId

`string`requiredThe ID of the AI Gateway to route the request through.

query

`string`requiredminLength: 1maxLength: 1024The search query.

provider

`string`default: ceramicenum: ceramic, exa, linkupThe search provider to use.

limit

`integer`default: 10minimum: 1maximum: 10The maximum number of search results to return.

byokAlias

`string`pattern: ^\[A-Za-z0-9\_-]{1,64}$The alias of a provider API key stored on your gateway. If set, the request fails instead of falling back to AI Gateway credits when the key is not configured.

## Response format

```json
{
	"items": [
		{
			"url": "https://example.com/salt-lake-city-fall-guide",
			"title": "Fall in Salt Lake City: A Local's Guide",
			"description": "From scenic drives up Big Cottonwood Canyon to pumpkin patches..."
		}
	],
	"metadata": {
		"query": "What are some fun things to do in Salt Lake City as fall approaches?",
		"requestId": "<REQUEST_ID>",
		"latencyMs": 612
	}
}
```

▶items\[]

`array`The search results.

▶metadata{}

`object`Information about the request.

Optional fields are only included when the provider returns them.

## Bring your own key (BYOK)

If you have an existing account with a search provider, you can use your own API key instead of AI Gateway credits. The provider bills you directly.

1. In the Cloudflare dashboard, go to the **AI Gateway** page. [Go to **AI Gateway** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
2. Select your gateway, then select **Provider Keys**.
3. Add an API key for Ceramic.ai, Exa, or Linkup, and assign it an alias — for example, `default`. If the provider is not listed, select **Configure custom providers** to add it.
4. Pass the provider and alias in your request.

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/websearch/ \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "What is Cloudflare Workers?",
    "provider": "exa",
    "byokAlias": "default",
    "options": {
      "gateway": { "id": "default" }
    }
  }'
```

```ts
const response = await env.AI.websearch({
	gatewayId: "default",
	query: "What is Cloudflare Workers?",
	provider: "exa",
	byokAlias: "default",
});
```

Your API key is never sent in the request. AI Gateway retrieves the key stored on the gateway for the provider and alias, and encrypts stored keys with [Secrets Store](https://developers.cloudflare.com/secrets-store/).

AI Gateway selects credentials as follows:

- **You set `byokAlias`** — AI Gateway uses the stored key with that alias. If the provider or alias is not configured on the gateway, the request fails with a `400` error instead of falling back to your credits.
- **You omit `byokAlias`** — If the gateway has a stored key with the `default` alias for the provider, AI Gateway uses that key. Otherwise, the search is billed to your AI Gateway credits.

For more information, refer to [Bring your own keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Use web search as a tool

You can give a model access to web search by defining a `web_search` tool. When the model calls the tool, run the search and pass the results back to the model.

*src/index.tsts*

```ts
const MODEL = "@cf/google/gemma-4-26b-a4b-it";

export default {
	async fetch(request, env): Promise<Response> {
		const prompt = "What happened during the last Cloudflare Birthday Week?";
		const messages = [{ role: "user", content: prompt }];

		const completion = await env.AI.run(
			MODEL,
			{
				messages,
				tools: [
					{
						type: "function",
						function: {
							name: "web_search",
							description: "Search the web for current information.",
							parameters: {
								type: "object",
								properties: { query: { type: "string" } },
								required: ["query"],
							},
						},
					},
				],
			},
			{ gateway: { id: "default" } },
		);

		const toolCall = completion.tool_calls?.[0];
		if (toolCall?.name !== "web_search") {
			return Response.json(completion);
		}

		const searchResponse = await env.AI.websearch({
			gatewayId: "default",
			query: toolCall.arguments.query,
			limit: 5,
		});
		const searchResults = await searchResponse.json();

		const finalResponse = await env.AI.run(
			MODEL,
			{
				messages: [
					...messages,
					{
						role: "tool",
						name: "web_search",
						content: JSON.stringify(searchResults),
					},
				],
			},
			{ gateway: { id: "default" } },
		);

		return Response.json(finalResponse);
	},
} satisfies ExportedHandler<Env>;
```

## Limits

| Limit | Value |
| --- | --- |
| Query length | 1,024 characters |
| Results per request | 10 |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-search/how-to-use/#page","headline":"How to use Web Search API","description":"Send web search requests through AI Gateway with the REST API or the Workers AI binding, bring your own provider key, and use web search as a tool for models.","url":"https://developers.cloudflare.com/web-search/how-to-use/","inLanguage":"en","image":"https://developers.cloudflare.com/web-search/how-to-use/og.png?v=d825d667b5bdb4f7","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
