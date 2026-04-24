---
title: bge-reranker-base
description: Different from embedding model, reranker uses question and document as input and directly output similarity instead of embedding. You can get a relevance score by inputting query and passage to the reranker. And the score can be mapped to a float value in [0,1] by sigmoid function.


image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![BAAI logo](https://developers.cloudflare.com/_astro/baai.mOtdbKlV.svg) 

#  bge-reranker-base 

Text Classification • BAAI • Hosted 

`@cf/baai/bge-reranker-base` 

Different from embedding model, reranker uses question and document as input and directly output similarity instead of embedding. You can get a relevance score by inputting query and passage to the reranker. And the score can be mapped to a float value in \[0,1\] by sigmoid function.

| Model Info   |                            |
| ------------ | -------------------------- |
| Unit Pricing | $0.0031 per M input tokens |

## Usage

* [  TypeScript ](#tab-panel-3107)
* [  Python ](#tab-panel-3108)
* [  curl ](#tab-panel-3109)

```

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

Explain Code

```

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

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/baai/bge-reranker-base \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "query": "Which one is better?", "contexts": [{ "text": "a cyberpunk lizzard" }, {"text": "a cyberpunk cat"}]}'


```

## Parameters

* [ Input ](#tab-panel-3112)
* [ Output ](#tab-panel-3113)

query

`string`requiredminLength: 1A query you wish to perform against the provided contexts.

top\_k

`integer`minimum: 1Number of returned results starting with the best score.

▶contexts\[\]

`array`requiredList of provided contexts. Note that the index in this array is important, as the response will refer to it.

▶response\[\]

`array`

## API Schemas

* [ Input ](#tab-panel-3110)
* [ Output ](#tab-panel-3111)

```

{

  "type": "object",

  "properties": {

    "query": {

      "type": "string",

      "minLength": 1,

      "description": "A query you wish to perform against the provided contexts."

    },

    "top_k": {

      "type": "integer",

      "minimum": 1,

      "description": "Number of returned results starting with the best score."

    },

    "contexts": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "text": {

            "type": "string",

            "minLength": 1,

            "description": "One of the provided context content"

          }

        }

      },

      "description": "List of provided contexts. Note that the index in this array is important, as the response will refer to it."

    }

  },

  "required": [

    "query",

    "contexts"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "response": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "id": {

            "type": "integer",

            "description": "Index of the context in the request"

          },

          "score": {

            "type": "number",

            "description": "Score of the context under the index."

          }

        }

      }

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
