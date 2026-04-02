---
title: Hugging Face Chat UI
description: Use Workers AI with Chat UI, an open-source chat interface offered by Hugging Face.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-ai/configuration/hugging-face-chat-ui.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Hugging Face Chat UI

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

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/configuration/hugging-face-chat-ui/","name":"Hugging Face Chat UI"}}]}
```
