---
description: Different from embedding model, reranker uses question and document as input and directly output similarity instead of embedding. You can get a relevance score by inputting query and passage to the reranker. And the score can be mapped to a float value in [0,1] by sigmoid function.


title: bge-reranker-base
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg)

# bge-reranker-base

Text Classification • BAAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/baai/bge-reranker-base/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/baai/bge-reranker-base`

* Cloudflare-hosted

Different from embedding model, reranker uses question and document as input and directly output similarity instead of embedding. You can get a relevance score by inputting query and passage to the reranker. And the score can be mapped to a float value in \[0,1\] by sigmoid function.

| Model Info   |                            |
| ------------ | -------------------------- |
| Unit Pricing | $0.0031 per M input tokens |

## Usage

```ts

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const query = 'Which one is cooler?'
		const contexts = [
			{
				text: 'a cyberpunk lizzard'
			},
			{
				text: 'a cyberpunk cat'
			}
		];

		const response = await env.AI.run('@cf/baai/bge-reranker-base', { query, contexts });

		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;

```

```py

import os
import requests

ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")

response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/baai/bge-reranker-base",
    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
    json={
	  "query": "Which one is better?",
      "contexts": [
        {"text": "a cyberpunk lizzard"},
		    {"text": "a cyberpunk car"},
      ]
    }
)
result = response.json()
print(result)
```

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-reranker-base \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "query": "Which one is better?", "contexts": [{ "text": "a cyberpunk lizzard" }, {"text": "a cyberpunk cat"}]}'
```

## Parameters

query

`string`requiredminLength: 1A query you wish to perform against the provided contexts.

top\_k

`integer`minimum: 1Number of returned results starting with the best score.

▶contexts\[\]

`array`requiredList of provided contexts. Note that the index in this array is important, as the response will refer to it.

▶response\[\]

`array`

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/baai/bge-reranker-base/#page","headline":"bge-reranker-base (BAAI) · Cloudflare AI docs · Cloudflare AI docs","description":"Different from embedding model, reranker uses question and document as input and directly output similarity instead of embedding. You can get a relevance score by inputting query and passage to the reranker. And the score can be mapped to a float value in \\[0,1] by sigmoid function.","url":"https://developers.cloudflare.com/ai/models/%40cf/baai/bge-reranker-base/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
