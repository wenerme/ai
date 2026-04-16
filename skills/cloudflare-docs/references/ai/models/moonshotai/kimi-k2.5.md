---
title: Kimi K2.5
description: Kimi K2.5 is Moonshot AI's language model with strong coding, reasoning, and multilingual capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.D9EBG7kx.svg) 

#  Kimi K2.5 

Text Generation • Moonshot AI • Proxied 

`moonshotai/kimi-k2.5` 

Kimi K2.5 is Moonshot AI's language model with strong coding, reasoning, and multilingual capabilities.

| Model Info                                                                 |                                          |
| -------------------------------------------------------------------------- | ---------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                           |
| Terms and License                                                          | [link ↗](https://kimi.moonshot.cn/terms) |
| More information                                                           | [link ↗](https://kimi.moonshot.cn/)      |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=moonshotai/kimi-k2.5) 

## Usage

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the difference between TCP and UDP protocols.',

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

## Examples

**With System Message**  — Using a system message to guide responses 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'system',

        content:

          'You are an expert in Chinese history and culture. Respond with historical context and interesting anecdotes.',

      },

      {

        role: 'user',

        content: 'Tell me about the Silk Road.',

      },

    ],

    temperature: 0.7,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

**Code Generation**  — Lower temperature for precise code output 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a Python function to calculate the Fibonacci sequence using memoization.',

      },

    ],

    temperature: 0.2,

    max_tokens: 500,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'moonshotai/kimi-k2.5',

  {

    messages: [

      {

        role: 'user',

        content: 'I want to learn about neural networks.',

      },

      {

        role: 'assistant',

        content:

          'Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes. Would you like to start with the basics of perceptrons?',

      },

      {

        role: 'user',

        content: 'Yes, explain perceptrons first.',

      },

    ],

    max_tokens: 800,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

## Parameters

* [ Input ](#tab-panel-158)
* [ Output ](#tab-panel-159)

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

`string`required

object

`string`required

created

`number`required

model

`string`required

▶choices\[\]

`array`required

▶usage{}

`object`

## API Schemas

* [ Input ](#tab-panel-156)
* [ Output ](#tab-panel-157)

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
