---
title: Claude Opus 4.6
description: Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

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

* [ TypeScript ](#tab-panel-134)
* [ cURL ](#tab-panel-135)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-opus-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-138)
* [ Raw response ](#tab-panel-139)

# The Laws of Thermodynamics

Here are the three main laws (along with the "zeroth" law often included):

## Zeroth Law
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)

## First Law
Energy cannot be created or destroyed, only transferred or converted from one form to another. In essence, this is the **conservation of energy**. The change in a system's internal energy equals the heat added minus the work done by the system.

## Second Law
The total **entropy** (disorder) of an isolated system can never decrease over time. Heat naturally flows from hotter to cooler objects, not the reverse. This means no process is perfectly efficient, and it establishes the "arrow of time."

## Third Law
As a system's temperature approaches **absolute zero** (0 Kelvin / −273.15°C), its entropy approaches a minimum value. It is impossible to reach absolute zero in a finite number of steps.

---

Together, these laws govern how energy behaves in all physical and chemical processes, from engines to stars to biological systems.

```

{

  "content": [

    {

      "text": "# The Laws of Thermodynamics\n\nHere are the three main laws (along with the \"zeroth\" law often included):\n\n## Zeroth Law\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)\n\n## First Law\nEnergy cannot be created or destroyed, only transferred or converted from one form to another. In essence, this is the **conservation of energy**. The change in a system's internal energy equals the heat added minus the work done by the system.\n\n## Second Law\nThe total **entropy** (disorder) of an isolated system can never decrease over time. Heat naturally flows from hotter to cooler objects, not the reverse. This means no process is perfectly efficient, and it establishes the \"arrow of time.\"\n\n## Third Law\nAs a system's temperature approaches **absolute zero** (0 Kelvin / −273.15°C), its entropy approaches a minimum value. It is impossible to reach absolute zero in a finite number of steps.\n\n---\n\nTogether, these laws govern how energy behaves in all physical and chemical processes, from engines to stars to biological systems.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01Ss13EYxkyh29CJXYkdhHk4",

  "model": "claude-opus-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 257

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-136)
* [ cURL ](#tab-panel-137)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],

    system: 'You are a helpful coding assistant specializing in Python.',

    temperature: 0.3,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-opus-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "How do I read a JSON file in Python?",

      "role": "user"

    }

  ],

  "system": "You are a helpful coding assistant specializing in Python.",

  "temperature": 0.3

}'


```

* [ Output ](#tab-panel-142)
* [ Raw response ](#tab-panel-143)

# Reading a JSON File in Python

Python has a built-in `json` module that makes it easy to read JSON files. Here are the most common approaches:

## Basic Example

```python
import json

# Open and read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Step-by-Step Breakdown

| Step | Code | Description |
|------|------|-------------|
| 1 | `import json` | Import the built-in JSON module |
| 2 | `open('data.json', 'r')` | Open the file in **read** mode |
| 3 | `json.load(file)` | Parse the JSON into a Python object |

## Common Scenarios

### Reading into a Dictionary
```python
import json

with open('config.json', 'r') as file:
    config = json.load(file)

# Access values like a normal dictionary
print(config['name'])
print(config['settings']['theme'])
```

### Reading a JSON String (not a file)
```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)  # Note: loads() with an 's'

print(data['name'])  # Output: Alice
```

### Handling Errors
```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

### Specifying Encoding
```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

## Key Differences

| Method | Input | Use Case |
|--------|-------|----------|
| `json.load(file)` | **File object** | Reading from a `.json` file |
| `json.loads(string)` | **String** | Parsing a JSON-formatted string |

## JSON → Python Type Mapping

| JSON Type | Python Type |
|-----------|-------------|
| `object`  | `dict`      |
| `array`   | `list`      |
| `string`  | `str`       |
| `number`  | `int`/`float` |
| `true/false` | `True`/`False` |
| `null`    | `None`      |

> **Tip:** Always use the `with` statement when opening files — it ensures the file is properly closed, even if an error occurs.

```

{

  "content": [

    {

      "text": "# Reading a JSON File in Python\n\nPython has a built-in `json` module that makes it easy to read JSON files. Here are the most common approaches:\n\n## Basic Example\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Step-by-Step Breakdown\n\n| Step | Code | Description |\n|------|------|-------------|\n| 1 | `import json` | Import the built-in JSON module |\n| 2 | `open('data.json', 'r')` | Open the file in **read** mode |\n| 3 | `json.load(file)` | Parse the JSON into a Python object |\n\n## Common Scenarios\n\n### Reading into a Dictionary\n```python\nimport json\n\nwith open('config.json', 'r') as file:\n    config = json.load(file)\n\n# Access values like a normal dictionary\nprint(config['name'])\nprint(config['settings']['theme'])\n```\n\n### Reading a JSON String (not a file)\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() with an 's'\n\nprint(data['name'])  # Output: Alice\n```\n\n### Handling Errors\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\n```\n\n### Specifying Encoding\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n## Key Differences\n\n| Method | Input | Use Case |\n|--------|-------|----------|\n| `json.load(file)` | **File object** | Reading from a `.json` file |\n| `json.loads(string)` | **String** | Parsing a JSON-formatted string |\n\n## JSON → Python Type Mapping\n\n| JSON Type | Python Type |\n|-----------|-------------|\n| `object`  | `dict`      |\n| `array`   | `list`      |\n| `string`  | `str`       |\n| `number`  | `int`/`float` |\n| `true/false` | `True`/`False` |\n| `null`    | `None`      |\n\n> **Tip:** Always use the `with` statement when opening files — it ensures the file is properly closed, even if an error occurs.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01XBD4XMEahrUEnEVbu4gPwV",

  "model": "claude-opus-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 29,

    "output_tokens": 643

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-146)
* [ cURL ](#tab-panel-147)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

  {

    max_tokens: 1024,

    messages: [

      {

        content: 'I need help planning a road trip from San Francisco to Los Angeles.',

        role: 'user',

      },

      {

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

        role: 'assistant',

      },

      { content: 'Yes, what are some good places to stop?', role: 'user' },

    ],

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-opus-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "I need help planning a road trip from San Francisco to Los Angeles.",

      "role": "user"

    },

    {

      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      "role": "assistant"

    },

    {

      "content": "Yes, what are some good places to stop?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-148)
* [ Raw response ](#tab-panel-149)

# Great Stops Between SF & LA

Here are some popular options depending on your route:

## Coastal Route (Highway 1) 🌊
This is the scenic route (~8-10 hours with stops):
- **Half Moon Bay** – Beautiful coastal town, great seafood
- **Santa Cruz** – Boardwalk, surfing, laid-back vibe
- **Monterey/Carmel** – Monterey Bay Aquarium, 17-Mile Drive
- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls
- **San Simeon** – Hearst Castle, elephant seal colony
- **San Luis Obispo** – Charming college town, great food
- **Santa Barbara** – "American Riviera," wine country, beaches
- **Solvang** – Danish-style village with bakeries & windmills

## Inland Route (I-5) 🚗
This is the fastest route (~5-6 hours):
- **Harris Ranch** – Popular rest stop with a restaurant
- **Bakersfield** – Buck Owens' Crystal Palace (country music)
- Not as scenic, but efficient!

## Tips:
- ⛽ Fill up before Big Sur (limited gas stations)
- 📸 Start early for the best light on Highway 1
- 🏨 Consider an overnight stop if taking the coastal route

**Which route interests you more – scenic or fast?**

```

{

  "content": [

    {

      "text": "# Great Stops Between SF & LA\n\nHere are some popular options depending on your route:\n\n## Coastal Route (Highway 1) 🌊\nThis is the scenic route (~8-10 hours with stops):\n- **Half Moon Bay** – Beautiful coastal town, great seafood\n- **Santa Cruz** – Boardwalk, surfing, laid-back vibe\n- **Monterey/Carmel** – Monterey Bay Aquarium, 17-Mile Drive\n- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls\n- **San Simeon** – Hearst Castle, elephant seal colony\n- **San Luis Obispo** – Charming college town, great food\n- **Santa Barbara** – \"American Riviera,\" wine country, beaches\n- **Solvang** – Danish-style village with bakeries & windmills\n\n## Inland Route (I-5) 🚗\nThis is the fastest route (~5-6 hours):\n- **Harris Ranch** – Popular rest stop with a restaurant\n- **Bakersfield** – Buck Owens' Crystal Palace (country music)\n- Not as scenic, but efficient!\n\n## Tips:\n- ⛽ Fill up before Big Sur (limited gas stations)\n- 📸 Start early for the best light on Highway 1\n- 🏨 Consider an overnight stop if taking the coastal route\n\n**Which route interests you more – scenic or fast?**",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_019VVbDba57acjUFWYzMdWQV",

  "model": "claude-opus-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 340

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-140)
* [ cURL ](#tab-panel-141)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

  {

    max_tokens: 512,

    messages: [

      {

        content: 'Write a short story opening about a detective finding an unusual clue.',

        role: 'user',

      },

    ],

    temperature: 0.8,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-opus-4.6",

  "max_tokens": 512,

  "messages": [

    {

      "content": "Write a short story opening about a detective finding an unusual clue.",

      "role": "user"

    }

  ],

  "temperature": 0.8

}'


```

* [ Output ](#tab-panel-150)
* [ Raw response ](#tab-panel-151)

# The Orchid on the Windowsill

Detective Mara Solis had seen her share of crime scenes—enough to know when something didn't belong.

The apartment was almost aggressively ordinary. Beige carpet, IKEA furniture, a stack of unopened mail on the kitchen counter. The victim, Gerald Pryce, age fifty-two, accountant, had lived the kind of life that left barely a thumbprint on the world. Even in death, slumped against his recliner with a single stab wound beneath the ribs, he seemed to be trying not to make a fuss.

But there, on the windowsill above the kitchen sink, sat a black orchid.

Not dark purple. Not deep burgundy masquerading as black under bad lighting. Mara leaned closer, pulling on a fresh glove, and tilted the pot toward the gray morning light filtering through the blinds. The petals were the pure, liquid black of a moonless lake—a color that shouldn't exist in nature.

And as far as the department's botanist would confirm six hours later, it didn't.

"No soil," Mara murmured, peering into the ceramic pot. The orchid's roots wrapped around nothing but a small, folded piece of vellum paper, yellowed at the edges. She extracted it with tweezers and opened it carefully.

A single line, handwritten in red ink:

*He was not the first, and you already know me.*

Mara set the note down. Her hands were steady. Her pulse was not.

She read it again—not because she needed to, but because some part of her recognized the handwriting.

```

{

  "content": [

    {

      "text": "# The Orchid on the Windowsill\n\nDetective Mara Solis had seen her share of crime scenes—enough to know when something didn't belong.\n\nThe apartment was almost aggressively ordinary. Beige carpet, IKEA furniture, a stack of unopened mail on the kitchen counter. The victim, Gerald Pryce, age fifty-two, accountant, had lived the kind of life that left barely a thumbprint on the world. Even in death, slumped against his recliner with a single stab wound beneath the ribs, he seemed to be trying not to make a fuss.\n\nBut there, on the windowsill above the kitchen sink, sat a black orchid.\n\nNot dark purple. Not deep burgundy masquerading as black under bad lighting. Mara leaned closer, pulling on a fresh glove, and tilted the pot toward the gray morning light filtering through the blinds. The petals were the pure, liquid black of a moonless lake—a color that shouldn't exist in nature.\n\nAnd as far as the department's botanist would confirm six hours later, it didn't.\n\n\"No soil,\" Mara murmured, peering into the ceramic pot. The orchid's roots wrapped around nothing but a small, folded piece of vellum paper, yellowed at the edges. She extracted it with tweezers and opened it carefully.\n\nA single line, handwritten in red ink:\n\n*He was not the first, and you already know me.*\n\nMara set the note down. Her hands were steady. Her pulse was not.\n\nShe read it again—not because she needed to, but because some part of her recognized the handwriting.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01Q6DJ95CWj3L7QbCZ7onQHq",

  "model": "claude-opus-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 374

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-144)
* [ cURL ](#tab-panel-145)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],

    stream: true,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-opus-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "Explain the concept of recursion with a simple example.",

      "role": "user"

    }

  ],

  "stream": true

}'


```

* [ Output ](#tab-panel-152)
* [ Raw response ](#tab-panel-153)

# Understanding Recursion

## The Concept

**Recursion** is a programming technique where a **function calls itself** to solve a problem by breaking it down into smaller, simpler sub-problems. Every recursive function needs:

1. **Base Case** – A condition that stops the recursion (prevents infinite loops).
2. **Recursive Case** – The function calling itself with a *smaller* or *simpler* input.

> **Think of it like Russian nesting dolls** 🪆 — you keep opening a smaller doll until you reach the tiniest one (the base case).

---

## Simple Example: Factorial

The factorial of `n` (written `n!`) is:
`5! = 5 × 4 × 3 × 2 × 1 = 120`

```python
def factorial(n):
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1

    # Recursive case: n * factorial of (n-1)
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

---

## How It Works (Call Stack)

```
factorial(5)
│
├─ 5 * factorial(4)
│      ├─ 4 * factorial(3)
│      │      ├─ 3 * factorial(2)
│      │      │      ├─ 2 * factorial(1)
│      │      │      │      └─ returns 1  ← Base case hit!
│      │      │      └─ returns 2 × 1 = 2
│      │      └─ returns 3 × 2 = 6
│      └─ returns 4 × 6 = 24
└─ returns 5 × 24 = 120 ✅
```

---

## Key Takeaways

| Aspect | Description |
|---|---|
| **Base Case** | `if n <= 1: return 1` — stops the recursion |
| **Recursive Case** | `n * factorial(n - 1)` — moves toward the base case |
| **Risk** | Missing a base case → **infinite loop** (stack overflow 💥) |
| **Alternative** | Most recursive solutions can also be written as **loops** (iteration) |

> **Rule of thumb:** If a problem can be defined in terms of a *smaller version of itself*, recursion is a natural fit (e.g., tree traversal, searching, sorting, mathematical sequences).

```

[

  {

    "message": {

      "content": [],

      "id": "msg_01LArxxRsu9fHtfj6gJafVbZ",

      "model": "claude-opus-4-6",

      "role": "assistant",

      "stop_details": null,

      "stop_reason": null,

      "stop_sequence": null,

      "type": "message",

      "usage": {

        "cache_creation": {

          "ephemeral_1h_input_tokens": 0,

          "ephemeral_5m_input_tokens": 0

        },

        "cache_creation_input_tokens": 0,

        "cache_read_input_tokens": 0,

        "inference_geo": "global",

        "input_tokens": 19,

        "output_tokens": 1,

        "service_tier": "standard"

      }

    },

    "type": "message_start"

  },

  {

    "content_block": {

      "text": "",

      "type": "text"

    },

    "index": 0,

    "type": "content_block_start"

  },

  {

    "type": "ping"

  },

  {

    "delta": {

      "text": "#",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " Understanding Recursion\n\n## The Concept\n\n**Recursion** is a programming technique where a **function calls itself** to solve a problem by breaking it down into smaller, sim",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "pler sub-problems. Every recursive function needs:\n\n1. **Base Case** – A condition that stops the recursion (",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "prevents infinite loops).\n2. **Recursive Case** – The function calling itself with a *smaller* or *simpler* input",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ".\n\n> **Think of it like Russian nesting dolls** 🪆 ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "— you keep opening a smaller doll until",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " you reach the tiniest one (the base case).\n\n---\n\n## Simple Example: Factorial\n\nThe factorial of `n` (",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "written `n!`) is:\n`5! = 5 × 4 × 3 × 2 × 1 = 120",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "`\n\n```python\ndef factorial(n):\n    # Base case: stop when n is 0 or 1\n    if n <= 1:\n        return 1\n\n    # Recursive case: n *",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " factorial of (n-1)\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n---\n\n## How It Works (",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "Call Stack)\n\n```\nfactorial(5)\n│\n├─ 5 * factorial(4)\n│      ├─ 4 * factorial(3)\n│      │      ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "├─ 3 * factorial(2)\n│      │      │      ├─ 2 * factorial(1)\n│      │      │      │      └─ returns 1",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "  ← Base case hit!\n│      │      │      └─ returns 2 × 1 = 2\n│      │      └─ returns ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "3 × 2 = 6\n│      └─ returns 4 × 6 = 24\n└─ returns 5 × 24 = 120 ✅",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n```\n\n---\n\n## Key Takeaways\n\n| Aspect | Description |\n|---|---|\n| **Base Case** | `if n <= 1: return ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "1` — stops the recursion |\n| **Recursive Case** | `n * factorial(n - 1)` — moves toward the base case |\n| **Risk",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "** | Missing a base case → **infinite loop** (stack overflow 💥",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ") |\n| **Alternative** | Most recursive solutions can also be written as",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " **loops** (iteration) |\n\n> **Rule of thumb:** If a",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " problem can be defined in terms of a *smaller version of itself*, recurs",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "ion is a natural fit (e.g., tree traversal, searching, sorting, mathematical",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " sequences).",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "index": 0,

    "type": "content_block_stop"

  },

  {

    "delta": {

      "stop_details": null,

      "stop_reason": "end_turn",

      "stop_sequence": null

    },

    "type": "message_delta",

    "usage": {

      "cache_creation_input_tokens": 0,

      "cache_read_input_tokens": 0,

      "input_tokens": 19,

      "output_tokens": 610

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-154)
* [ Output ](#tab-panel-155)

max\_tokens

`number`requiredexclusiveMinimum: 0

▶messages\[\]

`array`required

▶metadata{}

`object`

stream

`boolean`

system

`string`

temperature

`number`maximum: 1minimum: 0

top\_k

`number`exclusiveMinimum: 0

top\_p

`number`maximum: 1minimum: 0

▶content\[\]

`array`

id

`string`

model

`string`

role

`string`const: assistant

stop\_reason

`string | null`

type

`string`const: message

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
