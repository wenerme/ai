---
title: llama-guard-3-8b
description: Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its output that indicates whether a given prompt or response is safe or unsafe, and if unsafe, it also lists the content categories violated.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Meta logo](https://developers.cloudflare.com/_astro/meta.x5nlFKBG.svg) 

#  llama-guard-3-8b 

Text Generation • Meta 

@cf/meta/llama-guard-3-8b 

Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its output that indicates whether a given prompt or response is safe or unsafe, and if unsafe, it also lists the content categories violated.

| Model Info                                                                 |                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 131,072 tokens                                      |
| LoRA                                                                       | Yes                                                 |
| Unit Pricing                                                               | $0.48 per M input tokens, $0.03 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/meta/llama-guard-3-8b) 

## Usage

* [  TypeScript ](#tab-panel-1879)
* [  Python ](#tab-panel-1880)
* [  curl ](#tab-panel-1881)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const messages = [

      {

        role: 'user',

        content: 'I wanna bully someone online',

      },

      {

        role: 'assistant',

        content: 'That sounds interesting, how can I help?',

      },

    ];

    const response = await env.AI.run("@cf/meta/llama-guard-3-8b", { messages });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

```

import os

import requests


ACCOUNT_ID = "your-account-id"

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-guard-3-8b",

    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},

    json={

      "messages": [

        {"role": "user", "content": "I want to bully somebody online"},

        {"role": "assistant", "content": "Interesting. Let me know how I can be of assistance?"},

      ]

    }

)

result = response.json()

print(result)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-guard-3-8b \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "user", "content": "I want to bully someone online" }, {"role": "assistant", "content": "Interesting. How can I assist you?"}]}'


```

## Parameters

\* indicates a required field

### Input

* `messages` ` array ` required  
An array of message objects representing the conversation history.  
   * `items` ` object `  
         * `role` required  
         The role of the message sender must alternate between 'user' and 'assistant'.  
         * `content` ` string ` required  
         The content of the message as a string.
* `max_tokens` ` integer ` default 256  
The maximum number of tokens to generate in the response.
* `temperature` ` number ` default 0.6 min 0 max 5  
Controls the randomness of the output; higher values produce more random results.
* `response_format` ` object `  
Dictate the output format of the generated response.  
   * `type` ` string `  
   Set to json\_object to process and output generated text as JSON.

### Output

* `response` ` one of `  
   * `0` ` string `  
   The generated text response from the model.  
   * `1` ` object `  
   The json response parsed from the generated text response from the model.  
         * `safe` ` boolean `  
         Whether the conversation is safe or not.  
         * `categories` ` array `  
         A list of what hazard categories predicted for the conversation, if the conversation is deemed unsafe.  
                  * `items` ` string `  
                  Hazard category classname, from S1 to S14.
* `usage` ` object `  
Usage statistics for the inference request  
   * `prompt_tokens` ` number ` 0  
   Total number of tokens in input  
   * `completion_tokens` ` number ` 0  
   Total number of tokens in output  
   * `total_tokens` ` number ` 0  
   Total number of input and output tokens

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1882)
* [ Output ](#tab-panel-1883)

```

{

    "type": "object",

    "properties": {

        "messages": {

            "type": "array",

            "description": "An array of message objects representing the conversation history.",

            "items": {

                "type": "object",

                "properties": {

                    "role": {

                        "enum": [

                            "user",

                            "assistant"

                        ],

                        "description": "The role of the message sender must alternate between 'user' and 'assistant'."

                    },

                    "content": {

                        "type": "string",

                        "description": "The content of the message as a string."

                    }

                },

                "required": [

                    "role",

                    "content"

                ]

            }

        },

        "max_tokens": {

            "type": "integer",

            "default": 256,

            "description": "The maximum number of tokens to generate in the response."

        },

        "temperature": {

            "type": "number",

            "default": 0.6,

            "minimum": 0,

            "maximum": 5,

            "description": "Controls the randomness of the output; higher values produce more random results."

        },

        "response_format": {

            "type": "object",

            "description": "Dictate the output format of the generated response.",

            "properties": {

                "type": {

                    "type": "string",

                    "description": "Set to json_object to process and output generated text as JSON."

                }

            }

        }

    },

    "required": [

        "messages"

    ]

}


```

```

{

    "type": "object",

    "contentType": "application/json",

    "properties": {

        "response": {

            "oneOf": [

                {

                    "type": "string",

                    "description": "The generated text response from the model."

                },

                {

                    "type": "object",

                    "description": "The json response parsed from the generated text response from the model.",

                    "properties": {

                        "safe": {

                            "type": "boolean",

                            "description": "Whether the conversation is safe or not."

                        },

                        "categories": {

                            "type": "array",

                            "description": "A list of what hazard categories predicted for the conversation, if the conversation is deemed unsafe.",

                            "items": {

                                "type": "string",

                                "description": "Hazard category classname, from S1 to S14."

                            }

                        }

                    }

                }

            ]

        },

        "usage": {

            "type": "object",

            "description": "Usage statistics for the inference request",

            "properties": {

                "prompt_tokens": {

                    "type": "number",

                    "description": "Total number of tokens in input",

                    "default": 0

                },

                "completion_tokens": {

                    "type": "number",

                    "description": "Total number of tokens in output",

                    "default": 0

                },

                "total_tokens": {

                    "type": "number",

                    "description": "Total number of input and output tokens",

                    "default": 0

                }

            }

        }

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
