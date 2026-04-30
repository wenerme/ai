---
title: Claude Sonnet 4.6
description: Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4.6 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4.6` 

Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.

| Model Info                                                                 |                                                                                                                               |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                                |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                    |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4.6) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-90)
* [ Output ](#tab-panel-91)

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

    "text": "There are actually **four laws of thermodynamics** (numbered 0–3), but the three *main* ones most commonly referenced are:\n\n## The Three Main Laws\n\n**1st Law – Conservation of Energy**\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.\n\n**2nd Law – Entropy**\nThe total entropy of an isolated system always increases over time. Heat flows naturally from hot to cold, and processes are irreversible in nature.\n\n**3rd Law – Absolute Zero**\nAs a system approaches absolute zero (0 Kelvin / -273.15°C), its entropy approaches a minimum or constant value. It is impossible to reach absolute zero in a finite number of steps.\n\n---\n\n## The Often-Forgotten Zeroth Law\n**0th Law – Thermal Equilibrium**\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of **temperature**.\n\n---\n\nWould you like a deeper explanation of any of these?"

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-92)
* [ Output ](#tab-panel-93)

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

```

{

    "text": "## Reading a JSON File in Python\n\n### Basic Method using `json` module\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n### Common Approaches\n\n**1. Read as a dictionary/list**\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)  # Returns a Python dict or list\n\n# Access values\nprint(data['key'])\nprint(data['nested']['key'])\n```\n\n**2. Read a JSON string (not a file)**\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\n\nprint(data['name'])  # Output: Alice\n```\n\n**3. Handle encoding explicitly**\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n### Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n### Key Functions Summary\n\n| Function | Use Case |\n|----------|----------|\n| `json.load(file)` | Read from a **file object** |\n| `json.loads(string)` | Read from a **string** |\n| `json.dump(data, file)` | Write to a **file** |\n| `json.dumps(data)` | Convert to a **string** |\n\n### Example JSON file (`data.json`)\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"hobbies\": [\"reading\", \"coding\"]\n}\n```\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data['name'])          # Alice\nprint(data['hobbies'][0])    # reading\n```\n\nThe `json` module is built into Python, so **no installation is needed**."

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-96)
* [ Output ](#tab-panel-97)

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

```

{

    "text": "Here are some great stops depending on which route you take:\n\n**Coastal Route (Highway 1) - Scenic but longer**\n- **Santa Cruz** - Beach boardwalk and pier\n- **Monterey** - Famous aquarium and Cannery Row\n- **Big Sur** - Stunning coastal cliffs and views\n- **San Simeon** - Hearst Castle tours\n- **San Luis Obispo** - Charming college town with good food\n\n**Inland Route (Highway 101 or I-5) - Faster**\n- **Gilroy** - Known as the garlic capital of the world\n- **Paso Robles** - Great wine country\n- **Santa Barbara** - Beautiful beaches and Spanish architecture\n\n**Tips to consider:**\n- The coastal route adds several hours but is one of the most beautiful drives in the US\n- Big Sur can have road closures so check conditions before you go\n- Santa Barbara is worth a stop on either route\n- Try to avoid driving through LA during rush hour\n\n**How long do you have for the trip?** That would help narrow down how many stops make sense. Also, are you interested in:\n- Food and restaurants\n- Outdoor activities\n- History and culture\n- A mix of everything"

}


```

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-94)
* [ Output ](#tab-panel-95)

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

```

{

    "text": "# The Smell of Lavender\n\nDetective Mara Chen had seen a lot of crime scenes in fourteen years on the force. She had learned to read them the way other people read books — patiently, without skipping ahead.\n\nBut this one was giving her trouble.\n\nThe apartment was sparse and cold, its single window open to the November street below. The victim, a retired accountant named Gerald Foss, lay slumped at his kitchen table with no signs of forced entry, no signs of struggle, and — this was the part that nagged at her — no signs that anyone had been upset about anything at all.\n\nEverything was deliberate. Calm.\n\nShe almost missed it.\n\nShe was pulling on a fresh glove when the draft shifted, and there it was — faint, out of place, almost polite. *Lavender.* Not a cleaning product. Not a candle. Something more personal, like soap or a fabric softener pressed warm from a dryer.\n\nMara stood very still.\n\nGerald Foss, according to his neighbor, had been allergic to every flowering plant known to mankind. His medicine cabinet held three different antihistamines. There wasn't a single flower, real or artificial, anywhere in the apartment.\n\nSomeone had been here recently. Someone clean, careful, and completely unafraid.\n\nShe pulled out her notebook and wrote one word.\n\n*Lavender.*\n\nThen she circled it twice."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

Input / Output JSON 

* [ Input ](#tab-panel-98)
* [ Output ](#tab-panel-99)

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

```

{

    "text": [

        "#",

        " Recursion\n\n## Core Concept\n\nRecursion is when a **function calls itself** to solve a smaller",

        " version of the same problem, breaking it down until it reaches a simple base case.\n\nEvery recursive solution",

        " needs:\n1. **Base case** — when to stop\n2. **Recursive case** — calling",

        " itself with a simpler input\n\n---\n\n## Simple Example: Factorial\n\n`5! = 5 × ",

        "4 × 3 × 2 × 1 = 120`\n\n```python\ndef factorial(n):\n    # Base case: stop here",

        "\n    if n == 0:\n        return 1\n\n    # Recursive case: call itself with a smaller value\n    return n * factorial(n - 1)\n\nprint",

        "(factorial(5))  # Output: 120\n```\n\n---\n\n## How It Unfolds\n\n```\nfactorial(5)\n  └",

        "── 5 * factorial(4)\n            └── 4 * factorial(3)\n                      └── 3 * factorial(2)\n                                ",

        "└── 2 * factorial(1)\n                                          └── 1 * factorial(0)\n                                                    └── returns 1  ← base case",

        "\n\n# Then it works back up:\n1 * 1 = 1\n2",

        " * 1 = 2\n3 * 2 = 6\n4 * 6 = 24\n5 * 24 = 120 ✓\n```\n\n---\n\n## The",

        " \"Thousand Clones\" Analogy\n\n> Imagine you're in",

        " a long line and ask *\"what position am I in?\"*\n> You",

        " ask the person in front, who asks the person in front of",

        " them, and so on.\n> The person at the front says **\"I'm #",

        "1\"** (base case), and the answer passes back",

        " down the line.\n\n---\n\n## Key Warnings\n\n| ⚠️ Problem | ",

        "✅ Solution |\n|---|---|\n| No base case → **infinite loop** | Always define a stopping condition |\n| Too",

        " many calls → **stack overflow** | Ensure input gets smaller each time |\n| Can be",

        " slow with repeated work | Use memoization or iteration if needed |\n\n---\n\n##",

        " Recursion vs. Iteration\n\nBoth solve the same problem — recursion is",

        " often **more readable** for naturally nested problems (trees",

        ", folders, fractals), while iteration is more **memory efficient** for simple loops",

        "."

    ]

}


```

## Parameters

* [ Input ](#tab-panel-100)
* [ Output ](#tab-panel-101)

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

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
