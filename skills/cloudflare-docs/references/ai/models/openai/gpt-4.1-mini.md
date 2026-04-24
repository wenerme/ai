---
title: GPT-4.1 Mini
description: Fast, affordable version of GPT-4.1 with a million-token context window.
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

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-4.1 Mini 

Text Generation • OpenAI • Proxied 

`openai/gpt-4.1-mini` 

Fast, affordable version of GPT-4.1 with a million-token context window.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,047,576 tokens                                                                                                      |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/index/gpt-4-1/)                                                                           |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-4.1-mini) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1-mini',

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

* [ Input ](#tab-panel-284)
* [ Output ](#tab-panel-285)

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

    "text": "The three laws of thermodynamics are fundamental principles that describe how energy behaves in physical systems:\n\n1. **First Law of Thermodynamics (Law of Energy Conservation):**  \n   Energy cannot be created or destroyed; it can only be transferred or transformed from one form to another. In other words, the total energy of an isolated system remains constant. Mathematically, it is often expressed as:  \n   \\[\n   \\Delta U = Q - W\n   \\]  \n   where \\(\\Delta U\\) is the change in internal energy of the system, \\(Q\\) is the heat added to the system, and \\(W\\) is the work done by the system.\n\n2. **Second Law of Thermodynamics:**  \n   The total entropy of an isolated system can never decrease over time; it either increases or remains constant in ideal cases. Entropy is a measure of disorder or randomness. This law implies that natural processes tend to move toward a state of greater disorder, and it explains the direction of heat transfer (from hot to cold).  \n\n3. **Third Law of Thermodynamics:**  \n   As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches a constant minimum, which can be taken as zero. This means it is impossible to reach absolute zero temperature through any finite series of processes.\n\nIf you need, I can also explain the Zeroth Law, which is foundational and often included when discussing thermodynamics."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1-mini',

  {

    messages: [

      {

        role: 'system',

        content: 'You are a helpful coding assistant specializing in Python.',

      },

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

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

* [ Input ](#tab-panel-286)
* [ Output ](#tab-panel-287)

```

{

    "messages": [

        {

            "role": "system",

            "content": "You are a helpful coding assistant specializing in Python."

        },

        {

            "role": "user",

            "content": "How do I read a JSON file in Python?"

        }

    ]

}


```

Explain Code

```

{

    "text": "To read a JSON file in Python, you can use the built-in `json` module. Here's a simple example:\n\n```python\nimport json\n\n# Open the JSON file\nwith open('data.json', 'r') as file:\n    # Load the content of the file into a Python dictionary\n    data = json.load(file)\n\n# Now you can use `data` like a regular Python dictionary\nprint(data)\n```\n\n### Explanation:\n- `open('data.json', 'r')` opens the file in read mode.\n- `json.load(file)` reads the JSON content from the file and converts it into a Python dictionary (or list, depending on the JSON structure).\n\nMake sure your JSON file is properly formatted. If you want to handle errors, you can add a try-except block as well.\n\nLet me know if you need help with that!"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1-mini',

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

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-290)
* [ Output ](#tab-panel-291)

```

{

    "messages": [

        {

            "role": "user",

            "content": "I need help planning a road trip from San Francisco to Los Angeles."

        },

        {

            "role": "assistant",

            "content": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

        },

        {

            "role": "user",

            "content": "Yes, what are some good places to stop?"

        }

    ],

    "max_completion_tokens": 2048

}


```

Explain Code

```

{

    "text": "Great! Here are some popular and scenic stops along the drive from San Francisco to Los Angeles:\n\n1. **Half Moon Bay** – Just south of San Francisco, it’s a charming coastal town with beautiful beaches and great spots for breakfast or coffee.\n2. **Santa Cruz** – Known for its classic boardwalk, beach vibes, and surfing culture.\n3. **Monterey** – Famous for the Monterey Bay Aquarium, Cannery Row, and stunning coastal views.\n4. **Carmel-by-the-Sea** – A picturesque town with art galleries, boutique shops, and beautiful beaches.\n5. **Big Sur** – One of the most scenic stretches of the California coast with dramatic cliffs, waterfalls (like McWay Falls), and state parks.\n6. **San Simeon** – Home to Hearst Castle, a historic mansion worth touring.\n7. **Pismo Beach** – Great for a beach break, known for its dunes and laid-back atmosphere.\n8. **Santa Barbara** – Often called the “American Riviera” for its Mediterranean climate, with beaches, shopping, and wine tasting.\n\nWould you like recommendations for dining, accommodations, or activities at any of these stops?"

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1-mini',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-288)
* [ Output ](#tab-panel-289)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Write a short story opening about a detective finding an unusual clue."

        }

    ],

    "max_completion_tokens": 2048

}


```

```

{

    "text": "Detective Elena Marsh crouched beside the shattered window, the cold wind tugging at her coat. Amid the splintered glass and upturned furniture, something caught her eye—a single, iridescent feather resting delicately on the floor. It shimmered with colors she couldn’t place, almost otherworldly. She reached down, careful not to disturb the scene further, and traced the feather’s fragile quill between her fingers. This wasn’t just a clue. It was a message. And Elena had a feeling it was about to rewrite everything she thought she knew about the case."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1-mini',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    stream: true,

    stream_options: {

      include_usage: true,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-294)
* [ Output ](#tab-panel-295)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Explain the concept of recursion with a simple example."

        }

    ],

    "stream": true,

    "stream_options": {

        "include_usage": true

    }

}


```

Explain Code

```

{

    "text": [

        "Rec",

        "ursion",

        " is",

        " a",

        " programming",

        " concept",

        " where",

        " a",

        " function",

        " calls",

        " itself",

        " in",

        " order",

        " to",

        " solve",

        " a",

        " problem",

        ".",

        " A",

        " recursive",

        " function",

        " typically",

        " has",

        " two",

        " main",

        " parts",

        ":\n\n",

        "1",

        ".",

        " **",

        "Base",

        " Case",

        ":**",

        " The",

        " condition",

        " under",

        " which",

        " the",

        " function",

        " stops",

        " calling",

        " itself",

        ".",

        " This",

        " prevents",

        " infinite",

        " recursion",

        ".\n",

        "2",

        ".",

        " **",

        "Recursive",

        " Case",

        ":**",

        " The",

        " part",

        " where",

        " the",

        " function",

        " calls",

        " itself",

        " with",

        " a",

        " smaller",

        " or",

        " simpler",

        " input",

        ",",

        " gradually",

        " approaching",

        " the",

        " base",

        " case",

        ".\n\n",

        "###",

        " Simple",

        " Example",

        ":",

        " Factor",

        "ial",

        " of",

        " a",

        " Number",

        "\n\n",

        "The",

        " factorial",

        " of",

        " a",

        " number",

        " \\(",

        " n",

        " \\",

        ")",

        " (",

        "written",

        " as",

        " \\(",

        " n",

        "!",

        " \\",

        "))",

        " is",

        " the",

        " product",

        " of",

        " all",

        " positive",

        " integers",

        " less",

        " than",

        " or",

        " equal",

        " to",

        " \\(",

        " n",

        " \\",

        ").",

        " It",

        " can",

        " be",

        " defined",

        " recursively",

        " as",

        ":\n\n",

        "-",

        " \\(",

        " ",

        "0",

        "!",

        " =",

        " ",

        "1",

        " \\",

        ")",

        " (",

        "Base",

        " case",

        ")\n",

        "-",

        " \\(",

        " n",

        "!",

        " =",

        " n",

        " \\",

        "times",

        " (",

        "n",

        "-",

        "1",

        ")!",

        " \\",

        ")",

        " (",

        "Recursive",

        " case",

        ")\n\n",

        "Here's",

        " how",

        " you",

        " can",

        " implement",

        " factorial",

        " recursively",

        " in",

        " Python",

        ":\n\n",

        "```",

        "python",

        "\n",

        "def",

        " factorial",

        "(n",

        "):\n",

        "   ",

        " if",

        " n",

        " ==",

        " ",

        "0",

        ":\n",

        "       ",

        " return",

        " ",

        "1",

        "                    ",

        " #",

        " Base",

        " case",

        "\n",

        "   ",

        " else",

        ":\n",

        "       ",

        " return",

        " n",

        " *",

        " factorial",

        "(n",

        " -",

        " ",

        "1",

        ")",

        " #",

        " Recursive",

        " case",

        "\n\n",

        "print",

        "(f",

        "actor",

        "ial",

        "(",

        "5",

        "))",

        " ",

        " #",

        " Output",

        ":",

        " ",

        "120",

        "\n",

        "``",

        "`\n\n",

        "###",

        " Explanation",

        ":\n\n",

        "-",

        " When",

        " `",

        "factor",

        "ial",

        "(",

        "5",

        ")`",

        " is",

        " called",

        ",",

        " it",

        " returns",

        " \\(",

        " ",

        "5",

        " \\",

        "times",

        " factorial",

        "(",

        "4",

        ")",

        " \\",

        ").\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        " returns",

        " \\(",

        " ",

        "4",

        " \\",

        "times",

        " factorial",

        "(",

        "3",

        ")",

        " \\",

        "),",

        " and",

        " so",

        " on",

        ".\n",

        "-",

        " Eventually",

        ",",

        " `",

        "factor",

        "ial",

        "(",

        "0",

        ")`",

        " returns",

        " ",

        "1",

        ",",

        " stopping",

        " the",

        " recursion",

        ".\n",

        "-",

        " The",

        " results",

        " are",

        " then",

        " combined",

        " back",

        " up",

        " to",

        " give",

        " the",

        " final",

        " answer",

        ".\n\n",

        "This",

        " shows",

        " how",

        " recursion",

        " breaks",

        " down",

        " a",

        " problem",

        " into",

        " smaller",

        " identical",

        " problems",

        " until",

        " reaching",

        " the",

        " simplest",

        " one",

        "."

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-296)
* [ Output ](#tab-panel-297)

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

* [ Input ](#tab-panel-292)
* [ Output ](#tab-panel-293)

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
