---
title: GPT-5.4
description: GPT-5.4 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4` 

GPT-5.4 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                   |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

* [ Input ](#tab-panel-324)
* [ Output ](#tab-panel-325)

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

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

* [ Input ](#tab-panel-326)
* [ Output ](#tab-panel-327)

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

    "text": "Use Python’s built-in `json` module.\n\n### Read a JSON file\n```python\nimport json\n\nwith open(\"data.json\", \"r\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n### If the file contains:\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 25\n}\n```\n\n### Then `data` becomes:\n```python\n{'name': 'Alice', 'age': 25}\n```\n\n### Notes\n- `json.load(file)` reads JSON from a file and converts it to Python objects.\n- JSON objects become Python dictionaries.\n- JSON arrays become Python lists.\n\n### Read with UTF-8 encoding\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n```\n\n### Handle invalid JSON safely\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n        data = json.load(file)\n    print(data)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON.\")\n```\n\nIf you want, I can also show:\n- how to read a JSON string\n- how to write JSON to a file\n- how to pretty-print JSON"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

* [ Input ](#tab-panel-330)
* [ Output ](#tab-panel-331)

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

    "text": "Here are some popular stops if you take the scenic coastal route (Highway 1 / Pacific Coast Highway), which is much slower than I-5 but far more beautiful:\n\n### Great stops from San Francisco to Los Angeles\n- **Half Moon Bay** – Nice beaches, coastal views, and a good first stop.\n- **Santa Cruz** – Classic beach town with a boardwalk, pier, and cafes.\n- **Monterey** – Famous for Cannery Row and the Monterey Bay Aquarium.\n- **Carmel-by-the-Sea** – Charming small town with shops, galleries, and a beautiful beach.\n- **Big Sur** – One of the most scenic stretches of the drive, with cliffs, ocean views, and hiking spots.\n- **San Simeon** – Known for Hearst Castle and elephant seals nearby.\n- **Morro Bay** – Relaxed coastal town with the iconic Morro Rock.\n- **San Luis Obispo** – Cute downtown, restaurants, and a good overnight stop.\n- **Pismo Beach** – Good for a beach walk or seafood stop.\n- **Santa Barbara** – Beautiful Spanish-style architecture, beaches, and wine tasting.\n- **Malibu** – Scenic coastline before arriving in Los Angeles.\n\n### If you want the faster inland route (I-5)\nStops are less scenic, but you could consider:\n- **Gilroy** – Known for garlic-themed food.\n- **Harris Ranch** – Popular food/rest stop on I-5.\n- **Kettleman City** – Convenient midpoint break.\n- **Grapevine area** – Good place to pause before descending into LA.\n\nIf you want, I can also suggest:\n1. a **1-day fast itinerary**,  \n2. a **2-3 day scenic itinerary**, or  \n3. **food-focused stops**."

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

* [ Input ](#tab-panel-328)
* [ Output ](#tab-panel-329)

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

    "text": "Detective Mara Voss found the first clue where no clue had any business being.\n\nIt was tucked inside the mouth of a stone lion that guarded the steps of Blackwell Hall, a place better known for charity galas than murder. The victim lay inside, under a chandelier bright enough to make everyone look innocent. Guests whispered behind silk gloves. Police boots clicked across marble. But Mara stood outside in the rain, staring at the lion’s weather-dark teeth.\n\nSomeone had placed a single peach pit on its tongue.\n\nNot dropped. Placed.\n\nShe lifted it carefully with her handkerchief. The pit had been polished until it shone, and carved into its surface was the tiniest image of a key.\n\nMara looked up at the mansion windows. On the third floor, one curtain moved, though the glass behind it was black.\n\nA dead banker in the ballroom was ordinary, as far as her city was concerned. A carved peach pit hidden in a stone lion’s mouth was not.\n\nThat was when she began to suspect the murder had started long before the body hit the floor."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

* [ Input ](#tab-panel-334)
* [ Output ](#tab-panel-335)

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

        " when",

        " a",

        " function",

        " solves",

        " a",

        " problem",

        " by",

        " calling",

        " itself",

        " on",

        " a",

        " smaller",

        " version",

        " of",

        " the",

        " same",

        " problem",

        ".\n\n",

        "It",

        " usually",

        " has",

        " ",

        "2",

        " parts",

        ":\n\n",

        "1",

        ".",

        " **",

        "Base",

        " case",

        "**",

        " —",

        " the",

        " condition",

        " where",

        " the",

        " function",

        " stops",

        " calling",

        " itself",

        ".\n",

        "2",

        ".",

        " **",

        "Recursive",

        " case",

        "**",

        " —",

        " the",

        " part",

        " where",

        " the",

        " function",

        " calls",

        " itself",

        " with",

        " a",

        " smaller",

        " input",

        ".\n\n",

        "###",

        " Simple",

        " example",

        ":",

        " factorial",

        "\n\n",

        "The",

        " factorial",

        " of",

        " a",

        " number",

        " means",

        ":\n\n",

        "-",

        " `",

        "5",

        "!",

        " =",

        " ",

        "5",

        " ×",

        " ",

        "4",

        " ×",

        " ",

        "3",

        " ×",

        " ",

        "2",

        " ×",

        " ",

        "1",

        "`\n",

        "-",

        " `",

        "1",

        "!",

        " =",

        " ",

        "1",

        "`\n\n",

        "A",

        " recursive",

        " version",

        " looks",

        " like",

        " this",

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

        "1",

        ":",

        "         ",

        " #",

        " base",

        " case",

        "\n",

        "       ",

        " return",

        " ",

        "1",

        "\n",

        "   ",

        " return",

        " n",

        " *",

        " factorial",

        "(n",

        " -",

        " ",

        "1",

        ")",

        "  ",

        " #",

        " recursive",

        " case",

        "\n\n",

        "print",

        "(f",

        "actor",

        "ial",

        "(",

        "5",

        "))\n",

        "``",

        "`\n\n",

        "###",

        " How",

        " it",

        " works",

        " for",

        " `",

        "factor",

        "ial",

        "(",

        "5",

        ")",

        "`\n\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "5",

        ")`",

        " →",

        " `",

        "5",

        " *",

        " factorial",

        "(",

        "4",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        " →",

        " `",

        "4",

        " *",

        " factorial",

        "(",

        "3",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "3",

        ")`",

        " →",

        " `",

        "3",

        " *",

        " factorial",

        "(",

        "2",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "2",

        ")`",

        " →",

        " `",

        "2",

        " *",

        " factorial",

        "(",

        "1",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "1",

        ")`",

        " →",

        " `",

        "1",

        "`",

        " ←",

        " base",

        " case",

        "\n\n",

        "Then",

        " it",

        " returns",

        " back",

        " up",

        ":\n\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "2",

        ")`",

        " =",

        " `",

        "2",

        " *",

        " ",

        "1",

        " =",

        " ",

        "2",

        "`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "3",

        ")`",

        " =",

        " `",

        "3",

        " *",

        " ",

        "2",

        " =",

        " ",

        "6",

        "`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        " =",

        " `",

        "4",

        " *",

        " ",

        "6",

        " =",

        " ",

        "24",

        "`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "5",

        ")`",

        " =",

        " `",

        "5",

        " *",

        " ",

        "24",

        " =",

        " ",

        "120",

        "`\n\n",

        "###",

        " Key",

        " idea",

        "\n\n",

        "Rec",

        "ursion",

        " works",

        " by",

        " breaking",

        " a",

        " big",

        " problem",

        " into",

        " smaller",

        ",",

        " similar",

        " problems",

        " until",

        " it",

        " reaches",

        " a",

        " simple",

        " stopping",

        " point",

        ".\n\n",

        "If",

        " you",

        " want",

        ",",

        " I",

        " can",

        " also",

        " show",

        " a",

        " **",

        "real",

        "-life",

        " analogy",

        "**",

        " or",

        " a",

        " **",

        "non",

        "-m",

        "ath",

        " recursion",

        " example",

        "**",

        "."

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-336)
* [ Output ](#tab-panel-337)

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

* [ Input ](#tab-panel-332)
* [ Output ](#tab-panel-333)

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
