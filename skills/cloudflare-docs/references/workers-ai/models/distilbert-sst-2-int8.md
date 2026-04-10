---
title: distilbert-sst-2-int8
description: Distilled BERT model that was finetuned on SST-2 for sentiment classification
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![HuggingFace logo](https://developers.cloudflare.com/_astro/huggingface.DHiS2HZA.svg) 

#  distilbert-sst-2-int8 

Text Classification • HuggingFace 

@cf/huggingface/distilbert-sst-2-int8 

Distilled BERT model that was finetuned on SST-2 for sentiment classification

| Model Info       |                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://huggingface.co/Intel/distilbert-base-uncased-finetuned-sst-2-english-int8-static) |
| Unit Pricing     | $0.026 per M input tokens                                                                          |

## Usage

* [  TypeScript ](#tab-panel-1691)
* [  Python ](#tab-panel-1692)
* [  curl ](#tab-panel-1693)

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

\* indicates a required field

### Input

* `text` ` string ` required min 1  
The text that you want to classify

### Output

* `items` ` object `  
   * `score` ` number `  
   Confidence score indicating the likelihood that the text belongs to the specified label  
   * `label` ` string `  
   The classification label assigned to the text (e.g., 'POSITIVE' or 'NEGATIVE')

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1694)
* [ Output ](#tab-panel-1695)

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
