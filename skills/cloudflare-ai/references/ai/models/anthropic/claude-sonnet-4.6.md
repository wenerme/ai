---
description: Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.
title: Claude Sonnet 4.6
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Sonnet 4.6

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-sonnet-4.6`

- Third-party
- Zero data retention

Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/sonnet) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$3.00</li><li>Output (per 1M tokens)$15.00</li><li>Cached input (per 1M tokens)$0.30</li><li>Cache creation (per 1M tokens)$3.75</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
There are actually **four** laws of thermodynamics (including the Zeroth Law):

## The Laws of Thermodynamics

**Zeroth Law**
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)

**First Law**
Energy cannot be created or destroyed, only converted from one form to another. (Conservation of energy)

**Second Law**
Entropy of an isolated system tends to increase over time. Heat naturally flows from hot to cold, not the reverse. (No perfectly efficient engine is possible.)

**Third Law**
As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero. It is impossible to reach absolute zero in a finite number of steps.

---

The laws are often summarized humorously as:
- **You can't win** (can't get more energy out than you put in)
- **You can't break even** (you always lose some energy to entropy)
- **You can't quit the game** (you can never reach absolute zero)

Would you like more detail on any of these?
```

```json
{
  "id": "msg_015bDPjJ5vm4gY4EH7pALCsh",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "There are actually **four** laws of thermodynamics (including the Zeroth Law):\n\n## The Laws of Thermodynamics\n\n**Zeroth Law**\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)\n\n**First Law**\nEnergy cannot be created or destroyed, only converted from one form to another. (Conservation of energy)\n\n**Second Law**\nEntropy of an isolated system tends to increase over time. Heat naturally flows from hot to cold, not the reverse. (No perfectly efficient engine is possible.)\n\n**Third Law**\nAs temperature approaches absolute zero, the entropy of a perfect crystal approaches zero. It is impossible to reach absolute zero in a finite number of steps.\n\n---\n\nThe laws are often summarized humorously as:\n- **You can't win** (can't get more energy out than you put in)\n- **You can't break even** (you always lose some energy to entropy)\n- **You can't quit the game** (you can never reach absolute zero)\n\nWould you like more detail on any of these?"
    }
  ],
  "model": "claude-sonnet-4-6",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 17,
    "output_tokens": 252
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
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
## Reading a JSON File in Python

### Basic Method using `json` module

```python
import json

# Open and read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

### Common Approaches

**1. Read as a dictionary/list (most common)**
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)  # Returns a Python dict or list

# Access values
print(data['name'])
print(data['age'])
```

**2. Read JSON string manually**
```python
import json

with open('data.json', 'r') as file:
    content = file.read()          # Read as string
    data = json.loads(content)     # Parse the string (note the 's')
```

**3. Handle encoding (for special characters)**
```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

### Error Handling (Recommended)
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

### Key Differences

| Function | Use Case |
|----------|----------|
| `json.load(file)` | Read directly from a **file object** |
| `json.loads(string)` | Parse a **JSON string** |

### Example JSON file (`data.json`)
```json
{
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "coding"]
}
```

**Output:**
```python
data['name']    # → "Alice"
data['age']     # → 30
data['hobbies'] # → ["reading", "coding"]
```

> **Tip:** Use `with open()` to ensure the file is automatically closed after reading.
````

```json
{
  "id": "msg_015vWQKd15N4szFzUuNwum2W",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "## Reading a JSON File in Python\n\n### Basic Method using `json` module\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n### Common Approaches\n\n**1. Read as a dictionary/list (most common)**\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)  # Returns a Python dict or list\n\n# Access values\nprint(data['name'])\nprint(data['age'])\n```\n\n**2. Read JSON string manually**\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    content = file.read()          # Read as string\n    data = json.loads(content)     # Parse the string (note the 's')\n```\n\n**3. Handle encoding (for special characters)**\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n### Error Handling (Recommended)\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format\")\n```\n\n### Key Differences\n\n| Function | Use Case |\n|----------|----------|\n| `json.load(file)` | Read directly from a **file object** |\n| `json.loads(string)` | Parse a **JSON string** |\n\n### Example JSON file (`data.json`)\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"hobbies\": [\"reading\", \"coding\"]\n}\n```\n\n**Output:**\n```python\ndata['name']    # → \"Alice\"\ndata['age']     # → 30\ndata['hobbies'] # → [\"reading\", \"coding\"]\n```\n\n> **Tip:** Use `with open()` to ensure the file is automatically closed after reading."
    }
  ],
  "model": "claude-sonnet-4-6",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 29,
    "output_tokens": 508
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
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
Here are some great stops depending on which route you take:

**Pacific Coast Highway (Highway 1) - Scenic Route**
- **Santa Cruz** - Fun boardwalk and beach town
- **Monterey** - Great aquarium and Cannery Row
- **Big Sur** - Stunning coastal views and hiking
- **San Simeon** - Hearst Castle tours
- **Morro Bay** - Charming harbor town
- **Santa Barbara** - Beautiful city with great food and beaches

**Highway 101 - Middle Route**
- **San Jose** - Tech museums and good food
- **Paso Robles** - Wine country and wineries
- **San Luis Obispo** - Charming college town
- **Santa Barbara** - connects with PCH route

**Interstate 5 - Fastest Route**
- This is the most direct but least scenic
- Good if you just want to get there quickly

**Some Tips:**
- The PCH route adds several hours but is worth it for the views
- Big Sur can have road closures, so check conditions ahead of time
- Santa Barbara is a great overnight stop
- Try to drive Big Sur during daylight for the best views

Would you like more details about any specific stop or help planning an overnight itinerary?
```

```json
{
  "id": "msg_015gJCs45CLVWFpG9swxLY1h",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Here are some great stops depending on which route you take:\n\n**Pacific Coast Highway (Highway 1) - Scenic Route**\n- **Santa Cruz** - Fun boardwalk and beach town\n- **Monterey** - Great aquarium and Cannery Row\n- **Big Sur** - Stunning coastal views and hiking\n- **San Simeon** - Hearst Castle tours\n- **Morro Bay** - Charming harbor town\n- **Santa Barbara** - Beautiful city with great food and beaches\n\n**Highway 101 - Middle Route**\n- **San Jose** - Tech museums and good food\n- **Paso Robles** - Wine country and wineries\n- **San Luis Obispo** - Charming college town\n- **Santa Barbara** - connects with PCH route\n\n**Interstate 5 - Fastest Route**\n- This is the most direct but least scenic\n- Good if you just want to get there quickly\n\n**Some Tips:**\n- The PCH route adds several hours but is worth it for the views\n- Big Sur can have road closures, so check conditions ahead of time\n- Santa Barbara is a great overnight stop\n- Try to drive Big Sur during daylight for the best views\n\nWould you like more details about any specific stop or help planning an overnight itinerary?"
    }
  ],
  "model": "claude-sonnet-4-6",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 76,
    "output_tokens": 290
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

<summary>**Creative Writing** — Higher temperature for creative output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
# The Weight of Paper

Detective Mara Osei had seen plenty of strange things in fourteen years on the job. She had once found a murder weapon wrapped in a birthday cake. She had once interviewed a parrot that knew the killer's name.

But this was different.

The victim's apartment was ordinary enough — takeout containers, a dying fern, furniture that looked purchased in a single defeated afternoon at a discount store. Nothing about Leonard Voss suggested a man with enemies. Nothing suggested a man with much of anything.

Except the paper.

Mara crouched beside the coffee table and studied it without touching it. A single sheet, handwritten, covered edge to edge in the same two words repeated hundreds of times in shrinking letters, spiraling inward like a drain.

*I remember. I remember. I remember.*

The handwriting started bold and confident at the outer edge. By the center, the letters were barely visible, scratched by what must have been a nearly dead pen — or a nearly dead hand.

The medical examiner appeared in the doorway. "No signs of struggle. No forced entry." He paused. "Honestly, Mara, it looks like he just *stopped*."

She stood up slowly, slipping her hands into her pockets.

"Then what," she said quietly, "was he trying so hard not to forget?"

---

*The fern, she noticed, had been recently watered.*
```

```json
{
  "id": "msg_01BfiLNfgBobjw33wuZDP9as",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "# The Weight of Paper\n\nDetective Mara Osei had seen plenty of strange things in fourteen years on the job. She had once found a murder weapon wrapped in a birthday cake. She had once interviewed a parrot that knew the killer's name.\n\nBut this was different.\n\nThe victim's apartment was ordinary enough — takeout containers, a dying fern, furniture that looked purchased in a single defeated afternoon at a discount store. Nothing about Leonard Voss suggested a man with enemies. Nothing suggested a man with much of anything.\n\nExcept the paper.\n\nMara crouched beside the coffee table and studied it without touching it. A single sheet, handwritten, covered edge to edge in the same two words repeated hundreds of times in shrinking letters, spiraling inward like a drain.\n\n*I remember. I remember. I remember.*\n\nThe handwriting started bold and confident at the outer edge. By the center, the letters were barely visible, scratched by what must have been a nearly dead pen — or a nearly dead hand.\n\nThe medical examiner appeared in the doorway. \"No signs of struggle. No forced entry.\" He paused. \"Honestly, Mara, it looks like he just *stopped*.\"\n\nShe stood up slowly, slipping her hands into her pockets.\n\n\"Then what,\" she said quietly, \"was he trying so hard not to forget?\"\n\n---\n\n*The fern, she noticed, had been recently watered.*"
    }
  ],
  "model": "claude-sonnet-4-6",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 21,
    "output_tokens": 317
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
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
# Recursion

## Core Concept

Recursion is when a **function calls itself** to solve a smaller version of the same problem, until it reaches a simple base case it can solve directly.

Think of it like Russian nesting dolls — each doll contains a smaller version of itself, until you reach the smallest one.

---

## Two Essential Parts

| Part | Purpose |
|------|---------|
| **Base Case** | Stops the recursion (prevents infinite loop) |
| **Recursive Case** | Breaks the problem into a smaller version |

---

## Simple Example: Countdown

```python
def countdown(n):
    # Base case — stop here
    if n == 0:
        print("Go!")
        return

    # Recursive case — call itself with a smaller value
    print(n)
    countdown(n - 1)  # ← calls itself

countdown(3)
```

**Output:**
```
3
2
1
Go!
```

---

## How It Executes Step by Step

```
countdown(3)
  → prints 3, calls countdown(2)
      → prints 2, calls countdown(1)
          → prints 1, calls countdown(0)
              → prints "Go!", returns   ✓ BASE CASE
```

---

## Classic Example: Factorial

```python
def factorial(n):
    if n == 0:          # base case
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(4))  # → 24
```

**Why it works:**
```
factorial(4)
= 4 × factorial(3)
= 4 × 3 × factorial(2)
= 4 × 3 × 2 × factorial(1)
= 4 × 3 × 2 × 1 × factorial(0)
= 4 × 3 × 2 × 1 × 1
= 24
```

---

## ⚠️ Common Mistake: Missing Base Case

```python
def broken(n):
    print(n)
    broken(n - 1)  # never stops → stack overflow!
```

---

## When to Use Recursion

✅ **Good fit for:**
- Tree/folder traversal
- Sorting algorithms (merge sort)
- Problems naturally defined recursively (Fibonacci, factorials)

⚠️ **Be careful of:**
- Deep recursion causing stack overflow
- Repeated calculations (use memoization to fix)

---

**The key insight:** Trust that your function works for a smaller input, use that result to solve the current input, and define where to stop.
````

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-sonnet-4-6",
      "id": "msg_01JqufFVcarQ73V8GUn3XSSC",
      "type": "message",
      "role": "assistant",
      "content": [],
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 19,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 1,
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
  "... 28 more chunks omitted ...",
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
  'anthropic/claude-sonnet-4.6',
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
  "model": "anthropic/claude-sonnet-4.6",
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
Here's a summary of the top Cloudflare news stories this week:

---

• **AI Agent Verification in Bot Management** —
```

```json
{
  "id": "msg_011aLAk6hWx3649oMeuJBm4w",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_017fsFRbkfUvtAZDtsdHQHpk",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news June 2026"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_017fsFRbkfUvtAZDtsdHQHpk",
      "content": [
        {
          "type": "web_search_result",
          "title": "Cloudflare Release Notes - June 2026 Latest Updates - Releasebot",
          "url": "https://releasebot.io/updates/cloudflare",
          "encrypted_content": "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",
          "page_age": "2 days ago"
        },
        {
          "type": "web_search_result",
          "title": "Press Overview | Cloudflare",
          "url": "https://www.cloudflare.com/press/press-releases/",
          "encrypted_content": "EvMCCioIEBgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDCch0SONkciDkIjZyBoMkaSPWo3PaVWy00JBIjDLEt1nqEXoy8JuNkVrddRulYfFkaynmdMj81PTz0pFdNp1JPzH2ivOUIULTwUEnTcq9gHOoLsuFECd+94wuNXYT3y5mDi4JwIF6cgad1D5l1/XcU+IlGgv81XpGKA5mI1bkG8ra1enXlkazfHxp5tRYVKEhAIxK4TZqzxANK0TMXpVIT6HXY6g02RHaguLV01oP59VZ9bcesPf4vju8lNkfcVS/3gi2taiKViTgb5NUzKMmuSdqdmATzHmnPbmTxeTQmvmHYayBxRYCWasF7CyGHeWAYb6VF9c9uPmgOQaNJHotZRlupWt32iJhjuYq2F8JvWLkMvTwzOIRC7q0J5VpRGK/KboVxwkpqN5mQPo1IUcLvcusTdCxr6YaZmbxGZvD+sdbB+0O00YAw==",
          "page_age": null
        },
        {
          "type": "web_search_result",
          "title": "Cloudflare News | June, 2026 (STARTUP EDITION)",
          "url": "https://blog.mean.ceo/cloudflare-news-june-2026/",
          "encrypted_content": "EvsgCioIEBgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDN26YfZgx/3x0lmOBRoMzq0xt+da8XlijBmDIjB608J6yuZ/UpIKBQOUMOlaVHOlbjbRNbgjzTg0h8xL4genq6mxH+csLIh9yqSzEE0q/h+JhNm+c6ZKmYIENTMAvFBsmTolxan/ZL9gXPkkEnqR+8aIIWUr/r9UropurUX8aH/gCUD0Fu8YDz/rRTHZtNEfg/HSNLV/vDBsOWSAY/A+OxF0jC6imZtDUBxi4rYZX3Fn6rECrY4jK9TEoZMQPIwAfqfc3w8laAdzkwcrHgNHIWmum1aHtV/Rd6ISvJHThsbiXa5URNOVkqFaCJ68hu5UX7e3a4+5OHKw+x3HLJ5gynP3cA6eKlVerDuePP+ukD2MUppA0jZY1tyd5CEdwsIxfs9qPwjvUP+dar9tuOSnD4Jn0itbndLANq68v/nNKohRmvKn2GZOjDDBzYu4AF+E0bKF+2DfHxWq0BlJsXB8cWI3aZ2YcafpwwQPcmR0EpJnzQ4YX/9IAYE9r5OwDxzOaXzYhMsgl4lYPQSaLxdm1pHiSvJN91QWaXGuNRUlpU/fIUDsNMw9NmrSBHQ2nH1vvNJCwuTpfrppkD1bosFVwLG73xYymVr2Zbj+K0Qyb+MXJw8Dbwd9jvkpu6JA/sbPTonMYvRI50NrRrsWN/2KjnpsrKwUq1AsTd6D/f+mnseiI7FJEGYralzKn64IdY0CP
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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/#page","headline":"Claude Sonnet 4.6","description":"Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.6/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
