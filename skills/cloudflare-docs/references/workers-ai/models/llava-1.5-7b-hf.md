---
title: llava-1.5-7b-hf
description: LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 l 

#  llava-1.5-7b-hf Beta 

Image-to-Text • llava-hf • Hosted 

`@cf/llava-hf/llava-1.5-7b-hf` 

LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture.

| Model Info |     |
| ---------- | --- |
| Beta       | Yes |

## Usage

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const res = await fetch("https://cataas.com/cat");

    const blob = await res.arrayBuffer();

    const input = {

      image: [...new Uint8Array(blob)],

      prompt: "Generate a caption for this image",

      max_tokens: 512,

    };

    const response = await env.AI.run(

      "@cf/llava-hf/llava-1.5-7b-hf",

      input

      );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

## Parameters

* [ Input ](#tab-panel-3446)
* [ Output ](#tab-panel-3447)

Option 1

stringformat: binary

Binary string representing the image contents.

▶Option 2{}

object

description

`string`

## API Schemas

* [ Input ](#tab-panel-3444)
* [ Output ](#tab-panel-3445)

```

{

  "oneOf": [

    {

      "type": "string",

      "format": "binary",

      "description": "Binary string representing the image contents."

    },

    {

      "type": "object",

      "properties": {

        "image": {

          "oneOf": [

            {

              "type": "array",

              "description": "An array of integers that represent the image data constrained to 8-bit unsigned integer values",

              "items": {

                "type": "number",

                "description": "A value between 0 and 255"

              }

            },

            {

              "type": "string",

              "format": "binary",

              "description": "Binary string representing the image contents."

            }

          ]

        },

        "temperature": {

          "type": "number",

          "description": "Controls the randomness of the output; higher values produce more random results."

        },

        "prompt": {

          "type": "string",

          "description": "The input text prompt for the model to generate a response."

        },

        "raw": {

          "type": "boolean",

          "default": false,

          "description": "If true, a chat template is not applied and you must adhere to the specific model's expected formatting."

        },

        "top_p": {

          "type": "number",

          "description": "Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses."

        },

        "top_k": {

          "type": "number",

          "description": "Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises."

        },

        "seed": {

          "type": "number",

          "description": "Random seed for reproducibility of the generation."

        },

        "repetition_penalty": {

          "type": "number",

          "description": "Penalty for repeated tokens; higher values discourage repetition."

        },

        "frequency_penalty": {

          "type": "number",

          "description": "Decreases the likelihood of the model repeating the same lines verbatim."

        },

        "presence_penalty": {

          "type": "number",

          "description": "Increases the likelihood of the model introducing new topics."

        },

        "max_tokens": {

          "type": "integer",

          "default": 512,

          "description": "The maximum number of tokens to generate in the response."

        }

      },

      "required": [

        "image"

      ]

    }

  ]

}


```

Explain Code

```

{

  "type": "object",

  "contentType": "application/json",

  "properties": {

    "description": {

      "type": "string"

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
