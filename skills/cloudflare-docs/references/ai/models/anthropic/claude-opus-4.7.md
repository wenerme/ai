---
title: Claude Opus 4.7
description: Claude Opus 4.7 is Anthropic's most capable generally available model to date. It is highly autonomous and performs exceptionally well on long-horizon agentic work, knowledge work, vision tasks, and memory tasks.
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

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.7 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.7` 

Claude Opus 4.7 is Anthropic's most capable generally available model to date. It is highly autonomous and performs exceptionally well on long-horizon agentic work, knowledge work, vision tasks, and memory tasks.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7)                                      |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.7) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

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

  'anthropic/claude-opus-4.7',

  {

    messages: [

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

    max_tokens: 1024,

    system: 'You are a helpful coding assistant specializing in Python.',

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

  'anthropic/claude-opus-4.7',

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

  'anthropic/claude-opus-4.7',

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

  'anthropic/claude-opus-4.7',

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

* [ Input ](#tab-panel-62)
* [ Output ](#tab-panel-63)

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

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[\]

`array`

model

`string`

stop\_reason

`string | null`

▶usage{}

`object`

## API Schemas

* [ Input ](#tab-panel-60)
* [ Output ](#tab-panel-61)

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
