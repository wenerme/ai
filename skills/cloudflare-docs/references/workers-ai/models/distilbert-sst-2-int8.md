---
title: distilbert-sst-2-int8
description: Distilled BERT model that was finetuned on SST-2 for sentiment classification
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

![HuggingFace logo](https://developers.cloudflare.com/_astro/huggingface.ngjt5u2J.svg) 

#  distilbert-sst-2-int8 

Text Classification • HuggingFace • Hosted 

`@cf/huggingface/distilbert-sst-2-int8` 

Distilled BERT model that was finetuned on SST-2 for sentiment classification

| Model Info       |                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://huggingface.co/Intel/distilbert-base-uncased-finetuned-sst-2-english-int8-static) |
| Unit Pricing     | $0.026 per M input tokens                                                                          |

## Usage

* [  TypeScript ](#tab-panel-3193)
* [  Python ](#tab-panel-3194)
* [  curl ](#tab-panel-3195)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const response = await env.AI.run(

      "@cf/huggingface/distilbert-sst-2-int8",

      {

        text: "This pizza is great!",

      }

    );


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"

headers = {"Authorization": "Bearer {API_KEY}"}


def run(model, input):

    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)

    return response.json()


output = run("@cf/huggingface/distilbert-sst-2-int8", { "text": "This pizza is great!" })

print(output)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/huggingface/distilbert-sst-2-int8  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "text": "This pizza is great!" }'


```

## Parameters

* [ Input ](#tab-panel-3196)
* [ Output ](#tab-panel-3197)

text

`string`requiredminLength: 1The text that you want to classify

type

`array`

contentType

`application/json`

description

`An array of classification results for the input text`

items

`[object Object]`

## API Schemas

* [ Input ](#tab-panel-3191)
* [ Output ](#tab-panel-3192)

```

{

  "type": "object",

  "properties": {

    "text": {

      "type": "string",

      "minLength": 1,

      "description": "The text that you want to classify"

    }

  },

  "required": [

    "text"

  ]

}


```

Explain Code

```

{

  "type": "array",

  "contentType": "application/json",

  "description": "An array of classification results for the input text",

  "items": {

    "type": "object",

    "properties": {

      "score": {

        "type": "number",

        "description": "Confidence score indicating the likelihood that the text belongs to the specified label"

      },

      "label": {

        "type": "string",

        "description": "The classification label assigned to the text (e.g., 'POSITIVE' or 'NEGATIVE')"

      }

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
