---
title: uform-gen2-qwen-500m
description: UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 u 

#  uform-gen2-qwen-500m Beta 

Image-to-Text • unum 

@cf/unum/uform-gen2-qwen-500m 

UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets.

| Model Info       |                                   |
| ---------------- | --------------------------------- |
| More information | [link ↗](https://www.unum.cloud/) |
| Beta             | Yes                               |

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

      "@cf/unum/uform-gen2-qwen-500m",

      input

      );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

## Parameters

\* indicates a required field

### Input

* `0` ` string `  
Binary string representing the image contents.
* `1` ` object `  
   * `prompt` ` string `  
   The input text prompt for the model to generate a response.  
   * `raw` ` boolean `  
   If true, a chat template is not applied and you must adhere to the specific model's expected formatting.  
   * `top_p` ` number `  
   Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.  
   * `top_k` ` number `  
   Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.  
   * `seed` ` number `  
   Random seed for reproducibility of the generation.  
   * `repetition_penalty` ` number `  
   Penalty for repeated tokens; higher values discourage repetition.  
   * `frequency_penalty` ` number `  
   Decreases the likelihood of the model repeating the same lines verbatim.  
   * `presence_penalty` ` number `  
   Increases the likelihood of the model introducing new topics.  
   * `image` ` one of ` required  
         * `0` ` array `  
         An array of integers that represent the image data constrained to 8-bit unsigned integer values  
                  * `items` ` number `  
                  A value between 0 and 255  
         * `1` ` string `  
         Binary string representing the image contents.  
   * `max_tokens` ` integer ` default 512  
   The maximum number of tokens to generate in the response.

### Output

* `description` ` string `

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2085)
* [ Output ](#tab-panel-2086)

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
