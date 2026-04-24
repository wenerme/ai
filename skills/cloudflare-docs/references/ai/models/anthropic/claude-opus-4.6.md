---
title: Claude Opus 4.6
description: Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.
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

#  Claude Opus 4.6 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.6` 

Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.6) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-46)
* [ Output ](#tab-panel-47)

```

{

    "messages": [

        {

            "role": "user",

            "content": "What are the three laws of thermodynamics?"

        }

    ],

    "max_tokens": 1024

}


```

```

{

    "text": "# The Laws of Thermodynamics\n\nHere are the three main laws (along with the \"zeroth\" law often included):\n\n## Zeroth Law\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)\n\n## First Law\nEnergy cannot be created or destroyed, only transferred or converted from one form to another. In essence, this is the **conservation of energy**. The change in a system's internal energy equals the heat added minus the work done by the system.\n\n## Second Law\nThe total **entropy** (disorder) of an isolated system can never decrease over time. Heat naturally flows from hotter to cooler objects, not the reverse. This means no process is perfectly efficient, and it establishes the \"arrow of time.\"\n\n## Third Law\nAs a system's temperature approaches **absolute zero** (0 Kelvin / −273.15°C), its entropy approaches a minimum value. It is impossible to reach absolute zero in a finite number of steps.\n\n---\n\nTogether, these laws govern how energy behaves in all physical and chemical processes, from engines to stars to biological systems."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-48)
* [ Output ](#tab-panel-49)

```

{

    "messages": [

        {

            "role": "user",

            "content": "How do I read a JSON file in Python?"

        }

    ],

    "max_tokens": 1024,

    "system": "You are a helpful coding assistant specializing in Python.",

    "temperature": 0.3

}


```

Explain Code

```

{

    "text": "# Reading a JSON File in Python\n\nPython has a built-in `json` module that makes it easy to read JSON files. Here are the most common approaches:\n\n## Basic Example\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Step-by-Step Breakdown\n\n| Step | Code | Description |\n|------|------|-------------|\n| 1 | `import json` | Import the built-in JSON module |\n| 2 | `open('data.json', 'r')` | Open the file in **read** mode |\n| 3 | `json.load(file)` | Parse the JSON into a Python object |\n\n## Common Scenarios\n\n### Reading into a Dictionary\n```python\nimport json\n\nwith open('config.json', 'r') as file:\n    config = json.load(file)\n\n# Access values like a normal dictionary\nprint(config['name'])\nprint(config['settings']['theme'])\n```\n\n### Reading a JSON String (not a file)\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() with an 's'\n\nprint(data['name'])  # Output: Alice\n```\n\n### Handling Errors\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\n```\n\n### Specifying Encoding\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n## Key Differences\n\n| Method | Input | Use Case |\n|--------|-------|----------|\n| `json.load(file)` | **File object** | Reading from a `.json` file |\n| `json.loads(string)` | **String** | Parsing a JSON-formatted string |\n\n## JSON → Python Type Mapping\n\n| JSON Type | Python Type |\n|-----------|-------------|\n| `object`  | `dict`      |\n| `array`   | `list`      |\n| `string`  | `str`       |\n| `number`  | `int`/`float` |\n| `true/false` | `True`/`False` |\n| `null`    | `None`      |\n\n> **Tip:** Always use the `with` statement when opening files — it ensures the file is properly closed, even if an error occurs."

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-52)
* [ Output ](#tab-panel-53)

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

    "max_tokens": 1024

}


```

Explain Code

```

{

    "text": "# Great Stops Between SF & LA\n\nHere are some popular options depending on your route:\n\n## Coastal Route (Highway 1) 🌊\nThis is the scenic route (~8-10 hours with stops):\n- **Half Moon Bay** – Beautiful coastal town, great seafood\n- **Santa Cruz** – Boardwalk, surfing, laid-back vibe\n- **Monterey/Carmel** – Monterey Bay Aquarium, 17-Mile Drive\n- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls\n- **San Simeon** – Hearst Castle, elephant seal colony\n- **San Luis Obispo** – Charming college town, great food\n- **Santa Barbara** – \"American Riviera,\" wine country, beaches\n- **Solvang** – Danish-style village with bakeries & windmills\n\n## Inland Route (I-5) 🚗\nThis is the fastest route (~5-6 hours):\n- **Harris Ranch** – Popular rest stop with a restaurant\n- **Bakersfield** – Buck Owens' Crystal Palace (country music)\n- Not as scenic, but efficient!\n\n## Tips:\n- ⛽ Fill up before Big Sur (limited gas stations)\n- 📸 Start early for the best light on Highway 1\n- 🏨 Consider an overnight stop if taking the coastal route\n\n**Which route interests you more – scenic or fast?**"

}


```

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-50)
* [ Output ](#tab-panel-51)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Write a short story opening about a detective finding an unusual clue."

        }

    ],

    "max_tokens": 512,

    "temperature": 0.8

}


```

Explain Code

```

{

    "text": "# The Orchid on the Windowsill\n\nDetective Mara Solis had seen her share of crime scenes—enough to know when something didn't belong.\n\nThe apartment was almost aggressively ordinary. Beige carpet, IKEA furniture, a stack of unopened mail on the kitchen counter. The victim, Gerald Pryce, age fifty-two, accountant, had lived the kind of life that left barely a thumbprint on the world. Even in death, slumped against his recliner with a single stab wound beneath the ribs, he seemed to be trying not to make a fuss.\n\nBut there, on the windowsill above the kitchen sink, sat a black orchid.\n\nNot dark purple. Not deep burgundy masquerading as black under bad lighting. Mara leaned closer, pulling on a fresh glove, and tilted the pot toward the gray morning light filtering through the blinds. The petals were the pure, liquid black of a moonless lake—a color that shouldn't exist in nature.\n\nAnd as far as the department's botanist would confirm six hours later, it didn't.\n\n\"No soil,\" Mara murmured, peering into the ceramic pot. The orchid's roots wrapped around nothing but a small, folded piece of vellum paper, yellowed at the edges. She extracted it with tweezers and opened it carefully.\n\nA single line, handwritten in red ink:\n\n*He was not the first, and you already know me.*\n\nMara set the note down. Her hands were steady. Her pulse was not.\n\nShe read it again—not because she needed to, but because some part of her recognized the handwriting."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-54)
* [ Output ](#tab-panel-55)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Explain the concept of recursion with a simple example."

        }

    ],

    "max_tokens": 1024,

    "stream": true

}


```

Explain Code

```

{

    "text": [

        "#",

        " Understanding Recursion\n\n## The Concept\n\n**Recursion** is a programming technique where a **function calls itself** to solve a problem by breaking it down into smaller, sim",

        "pler sub-problems. Every recursive function needs:\n\n1. **Base Case** – A condition that stops the recursion (",

        "prevents infinite loops).\n2. **Recursive Case** – The function calling itself with a *smaller* or *simpler* input",

        ".\n\n> **Think of it like Russian nesting dolls** 🪆 ",

        "— you keep opening a smaller doll until",

        " you reach the tiniest one (the base case).\n\n---\n\n## Simple Example: Factorial\n\nThe factorial of `n` (",

        "written `n!`) is:\n`5! = 5 × 4 × 3 × 2 × 1 = 120",

        "`\n\n```python\ndef factorial(n):\n    # Base case: stop when n is 0 or 1\n    if n <= 1:\n        return 1\n\n    # Recursive case: n *",

        " factorial of (n-1)\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n---\n\n## How It Works (",

        "Call Stack)\n\n```\nfactorial(5)\n│\n├─ 5 * factorial(4)\n│      ├─ 4 * factorial(3)\n│      │      ",

        "├─ 3 * factorial(2)\n│      │      │      ├─ 2 * factorial(1)\n│      │      │      │      └─ returns 1",

        "  ← Base case hit!\n│      │      │      └─ returns 2 × 1 = 2\n│      │      └─ returns ",

        "3 × 2 = 6\n│      └─ returns 4 × 6 = 24\n└─ returns 5 × 24 = 120 ✅",

        "\n```\n\n---\n\n## Key Takeaways\n\n| Aspect | Description |\n|---|---|\n| **Base Case** | `if n <= 1: return ",

        "1` — stops the recursion |\n| **Recursive Case** | `n * factorial(n - 1)` — moves toward the base case |\n| **Risk",

        "** | Missing a base case → **infinite loop** (stack overflow 💥",

        ") |\n| **Alternative** | Most recursive solutions can also be written as",

        " **loops** (iteration) |\n\n> **Rule of thumb:** If a",

        " problem can be defined in terms of a *smaller version of itself*, recurs",

        "ion is a natural fit (e.g., tree traversal, searching, sorting, mathematical",

        " sequences)."

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-58)
* [ Output ](#tab-panel-59)

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

* [ Input ](#tab-panel-56)
* [ Output ](#tab-panel-57)

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
