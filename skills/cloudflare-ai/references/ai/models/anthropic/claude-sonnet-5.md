---
description: Claude Sonnet 5 is Anthropic's most agentic Sonnet model yet, built for coding, tool use, reasoning, and long-horizon professional work at lower cost than Opus-class models.
title: Claude Sonnet 5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Sonnet 5

Text Generation • Anthropic

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-sonnet-5`

* Third-party

Claude Sonnet 5 is Anthropic's most agentic Sonnet model yet, built for coding, tool use, reasoning, and long-horizon professional work at lower cost than Opus-class models.

| Model Info                                                                          |                                                                                                                             |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                                   | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                                    | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                           |
| Request formats                                                                     | Anthropic Messages                                                                                                          |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-5) |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

# The Three (Four) Laws of Thermodynamics

Here are the fundamental laws, typically numbered 1-3 (with a "Zeroth Law" often included as foundational):

## Zeroth Law
**If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.**
- This establishes the concept of temperature as a measurable property.

## First Law (Conservation of Energy)
**Energy cannot be created or destroyed, only transformed or transferred.**
- Often expressed as: ΔU = Q − W
- (Change in internal energy = Heat added − Work done by the system)
- This means the total energy of an isolated system remains constant.

## Second Law (Entropy)
**The total entropy of an isolated system can never decrease over time; it tends to increase or remain constant.**
- Heat flows spontaneously from hot to cold objects, not the reverse.
- This law explains why certain processes are irreversible and establishes the "arrow of time."
- No heat engine can be 100% efficient at converting heat into work.

## Third Law
**As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of the system approaches a minimum (constant) value.**
- Absolute zero is unattainable in a finite number of steps.
- At absolute zero, a perfect crystal would have exactly zero entropy.

---

**Quick summary often used colloquially:**
1. You can't win (can't get more energy out than you put in)
2. You can't break even (some energy is always lost as unusable heat)
3. You can't get out of the game (can't reach absolute zero)

```json
{
  "id": "msg_01RdqxfAYz2PfZTfiAYpX6Tz",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "# The Three (Four) Laws of Thermodynamics\n\nHere are the fundamental laws, typically numbered 1-3 (with a \"Zeroth Law\" often included as foundational):\n\n## Zeroth Law\n**If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.**\n- This establishes the concept of temperature as a measurable property.\n\n## First Law (Conservation of Energy)\n**Energy cannot be created or destroyed, only transformed or transferred.**\n- Often expressed as: ΔU = Q − W\n- (Change in internal energy = Heat added − Work done by the system)\n- This means the total energy of an isolated system remains constant.\n\n## Second Law (Entropy)\n**The total entropy of an isolated system can never decrease over time; it tends to increase or remain constant.**\n- Heat flows spontaneously from hot to cold objects, not the reverse.\n- This law explains why certain processes are irreversible and establishes the \"arrow of time.\"\n- No heat engine can be 100% efficient at converting heat into work.\n\n## Third Law\n**As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of the system approaches a minimum (constant) value.**\n- Absolute zero is unattainable in a finite number of steps.\n- At absolute zero, a perfect crystal would have exactly zero entropy.\n\n---\n\n**Quick summary often used colloquially:**\n1. You can't win (can't get more energy out than you put in)\n2. You can't break even (some energy is always lost as unusable heat)\n3. You can't get out of the game (can't reach absolute zero)"
    }
  ],
  "model": "claude-sonnet-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 20,
    "output_tokens": 539
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**With System Message** — Using a system message to set context

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],
    system: 'You are a helpful coding assistant specializing in Python.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python."
}'
```

# Reading a JSON File in Python

Python's built-in `json` module makes this straightforward.

## Basic Example

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Explanation

- **`json.load(file)`** — reads from a file object and parses JSON into Python objects
- **`json.loads(string)`** — use this instead if you have a JSON *string* (not a file) to parse

## Example with Sample Data

Suppose `data.json` contains:

```json
{
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "SQL"]
}
```

You can read and use it like this:

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data['name'])      # Alice
print(data['skills'])    # ['Python', 'SQL']
```

## Handling Errors

It's good practice to handle common issues like missing files or invalid JSON:

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError:
    print("Invalid JSON format.")
```

## Reading JSON from a String

If your JSON is already a string in memory:

```python
import json

json_string = '{"name": "Bob", "age": 25}'
data = json.loads(json_string)
print(data['name'])  # Bob
```

## Key Type Mappings

| JSON Type | Python Type |
|-----------|-------------|
| object    | dict        |
| array     | list        |
| string    | str         |
| number    | int / float |
| true/false| bool        |
| null      | None        |

That covers the essentials — let me know if you need help with nested data, writing JSON, or working with large files.

```json
{
  "id": "msg_01PptUvPAdU3SPQLQPwG7G3s",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "# Reading a JSON File in Python\n\nPython's built-in `json` module makes this straightforward.\n\n## Basic Example\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Explanation\n\n- **`json.load(file)`** — reads from a file object and parses JSON into Python objects\n- **`json.loads(string)`** — use this instead if you have a JSON *string* (not a file) to parse\n\n## Example with Sample Data\n\nSuppose `data.json` contains:\n\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"skills\": [\"Python\", \"SQL\"]\n}\n```\n\nYou can read and use it like this:\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data['name'])      # Alice\nprint(data['skills'])    # ['Python', 'SQL']\n```\n\n## Handling Errors\n\nIt's good practice to handle common issues like missing files or invalid JSON:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format.\")\n```\n\n## Reading JSON from a String\n\nIf your JSON is already a string in memory:\n\n```python\nimport json\n\njson_string = '{\"name\": \"Bob\", \"age\": 25}'\ndata = json.loads(json_string)\nprint(data['name'])  # Bob\n```\n\n## Key Type Mappings\n\n| JSON Type | Python Type |\n|-----------|-------------|\n| object    | dict        |\n| array     | list        |\n| string    | str         |\n| number    | int / float |\n| true/false| bool        |\n| null      | None        |\n\nThat covers the essentials — let me know if you need help with nested data, writing JSON, or working with large files."
    }
  ],
  "model": "claude-sonnet-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 38,
    "output_tokens": 609
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Creative Writing with High Effort** — Use adaptive thinking with high effort for deeper reasoning.

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5',
  {
    max_tokens: 2048,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
    output_config: { effort: 'high' },
    thinking: { type: 'adaptive' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5",
  "max_tokens": 2048,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ],
  "output_config": {
    "effort": "high"
  },
  "thinking": {
    "type": "adaptive"
  }
}'
```

Detective Mara Voss crouched beside the overturned chair, careful not to let her coat brush the chalk outline still drying on the hardwood floor. The apartment smelled of lavender and something underneath it—copper, sharp and unmistakable.

"You seeing this?" she called to her partner, Reyes, who was photographing the bookshelf.

He crossed the room, careful of the evidence markers scattered like yellow teeth across the carpet. Mara pointed at the small object resting in the dead man's open palm: a single playing card, the seven of diamonds, except where the diamonds should have been, someone had drawn seven tiny, perfect spirals in red ink.

"Could be nothing," Reyes said, though his voice suggested he didn't believe it.

"Could be." Mara pulled an evidence bag from her pocket but didn't reach for the card yet. Something about it held her still. The spirals weren't random—she'd seen that pattern before, scratched into the doorframe of a cold case file she'd inherited three years ago. A case that had never made sense, that had kept her awake on more nights than she cared to admit.

"Mara?"

She blinked, realized she'd been staring. "This isn't our first body with this signature," she said quietly. "I just didn't know there'd be a second."

Outside, rain began to tap against the window, and somewhere in the building, a door clicked shut—soft, deliberate, like someone had been listening.

```json
{
  "id": "msg_01DACMFVHe3JbaQREntjsDuc",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Detective Mara Voss crouched beside the overturned chair, careful not to let her coat brush the chalk outline still drying on the hardwood floor. The apartment smelled of lavender and something underneath it—copper, sharp and unmistakable.\n\n\"You seeing this?\" she called to her partner, Reyes, who was photographing the bookshelf.\n\nHe crossed the room, careful of the evidence markers scattered like yellow teeth across the carpet. Mara pointed at the small object resting in the dead man's open palm: a single playing card, the seven of diamonds, except where the diamonds should have been, someone had drawn seven tiny, perfect spirals in red ink.\n\n\"Could be nothing,\" Reyes said, though his voice suggested he didn't believe it.\n\n\"Could be.\" Mara pulled an evidence bag from her pocket but didn't reach for the card yet. Something about it held her still. The spirals weren't random—she'd seen that pattern before, scratched into the doorframe of a cold case file she'd inherited three years ago. A case that had never made sense, that had kept her awake on more nights than she cared to admit.\n\n\"Mara?\"\n\nShe blinked, realized she'd been staring. \"This isn't our first body with this signature,\" she said quietly. \"I just didn't know there'd be a second.\"\n\nOutside, rain began to tap against the window, and somewhere in the building, a door clicked shut—soft, deliberate, like someone had been listening."
    }
  ],
  "model": "claude-sonnet-5",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 26,
    "output_tokens": 469
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Streaming Response** — Enable streaming for real-time output

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5',
  {
    max_tokens: 1024,
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5",
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

# Recursion

**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components

Every recursive function needs:
1. **Base case** – a condition that stops the recursion (prevents infinite loops)
2. **Recursive case** – where the function calls itself with a smaller/simpler input

## Simple Example: Factorial

The factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`.

Mathematically: `5! = 5 × 4 × 3 × 2 × 1 = 120`

This can be defined recursively as:
```
n! = n × (n-1)!
0! = 1  (base case)
```

### Code Example (Python)

```python
def factorial(n):
    # Base case
    if n == 0:
        return 1
    # Recursive case
    else:
        return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

### How It Works (Step-by-Step)

```
factorial(5)
= 5 * factorial(4)
= 5 * (4 * factorial(3))
= 5 * (4 * (3 * factorial(2)))
= 5 * (4 * (3 * (2 * factorial(1))))
= 5 * (4 * (3 * (2 * (1 * factorial(0)))))
= 5 * (4 * (3 * (2 * (1 * 1))))
= 120
```

The function keeps calling itself with smaller values until it hits the **base case** (`n == 0`), then the results "unwind" back up, multiplying together to produce the final answer.

## Why Use Recursion?

- Makes code **cleaner** for problems that are naturally recursive (trees, fractals, divide-and-conquer algorithms)
- Mirrors **mathematical definitions** closely
- Useful for problems like: tree traversal, sorting algorithms (quicksort, mergesort), the Fibonacci sequence, and navigating file systems

## Caution ⚠️
Without a proper base case, recursion leads to **infinite recursion** and a stack overflow error!

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-sonnet-5",
      "id": "msg_0188koTEnwXJD4cbqRcEfaCT",
      "type": "message",
      "role": "assistant",
      "content": [],
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 22,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 6,
        "service_tier": "standard",
        "inference_geo": "global"
      }
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "text",
      "text": ""
    }
  },
  {
    "type": "ping"
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "# Recursion"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n\n**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.\n\n## Key"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " Components\n\nEvery recursive function needs:\n1. **Base case** – a condition that stops the recursion (prevents infinite loops)"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n2. **Recursive case** – where the function calls itself with a smaller/simpler input\n\n## Simple Example: Factorial"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n\nThe factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`.\n\nMathematically: `5!"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " = 5 × 4 × 3 × 2 × 1 = 120`\n\nThis can be defined recursively as:\n```\nn! = n × (n"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "-1)!\n0! = 1  (base case)\n```\n\n### Code Example (Python)\n\n```python\ndef factorial(n):\n    # Base case"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n    if n == 0:\n        return 1\n    # Recursive case\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n###"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " How It Works (Step-by-Step)\n\n```\nfactorial(5)\n= 5 * factorial(4)\n= 5 * (4 * factorial(3))\n="
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " 5 * (4 * (3 * factorial(2)))\n= 5 * (4 * (3 * (2 * factorial(1))))\n= 5 * (4 * (3 * (2 * (1"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " * factorial(0)))))\n= 5 * (4 * (3 * (2 * (1 * 1))))\n= 120\n```\n\nThe function keeps calling itself with smaller values"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " until it hits the **base case** (`n == 0`), then the results \"unwind\" back up, multiplying together to produ"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "ce the final answer.\n\n## Why Use Recursion?\n\n- Makes code **cleaner** for problems that"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " are naturally recursive (trees, fractals, divide-and-conquer algorithms)\n- Mirrors **"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "mathematical definitions** closely\n- Useful for problems like: tree traversal, sorting algorithms (quicksort, m"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "ergesort), the Fibonacci sequence, and navigating file systems\n\n## Caution ⚠️\nWithout a proper base case, recursion"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " leads to **infinite recursion** and a stack overflow error!"
    }
  },
  {
    "type": "content_block_stop",
    "index": 0
  },
  {
    "type": "message_delta",
    "delta": {
      "stop_reason": "end_turn",
      "stop_sequence": null,
      "stop_details": null
    },
    "usage": {
      "input_tokens": 22,
      "cache_creation_input_tokens": 0,
      "cache_read_input_tokens": 0,
      "output_tokens": 708,
      "output_tokens_details": {
        "thinking_tokens": 0
      }
    }
  },
  {
    "type": "message_stop"
  }
]
```

## Parameters

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5/#page","headline":"Claude Sonnet 5 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Sonnet 5 is Anthropic's most agentic Sonnet model yet, built for coding, tool use, reasoning, and long-horizon professional work at lower cost than Opus-class models.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
