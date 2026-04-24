---
title: Claude Sonnet 4
description: Claude Sonnet 4 delivers superior coding and reasoning while responding more precisely to instructions, a significant upgrade over previous versions.
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

#  Claude Sonnet 4 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4` 

Claude Sonnet 4 delivers superior coding and reasoning while responding more precisely to instructions, a significant upgrade over previous versions.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                              |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                           |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Input ](#tab-panel-64)
* [ Output ](#tab-panel-65)

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

    "text": "The three laws of thermodynamics are fundamental principles that govern energy and heat:\n\n## First Law of Thermodynamics\n**Energy cannot be created or destroyed, only converted from one form to another.**\n- Also known as the law of conservation of energy\n- The total energy of an isolated system remains constant\n- Mathematically: ΔU = Q - W (change in internal energy equals heat added minus work done by the system)\n\n## Second Law of Thermodynamics\n**The entropy (disorder) of an isolated system always increases over time.**\n- Heat flows naturally from hot to cold objects, never the reverse (without external work)\n- No heat engine can be 100% efficient\n- It's impossible to convert heat completely into work without some energy being lost as waste heat\n\n## Third Law of Thermodynamics\n**The entropy of a perfect crystal approaches zero as temperature approaches absolute zero.**\n- Absolute zero (0 Kelvin or -273.15°C) represents the theoretical point where molecular motion stops\n- It's impossible to reach absolute zero in a finite number of steps\n\n*Note: Some formulations include a \"zeroth law\" about thermal equilibrium, making it technically four laws, but the three above are the classical formulation.*"

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Input ](#tab-panel-66)
* [ Output ](#tab-panel-67)

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

    "text": "Here are several ways to read a JSON file in Python:\n\n## Basic Method\n\n```python\nimport json\n\n# Read JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n    print(data)\n```\n\n## With Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\n        print(data)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\nexcept Exception as e:\n    print(f\"An error occurred: {e}\")\n```\n\n## Specifying Encoding\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n    print(data)\n```\n\n## Reading JSON String (if you have JSON as a string)\n\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\nprint(data)\n```\n\n## Example with Sample Data\n\nLet's say you have a file called `example.json`:\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 25,\n    \"city\": \"New York\",\n    \"hobbies\": [\"reading\", \"swimming\"]\n}\n```\n\nReading and accessing the data:\n```python\nimport json\n\nwith open('example.json', 'r') as file:\n    data = json.load(file)\n    \n    print(f\"Name: {data['name']}\")\n    print(f\"Age: {data['age']}\")\n    print(f\"Hobbies: {', '.join(data['hobbies'])}\")\n```\n\n## Key Points:\n- Use `json.load()` for files\n- Use `json.loads()` for strings\n- Always use `with open()` for proper file handling\n- Add error handling for production code\n- The JSON data becomes a Python dictionary/list after loading"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Input ](#tab-panel-70)
* [ Output ](#tab-panel-71)

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

    "text": "Here are some great stops along the SF to LA route:\n\n**If taking the coastal route (Highway 1/PCH):**\n- **Monterey/Carmel** - Monterey Bay Aquarium, charming Carmel-by-the-Sea\n- **Big Sur** - Stunning coastal views, McWay Falls, Bixby Creek Bridge\n- **Hearst Castle** - Historic mansion in San Simeon\n- **Morro Bay** - Iconic Morro Rock and waterfront\n- **San Luis Obispo** - Charming downtown and historic mission\n- **Pismo Beach** - Beautiful beaches and dunes\n\n**If taking the faster inland route (I-5):**\n- **Gilroy** - Famous garlic capital\n- **Paso Robles** - Wine country with great tastings\n- **Santa Ynez Valley** - More wine regions, Danish-style Solvang\n\n**Mixed route option:** Take Highway 1 partway for scenery, then cut inland via Highway 46 or 101.\n\nThe coastal route takes 7-9 hours with stops but offers incredible views. The inland route is faster (5-6 hours) but less scenic.\n\nWhat type of experience are you looking for - scenic beauty, food, wine, or quick travel time?"

}


```

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Input ](#tab-panel-68)
* [ Output ](#tab-panel-69)

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

    "text": "Detective Sarah Chen crouched beside the mahogany desk, her latex gloves squeaking against the wood as she carefully lifted what appeared to be an ordinary paper clip. But this one was different—twisted into an intricate knot that seemed to defy the laws of physics, its metal curves flowing impossibly through themselves like a three-dimensional puzzle.\n\n\"Henderson, come look at this,\" she called to her partner, who was dusting for prints near the shattered window. The morning light caught the paper clip's surface, revealing tiny etchings along its length—symbols that looked almost like writing, but in no alphabet she recognized.\n\nThe victim, renowned mathematician Dr. Marcus Webb, lay slumped in his chair just inches away, no visible wounds, no signs of struggle. Just him, his cluttered study, and this impossible piece of bent metal that hurt her eyes to look at directly.\n\nHenderson whistled low as he peered over her shoulder. \"That's... that's not possible. Metal doesn't bend that way.\"\n\nSarah felt a chill run down her spine as she realized the paper clip was warm to the touch, despite the October morning air seeping through the broken window. Whatever had happened in this room last night, she was certain this strange little object held the key to understanding it."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Input ](#tab-panel-72)
* [ Output ](#tab-panel-73)

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

        " Recursion Explained\n\n**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.\n\n## Key Components",

        " of Recursion\n\n1. **Base case**: A condition that stops the recursion\n2. **Recursive case**: The function calling itself with a modified input\n\n## Simple",

        " Example: Calculating Factorial\n\nLet's calculate the factorial of a number (n! = n × (n-1) × (n-2) × ... × 1):",

        "\n\n```python\ndef factorial(n):\n    # Base case: stop the recursion\n    if n == 0 or n == 1:\n        return 1\n    ",

        "\n    # Recursive case: function calls itself\n    else:\n        return n * factorial(n - 1)\n\n# Example usage\nprint(factorial(5))  # Output: 120\n```",

        "\n\n## How it works step by step:\n\n```\nfactorial(5)\n├── 5 * factorial(4)\n    ├── 5",

        " * 4 * factorial(3)\n        ├── 5 * 4 * 3 * factorial(2)\n            ├── 5 * 4 * 3 * 2 * factorial(1)\n                └",

        "── 5 * 4 * 3 * 2 * 1 = 120\n```\n\n## Real-world Analogy\n\nThink of **",

        "Russian nesting dolls**: To see what's inside,",

        " you open one doll, then another smaller doll inside, and so on, until you reach",

        " the smallest doll (base case). Then you put them back",

        " together in reverse order.\n\n## Why Use Recursion?\n\n- Makes complex problems sim",

        "pler to understand and code\n- Natural fit for problems with repet",

        "itive, self-similar structure\n- Common in tree traversal, mathematical sequences, and divide",

        "-and-conquer algorithms\n\n**Remember**: Always ensure you have a proper base case to avoid infinite recursion!"

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-76)
* [ Output ](#tab-panel-77)

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

* [ Input ](#tab-panel-74)
* [ Output ](#tab-panel-75)

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
