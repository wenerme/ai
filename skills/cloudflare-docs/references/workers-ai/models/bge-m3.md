---
title: bge-m3
description: Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg) 

#  bge-m3 

Text Embeddings • BAAI 

`@cf/baai/bge-m3` 

Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.

| Model Info                                                                 |                           |
| -------------------------------------------------------------------------- | ------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 60,000 tokens             |
| Unit Pricing                                                               | $0.012 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-4821)
* [  Python ](#tab-panel-4822)
* [  curl ](#tab-panel-4823)

```
export interface Env {  AI: Ai;}
export default {  async fetch(request, env): Promise<Response> {
    // Can be a string or array of strings]    const stories = [      "This is a story about an orange cloud",      "This is a story about a llama",      "This is a story about a hugging emoji",    ];
    const embeddings = await env.AI.run(      "@cf/baai/bge-m3",      {        text: stories,      }    );
    return Response.json(embeddings);  },} satisfies ExportedHandler<Env>;
```

```
import osimport requests

ACCOUNT_ID = "your-account-id"AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")
stories = [  'This is a story about an orange cloud',  'This is a story about a llama',  'This is a story about a hugging emoji']
response = requests.post(  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-m3",  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},  json={"text": stories})
print(response.json())
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-m3  \  -X POST  \  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'
```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations ](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/). 

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-4824)
* [ Output ](#tab-panel-4825)

query

`string`minLength: 1A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts

▶contexts\[\]

`array`requiredList of provided contexts. Note that the index in this array is important, as the response will refer to it.

truncate\_inputs

`boolean`default: falseWhen provided with too long context should the model error out or truncate the context to fit?

request\_id

`string`The async request id that can be used to obtain the results.

Batch — Send multiple requests in a single API call 

* [ Input ](#tab-panel-4826)
* [ Output ](#tab-panel-4827)

▶requests\[\]

`array`requiredBatch of the embeddings requests to run using async-queue

request\_id

`string`The async request id that can be used to obtain the results.

## API Schemas (Raw)

 Synchronous Input [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/sync-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/sync-input.json "Download") 

 Synchronous Output [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/sync-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/sync-output.json "Download") 

 Batch Input [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/batch-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/batch-input.json "Download") 

 Batch Output [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/batch-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/bge-m3/batch-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/bge-m3/#page","headline":"bge-m3 (BAAI) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Multi-Functionality, Multi-Linguality, and Multi-Granularity embeddings model.","url":"https://developers.cloudflare.com/workers-ai/models/bge-m3/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
