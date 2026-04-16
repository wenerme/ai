---
title: Claude Sonnet 4.5
description: Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4.5 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4.5` 

Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.

| Model Info                                                                 |                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                             |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)          |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=anthropic/claude-sonnet-4.5) 

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

  {

    system: 'You are a helpful coding assistant specializing in Python.',

    messages: [

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

    max_tokens: 1024,

    temperature: 0.3,

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

  'anthropic/claude-sonnet-4.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'I need help planning a road trip from San Francisco to Los Angeles.',

      },

      {

        role: 'assistant',

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      },

      {

        role: 'user',

        content: 'Yes, what are some good places to stop?',

      },

    ],

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_tokens: 512,

    temperature: 0.8,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    max_tokens: 1024,

    stream: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

## Parameters

* [ Input ](#tab-panel-26)
* [ Output ](#tab-panel-27)

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

`object`

id

`string`required

type

`string`requiredconst: message

role

`string`requiredconst: assistant

▶content\[\]

`array`required

model

`string`required

stop\_reason

`string | null`required

▶usage{}

`object`required

## API Schemas

* [ Input ](#tab-panel-24)
* [ Output ](#tab-panel-25)

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

              "user",

              "assistant"

            ]

          },

          "content": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "array",

                "items": {

                  "type": "object",

                  "properties": {

                    "type": {

                      "type": "string"

                    },

                    "text": {

                      "type": "string"

                    },

                    "source": {}

                  },

                  "required": [

                    "type"

                  ],

                  "additionalProperties": false

                }

              }

            ]

          }

        },

        "required": [

          "role",

          "content"

        ],

        "additionalProperties": false

      }

    },

    "max_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "system": {

      "type": "string"

    },

    "temperature": {

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "top_p": {

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "top_k": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "stream": {

      "type": "boolean"

    },

    "metadata": {

      "type": "object",

      "propertyNames": {

        "type": "string"

      },

      "additionalProperties": {}

    }

  },

  "required": [

    "messages",

    "max_tokens"

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

    "type": {

      "type": "string",

      "const": "message"

    },

    "role": {

      "type": "string",

      "const": "assistant"

    },

    "content": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "type": {

            "type": "string"

          },

          "text": {

            "type": "string"

          }

        },

        "required": [

          "type"

        ],

        "additionalProperties": {}

      }

    },

    "model": {

      "type": "string"

    },

    "stop_reason": {

      "anyOf": [

        {

          "type": "string"

        },

        {

          "type": "null"

        }

      ]

    },

    "usage": {

      "type": "object",

      "properties": {

        "input_tokens": {

          "type": "number"

        },

        "output_tokens": {

          "type": "number"

        }

      },

      "required": [

        "input_tokens",

        "output_tokens"

      ],

      "additionalProperties": false

    }

  },

  "required": [

    "id",

    "type",

    "role",

    "content",

    "model",

    "stop_reason",

    "usage"

  ],

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
