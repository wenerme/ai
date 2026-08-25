---
description: Connect Workers AI models to Hugging Face's open-source Chat UI interface.
title: Hugging Face Chat UI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Hugging Face Chat UI

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/configuration/hugging-face-chat-ui/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Workers AI with [Chat UI ↗](https://github.com/huggingface/chat-ui?tab=readme-ov-file#text-embedding-models), an open-source chat interface offered by Hugging Face.

## Prerequisites

You will need the following:

* A [Cloudflare account ↗](https://dash.cloudflare.com)
* Your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
* An [API token](https://developers.cloudflare.com/workers-ai/get-started/rest-api/#1-get-api-token-and-account-id) for Workers AI

## Setup

First, decide how to reference your Account ID and API token (either directly in your `.env.local` using the `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` variables or in the endpoint configuration).

Then, follow the rest of the setup instructions in the [Chat UI GitHub repository ↗](https://github.com/huggingface/chat-ui?tab=readme-ov-file#text-embedding-models).

When setting up your models, specify the `cloudflare` endpoint.

```json
{
  "name" : "nousresearch/hermes-2-pro-mistral-7b",
  "tokenizer": "nousresearch/hermes-2-pro-mistral-7b",
  "parameters": {
    "stop": ["<|im_end|>"]
  },
  "endpoints" : [
    {
      "type": "cloudflare",
      // optionally specify these if not included in .env.local
      "accountId": "your-account-id",
      "apiToken": "your-api-token"
      //
    }
  ]
}
```

## Supported models

This template works with any [text generation models](https://developers.cloudflare.com/workers-ai/models/) that begin with the `@hf` parameter.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers-ai/configuration/hugging-face-chat-ui/#page","headline":"Hugging Face Chat UI · Cloudflare Workers AI docs","description":"Connect Workers AI models to Hugging Face's open-source Chat UI interface.","url":"https://developers.cloudflare.com/workers-ai/configuration/hugging-face-chat-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
