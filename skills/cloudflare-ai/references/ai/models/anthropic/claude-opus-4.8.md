---
description: Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
title: Claude Opus 4.8
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 4.8

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-4.8`

- Third-party
- Zero data retention

Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

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
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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
# The Three Laws of Thermodynamics

## First Law (Conservation of Energy)
Energy cannot be created or destroyed, only transferred or converted from one form to another. The total energy of an isolated system remains constant.

**Common expression:** ΔU = Q − W
- ΔU = change in internal energy
- Q = heat added to the system
- W = work done by the system

## Second Law (Entropy)
The total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never spontaneously the reverse.

**Key implications:**
- No process is 100% efficient
- Perpetual motion machines are impossible
- The universe tends toward greater disorder

## Third Law (Absolute Zero)
As a system approaches absolute zero (0 Kelvin, −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.

---

**A popular informal summary:**
1. You can't win (you can't get more energy out than you put in)
2. You can't break even (you'll always lose some energy to entropy)
3. You can't quit the game (you can't reach absolute zero)

*Note:* There's also a **Zeroth Law**, which states that if two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other—this establishes the concept of temperature.

Would you like a deeper explanation of any particular law?
```

```json
{
  "id": "msg_01UPuL7ZtkoyKHmCsNtxyamj",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "# The Three Laws of Thermodynamics\n\n## First Law (Conservation of Energy)\nEnergy cannot be created or destroyed, only transferred or converted from one form to another. The total energy of an isolated system remains constant.\n\n**Common expression:** ΔU = Q − W\n- ΔU = change in internal energy\n- Q = heat added to the system\n- W = work done by the system\n\n## Second Law (Entropy)\nThe total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never spontaneously the reverse.\n\n**Key implications:**\n- No process is 100% efficient\n- Perpetual motion machines are impossible\n- The universe tends toward greater disorder\n\n## Third Law (Absolute Zero)\nAs a system approaches absolute zero (0 Kelvin, −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n\n---\n\n**A popular informal summary:**\n1. You can't win (you can't get more energy out than you put in)\n2. You can't break even (you'll always lose some energy to entropy)\n3. You can't quit the game (you can't reach absolute zero)\n\n*Note:* There's also a **Zeroth Law**, which states that if two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other—this establishes the concept of temperature.\n\nWould you like a deeper explanation of any particular law?"
    }
  ],
  "model": "claude-opus-4-8",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 20,
    "output_tokens": 493
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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

````
# Reading a JSON File in Python

Python's built-in `json` module makes this straightforward.

## Basic Method

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

- `json.load()` reads from a **file object**
- The `with` statement automatically closes the file

## Reading from a JSON String

If you have JSON as a string (not a file), use `json.loads()` (note the "s" for "string"):

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data['name'])  # Alice
```

## Example with Error Handling

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        print(data)
except FileNotFoundError:
    print("The file was not found.")
except json.JSONDecodeError:
    print("The file contains invalid JSON.")
```

## How JSON Maps to Python

| JSON          | Python   |
|---------------|----------|
| object        | `dict`   |
| array         | `list`   |
| string        | `str`    |
| number (int)  | `int`    |
| number (real) | `float`  |
| true / false  | `True` / `False` |
| null          | `None`   |

## Accessing the Data

```python
# Given: {"users": [{"name": "Alice"}, {"name": "Bob"}]}

print(data['users'][0]['name'])  # Alice

# Loop through items
for user in data['users']:
    print(user['name'])
```

Let me know if you'd like help with **writing** JSON files or handling more complex structures!
````

```json
{
  "id": "msg_01Vo4yZSkvQT8zgudnTpsjtt",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "# Reading a JSON File in Python\n\nPython's built-in `json` module makes this straightforward.\n\n## Basic Method\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n- `json.load()` reads from a **file object**\n- The `with` statement automatically closes the file\n\n## Reading from a JSON String\n\nIf you have JSON as a string (not a file), use `json.loads()` (note the \"s\" for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data['name'])  # Alice\n```\n\n## Example with Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\n        print(data)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\n```\n\n## How JSON Maps to Python\n\n| JSON          | Python   |\n|---------------|----------|\n| object        | `dict`   |\n| array         | `list`   |\n| string        | `str`    |\n| number (int)  | `int`    |\n| number (real) | `float`  |\n| true / false  | `True` / `False` |\n| null          | `None`   |\n\n## Accessing the Data\n\n```python\n# Given: {\"users\": [{\"name\": \"Alice\"}, {\"name\": \"Bob\"}]}\n\nprint(data['users'][0]['name'])  # Alice\n\n# Loop through items\nfor user in data['users']:\n    print(user['name'])\n```\n\nLet me know if you'd like help with **writing** JSON files or handling more complex structures!"
    }
  ],
  "model": "claude-opus-4-8",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 38,
    "output_tokens": 555
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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
Here are some great stops along the way, depending on which route you take:

## Coastal Route (Highway 1 / Pacific Coast Highway)
*More scenic but slower—adds a few hours*

- **Santa Cruz** – Beach boardwalk and classic seaside vibes
- **Monterey** – Famous aquarium and Cannery Row
- **Carmel-by-the-Sea** – Charming village with art galleries
- **Big Sur** – Stunning coastline, Bixby Bridge, McWay Falls
- **Hearst Castle** (San Simeon) – Historic mansion tours
- **Pismo Beach** – Sand dunes and laid-back beach town

## Inland Route (I-5)
*Fastest but less scenic*

- **Not many highlights**—mostly farmland, but quick gas/food stops
- Good if you're short on time

## Middle Route (Highway 101)
*A nice balance of speed and scenery*

- **Gilroy** – Garlic capital, outlet shopping
- **Paso Robles** – Wine country with great tasting rooms
- **San Luis Obispo** – Cute college town, historic mission
- **Santa Barbara** – Beautiful "American Riviera," beaches and Spanish architecture
- **Solvang** – Quaint Danish-style village

## A Few Questions to Narrow It Down:
1. How much time do you have for the trip?
2. Are you more interested in nature, food/wine, or towns and attractions?
3. Are you doing it one-way or round-trip?

Let me know and I can help build a more detailed itinerary!
```

```json
{
  "id": "msg_01La2dbCTcjvDFxNBTcwH4B9",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Here are some great stops along the way, depending on which route you take:\n\n## Coastal Route (Highway 1 / Pacific Coast Highway)\n*More scenic but slower—adds a few hours*\n\n- **Santa Cruz** – Beach boardwalk and classic seaside vibes\n- **Monterey** – Famous aquarium and Cannery Row\n- **Carmel-by-the-Sea** – Charming village with art galleries\n- **Big Sur** – Stunning coastline, Bixby Bridge, McWay Falls\n- **Hearst Castle** (San Simeon) – Historic mansion tours\n- **Pismo Beach** – Sand dunes and laid-back beach town\n\n## Inland Route (I-5)\n*Fastest but less scenic*\n\n- **Not many highlights**—mostly farmland, but quick gas/food stops\n- Good if you're short on time\n\n## Middle Route (Highway 101)\n*A nice balance of speed and scenery*\n\n- **Gilroy** – Garlic capital, outlet shopping\n- **Paso Robles** – Wine country with great tasting rooms\n- **San Luis Obispo** – Cute college town, historic mission\n- **Santa Barbara** – Beautiful \"American Riviera,\" beaches and Spanish architecture\n- **Solvang** – Quaint Danish-style village\n\n## A Few Questions to Narrow It Down:\n1. How much time do you have for the trip?\n2. Are you more interested in nature, food/wine, or towns and attractions?\n3. Are you doing it one-way or round-trip?\n\nLet me know and I can help build a more detailed itinerary!"
    }
  ],
  "model": "claude-opus-4-8",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 103,
    "output_tokens": 537
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Creative Writing with Adaptive Thinking** — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated `temperature` parameter.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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

```
Detective Mara Voss had seen a thousand crime scenes, but never one this tidy.

The apartment was immaculate—books aligned by height, not a dish in the sink, the dead man arranged on his sofa as if posing for a portrait. No signs of struggle. No forced entry. Just Walter Crane, sixty-three, eyes closed, hands folded across his chest like a man who'd decided to nap forever.

It was the chess set that stopped her.

She crouched beside the small table, careful not to touch. The board was mid-game, pieces scattered in the chaos of a real match—except for one. A black knight, removed from play, stood at the very center of the board where no square could hold it properly. Balanced on the dividing line between two squares, defying the geometry of the game.

Someone had placed it there. Deliberately. The angle was too perfect, the position too impossible to be an accident.

Mara pulled a pen from her jacket and leaned closer. There, etched into the felt base of the knight in letters so small she had to squint, was a single word.

*Soon.*

She felt the cold travel up her spine before her mind caught up to it.

"Detective?" Officer Reyes called from the doorway. "Coroner's saying natural causes. Heart gave out."

Mara didn't look away from the knight. "No," she said quietly. "Somebody wanted us to think that."

She straightened, scanning the too-perfect room with new eyes.

The game wasn't over. It had just begun.
```

```json
{
  "id": "msg_01D5U1NAjKU24Fq5Q1bsyG9a",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Detective Mara Voss had seen a thousand crime scenes, but never one this tidy.\n\nThe apartment was immaculate—books aligned by height, not a dish in the sink, the dead man arranged on his sofa as if posing for a portrait. No signs of struggle. No forced entry. Just Walter Crane, sixty-three, eyes closed, hands folded across his chest like a man who'd decided to nap forever.\n\nIt was the chess set that stopped her.\n\nShe crouched beside the small table, careful not to touch. The board was mid-game, pieces scattered in the chaos of a real match—except for one. A black knight, removed from play, stood at the very center of the board where no square could hold it properly. Balanced on the dividing line between two squares, defying the geometry of the game.\n\nSomeone had placed it there. Deliberately. The angle was too perfect, the position too impossible to be an accident.\n\nMara pulled a pen from her jacket and leaned closer. There, etched into the felt base of the knight in letters so small she had to squint, was a single word.\n\n*Soon.*\n\nShe felt the cold travel up her spine before her mind caught up to it.\n\n\"Detective?\" Officer Reyes called from the doorway. \"Coroner's saying natural causes. Heart gave out.\"\n\nMara didn't look away from the knight. \"No,\" she said quietly. \"Somebody wanted us to think that.\"\n\nShe straightened, scanning the too-perfect room with new eyes.\n\nThe game wasn't over. It had just begun."
    }
  ],
  "model": "claude-opus-4-8",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 26,
    "output_tokens": 483
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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

**Recursion** is a programming technique where a function solves a problem by calling itself on a smaller version of the same problem.

## The Two Essential Parts

Every recursive function needs:

1. **Base case** — the condition that stops the recursion (prevents infinite loops)
2. **Recursive case** — where the function calls itself with a simpler input

---

## Simple Example: Factorial

The factorial of a number (written as `n!`) is the product of all numbers from 1 to n.

```
5! = 5 × 4 × 3 × 2 × 1 = 120
```

Notice that `5! = 5 × 4!`, which means we can define factorial **in terms of itself**.

### Code Example (Python)

```python
def factorial(n):
    # Base case: stop when we reach 1
    if n == 1:
        return 1
    # Recursive case: n × factorial of (n-1)
    else:
        return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

---

## How It Works (Step by Step)

When you call `factorial(5)`, it unfolds like this:

```
factorial(5) = 5 × factorial(4)
             = 5 × (4 × factorial(3))
             = 5 × (4 × (3 × factorial(2)))
             = 5 × (4 × (3 × (2 × factorial(1))))
             = 5 × (4 × (3 × (2 × 1)))      ← base case reached!
             = 120
```

The function keeps calling itself until it hits the **base case** (`n == 1`), then the results "bubble back up."

---

## A Helpful Analogy 🪆

Think of **Russian nesting dolls**:
- To open the biggest doll, you open the next smaller one, and so on.
- Eventually you reach the **smallest doll** that can't be opened (the base case).
- Then you put them all back together.

---

## Key Takeaway

> A recursive function breaks a big problem into smaller, identical sub-problems until it reaches a case simple enough to solve directly.

**⚠️ Warning:** Always include a base case! Without it, the function calls itself forever and crashes (a "stack overflow" error).

Would you like to see another example, like calculating a Fibonacci sequence?
````

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-opus-4-8",
      "id": "msg_01NE3P8zwFrzpbFfPc6mV1FW",
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
        "output_tokens": 3,
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
  "... 21 more chunks omitted ...",
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
  'anthropic/claude-opus-4.8',
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
  "model": "anthropic/claude-opus-4.8",
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
I'll search for the latest Cloudflare news this week.
```

```json
{
  "id": "msg_012vbxhcf34JMoq7KydUt9vv",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll search for the latest Cloudflare news this week."
    },
    {
      "type": "server_tool_use",
      "id": "srvtoolu_01KXV2jKHHeTwnHXEPh1Sj55",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news this week"
      }
    },
    {
      "type": "server_tool_use",
      "id": "srvtoolu_0181PuVN9PJeTEyFBcyXfAJD",
      "name": "web_search",
      "input": {
        "query": "Cloudflare announcement June 2026"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_01KXV2jKHHeTwnHXEPh1Sj55",
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
          "title": "The Cloudflare Blog: Product News",
          "url": "https://blog.cloudflare.com/tag/product-news/",
          "encrypted_content": "Eq4RCioIERgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDL7fvmvRH9GbeuRYyhoM/SYgq0DCI+CESMxFIjCfJU4dcQ7bs7GDuRqUB2u1rEpw7net+ZkOtJRZhHyPZSr63F6Hv9b4wtZZDnguc4QqsRDDSU9bMyRIwv9WRoKYbgCMetfonTaAfMRPzzu597mtTBt7S+qU6peGPVYp50J+IIVKf89xxYglCD1gLAcCsVcL8UywUB/BbtvnSYFycV+EtwjxKbcko4uV2YwKN+2b8fWaXz2Rif7l8X09mQSbSKRFhT5qabDq2bFPev6mWN6PTvdGdIMlyes3dpWkXfs7K69W7z2z0qq+kkY1gPqBSYXtUQLOpN38fv9ATS720LsTI7EXo35O4jm9xd+zBJamG6rJRRto8Z7qU6JELej6QQKQTUDe7nnxYqNR2ujjmc1B6ZbuewzhnVmZLjRGDhEeHXsXKqcZEZiNntlgyDM6+9GxcRWdBtjS367dosiWzj3ROfUpJLiiYx4nRwQ7JQ+wVMAdj67An39pDlcHm34ffkMo3ywOqsFTKqNom5HeIlYwO97gv4iyT2uAe4vqXWY4IXOqdvMMA/uvy0UWrO902AxCoQkpz3W5HzvTYQyBgknrIHxXxLwJqYwj5G2RHWf8wcMv8aV1drMNHTCy0iqAaHGNQ3FLE8PIjnWNRnriEfdJweV0KwQbrVaweOd8qmdoHGMgAv54Mj8keXXq70p7/+tHF7aHqFWho8e/zdEdWah35P5mAEumMGVwgYVtXdAvwmheBF3sbZKiqi4V9mtLi3GPoI5k+z3gDTNYqBaWlDmgNqRcMonMYaPuUoaPM3N9dZfxSAKJ7E+Nx+i2n/yAsP6poUcBH8uDYESnJODgKvrXgF/b5+LJG+cnCIe3UtdLEO/XjmxdlMoNGX/QlMwfjuRd6e7SqnFOMd56oQvC/J8VNEksnFkrDyYfWo26lFfGJ5RYKgvkxLWMTmbaxNmsB7gX7xbxic6vR+CeuphKK6JXMozNgKylJDcrX3LC8pvZt6oBkmb448KEdTkfnFy7MNMntq8sWkjfHQC3rasrngsb9QuOJjRrzkcsBRXjGZy95gSZuKO9z7dn8+kcmU1jfNuN22f+9
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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/#page","headline":"Claude Opus 4.8","description":"Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
