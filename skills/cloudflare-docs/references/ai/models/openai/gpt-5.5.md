---
title: GPT-5.5
description: GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.5 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.5` 

GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-366)
* [ Output ](#tab-panel-367)

```

{

    "messages": [

        {

            "role": "user",

            "content": "What are the three laws of thermodynamics?"

        }

    ]

}


```

```

{

    "text": "The **three laws of thermodynamics** are:\n\n1. **First Law of Thermodynamics** — **Energy is conserved**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   In thermodynamic systems, this is often written as:  \n   **ΔU = Q - W**  \n   where:\n   - **ΔU** = change in internal energy  \n   - **Q** = heat added to the system  \n   - **W** = work done by the system  \n\n2. **Second Law of Thermodynamics** — **Entropy tends to increase**  \n   In any natural process, the total entropy of an isolated system never decreases.  \n   This means energy tends to spread out, and no heat engine can be 100% efficient.\n\n3. **Third Law of Thermodynamics** — **Entropy approaches a minimum at absolute zero**  \n   As the temperature of a perfect crystal approaches **0 Kelvin**, its entropy approaches **zero**.  \n   This also implies that absolute zero cannot be reached in a finite number of steps.\n\nThere is also a **Zeroth Law of Thermodynamics**, which is often listed before the first three:\n\n- If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.  \n- This is the basis for the concept of **temperature**.\n\nIf you want, I can also give a simple everyday explanation of each law."

}


```

## Parameters

* [ Input ](#tab-panel-370)
* [ Output ](#tab-panel-371)

▶messages\[\]

`array`required

temperature

`number`minimum: 0maximum: 2

max\_tokens

`number`exclusiveMinimum: 0

max\_completion\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

frequency\_penalty

`number`minimum: \-2maximum: 2

presence\_penalty

`number`minimum: \-2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[\]

`array`

tool\_choice

``

response\_format

``

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[\]

`array`

▶usage{}

`object`

## API Schemas

* [ Input ](#tab-panel-368)
* [ Output ](#tab-panel-369)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "messages": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "role": {

            "type": "string",

            "enum": [

              "system",

              "developer",

              "user",

              "assistant",

              "tool"

            ]

          },

          "content": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              },

              {

                "type": "array",

                "items": {}

              }

            ]

          }

        },

        "required": [

          "role",

          "content"

        ],

        "additionalProperties": {}

      }

    },

    "temperature": {

      "type": "number",

      "minimum": 0,

      "maximum": 2

    },

    "max_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "max_completion_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "top_p": {

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "frequency_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "stream": {

      "type": "boolean"

    },

    "stream_options": {

      "type": "object",

      "properties": {

        "include_usage": {

          "type": "boolean"

        }

      },

      "additionalProperties": false

    },

    "tools": {

      "type": "array",

      "items": {}

    },

    "tool_choice": {},

    "response_format": {}

  },

  "required": [

    "messages"

  ],

  "additionalProperties": {}

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "id": {

      "type": "string"

    },

    "object": {

      "type": "string"

    },

    "created": {

      "type": "number"

    },

    "model": {

      "type": "string"

    },

    "choices": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "index": {

            "type": "number"

          },

          "message": {

            "type": "object",

            "properties": {

              "role": {

                "type": "string"

              },

              "content": {

                "anyOf": [

                  {

                    "type": "string"

                  },

                  {

                    "type": "null"

                  }

                ]

              },

              "tool_calls": {

                "type": "array",

                "items": {}

              }

            },

            "required": [

              "role"

            ],

            "additionalProperties": {}

          },

          "finish_reason": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              }

            ]

          }

        },

        "required": [

          "index",

          "message",

          "finish_reason"

        ],

        "additionalProperties": {}

      }

    },

    "usage": {

      "type": "object",

      "properties": {

        "prompt_tokens": {

          "type": "number"

        },

        "completion_tokens": {

          "type": "number"

        },

        "total_tokens": {

          "type": "number"

        }

      },

      "required": [

        "prompt_tokens",

        "completion_tokens",

        "total_tokens"

      ],

      "additionalProperties": {}

    }

  },

  "required": [

    "id",

    "object",

    "created",

    "model",

    "choices"

  ],

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
