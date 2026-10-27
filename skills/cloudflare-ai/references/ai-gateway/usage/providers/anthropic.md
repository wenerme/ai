---
description: Route Anthropic API requests through AI Gateway for observability and control.
title: Anthropic
image: https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/og.png?v=23074fb36ef32eac
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Anthropic

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Anthropic ↗︎](https://www.anthropic.com/) helps build reliable, interpretable, and steerable AI systems.

## Endpoint

**Base URL**

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic
```

When supplying a provider key to `/anthropic/v1/messages`, send it in `x-api-key`. AI Gateway does not recognize `Authorization: Bearer` as provider credentials on this endpoint. Authenticate to AI Gateway separately with `cf-aig-authorization`.

For stored keys and Unified Billing, refer to [credential precedence](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#credential-precedence). If provider credentials are required but AI Gateway cannot find them, refer to [error `2044`](https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/#400-provider-credentials-required-2044).

## Examples

### cURL

<details>

<summary>

With API Key in Request

</summary>

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'x-api-key: {anthropic_api_key}' \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'x-api-key: {anthropic_api_key}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

</details>

<details>

<summary>

With Stored Keys (BYOK) / Unified Billing

</summary>

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \
 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
 --header 'anthropic-version: 2023-06-01' \
 --header 'Content-Type: application/json' \
 --data  '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "What is Cloudflare?"}
    ]
  }'
```

</details>

### Anthropic SDK

Set `x-api-key` explicitly when supplying your Anthropic key. SDK authentication headers can differ between versions. Setting `Authorization` to `null` removes the SDK-generated bearer header. Use `cf-aig-authorization` separately to authenticate to AI Gateway.

<details>

<summary>

With Key in Request

</summary>

```js
import Anthropic from "@anthropic-ai/sdk";

const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;
const providerKey = "{ANTHROPIC_API_KEY}";

const anthropic = new Anthropic({
	apiKey: providerKey,
	baseURL,
	defaultHeaders: {
		"x-api-key": providerKey,
		"cf-aig-authorization": "Bearer {CF_AIG_TOKEN}",
		Authorization: null,
	},
});

const message = await anthropic.messages.create({
	model: "claude-sonnet-4-5",
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	max_tokens: 1024,
});
```

```js
import Anthropic from "@anthropic-ai/sdk";

const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;
const providerKey = "{ANTHROPIC_API_KEY}";

const anthropic = new Anthropic({
	apiKey: providerKey,
	baseURL,
	defaultHeaders: {
		"x-api-key": providerKey,
		Authorization: null,
	},
});

const message = await anthropic.messages.create({
	model: "claude-sonnet-4-5",
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	max_tokens: 1024,
});
```

</details>

<details>

<summary>

With Stored Keys (BYOK) / Unified Billing

</summary>

```js
import Anthropic from "@anthropic-ai/sdk";

const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;

const anthropic = new Anthropic({
	apiKey: "placeholder",
	baseURL,
	defaultHeaders: {
		"cf-aig-authorization": "Bearer {CF_AIG_TOKEN}",
		"x-api-key": null,
		Authorization: null,
	},
});

const message = await anthropic.messages.create({
	model: "claude-sonnet-4-5",
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	max_tokens: 1024,
});
```

Note

The placeholder satisfies the SDK's credential configuration. The <code>null</code> headers remove SDK-generated provider credentials before sending the request. AI Gateway uses an applicable stored BYOK key, or falls back to Unified Billing when allowed. If **Require provider credentials** is on and no applicable stored key exists, the request returns <a href="https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/#400-provider-credentials-required-2044">error <code>2044</code></a>.

Supplying a real key in <code>x-api-key</code> instead selects request-key authentication. This bypasses stored keys and Unified Billing.

</details>

## OpenAI-Compatible Endpoint

You can also access Anthropic models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```txt
https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions
```

Specify:

```json
{
	"model": "anthropic/{model}"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/#page","headline":"Anthropic","description":"Route Anthropic API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/og.png?v=23074fb36ef32eac","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
