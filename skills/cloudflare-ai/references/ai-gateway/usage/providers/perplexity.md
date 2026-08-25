---
description: Route Perplexity API requests through AI Gateway for observability and control.
title: Perplexity
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Perplexity

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Perplexity ↗](https://www.perplexity.ai/) is an AI powered answer engine.

## Endpoint

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai
```

## Prerequisites

When making requests to Perplexity, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Perplexity API token.
* The name of the Perplexity model you want to use.

## Examples

### cURL

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai/chat/completions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'Authorization: Bearer {perplexity_token}' \
     --data '{
      "model": "mistral-7b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }'
```

### Use Perplexity through OpenAI SDK with JavaScript

Perplexity does not have their own SDK, but they have compatibility with the OpenAI SDK. You can use the OpenAI SDK to make a Perplexity call through AI Gateway as follows:

```js
import OpenAI from "openai";

const apiKey = env.PERPLEXITY_API_KEY;
const accountId = "{account_id}";
const gatewayId = "{gateway_id}";
const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/perplexity-ai`;

const perplexity = new OpenAI({
	apiKey,
	baseURL,
});

const model = "mistral-7b-instruct";
const messages = [{ role: "user", content: "What is Cloudflare?" }];
const maxTokens = 20;

const chatCompletion = await perplexity.chat.completions.create({
	model,
	messages,
	max_tokens: maxTokens,
});
```

## OpenAI-Compatible Endpoint

You can also access Perplexity models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```txt
https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions
```

Specify:

```json

{
"model": "perplexity/{model}"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/#page","headline":"Perplexity · Cloudflare AI Gateway docs","description":"Route Perplexity API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
