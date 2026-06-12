---
title: Claude Opus 4.5
description: Claude Opus 4.5 brings further reasoning, coding, and agentic improvements over Opus 4.1, with stronger tool use and tighter instruction following.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.5 

Text Generation • Anthropic 

`anthropic/claude-opus-4.5` 

Claude Opus 4.5 brings further reasoning, coding, and agentic improvements over Opus 4.1, with stronger tool use and tighter instruction following.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                              |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Zero data retention                                                        | Yes                                                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.5) |

## Usage

* [ TypeScript ](#tab-panel-156)
* [ cURL ](#tab-panel-157)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.5',

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

  "model": "anthropic/claude-opus-4.5",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-160)
* [ Raw response ](#tab-panel-161)

The three laws of thermodynamics are:

**First Law (Conservation of Energy):** Energy cannot be created or destroyed, only transferred or converted from one form to another. In a closed system, the change in internal energy equals heat added minus work done by the system.

**Second Law (Entropy):** In any natural process, the total entropy of an isolated system always increases or remains constant; it never decreases. Heat flows spontaneously from hot to cold, not the reverse. This also establishes that no heat engine can be 100% efficient.

**Third Law (Absolute Zero):** As temperature approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero in a finite number of steps.

There's also sometimes a **Zeroth Law** mentioned, which states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other—essentially establishing temperature as a transitive property.

```

{

  "content": [

    {

      "text": "The three laws of thermodynamics are:\n\n**First Law (Conservation of Energy):** Energy cannot be created or destroyed, only transferred or converted from one form to another. In a closed system, the change in internal energy equals heat added minus work done by the system.\n\n**Second Law (Entropy):** In any natural process, the total entropy of an isolated system always increases or remains constant; it never decreases. Heat flows spontaneously from hot to cold, not the reverse. This also establishes that no heat engine can be 100% efficient.\n\n**Third Law (Absolute Zero):** As temperature approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero in a finite number of steps.\n\nThere's also sometimes a **Zeroth Law** mentioned, which states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other—essentially establishing temperature as a transitive property.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01KCBDSEEzS8kikdpAQHP1qf",

  "model": "claude-opus-4-5-20251101",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 215

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-158)
* [ cURL ](#tab-panel-159)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.5',

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

  "model": "anthropic/claude-opus-4.5",

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

* [ Output ](#tab-panel-164)
* [ Raw response ](#tab-panel-165)

# Reading JSON Files in Python

Python's built-in `json` module makes it easy to read JSON files.

## Basic Example

```python
import json

# Read JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Common Scenarios

### Reading a JSON file with error handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError:
    print("Invalid JSON format")
```

### Reading a JSON string (not a file)

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()

print(data['name'])  # Output: Alice
```

### Reading with specific encoding

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

## Key Functions

| Function | Use Case |
|----------|----------|
| `json.load(file)` | Read from a file object |
| `json.loads(string)` | Parse a JSON string |

The result is typically a Python dictionary or list that you can work with normally.

```

{

  "content": [

    {

      "text": "# Reading JSON Files in Python\n\nPython's built-in `json` module makes it easy to read JSON files.\n\n## Basic Example\n\n```python\nimport json\n\n# Read JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Common Scenarios\n\n### Reading a JSON file with error handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format\")\n```\n\n### Reading a JSON string (not a file)\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\n\nprint(data['name'])  # Output: Alice\n```\n\n### Reading with specific encoding\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n## Key Functions\n\n| Function | Use Case |\n|----------|----------|\n| `json.load(file)` | Read from a file object |\n| `json.loads(string)` | Parse a JSON string |\n\nThe result is typically a Python dictionary or list that you can work with normally.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_013RFtndBKXc2aNHCwT6Q3cP",

  "model": "claude-opus-4-5-20251101",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 28,

    "output_tokens": 338

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-168)
* [ cURL ](#tab-panel-169)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.5',

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

  "model": "anthropic/claude-opus-4.5",

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

* [ Output ](#tab-panel-170)
* [ Raw response ](#tab-panel-171)

Here are some great stops depending on your route:

**Coastal Route (Highway 1) - longer but stunning:**
- **Half Moon Bay** - charming coastal town, good breakfast spot
- **Santa Cruz** - boardwalk, beaches, laid-back vibe
- **Monterey/Carmel** - Monterey Bay Aquarium, 17-Mile Drive, beautiful Carmel village
- **Big Sur** - dramatic cliffs, Bixby Bridge, McWay Falls (allow extra time here)
- **San Simeon** - Hearst Castle, elephant seal viewing
- **San Luis Obispo** - cute downtown, Bubblegum Alley
- **Santa Barbara** - Spanish architecture, wine tasting, beaches

**Inland Route (I-5) - fastest:**
- Honestly not much scenic appeal, mostly farmland
- Good for speed, not sightseeing

**Highway 101 (middle ground):**
- Passes through Paso Robles wine country
- Solvang - Danish-themed village

**My suggestion:** If you have time, take Highway 1 down and I-5 back (or vice versa).

How much time do you have for the trip? That'll help me narrow down recommendations.

```

{

  "content": [

    {

      "text": "Here are some great stops depending on your route:\n\n**Coastal Route (Highway 1) - longer but stunning:**\n- **Half Moon Bay** - charming coastal town, good breakfast spot\n- **Santa Cruz** - boardwalk, beaches, laid-back vibe\n- **Monterey/Carmel** - Monterey Bay Aquarium, 17-Mile Drive, beautiful Carmel village\n- **Big Sur** - dramatic cliffs, Bixby Bridge, McWay Falls (allow extra time here)\n- **San Simeon** - Hearst Castle, elephant seal viewing\n- **San Luis Obispo** - cute downtown, Bubblegum Alley\n- **Santa Barbara** - Spanish architecture, wine tasting, beaches\n\n**Inland Route (I-5) - fastest:**\n- Honestly not much scenic appeal, mostly farmland\n- Good for speed, not sightseeing\n\n**Highway 101 (middle ground):**\n- Passes through Paso Robles wine country\n- Solvang - Danish-themed village\n\n**My suggestion:** If you have time, take Highway 1 down and I-5 back (or vice versa).\n\nHow much time do you have for the trip? That'll help me narrow down recommendations.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_014rC84VWk6CFhWNascdSZwf",

  "model": "claude-opus-4-5-20251101",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 290

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-162)
* [ cURL ](#tab-panel-163)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.5',

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

  "model": "anthropic/claude-opus-4.5",

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

* [ Output ](#tab-panel-172)
* [ Raw response ](#tab-panel-173)

# The Cartographer's Last Note

Detective Sarah Chen had seen her share of strange crime scenes in fifteen years on the force, but this was the first time she'd found a victim clutching a map to a place that didn't exist.

The body lay in the cramped study, surrounded by towers of yellowed newspapers and the sour smell of old coffee. Standard enough for a recluse. But the paper gripped in Martin Voss's rigid fingers showed hand-drawn streets, elevation markers, and careful notations in faded ink—all depicting a coastal town called Meridian's Rest.

She'd checked. Twice. No such place existed in any database, any historical record, any atlas published in the last two centuries.

Yet the map showed wear patterns from years of folding and unfolding. Coffee stains. A thumbprint in the corner, pressed there so many times it had worn the paper thin.

Martin Voss had spent decades studying a town that had never been built.

Sarah photographed the map, then noticed something that made her breath catch. In the lower corner, nearly invisible against the aged paper, someone had written a date.

Tomorrow's date.

And below it, in handwriting that definitely wasn't the victim's: *You're early. We expected the other detective.*

```

{

  "content": [

    {

      "text": "# The Cartographer's Last Note\n\nDetective Sarah Chen had seen her share of strange crime scenes in fifteen years on the force, but this was the first time she'd found a victim clutching a map to a place that didn't exist.\n\nThe body lay in the cramped study, surrounded by towers of yellowed newspapers and the sour smell of old coffee. Standard enough for a recluse. But the paper gripped in Martin Voss's rigid fingers showed hand-drawn streets, elevation markers, and careful notations in faded ink—all depicting a coastal town called Meridian's Rest.\n\nShe'd checked. Twice. No such place existed in any database, any historical record, any atlas published in the last two centuries.\n\nYet the map showed wear patterns from years of folding and unfolding. Coffee stains. A thumbprint in the corner, pressed there so many times it had worn the paper thin.\n\nMartin Voss had spent decades studying a town that had never been built.\n\nSarah photographed the map, then noticed something that made her breath catch. In the lower corner, nearly invisible against the aged paper, someone had written a date.\n\nTomorrow's date.\n\nAnd below it, in handwriting that definitely wasn't the victim's: *You're early. We expected the other detective.*",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01Xn7b7JzMzoHWDigjdGFniq",

  "model": "claude-opus-4-5-20251101",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 282

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-166)
* [ cURL ](#tab-panel-167)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.5',

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

  "model": "anthropic/claude-opus-4.5",

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

* [ Output ](#tab-panel-174)
* [ Raw response ](#tab-panel-175)

# Understanding Recursion

**Recursion** is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components

1. **Base case** - The condition that stops the recursion
2. **Recursive case** - Where the function calls itself with a simpler input

## Simple Example: Factorial

```
factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
```

```python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

## How It Works

```
factorial(5)
  → 5 × factorial(4)
       → 4 × factorial(3)
            → 3 × factorial(2)
                 → 2 × factorial(1)
                      → returns 1  ← base case hit
                 → returns 2 × 1 = 2
            → returns 3 × 2 = 6
       → returns 4 × 6 = 24
  → returns 5 × 24 = 120
```

## Simple Analogy

Think of Russian nesting dolls 🪆 — you keep opening smaller dolls until you reach the smallest one (base case), then you work your way back out.

---

**Remember:** Always have a base case, or your function will call itself forever (stack overflow)!

```

[

  {

    "message": {

      "content": [],

      "id": "msg_016ZKcVY6ckQdq7TF4tE5AsJ",

      "model": "claude-opus-4-5-20251101",

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

        "inference_geo": "not_available",

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

      "text": " Understanding Recursion\n\n**Recursion** is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.\n\n## Key Components\n\n1",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ". **Base case** - The condition that stops the recursion\n2. **Recursive case** - Where the function calls itself with a simpler input",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n\n## Simple Example: Factorial\n\n```\nfactorial(5) = 5 × 4 × 3 × 2 × 1 = 120\n```\n\n```python\ndef factorial(n):",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n    # Base case\n    if n <= 1:\n        return 1\n    # Recursive case\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ": 120\n```\n\n## How It Works\n\n```\nfactorial(5)\n  → 5 × factorial(4)\n       → 4 × factorial(3)\n            ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "→ 3 × factorial(2)\n                 → 2 × factorial(1)\n                      → returns 1  ← base case hit\n                 → returns 2",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " × 1 = 2\n            → returns 3 × 2 = 6\n       → returns 4 × 6 = 24\n  → returns 5 × 24 = 120\n```\n\n## Simple",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " Analogy\n\nThink of Russian nesting dolls 🪆 — you keep opening",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " smaller dolls until you reach the smallest one (base case), then you work your way back out",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ".\n\n---\n\n**Remember:** Always have a base case, or your function",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " will call itself forever (stack overflow)!",

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

      "output_tokens": 371

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-176)
* [ Output ](#tab-panel-177)

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

Input [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
