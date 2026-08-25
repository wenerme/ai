---
description: BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. You can use this model for text summarization.
title: bart-large-cnn
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# bart-large-cnn

Beta

Summarization • Meta

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/bart-large-cnn/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/facebook/bart-large-cnn`

* Cloudflare-hosted
* Deprecated

BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. You can use this model for text summarization.

| Model Info   |                          |
| ------------ | ------------------------ |
| Deprecated   | 5/30/2026                |
| Beta         | Yes                      |
| Unit Pricing | $0.00 per M input tokens |

## Usage

```ts

export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.AI.run("@cf/facebook/bart-large-cnn", {
      input_text: "Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via the Cloudflare API. With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.",
      max_length: 14
    });
    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

```sh

curl https://api.cloudflare.com/client/v4/accounts/{cf_account_id}/ai/run/@cf/facebook/bart-large-cnn \
  -H "Authorization: Bearer {cf_api_token}" \
  -d '{
    "input_text": "Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via the Cloudflare API. With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.",
    "max_length": 14
  }'
```

## Parameters

input\_text

`string`requiredminLength: 1The text that you want the model to summarize

max\_length

`integer`default: 1024The maximum length of the generated summary in tokens

summary

`string`The summarized version of the input text

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/bart-large-cnn/#page","headline":"bart-large-cnn (Meta) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"BART is a transformer encoder-encoder (seq2seq) model with a bidirectional (BERT-like) encoder and an autoregressive (GPT-like) decoder. You can use this model for text summarization.","url":"https://developers.cloudflare.com/workers-ai/models/bart-large-cnn/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
