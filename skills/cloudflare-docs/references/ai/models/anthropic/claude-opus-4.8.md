---
title: Claude Opus 4.8
description: Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.8 

Text Generation • Anthropic 

`anthropic/claude-opus-4.8` 

Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7\. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Zero data retention                                                        | Yes                                                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.8) |

## Usage

* [ TypeScript ](#tab-panel-222)
* [ cURL ](#tab-panel-223)

TypeScript

```
const response = await env.AI.run(  'anthropic/claude-opus-4.8',  {    max_tokens: 1024,    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "anthropic/claude-opus-4.8",  "max_tokens": 1024,  "messages": [    {      "content": "What are the three laws of thermodynamics?",      "role": "user"    }  ]}'
```

* [ Output ](#tab-panel-226)
* [ Raw response ](#tab-panel-227)

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
{  "id": "msg_01UPuL7ZtkoyKHmCsNtxyamj",  "type": "message",  "role": "assistant",  "content": [    {      "type": "text",      "text": "# The Three Laws of Thermodynamics\n\n## First Law (Conservation of Energy)\nEnergy cannot be created or destroyed, only transferred or converted from one form to another. The total energy of an isolated system remains constant.\n\n**Common expression:** ΔU = Q − W\n- ΔU = change in internal energy\n- Q = heat added to the system\n- W = work done by the system\n\n## Second Law (Entropy)\nThe total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never spontaneously the reverse.\n\n**Key implications:**\n- No process is 100% efficient\n- Perpetual motion machines are impossible\n- The universe tends toward greater disorder\n\n## Third Law (Absolute Zero)\nAs a system approaches absolute zero (0 Kelvin, −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n\n---\n\n**A popular informal summary:**\n1. You can't win (you can't get more energy out than you put in)\n2. You can't break even (you'll always lose some energy to entropy)\n3. You can't quit the game (you can't reach absolute zero)\n\n*Note:* There's also a **Zeroth Law**, which states that if two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other—this establishes the concept of temperature.\n\nWould you like a deeper explanation of any particular law?"    }  ],  "model": "claude-opus-4-8",  "stop_reason": "end_turn",  "usage": {    "input_tokens": 20,    "output_tokens": 493  },  "stop_sequence": null,  "stop_details": null,  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-224)
* [ cURL ](#tab-panel-225)

TypeScript

```
const response = await env.AI.run(  'anthropic/claude-opus-4.8',  {    max_tokens: 1024,    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],    system: 'You are a helpful coding assistant specializing in Python.',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "anthropic/claude-opus-4.8",  "max_tokens": 1024,  "messages": [    {      "content": "How do I read a JSON file in Python?",      "role": "user"    }  ],  "system": "You are a helpful coding assistant specializing in Python."}'
```

* [ Output ](#tab-panel-228)
* [ Raw response ](#tab-panel-229)

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

```
{  "id": "msg_01Vo4yZSkvQT8zgudnTpsjtt",  "type": "message",  "role": "assistant",  "content": [    {      "type": "text",      "text": "# Reading a JSON File in Python\n\nPython's built-in `json` module makes this straightforward.\n\n## Basic Method\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n- `json.load()` reads from a **file object**\n- The `with` statement automatically closes the file\n\n## Reading from a JSON String\n\nIf you have JSON as a string (not a file), use `json.loads()` (note the \"s\" for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data['name'])  # Alice\n```\n\n## Example with Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\n        print(data)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\n```\n\n## How JSON Maps to Python\n\n| JSON          | Python   |\n|---------------|----------|\n| object        | `dict`   |\n| array         | `list`   |\n| string        | `str`    |\n| number (int)  | `int`    |\n| number (real) | `float`  |\n| true / false  | `True` / `False` |\n| null          | `None`   |\n\n## Accessing the Data\n\n```python\n# Given: {\"users\": [{\"name\": \"Alice\"}, {\"name\": \"Bob\"}]}\n\nprint(data['users'][0]['name'])  # Alice\n\n# Loop through items\nfor user in data['users']:\n    print(user['name'])\n```\n\nLet me know if you'd like help with **writing** JSON files or handling more complex structures!"    }  ],  "model": "claude-opus-4-8",  "stop_reason": "end_turn",  "usage": {    "input_tokens": 38,    "output_tokens": 555  },  "stop_sequence": null,  "stop_details": null,  "gatewayMetadata": {    "keySource": "Unified"  }}
```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-232)
* [ cURL ](#tab-panel-233)

TypeScript

```
const response = await env.AI.run(  'anthropic/claude-opus-4.8',  {    max_tokens: 1024,    messages: [      {        content: 'I need help planning a road trip from San Francisco to Los Angeles.',        role: 'user',      },      {        content:          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",        role: 'assistant',      },      { content: 'Yes, what are some good places to stop?', role: 'user' },    ],  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "anthropic/claude-opus-4.8",  "max_tokens": 1024,  "messages": [    {      "content": "I need help planning a road trip from San Francisco to Los Angeles.",      "role": "user"    },    {      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",      "role": "assistant"    },    {      "content": "Yes, what are some good places to stop?",      "role": "user"    }  ]}'
```

* [ Output ](#tab-panel-234)
* [ Raw response ](#tab-panel-235)

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
{  "id": "msg_01La2dbCTcjvDFxNBTcwH4B9",  "type": "message",  "role": "assistant",  "content": [    {      "type": "text",      "text": "Here are some great stops along the way, depending on which route you take:\n\n## Coastal Route (Highway 1 / Pacific Coast Highway)\n*More scenic but slower—adds a few hours*\n\n- **Santa Cruz** – Beach boardwalk and classic seaside vibes\n- **Monterey** – Famous aquarium and Cannery Row\n- **Carmel-by-the-Sea** – Charming village with art galleries\n- **Big Sur** – Stunning coastline, Bixby Bridge, McWay Falls\n- **Hearst Castle** (San Simeon) – Historic mansion tours\n- **Pismo Beach** – Sand dunes and laid-back beach town\n\n## Inland Route (I-5)\n*Fastest but less scenic*\n\n- **Not many highlights**—mostly farmland, but quick gas/food stops\n- Good if you're short on time\n\n## Middle Route (Highway 101)\n*A nice balance of speed and scenery*\n\n- **Gilroy** – Garlic capital, outlet shopping\n- **Paso Robles** – Wine country with great tasting rooms\n- **San Luis Obispo** – Cute college town, historic mission\n- **Santa Barbara** – Beautiful \"American Riviera,\" beaches and Spanish architecture\n- **Solvang** – Quaint Danish-style village\n\n## A Few Questions to Narrow It Down:\n1. How much time do you have for the trip?\n2. Are you more interested in nature, food/wine, or towns and attractions?\n3. Are you doing it one-way or round-trip?\n\nLet me know and I can help build a more detailed itinerary!"    }  ],  "model": "claude-opus-4-8",  "stop_reason": "end_turn",  "usage": {    "input_tokens": 103,    "output_tokens": 537  },  "stop_sequence": null,  "stop_details": null,  "gatewayMetadata": {    "keySource": "Unified"  }}
```

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated \`temperature\` parameter. 

* [ TypeScript ](#tab-panel-236)
* [ cURL ](#tab-panel-237)

TypeScript

```
const response = await env.AI.run(  'anthropic/claude-opus-4.8',  {    max_tokens: 2048,    messages: [      {        content: 'Write a short story opening about a detective finding an unusual clue.',        role: 'user',      },    ],    output_config: { effort: 'high' },    thinking: { type: 'adaptive' },  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "anthropic/claude-opus-4.8",  "max_tokens": 2048,  "messages": [    {      "content": "Write a short story opening about a detective finding an unusual clue.",      "role": "user"    }  ],  "output_config": {    "effort": "high"  },  "thinking": {    "type": "adaptive"  }}'
```

* [ Output ](#tab-panel-238)
* [ Raw response ](#tab-panel-239)

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
{  "id": "msg_01D5U1NAjKU24Fq5Q1bsyG9a",  "type": "message",  "role": "assistant",  "content": [    {      "type": "text",      "text": "Detective Mara Voss had seen a thousand crime scenes, but never one this tidy.\n\nThe apartment was immaculate—books aligned by height, not a dish in the sink, the dead man arranged on his sofa as if posing for a portrait. No signs of struggle. No forced entry. Just Walter Crane, sixty-three, eyes closed, hands folded across his chest like a man who'd decided to nap forever.\n\nIt was the chess set that stopped her.\n\nShe crouched beside the small table, careful not to touch. The board was mid-game, pieces scattered in the chaos of a real match—except for one. A black knight, removed from play, stood at the very center of the board where no square could hold it properly. Balanced on the dividing line between two squares, defying the geometry of the game.\n\nSomeone had placed it there. Deliberately. The angle was too perfect, the position too impossible to be an accident.\n\nMara pulled a pen from her jacket and leaned closer. There, etched into the felt base of the knight in letters so small she had to squint, was a single word.\n\n*Soon.*\n\nShe felt the cold travel up her spine before her mind caught up to it.\n\n\"Detective?\" Officer Reyes called from the doorway. \"Coroner's saying natural causes. Heart gave out.\"\n\nMara didn't look away from the knight. \"No,\" she said quietly. \"Somebody wanted us to think that.\"\n\nShe straightened, scanning the too-perfect room with new eyes.\n\nThe game wasn't over. It had just begun."    }  ],  "model": "claude-opus-4-8",  "stop_reason": "end_turn",  "usage": {    "input_tokens": 26,    "output_tokens": 483  },  "stop_sequence": null,  "stop_details": null,  "gatewayMetadata": {    "keySource": "Unified"  }}
```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-230)
* [ cURL ](#tab-panel-231)

TypeScript

```
const response = await env.AI.run(  'anthropic/claude-opus-4.8',  {    max_tokens: 1024,    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],    stream: true,  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "anthropic/claude-opus-4.8",  "max_tokens": 1024,  "messages": [    {      "content": "Explain the concept of recursion with a simple example.",      "role": "user"    }  ],  "stream": true}'
```

* [ Output ](#tab-panel-240)
* [ Raw response ](#tab-panel-241)

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

```
[  {    "type": "message_start",    "message": {      "model": "claude-opus-4-8",      "id": "msg_01NE3P8zwFrzpbFfPc6mV1FW",      "type": "message",      "role": "assistant",      "content": [],      "stop_reason": null,      "stop_sequence": null,      "stop_details": null,      "usage": {        "input_tokens": 22,        "cache_creation_input_tokens": 0,        "cache_read_input_tokens": 0,        "cache_creation": {          "ephemeral_5m_input_tokens": 0,          "ephemeral_1h_input_tokens": 0        },        "output_tokens": 3,        "service_tier": "standard",        "inference_geo": "global"      }    }  },  {    "type": "content_block_start",    "index": 0,    "content_block": {      "type": "text",      "text": ""    }  },  {    "type": "ping"  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "# Underst"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "anding Recursion\n\n**Recursion** is a programming technique where a function solves a problem by calling itself on a smaller version of the same problem.\n\n## The Two"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " Essential Parts\n\nEvery recursive function needs:\n\n1. **Base case** — the condition that stops the recursion (prevents infinite loops)\n2. **Recursive"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " case** — where the function calls itself with a simpler input\n\n---\n\n## Simple Example: Factorial\n\nThe"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " factorial of a number (written as `n!`) is the product of all numbers from 1 to n.\n\n```\n5! = 5 × 4 × 3 × 2 × 1 = 120\n```"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "\n\nNotice that `5! = 5 × 4!`, which means we can define factorial **in terms of itself**.\n\n### Code Example (Python)\n\n```python"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "\ndef factorial(n):\n    # Base case: stop when we reach 1\n    if n == 1:\n        return 1\n    # Recursive case: n"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " × factorial of (n-1)\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n---\n\n## How"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " It Works (Step by Step)\n\nWhen you call `factorial(5)`, it unfolds like this:\n\n```\nfactorial(5) = 5 × factorial"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "(4)\n             = 5 × (4 × factorial(3))\n             = 5 × (4 × (3 × factorial(2)))\n             = 5 × (4 × (3 × (2 ×"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " factorial(1))))\n             = 5 × (4 × (3 × (2 × 1)))      ← base case reached!\n             = 120\n```\n\nThe"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " function keeps calling itself until it hits the **base case** (`n == 1`), then the results \"bubble back up.\"\n\n---\n\n## A Help"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "ful Analogy 🪆\n\nThink of **Russian nesting dolls**:\n- To open the biggest doll, you open the next sm"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "aller one, and so on.\n- Eventually you reach the **smallest doll** that can't be opened (the base case).\n- Then you put them"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " all back together.\n\n---\n\n## Key Takeaway\n\n> A recursive function breaks a big problem into smaller, identical s"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": "ub-problems until it reaches a case simple enough to solve directly.\n\n**⚠️ Warning:** Always include a base case!"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " Without it, the function calls itself forever and crashes (a \"stack overflow\" error).\n\nWould you like to"    }  },  {    "type": "content_block_delta",    "index": 0,    "delta": {      "type": "text_delta",      "text": " see another example, like calculating a Fibonacci sequence?"    }  },  {    "type": "content_block_stop",    "index": 0  },  {    "type": "message_delta",    "delta": {      "stop_reason": "end_turn",      "stop_sequence": null,      "stop_details": null    },    "usage": {      "input_tokens": 22,      "cache_creation_input_tokens": 0,      "cache_read_input_tokens": 0,      "output_tokens": 755,      "output_tokens_details": {        "thinking_tokens": 0      }    }  },  {    "type": "message_stop"  }]
```

## Parameters

* [ Input ](#tab-panel-242)
* [ Output ](#tab-panel-243)

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

Input [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/#page","headline":"Claude Opus 4.8 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.8/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
