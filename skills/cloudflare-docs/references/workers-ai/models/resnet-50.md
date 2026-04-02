---
title: resnet-50
description: 50 layers deep image classification CNN trained on more than 1M images from ImageNet
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Microsoft logo](https://developers.cloudflare.com/_astro/microsoft.BfW2Sks3.svg) 

#  resnet-50 

Image Classification • Microsoft 

@cf/microsoft/resnet-50 

50 layers deep image classification CNN trained on more than 1M images from ImageNet

| Model Info       |                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://www.microsoft.com/en-us/research/blog/microsoft-vision-model-resnet-50-combines-web-scale-data-and-multi-task-learning-to-achieve-state-of-the-art/) |
| Unit Pricing     | $0.0000025 per inference request                                                                                                                                      |

## Usage

* [  TypeScript ](#tab-panel-2029)
* [  curl ](#tab-panel-2030)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch("https://cataas.com/cat");

    const blob = await res.arrayBuffer();


    const inputs = {

      image: [...new Uint8Array(blob)],

    };


    const response = await env.AI.run(

      "@cf/microsoft/resnet-50",

      inputs

    );


    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/microsoft/resnet-50  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    --data-binary "@orange-llama.png"


```

## Parameters

\* indicates a required field

### Input

* `0` ` string `  
The image to classify
* `1` ` object `  
   * `image` ` array ` required  
   An array of integers that represent the image data constrained to 8-bit unsigned integer values  
         * `items` ` number `  
         A value between 0 and 255 (unsigned 8bit)

### Output

* `items` ` object `  
   * `score` ` number `  
   A confidence value, between 0 and 1, indicating how certain the model is about the predicted label  
   * `label` ` string `  
   The predicted category or class for the input image based on analysis

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2031)
* [ Output ](#tab-panel-2032)

```

{

    "oneOf": [

        {

            "type": "string",

            "format": "binary",

            "description": "The image to classify"

        },

        {

            "type": "object",

            "properties": {

                "image": {

                    "type": "array",

                    "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",

                    "items": {

                        "type": "number",

                        "description": "A value between 0 and 255 (unsigned 8bit)"

                    }

                }

            },

            "required": [

                "image"

            ]

        }

    ]

}


```

```

{

    "type": "array",

    "contentType": "application/json",

    "items": {

        "type": "object",

        "properties": {

            "score": {

                "type": "number",

                "description": "A confidence value, between 0 and 1, indicating how certain the model is about the predicted label"

            },

            "label": {

                "type": "string",

                "description": "The predicted category or class for the input image based on analysis"

            }

        }

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
