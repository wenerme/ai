---
title: HuggingFace
description: Route HuggingFace Inference API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/usage/providers/huggingface.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# HuggingFace

[HuggingFace ↗](https://huggingface.co/) helps users build, deploy and train machine learning models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface


```

## URL structure

When making requests to HuggingFace Inference API, replace `https://api-inference.huggingface.co/models/` in the URL you're currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface`. Note that the model you're trying to access should come right after, for example `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface/bigcode/starcoder`.

## Prerequisites

When making requests to HuggingFace, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active HuggingFace API token.
* The name of the HuggingFace model you want to use.

## Examples

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/huggingface/bigcode/starcoder \

  --header 'Authorization: Bearer {hf_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "inputs": "console.log"

}'


```

### Use HuggingFace.js library with JavaScript

If you are using the HuggingFace.js library, you can set your inference endpoint like this:

JavaScript

```

import { HfInferenceEndpoint } from "@huggingface/inference";


const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const model = "gpt2";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/huggingface/${model}`;

const apiToken = env.HF_API_TOKEN;


const hf = new HfInferenceEndpoint(baseURL, apiToken);


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/huggingface/","name":"HuggingFace"}}]}
```
