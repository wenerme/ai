---
title: Gemini 3 Flash
description: Gemini 3 Flash is Google's fast multimodal model with frontier intelligence, superior search, and grounding capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 3 Flash 

Text Generation • Google • Proxied 

`google/gemini-3-flash` 

Gemini 3 Flash is Google's fast multimodal model with frontier intelligence, superior search, and grounding capabilities.

| Model Info                                                                 |                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                       |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)       |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/) |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=google/gemini-3-flash) 

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3-flash',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'What are the three laws of thermodynamics?',

          },

        ],

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

**With System Instruction**  — Using a system instruction to set context 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3-flash',

  {

    systemInstruction: {

      parts: [

        {

          text: 'You are a helpful coding assistant specializing in Python.',

        },

      ],

    },

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'How do I read a JSON file in Python?',

          },

        ],

      },

    ],

    generationConfig: {

      temperature: 0.3,

    },

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

  'google/gemini-3-flash',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'I need help planning a road trip from San Francisco to Los Angeles.',

          },

        ],

      },

      {

        role: 'model',

        parts: [

          {

            text: "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

          },

        ],

      },

      {

        role: 'user',

        parts: [

          {

            text: 'Yes, what are some good places to stop?',

          },

        ],

      },

    ],

    generationConfig: {

      maxOutputTokens: 500,

    },

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

  'google/gemini-3-flash',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'Write a short story opening about a detective finding an unusual clue.',

          },

        ],

      },

    ],

    generationConfig: {

      temperature: 0.8,

      maxOutputTokens: 300,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

## Parameters

* [ Input ](#tab-panel-82)
* [ Output ](#tab-panel-83)

▶contents\[\]

`array`required

▶systemInstruction{}

`object`

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶tools\[\]

`array`

toolConfig

``

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

## API Schemas

* [ Input ](#tab-panel-80)
* [ Output ](#tab-panel-81)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "contents": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "role": {

            "type": "string",

            "enum": [

              "user",

              "model"

            ]

          },

          "parts": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "text": {

                  "type": "string"

                }

              },

              "additionalProperties": {}

            }

          }

        },

        "required": [

          "parts"

        ],

        "additionalProperties": {}

      }

    },

    "systemInstruction": {

      "type": "object",

      "properties": {

        "parts": {

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "text": {

                "type": "string"

              }

            },

            "additionalProperties": {}

          }

        }

      },

      "required": [

        "parts"

      ],

      "additionalProperties": {}

    },

    "generationConfig": {

      "type": "object",

      "properties": {

        "temperature": {

          "type": "number"

        },

        "topP": {

          "type": "number"

        },

        "topK": {

          "type": "number"

        },

        "maxOutputTokens": {

          "type": "number"

        },

        "candidateCount": {

          "type": "number"

        },

        "stopSequences": {

          "type": "array",

          "items": {

            "type": "string"

          }

        },

        "responseMimeType": {

          "type": "string"

        }

      },

      "additionalProperties": {}

    },

    "safetySettings": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "category": {

            "type": "string"

          },

          "threshold": {

            "type": "string"

          }

        },

        "required": [

          "category",

          "threshold"

        ],

        "additionalProperties": {}

      }

    },

    "tools": {

      "type": "array",

      "items": {}

    },

    "toolConfig": {}

  },

  "required": [

    "contents"

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

    "candidates": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "content": {

            "type": "object",

            "properties": {

              "role": {

                "type": "string"

              },

              "parts": {

                "type": "array",

                "items": {

                  "type": "object",

                  "properties": {

                    "text": {

                      "type": "string"

                    }

                  },

                  "additionalProperties": {}

                }

              }

            },

            "required": [

              "parts"

            ],

            "additionalProperties": {}

          },

          "finishReason": {

            "type": "string"

          },

          "safetyRatings": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "category": {

                  "type": "string"

                },

                "probability": {

                  "type": "string"

                }

              },

              "required": [

                "category",

                "probability"

              ],

              "additionalProperties": {}

            }

          }

        },

        "required": [

          "content"

        ],

        "additionalProperties": {}

      }

    },

    "usageMetadata": {

      "type": "object",

      "properties": {

        "promptTokenCount": {

          "type": "number"

        },

        "candidatesTokenCount": {

          "type": "number"

        },

        "totalTokenCount": {

          "type": "number"

        }

      },

      "additionalProperties": {}

    },

    "modelVersion": {

      "type": "string"

    }

  },

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
