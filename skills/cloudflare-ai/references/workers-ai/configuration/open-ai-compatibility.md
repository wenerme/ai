---
description: Use the OpenAI SDK with Workers AI Chat Completions, embeddings, and supported GPT-OSS Responses requests.
title: OpenAI compatible API endpoints
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI compatible API endpoints

Last updated Sep 18, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Workers AI provides OpenAI-compatible endpoints for [text generation](https://developers.cloudflare.com/workers-ai/models/) through Chat Completions (`/v1/chat/completions`) and for [text embedding models](https://developers.cloudflare.com/workers-ai/models/) (`/v1/embeddings`). The Responses API (`/v1/responses`) is available only for GPT-OSS models. Easily call Workers AI by swapping the `baseURL` in the standard OpenAI SDK.



## Usage

### Chat Completions and embeddings

Most Workers AI text generation models support the OpenAI Chat Completions API. Embedding models support the OpenAI Embeddings API.

Use the [OpenAI JavaScript SDK ↗](https://github.com/openai/openai-node) by setting the Workers AI base URL, API token, and model name.

*OpenAI SDK examplejs*

```js
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.CLOUDFLARE_API_KEY,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

const chatCompletion = await openai.chat.completions.create({
	messages: [{ role: "user", content: "Make some robot noises" }],
	model: "@cf/meta/llama-3.1-8b-instruct",
});

const embeddings = await openai.embeddings.create({
	model: "@cf/baai/bge-large-en-v1.5",
	input: "I love matcha",
});
```

*cURL examplebash*

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions \
  --header "Authorization: Bearer {api_token}" \
  --header "Content-Type: application/json" \
  --data '
    {
      "model": "@cf/meta/llama-3.1-8b-instruct",
      "messages": [
        {
          "role": "user",
          "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
        }
      ]
    }
'
```

### Fail fast when capacity is unavailable

For synchronous Chat Completions, set `options.rejectIfBusy` in the top-level request body. This makes the request fail instead of waiting in a capacity queue.

OpenAI clients that preserve custom fields can send this option. Clients that remove unknown fields do not apply it, so requests proceed normally.

Refer to [Reject busy requests](https://developers.cloudflare.com/workers-ai/features/reject-if-busy/) for examples and error behavior.

### Responses API for GPT-OSS

The Responses API is supported only by the [`@cf/openai/gpt-oss-120b`](https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/) and [`@cf/openai/gpt-oss-20b`](https://developers.cloudflare.com/workers-ai/models/gpt-oss-20b/) models. Responses requests must be non-streaming, only `stream: false` is supported.

*GPT-OSS Responses API examplejs*

```js
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.CLOUDFLARE_API_KEY,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

const response = await openai.responses.create({
	model: "@cf/openai/gpt-oss-120b",
	input: "Talk to me about open source",
});
```

### AI Gateway

These endpoints are also compatible with [AI Gateway](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/#openai-compatible-endpoints).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/#page","headline":"OpenAI compatible API endpoints","description":"Use the OpenAI SDK with Workers AI Chat Completions, embeddings, and supported GPT-OSS Responses requests.","url":"https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
