---
description: Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.
title: Claude Opus 4.6
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 4.6

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-4.6`

- Third-party
- Zero data retention

Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/opus) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$5.00</li><li>Output (per 1M tokens)$25.00</li><li>Cached input (per 1M tokens)$0.50</li><li>Cache creation (per 1M tokens)$6.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.6',
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

```
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

```json
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

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
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

```bash
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

````
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
````

```json
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

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
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

```bash
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

```
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

```json
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

</details>

<details>

<summary>**Creative Writing** — Higher temperature for creative output</summary>



```ts
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

```bash
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

```
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

```json
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

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
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

```bash
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

````
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
````

```json
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
  "... 25 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting Claude use Anthropic's server-side web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.6',
  {
    max_tokens: 4096,
    messages: [
      {
        content:
          'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
        role: 'user',
      },
    ],
    tools: [{ max_uses: 3, name: 'web_search', type: 'web_search_20250305' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-opus-4.6",
  "max_tokens": 4096,
  "messages": [
    {
      "content": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
      "role": "user"
    }
  ],
  "tools": [
    {
      "max_uses": 3,
      "name": "web_search",
      "type": "web_search_20250305"
    }
  ]
}'
```

```
Here are the top Cloudflare stories from this week:

- **Stock sell-off after hitting all-time highs:**
```

```json
{
  "id": "msg_0124yvsiaRLxSucPPhVpHMyp",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_01HJTfCwJbChdHyNG7e9uyMB",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news this week June 2026"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_01HJTfCwJbChdHyNG7e9uyMB",
      "content": [
        {
          "type": "web_search_result",
          "title": "Cloudflare Status",
          "url": "https://www.cloudflarestatus.com/",
          "encrypted_content": "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",
          "page_age": "2 hours ago"
        },
        {
          "type": "web_search_result",
          "title": "Cloudflare Release Notes - June 2026 Latest Updates - Releasebot",
          "url": "https://releasebot.io/updates/cloudflare",
          "encrypted_content": "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
... response truncated ...
```

</details>

## Parameters

▶messages\[]

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

▶content\[]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/#page","headline":"Claude Opus 4.6","description":"Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.6/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
