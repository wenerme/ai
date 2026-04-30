---
title: Claude Opus 4.7
description: Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.7 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.7` 

Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6\. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
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

Input / Output JSON 

* [ Input ](#tab-panel-54)
* [ Output ](#tab-panel-55)

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

    "text": "# The Three Laws of Thermodynamics\n\n**First Law (Conservation of Energy):**\nEnergy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.\n- Often expressed as: ΔU = Q − W (change in internal energy equals heat added minus work done by the system)\n\n**Second Law (Entropy):**\nThe total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never the reverse without external work.\n- This law explains why perpetual motion machines are impossible and why processes have a preferred direction.\n\n**Third Law (Absolute Zero):**\nAs a system approaches absolute zero (0 Kelvin or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n- A perfect crystal at absolute zero would have zero entropy.\n\n**Bonus — Zeroth Law:**\nOften mentioned alongside these: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement."

}


```

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

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-56)
* [ Output ](#tab-panel-57)

```

{

    "messages": [

        {

            "role": "user",

            "content": "How do I read a JSON file in Python?"

        }

    ],

    "max_tokens": 1024,

    "system": "You are a helpful coding assistant specializing in Python."

}


```

```

{

    "text": "# Reading a JSON File in Python\n\nPython has a built-in `json` module that makes reading JSON files straightforward.\n\n## Basic Example\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Key Points\n\n- **`json.load()`** reads from a file object and parses JSON into Python objects\n- **`json.loads()`** (with an \"s\") parses JSON from a string\n- JSON objects become Python **dictionaries**, and JSON arrays become **lists**\n\n## Complete Example\n\nSuppose you have `data.json`:\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"hobbies\": [\"reading\", \"hiking\"]\n}\n```\n\nYou can read and access it like this:\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n\nprint(data['name'])        # Alice\nprint(data['age'])         # 30\nprint(data['hobbies'][0])  # reading\n```\n\n## Handling Errors\n\nIt's good practice to handle potential errors:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## Bonus: Writing JSON\n\nTo write data back to a JSON file:\n\n```python\nimport json\n\ndata = {\"name\": \"Bob\", \"age\": 25}\n\nwith open('output.json', 'w', encoding='utf-8') as file:\n    json.dump(data, file, indent=4)\n```\n\nThe `indent=4` argument makes the output nicely formatted. Let me know if you'd like help with a specific JSON structure!"

}


```

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

Input / Output JSON 

* [ Input ](#tab-panel-58)
* [ Output ](#tab-panel-59)

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

    "text": "Great choice to explore along the way! Here are some popular stops, organized by route:\n\n## If Taking Highway 1 / Pacific Coast Highway (scenic, ~9-10 hours driving)\n\n- **Half Moon Bay** – Charming coastal town, great for breakfast\n- **Santa Cruz** – Boardwalk, beaches, and redwoods\n- **Monterey** – Famous aquarium and Cannery Row\n- **Carmel-by-the-Sea** – Quaint village with art galleries\n- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls\n- **Hearst Castle** (San Simeon) – Historic mansion tours\n- **Morro Bay** – Iconic Morro Rock and sea otters\n- **Pismo Beach** – Sand dunes and beach town vibes\n- **Santa Barbara** – \"American Riviera,\" wine, and Spanish architecture\n\n## If Taking I-5 (fastest, ~5-6 hours)\n\n- **Harris Ranch** – Famous steakhouse and rest stop\n- **Kettleman City** – Gas and snacks (not much else!)\n- I-5 is efficient but pretty barren—mostly farmland\n\n## If Taking US-101 (middle ground, ~6-7 hours)\n\n- **Gilroy** – Garlic capital, outlet shopping\n- **Paso Robles** – Excellent wine country\n- **San Luis Obispo** – College town with great food\n- **Solvang** – Charming Danish-themed village\n- **Santa Barbara** – Worth visiting on this route too\n\n## Questions to help narrow it down:\n1. How many days do you have for the trip?\n2. Are you more interested in nature, food, history, or beaches?\n3. Traveling solo, with family, or friends?\n\nLet me know and I can build a more detailed itinerary!"

}


```

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated \`temperature\` parameter. 

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

    max_tokens: 2048,

    thinking: {

      type: 'adaptive',

    },

    output_config: {

      effort: 'high',

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-60)
* [ Output ](#tab-panel-61)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Write a short story opening about a detective finding an unusual clue."

        }

    ],

    "max_tokens": 2048,

    "thinking": {

        "type": "adaptive"

    },

    "output_config": {

        "effort": "high"

    }

}


```

```

{

    "text": "# The Wrong Kind of Silence\n\nDetective Mara Halloran had worked enough crime scenes to know that rooms had voices. A kitchen where someone had fled mid-breakfast hummed with interruption. A bedroom after a struggle kept the echo of it in the disarranged sheets, the lamp knocked just-so.\n\nBut the study at 14 Pearsmont Lane was quiet in a way she didn't recognize.\n\nShe stood in the doorway, coffee going cold in her hand, and tried to name it. The body had already been photographed and carried out—Gerald Finch, seventy-two, retired cartographer, found slumped over his desk by the housekeeper at half past six. No forced entry. No wound. The coroner was calling it natural until the tox screen said otherwise.\n\nMara stepped inside. Bookshelves. A globe. The smell of pipe tobacco clinging to the curtains like an old apology. Everything where a dead man's things ought to be.\n\nExcept.\n\nOn the desk, beside the blotter where Finch's forehead had rested, someone had laid out seven grains of rice in a perfect, deliberate row.\n\nNot spilled. Not scattered. *Placed.*\n\nShe crouched until her eyes were level with the desktop. The grains were evenly spaced, each one turned so its seam faced the same direction—north, if she was reading the window light right. The housekeeper hadn't mentioned them. The first responders hadn't logged them. And Gerald Finch, according to three separate statements, hadn't eaten rice in forty years. Couldn't stand the stuff, his sister had said. Something about the war.\n\nMara straightened slowly, her knees protesting, and felt the quiet of the room press against her ears.\n\nSeven grains. Facing north. On the desk of a man who drew maps for a living.\n\n\"Well, Gerald,\" she murmured, reaching for her notebook. \"Who were you trying to tell?\""

}


```

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

Input / Output JSON 

* [ Input ](#tab-panel-62)
* [ Output ](#tab-panel-63)

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

        "# Recursion",

        " Explained\n\n**Recursion** is a programming concept where a function calls itself to solve a smaller version of the same problem,",

        " until it reaches a simple case it can solve directly.\n\n## Two Ess",

        "ential Parts\n\nEvery recursive function needs:\n\n1. **Base case** — a condition that st",

        "ops the recursion (prevents infinite loops)\n2. **Recursive case** — the function calling itself with a",

        " smaller/simpler input\n\n## Simple Example: Factorial\n\nThe factorial of a number `",

        "n` (written `n!`) is the product of all positive integers up to `n`.\n\n- `",

        "5! = 5 × 4 × 3 × 2 × 1 = 120`\n\nNotice that `5! = 5 × 4!",

        "`, and `4! = 4 × 3!`, and so on. This self-similar p",

        "attern is perfect for recursion.\n\n```python\ndef factorial(n):\n    # Base case: st",

        "op when n is 0 or 1\n    if n <= 1:\n        return 1\n    # Recursive case: n × factorial of (",

        "n-1)\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n## How",

        " It Works (Step by Step)\n\nWhen you call `factorial(5)`:\n\n```\nfactorial(5) = 5 × factorial",

        "(4)\n             = 5 × (4 × factorial(3))\n             = 5 × (4 × (3 × factorial(2)))\n             = 5 × (4 × (3 × (2 × factorial",

        "(1))))\n             = 5 × (4 × (3 × (2 × 1)))     ← base case hit!\n             = 120",

        "\n```\n\n## Real-World Analogy\n\nThink of **Russian nesting dolls** 🪆",

        ". To find the smallest doll, you open one, find another in",

        "side, open that, find another... until finally you reach the tiniest doll that",

        " doesn't open. That \"tiniest doll\" is your base case.\n\n## Key Takeaway\n\nRecursion",

        " is elegant for problems that can be broken into **sm",

        "aller versions of themselves** — like traversing trees, nav",

        "igating folders, or solving puzzles like the Tower of Hanoi. Just remember: **",

        "always include a base case**, or your program will cr",

        "ash with a stack overflow!"

    ]

}


```

## Parameters

* [ Input ](#tab-panel-64)
* [ Output ](#tab-panel-65)

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

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
