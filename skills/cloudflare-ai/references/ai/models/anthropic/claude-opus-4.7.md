---
description: Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
title: Claude Opus 4.7
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 4.7

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-4.7`

- Third-party
- Zero data retention

Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

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
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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

**First Law (Conservation of Energy):**
Energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.
- Often expressed as: ΔU = Q − W (change in internal energy equals heat added minus work done by the system)

**Second Law (Entropy):**
The total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never the reverse without external work.
- This law explains why perpetual motion machines are impossible and why processes have a preferred direction.

**Third Law (Absolute Zero):**
As a system approaches absolute zero (0 Kelvin or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.
- A perfect crystal at absolute zero would have zero entropy.

**Bonus — Zeroth Law:**
Often mentioned alongside these: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement.
```

```json
{
  "content": [
    {
      "text": "# The Three Laws of Thermodynamics\n\n**First Law (Conservation of Energy):**\nEnergy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.\n- Often expressed as: ΔU = Q − W (change in internal energy equals heat added minus work done by the system)\n\n**Second Law (Entropy):**\nThe total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never the reverse without external work.\n- This law explains why perpetual motion machines are impossible and why processes have a preferred direction.\n\n**Third Law (Absolute Zero):**\nAs a system approaches absolute zero (0 Kelvin or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n- A perfect crystal at absolute zero would have zero entropy.\n\n**Bonus — Zeroth Law:**\nOften mentioned alongside these: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_013pmj6hy6QcjydL7goWQBZ7",
  "model": "claude-opus-4-7",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 399
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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

Python has a built-in `json` module that makes reading JSON files straightforward.

## Basic Example

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Key Points

- **`json.load()`** reads from a file object and parses JSON into Python objects
- **`json.loads()`** (with an "s") parses JSON from a string
- JSON objects become Python **dictionaries**, and JSON arrays become **lists**

## Complete Example

Suppose you have `data.json`:
```json
{
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "hiking"]
}
```

You can read and access it like this:

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

print(data['name'])        # Alice
print(data['age'])         # 30
print(data['hobbies'][0])  # reading
```

## Handling Errors

It's good practice to handle potential errors:

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## Bonus: Writing JSON

To write data back to a JSON file:

```python
import json

data = {"name": "Bob", "age": 25}

with open('output.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)
```

The `indent=4` argument makes the output nicely formatted. Let me know if you'd like help with a specific JSON structure!
````

```json
{
  "content": [
    {
      "text": "# Reading a JSON File in Python\n\nPython has a built-in `json` module that makes reading JSON files straightforward.\n\n## Basic Example\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Key Points\n\n- **`json.load()`** reads from a file object and parses JSON into Python objects\n- **`json.loads()`** (with an \"s\") parses JSON from a string\n- JSON objects become Python **dictionaries**, and JSON arrays become **lists**\n\n## Complete Example\n\nSuppose you have `data.json`:\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"hobbies\": [\"reading\", \"hiking\"]\n}\n```\n\nYou can read and access it like this:\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n\nprint(data['name'])        # Alice\nprint(data['age'])         # 30\nprint(data['hobbies'][0])  # reading\n```\n\n## Handling Errors\n\nIt's good practice to handle potential errors:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## Bonus: Writing JSON\n\nTo write data back to a JSON file:\n\n```python\nimport json\n\ndata = {\"name\": \"Bob\", \"age\": 25}\n\nwith open('output.json', 'w', encoding='utf-8') as file:\n    json.dump(data, file, indent=4)\n```\n\nThe `indent=4` argument makes the output nicely formatted. Let me know if you'd like help with a specific JSON structure!",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_013KNtXimWjxydHNC1qfHzwP",
  "model": "claude-opus-4-7",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 43,
    "output_tokens": 587
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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
Great choice to explore along the way! Here are some popular stops, organized by route:

## If Taking Highway 1 / Pacific Coast Highway (scenic, ~9-10 hours driving)

- **Half Moon Bay** – Charming coastal town, great for breakfast
- **Santa Cruz** – Boardwalk, beaches, and redwoods
- **Monterey** – Famous aquarium and Cannery Row
- **Carmel-by-the-Sea** – Quaint village with art galleries
- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls
- **Hearst Castle** (San Simeon) – Historic mansion tours
- **Morro Bay** – Iconic Morro Rock and sea otters
- **Pismo Beach** – Sand dunes and beach town vibes
- **Santa Barbara** – "American Riviera," wine, and Spanish architecture

## If Taking I-5 (fastest, ~5-6 hours)

- **Harris Ranch** – Famous steakhouse and rest stop
- **Kettleman City** – Gas and snacks (not much else!)
- I-5 is efficient but pretty barren—mostly farmland

## If Taking US-101 (middle ground, ~6-7 hours)

- **Gilroy** – Garlic capital, outlet shopping
- **Paso Robles** – Excellent wine country
- **San Luis Obispo** – College town with great food
- **Solvang** – Charming Danish-themed village
- **Santa Barbara** – Worth visiting on this route too

## Questions to help narrow it down:
1. How many days do you have for the trip?
2. Are you more interested in nature, food, history, or beaches?
3. Traveling solo, with family, or friends?

Let me know and I can build a more detailed itinerary!
```

```json
{
  "content": [
    {
      "text": "Great choice to explore along the way! Here are some popular stops, organized by route:\n\n## If Taking Highway 1 / Pacific Coast Highway (scenic, ~9-10 hours driving)\n\n- **Half Moon Bay** – Charming coastal town, great for breakfast\n- **Santa Cruz** – Boardwalk, beaches, and redwoods\n- **Monterey** – Famous aquarium and Cannery Row\n- **Carmel-by-the-Sea** – Quaint village with art galleries\n- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls\n- **Hearst Castle** (San Simeon) – Historic mansion tours\n- **Morro Bay** – Iconic Morro Rock and sea otters\n- **Pismo Beach** – Sand dunes and beach town vibes\n- **Santa Barbara** – \"American Riviera,\" wine, and Spanish architecture\n\n## If Taking I-5 (fastest, ~5-6 hours)\n\n- **Harris Ranch** – Famous steakhouse and rest stop\n- **Kettleman City** – Gas and snacks (not much else!)\n- I-5 is efficient but pretty barren—mostly farmland\n\n## If Taking US-101 (middle ground, ~6-7 hours)\n\n- **Gilroy** – Garlic capital, outlet shopping\n- **Paso Robles** – Excellent wine country\n- **San Luis Obispo** – College town with great food\n- **Solvang** – Charming Danish-themed village\n- **Santa Barbara** – Worth visiting on this route too\n\n## Questions to help narrow it down:\n1. How many days do you have for the trip?\n2. Are you more interested in nature, food, history, or beaches?\n3. Traveling solo, with family, or friends?\n\nLet me know and I can build a more detailed itinerary!",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01FmPy3fWFf7w6Sx6ECEdKnh",
  "model": "claude-opus-4-7",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 114,
    "output_tokens": 621
  }
}
```

</details>

<details>

<summary>**Creative Writing with Adaptive Thinking** — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated `temperature` parameter.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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
# The Wrong Kind of Silence

Detective Mara Halloran had worked enough crime scenes to know that rooms had voices. A kitchen where someone had fled mid-breakfast hummed with interruption. A bedroom after a struggle kept the echo of it in the disarranged sheets, the lamp knocked just-so.

But the study at 14 Pearsmont Lane was quiet in a way she didn't recognize.

She stood in the doorway, coffee going cold in her hand, and tried to name it. The body had already been photographed and carried out—Gerald Finch, seventy-two, retired cartographer, found slumped over his desk by the housekeeper at half past six. No forced entry. No wound. The coroner was calling it natural until the tox screen said otherwise.

Mara stepped inside. Bookshelves. A globe. The smell of pipe tobacco clinging to the curtains like an old apology. Everything where a dead man's things ought to be.

Except.

On the desk, beside the blotter where Finch's forehead had rested, someone had laid out seven grains of rice in a perfect, deliberate row.

Not spilled. Not scattered. *Placed.*

She crouched until her eyes were level with the desktop. The grains were evenly spaced, each one turned so its seam faced the same direction—north, if she was reading the window light right. The housekeeper hadn't mentioned them. The first responders hadn't logged them. And Gerald Finch, according to three separate statements, hadn't eaten rice in forty years. Couldn't stand the stuff, his sister had said. Something about the war.

Mara straightened slowly, her knees protesting, and felt the quiet of the room press against her ears.

Seven grains. Facing north. On the desk of a man who drew maps for a living.

"Well, Gerald," she murmured, reaching for her notebook. "Who were you trying to tell?"
```

```json
{
  "content": [
    {
      "text": "# The Wrong Kind of Silence\n\nDetective Mara Halloran had worked enough crime scenes to know that rooms had voices. A kitchen where someone had fled mid-breakfast hummed with interruption. A bedroom after a struggle kept the echo of it in the disarranged sheets, the lamp knocked just-so.\n\nBut the study at 14 Pearsmont Lane was quiet in a way she didn't recognize.\n\nShe stood in the doorway, coffee going cold in her hand, and tried to name it. The body had already been photographed and carried out—Gerald Finch, seventy-two, retired cartographer, found slumped over his desk by the housekeeper at half past six. No forced entry. No wound. The coroner was calling it natural until the tox screen said otherwise.\n\nMara stepped inside. Bookshelves. A globe. The smell of pipe tobacco clinging to the curtains like an old apology. Everything where a dead man's things ought to be.\n\nExcept.\n\nOn the desk, beside the blotter where Finch's forehead had rested, someone had laid out seven grains of rice in a perfect, deliberate row.\n\nNot spilled. Not scattered. *Placed.*\n\nShe crouched until her eyes were level with the desktop. The grains were evenly spaced, each one turned so its seam faced the same direction—north, if she was reading the window light right. The housekeeper hadn't mentioned them. The first responders hadn't logged them. And Gerald Finch, according to three separate statements, hadn't eaten rice in forty years. Couldn't stand the stuff, his sister had said. Something about the war.\n\nMara straightened slowly, her knees protesting, and felt the quiet of the room press against her ears.\n\nSeven grains. Facing north. On the desk of a man who drew maps for a living.\n\n\"Well, Gerald,\" she murmured, reaching for her notebook. \"Who were you trying to tell?\"",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_019oiL5qvRdHBpPLrsS5x3Ux",
  "model": "claude-opus-4-7",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 31,
    "output_tokens": 628
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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
# Recursion Explained

**Recursion** is a programming concept where a function calls itself to solve a smaller version of the same problem, until it reaches a simple case it can solve directly.

## Two Essential Parts

Every recursive function needs:

1. **Base case** — a condition that stops the recursion (prevents infinite loops)
2. **Recursive case** — the function calling itself with a smaller/simpler input

## Simple Example: Factorial

The factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`.

- `5! = 5 × 4 × 3 × 2 × 1 = 120`

Notice that `5! = 5 × 4!`, and `4! = 4 × 3!`, and so on. This self-similar pattern is perfect for recursion.

```python
def factorial(n):
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1
    # Recursive case: n × factorial of (n-1)
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

## How It Works (Step by Step)

When you call `factorial(5)`:

```
factorial(5) = 5 × factorial(4)
             = 5 × (4 × factorial(3))
             = 5 × (4 × (3 × factorial(2)))
             = 5 × (4 × (3 × (2 × factorial(1))))
             = 5 × (4 × (3 × (2 × 1)))     ← base case hit!
             = 120
```

## Real-World Analogy

Think of **Russian nesting dolls** 🪆. To find the smallest doll, you open one, find another inside, open that, find another... until finally you reach the tiniest doll that doesn't open. That "tiniest doll" is your base case.

## Key Takeaway

Recursion is elegant for problems that can be broken into **smaller versions of themselves** — like traversing trees, navigating folders, or solving puzzles like the Tower of Hanoi. Just remember: **always include a base case**, or your program will crash with a stack overflow!
````

```json
[
  {
    "message": {
      "content": [],
      "id": "msg_018UiizftMy3k3UwQepmrFxq",
      "model": "claude-opus-4-7",
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
        "input_tokens": 27,
        "output_tokens": 6,
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
  "... 27 more chunks omitted ...",
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
  'anthropic/claude-opus-4.7',
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
  "model": "anthropic/claude-opus-4.7",
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
I'll search for recent Cloudflare news from this week.
```

```json
{
  "id": "msg_01BWg8R9cfU4m8VTrQPMZdAd",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll search for recent Cloudflare news from this week."
    },
    {
      "type": "server_tool_use",
      "id": "srvtoolu_013S4aGzYgyxQ9sNuA6ALc9i",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news this week"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_013S4aGzYgyxQ9sNuA6ALc9i",
      "content": [
        {
          "type": "web_search_result",
          "title": "Cloudflare Status",
          "url": "https://www.cloudflarestatus.com/",
          "encrypted_content": "EqYhCioIERgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDLs6yt+/C7NMzOOHuxoMfTrWTeKpYPg+/WbNIjCFn887ycJ9IIR83SGr7fQLeFOx5RyYkg4b2vu3Kxx5CJjqZq0iBUS8XDbIN0bRJrEqqSDFr1NwMDgiuLoIP5k0+NybFDI+GQtwOUBoMimnyOJJOSXC5ANC4ub/VgsHGe7C2TGmbHlQmMpq9DpsM2A3Y3rXZPImB/HQOl5Fmq2h6cOK8FyYn3cJzxPcfQoRli5gZKGRuTzA6LnSDu5SdnjIEVsmsIWU+Ua+4S/xPFSM2BtJJhMZ8dLwFgUX6IJk1UB5uGEBQXNGa+QG1w/WyOtkLKAzguXxaxPKuHUpki2gX9oQ2hTt/zn/xfssQs00Tkpy1aFnsW5MPnwhEN07CDp3lO2RtjXDRXiQ8ctOHuzLbf5hGALkQvRkMsHqN6smzg1dj1mBb6DMtPZNOn/AZUfHmzRsDksbH2XvCu5Jr/HWjBq/NFUc8bcw5hzUTEHGKagdoyUJee6BKVpB0psAvrTw8gR53Im3CYmJE9nqkBJLdEptMGM/DHJ4t9ad0Wv9uSBUTaf+7njuBQI/tEX31pFHco0hSqN59o2cr9Va6V4phUH7gZtqhZXLzNdZ50r4L/+becTwHs3te6tiLNiE4MAGuzK+7+icPfS30W0ycHrO9l3bszUItc6ngs6I5G0DugXxSZibu9rIOW9xRrEIHMhmm3X3ftvMr2dyGxzlvLSxkZ74haaxywGe3nqmfUZo9h1uo94NxEA/Ye6+keKnQil09zZDsuWG+DxDQLXSJ+zDfpESmyizBtx68eC42ZyzmdM3mpjgo1txe6HegJt5W1mpJ/GETXtKXtMTryaocI2MagG7CYBvzc4mvBnBzR3T6XT+kvc0teo1uuERonRKqBqXtWHQGiyCdYdbMdISW/AOFhHJbBwm95oHED7omyJ4Y3SU0j/EYm13rRWcwsDkTbK7U6HVOO6lCek1yOFKX4dcsSoM+6XU7/dFONstzrRkBl0D1kV+mHK2+urcq5UNzXXZUPZKYKleEVdNQVOys0eGEWN6/q/yLnrindtPd1I4/h4fO+GSCjmjrIJKJxOH3BGyG8WUuNvgq3K/FWn8f+xRDf2U6cqHaZNr6EGDWH5ZajCKBrmqlrc5gmHdzIlTL+2U4qrJwh4Vp/TIvo7f9l0a2J00Fawlsud0NH86gMB6R5L1meDNq8Acm6c6vz4KLJ8Hlo9kv061EQEmkK0MdydHXjrnGw14WUmnr0IZBqTpphAbP4AFOPJNGsiMzB3MlxX8As4Irpp8U9CB+y6p7JVmLHABp4Ilsq3co+xjcplx1dHNtM0OsMPd9K8/AnMSBcOg+pfvkZF12t5du1cO9vVAaUTsA6rdPL2UE1l+MgHSAKM8vxEWi0LOJEHtn+yo34Bcjzv1SyWvV63l1vI5oK+3BOM7cQfFipJXqEiQJjLk2YjUmFTT0fwwMPdmRwKMrSpwetdokvwtAZHWfHLCvpduCjek4UzM9Gknww/Lf0YeIFtZtWQJYwnTobwKlqH18eOs+GCDHsOfc3wLwycKsxzOppX1m8JHEl9AOekjXUpU6AYo/tuHkSV6VtqOiL+zNfrAHeAGZrHSesaoKEnK2wFVVysnZjR4qry34J6LLY3cpy1ErBC0na6ix3XhzDlrk7TnfHsVKDdj2Hx96lK99ZelqMXJRs0VUSD2R/zRWVpIqGXL3JjCEXqgKITdkuLcr0GdWlmRLDRjd3poNsVRX1wALK6Ue2rlyRqoKbhinSGQp7hhnHLR7BApf4LtrsHhiryNOOZmEYhBZ4xpEaFh5962NX8Yno4EmxoU6lRxxySSlGWa1+Lm5OmTQ8iDHMGrFgpvWu6Zqcaq2z8b9eoe9T53LS+icRao09aIltgfOz/CV3PfoDP9ssy8jmkWOCDxLZiRpugDYRJb2PT040i5eiRiS7Gsbo3VS8Bq05EynUp8hq9bs1McmDTvaWLtlhUD2imk69kE/5/T65/FbypwXeWCPYHsRT0n4V1M3ljWP7HLHPKpuOnMN7KWStDZaTNN/KcZNGF2W1l76o4G6Nqz/K8tmF08Zhxr6SKGmW9eZw0sN4KsDc/sqYf1KYmV4Q/oO7a0uyIHtAYkVAg2UyxPLQiCp4ScZ+vtWmZEH46GtbEIeEJ2OJhlwCyYoHpPB6ZNa/Bx+5EfUUbp3IzjkA/mfNcUOXsCS5WTi9XMGKfskR6EQsCYTg3wQgavqUV1I2cK29GDhMZtOUmn2OIQUNDBbopKddWwmATnT8wQSiugTovwsQuQT9ml751oYugkhZVhDYaqjjQGRX6F/+qMDCtNZw59GJzMARIrnDCymcL9NkkjNxPt7hmoNq5qd0V00wt+q4InD3DHejDhac+UzW/rUMTQj8WNmXmnCZz0IoZbTS5wHAGsOmYUCZePExSG1ep4MHK7pJKr9XLB+KZ4oxGSmYXPC1QggSl+Ddbugb88nDPvyTfHnBYpoQ7z+jpTbwEMtDJ+I2Ig2pPdY4KnzouKvNb1P5GscjXu2MnYly63nxOTWK/+ccIxw69dpuzBOsTzfeN9ecf9s8WIrzwkANOxfILXPXJoEY3pTMFJAFqFgyA/NsIBYftukw+lIr4qlLJSDOD6bc0jR/+eWH+rgJaC0SS+Pd1uT9VkSTBx2ivtr//RCamH7OPxazBj4Hzplx+1PT45YABe3/a4Rtgb19H8mJcvU31NdYHveHWd4OFcqL9MqlKaE/O3Pr+dbhsjIm+HNN6QUD89CERXtP4H4MXNBj0vgHiVe6HizPov8Ll2UHNf0d/Nb/dgI5tfP2cfh3o5/sMPviRmU34E4ntRmdyz+e9Bq3ga6h8PcykxijuMJl3sdvlqUt3KcKWEPCioSxA4HgTKmy0bmhaOAWnC3CKzZ9jP8UXnbNIygMDmoXx8IcmZBCMKLAf38jXKGdb07QivO6fOsvizygl///TeKvwEpH/ylI8QgI8/Cnj9yRqbcclsno03E60JdUWQtuIUMfCYukgH4TNhlEAR2IEYyjigRktwHvgam11vCQdA+yD/9ztQ3pqcks0sAjzXHi8QM4dahW1sE6zNpIxV45Dc0fcA9p1dWyn2tQ36rawrmEGrUA7z67XrM+tbHHYSCU0lHDEiGqa3AqiXwFggSddMpRT7+XK1RQfIHA1IGPanvJLltjLek6XvkKfeULpIra21/N9z7FyRTI+RKG1IJxJLkejOfj3iZgQHVb+kKqJcRjGRmAWNgcrU9Ojl8f6/0CSylqA6QjwZkyA1wlF1BRu5u1eoNKf6eRZBalsFuuDapeZaYWSyBwo+GOGSNqd57JZGj67eQMyE3pC3CHINyeoFlrBom0adlAb2yktQJ88TKjS/7eO5jaMfkwuCOtpgjwkfxmcvX332pO9vnn3vO9YEdB6Ixw4NrKjfgMpVSLaDtXI6qgJSjLBl0aunS/gm77radNk2IpDBmqeM+FPTsntujJ1EZK2EPrUUru86CGk5PS+B2Y/e/04jMR9lbg4S7fsYVESlWXrAdJF8MQpxoFsAsOBPD3PcFtAMcPcl6BqpaLyWmz04AyY8ge6hhLA5Vfb9pH614LQ2FCZSRqL1SQJMSwaCACMQ9+w++v6j6U7OkW/XbyU0oM8YYIquizyLeya2Ocsf8fNwg8CTIsLYax9pwWNUB8MGJXF9BlaUx4U9u3yhvCm6p4/0WI0c0e7M5zGjUUluqPdLsv/5A/RkXsv5sPo/4HJzJygYTKFstb46ACuRw7roTYGUqHXHYvq78g/9vLIZ2i05SeX+/GTZOGSsKDO1ImCORhPoPtcoR7p1K+i7vsjIGY2XYoPsdIgHi+005o5tsnYp9ln3VjZpo5cpKs/3QrxZ7zFUbNYQrSxrGpKeaSsCVAj+ZemOoXNoNDrwMa7GfgqXePbVV5f9vaLBUisfzcR0N/HN3ZOrOGzpALyHZcIhloWEAUXEvGfODXQoO4T5ZEnL0DBzP8XFZ1eH6Jkn6uI9OM7ejxs3+uyEaMx27h5fF7h7+5ZbnEgt9z3wq9LLvpWyyosZn7qSwRzIZ5dDu2L/bnqd0VS1YchLquzL6LLu+OUpn9j4QQiPH10wjzaLa2cB2oo/DefRQsP86vHc/zuhbYy7u3BvkKOqtQFA5y1kgBsY+mx4gH+K13e8ZM53WNKC1wGX2nEgMt0/BHN0xlT4MRr3VyXpicepp19oMbXVnjKOKifyzCCH2hRgPEVd9nSROvX9662tGtHFpkyxwWev/NKvovBTUOTRiFEK2AuK4SVNkfBBACYiWTrjoF+xCt1w/IAUhuuSpe3yj8BEht0qbGf8MsSmidhsxMEcAYNmGS/1Y2tWT5lCezQaMoFTB9wDMky2OuDnhJb4cV5HdroACZND6pgTqsT2k32YCD/+wW1MDjYCem/Y/kIisVdgTkm9lUpINREocShZ9z+Zhy6SfDzLvq1mGWk4tqqIcWbokZo539DcSppBNOX9Rx1tn/s3PlbVqaSmU3wjxQEKZJw//9mRL7qyFaEDkslkNqWUA2G4QCqvATWCswoj1V50HApoIR/Cy4um9UXKIZIyJpF/iMH2y6OkhRgKVKC2SMygGqDr9Ng6Yznwb+UJMxgZZX4De2RS/et6uPYBApf51irpxoWUZDU9lam5rArP5ONOca9dgdhPZppgEWzQsfD8gLvGeDuFSBFXXtznVJTrsfS4C3vWAYkgtjdYSi8PiuKpPj5IrQ0c5b/ftWS6i3Cfp1l4jvDWiQGOO1qD6C0XENaemJQl7kZ/aTMVxrLky6RWDaQcWMSCOkS4+ch30vQuI8dR1++KlBVA/UpTpimh9y8hCswN+AC6b/hhTQne/yyQucfeqidssmI5lQghLl6B+qbZhnA1/jyt0CHB+Xao0MxEY7WMcq+Ro8JeqPw5N+Cft0NLUlqTyhXivh1U3mDIHSrfzYMB8SNLiw5h3ybuUuc54Ug0LJNv+OgekArzKE2oAx9+vm1HTr/qp/tm0kYgOBT+mBn8AXpKTui4ygqDcisrcW6indctb7gmdPfUHgolVW556qcG2eVEmBxajx6fwJ2TCK/XGXy31fidf4hMTfZMAyq/FN788bZg7c+XEk5SHoPAXhMrSjK8JjDxyBHF56sy0lPwPvb6enZwqpwtZBQdgDBZgO26CT/gXB4LLIPHgkop1lScelSuN0o/KAxTedV6vqylwpVGwyUw0tE/7D2FgtAGt5QX42x0ufEVvtQY6EAXbbrsY2YTKFw0mv53YyIbEQtHG6ZQL8MIfSQ8tJuR/jllpPoPe26K75OrFnaEkAadVP4dfefnLJ2eJhLki5QHj0a6vmoGJ6n9RrmRlqLouqh91/AT5biWjM/YGuO0yTHdq7on/KAb8hyDkfkXSfQO8/p8bdgCWOd2yoKaBR2J1W0VFOrUUtAhy8hh9yxlQ22FKVaZzieR2d5W1vqxK65C9ZIpHF3Fsqu0OgnoX4BRstIzEoTnvaa44XvfiLMFfYH3PUZD2jebAAgBusIU7drs7DlWrd2H6Yk/XLK2SxhpBjkNtLJznagZSELhjNSx6+yPDjbZszyM1ubBfOYYLjTV41QDDDeWz70G+ysSppwY+nCLz1s6x6cfBQHNGsgfGWPdFrPmjtWQLOw+MAoYAw==",
          "page_age": "2 hours ago"
        },
        {
          "type": "web_search_result",
          "title": "The Cloudflare Blog: Product News",
          "url": "https://blog.cloudflare.com/tag/product-news/",
          "encrypted_content": "Eq4RCioIERgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDMOia1KDnEAH6YOevhoM/n5JLAXIcCPYQUntIjAcreSbXVbIEBZ6wML6d5qHBiTW/YkxJE1sENIYaoVcijt0HiWuN123Vk3tyTfulFAqsRDV9Cez6XIUaUNEG6jLYDyFl3s9rG0jWvTdQsh0qpeL4GdE6z8Mw+3gVNRDgDwXGB7URA66VLON7JKg51WKMhjC+UrlUwS1yXd0so65XfczRpxhWKxSJgGwCD8Gx5RHO2aPV4x4fOO5wT/Q2Clsw3xVRaRfcMLPh7bqIS71NYhTVsF/jTPj5iA5elgeeA2EvFZXcSobGpyPjbbeAj/ZeLpOd2j2ftPZ2wt4B66T2tKnFkBywz2dKuI+VqpjQD/XpvwHmVthHuGj3Jac0gcmsXi3PuiTuaPNYM9EZILXpIRW1R6+ZKAvc1rqa6gcNIEnS3mBGe5s7DSyYMgQQLi8gSyGJNpn+0HdYXDe5aBmL/gVOz4bjBUSfT5LpglG+gbk1NnNVVy13ETbPnA9pgZkzhNmIeaa3F891lSGC3xzsyA31FIejMLKuECWUt5JWEIc4A/rJUVASx76/YQVrVHngyIsQqHHE89U0SHkBEpub4S9widPpZwRCbzGnIs3iYWsr9e8jG6OOk+OGNnvmVX2I7q3Jsr6Gd9muh1A8uC13OMdadNlN5lrfXYIdUvxdDE647F0d6tyUjIfBMvDCIYBwOpvC727GsLS8bLGDVa6qNYXj/1S6zYUefjLAQa6kui/XtCUuAloCYp3WznON2vKjZ4FQxu+xi2Xp5mUdMMJ4jR46gz+if9GVjYbcQfJtrzR4rCJAA+MM4I3nSQBMnk2mT6bDhjcYPbRHDbuKkbToda13O/HVJ0WZ30/l8SNkklA/d4XUQzjU50SwASiNEQ01cB93LutVyK8g2PEKesJFJb1VtqFkardOt+WmMyqqmNe3QnOnlSR6UKhnGzjYmVhOmOsgqPQ9XElxbkRPWL6MLRl6lmQge8OzYYmYw58bQcResej8/GGrk6OvIEpAOH+9UJ2cDGr8TAlSY0KiBLtNx43p2VHn23jpwm/3z4UTR9grzNaeBYg0CRKsIemUKoYphcrtsZml2raQDzVVDBSOYdt/zcZWr6RdDITlIkPwszDJt8XkjIKzReTILfeIRp41/0NVLJGw3shElB+LRI/xJR661Sc4XvwGn5iZbFOzehItFvOKfyFNIp7BxCU50NudkvfnSdG443E4dv369Ak5iNr7IS/iTzzHaHSkEkqC4c+iAOPfSgA57xt8PF85I4wOFiEWjEi4ckpFLY0k
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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/#page","headline":"Claude Opus 4.7","description":"Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.7/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
