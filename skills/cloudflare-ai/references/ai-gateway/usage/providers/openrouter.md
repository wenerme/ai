---
description: Route OpenRouter API requests through AI Gateway for observability and control.
title: OpenRouter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouter

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[OpenRouter ↗](https://openrouter.ai/) is a platform that provides a unified interface for accessing and using large language models (LLMs).

## Endpoint

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter
```

## URL structure

When making requests to [OpenRouter ↗](https://openrouter.ai/), replace `https://openrouter.ai/api/v1/chat/completions` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/chat/completions`.

## Prerequisites

When making requests to OpenRouter, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active OpenRouter API token or a token from the original model provider.
* The name of the OpenRouter model you want to use.

## Examples

### cURL

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/v1/chat/completions \
 --header 'content-type: application/json' \
 --header 'Authorization: Bearer OPENROUTER_TOKEN' \
 --data '{
    "model": "openai/gpt-5-mini",
    "messages": [
        {
            "role": "user",
            "content": "What is Cloudflare?"
        }
    ]
}'
```

### Use OpenAI SDK with JavaScript

If you are using the OpenAI SDK with JavaScript, you can set your endpoint like this:

```js
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.OPENROUTER_TOKEN,
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openrouter",
});

try {
	const chatCompletion = await openai.chat.completions.create({
		model: "openai/gpt-5-mini",
		messages: [{ role: "user", content: "What is Cloudflare?" }],
	});

	const response = chatCompletion.choices[0].message;

	return new Response(JSON.stringify(response));
} catch (e) {
	return new Response(e);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/#page","headline":"OpenRouter · Cloudflare AI Gateway docs","description":"Route OpenRouter API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
