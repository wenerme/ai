---
description: Claude Opus 4.5 brings further reasoning, coding, and agentic improvements over Opus 4.1, with stronger tool use and tighter instruction following.
title: Claude Opus 4.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 4.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-4.5`

- Third-party
- Zero data retention

Claude Opus 4.5 brings further reasoning, coding, and agentic improvements over Opus 4.1, with stronger tool use and tighter instruction following.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/opus) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$5.00</li><li>Output (per 1M tokens)$25.00</li><li>Cached input (per 1M tokens)$0.50</li><li>Cache creation (per 1M tokens)$6.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-opus-4.5',
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

```
The three laws of thermodynamics are:

**First Law (Conservation of Energy):** Energy cannot be created or destroyed, only transferred or converted from one form to another. In a closed system, the change in internal energy equals heat added minus work done by the system.

**Second Law (Entropy):** In any natural process, the total entropy of an isolated system always increases or remains constant; it never decreases. Heat flows spontaneously from hot to cold, not the reverse. This also establishes that no heat engine can be 100% efficient.

**Third Law (Absolute Zero):** As temperature approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero in a finite number of steps.

There's also sometimes a **Zeroth Law** mentioned, which states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other—essentially establishing temperature as a transitive property.
```

```json
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

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
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

```bash
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

````
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
````

```json
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

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
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

```bash
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

```
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

```json
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

</details>

<details>

<summary>**Creative Writing** — Higher temperature for creative output</summary>



```ts
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

```bash
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

```
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

```json
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

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
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

```bash
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

````
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
````

```json
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
  "... 15 more chunks omitted ...",
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
  'anthropic/claude-opus-4.5',
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
  "model": "anthropic/claude-opus-4.5",
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
Based on the search results, here are the top Cloudflare news stories from this week:

• **Major outage caused by fiber cut (Today, June 22):**
```

```json
{
  "id": "msg_01TDBej8ibu9GLjmQqvtxwyc",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_01KYaTPC99TmQFX6b2mmSCMA",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news June 2026"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_01KYaTPC99TmQFX6b2mmSCMA",
      "content": [
        {
          "type": "web_search_result",
          "title": "Cloudflare Release Notes - June 2026 Latest Updates - Releasebot",
          "url": "https://releasebot.io/updates/cloudflare",
          "encrypted_content": "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",
          "page_age": "3 days ago"
        },
        {
          "type": "web_search_result",
          "title": "Press Overview | Cloudflare",
          "url": "https://www.cloudflare.com/press/press-releases/",
          "encrypted_content": "Ev4JCioIERgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDIMhEWfWbvn1KKce8RoMA9O3uHxom90oTQMHIjCL+Gd0gOkY2Y3zf229H6BjgH3ftiUTknd58m80Dul62qAo+DCWuKCU2HUhEqz4PBMqgQnNNxSMyHuTzvaDp5Q3xaBI8pYDa22l/oLBb3YNuahzkYpSCSj6r1MFYnN0k3NR0EN9fpwcv3xD2AcFhd5QSazRQ9CpiPvtUOVmTWvTeIHpjD5IvqindGgVCtkxjlhUcuIRwyT+9wdKyfp3vsQtQ8zbCt/TZ4efNhDuB07LGHx7/dVk6+ph4dOpLXnTDXDhsapF7vBWfp6n59K9Le2eDH7mo5PdgSArTWhsUS55QmyzxdFIYlwr5FW88HowIOlJjY4L2oqqGwGi4LmlXSC3H5vktbm+Y1euiuOUIvUXThTOI/+6JE7XJWDgp25M2Xas4oKP1zOC4atGe0qbNebd86DZmwUCI4vJr+eDzn8SUhHz5cJ2thOm/NWRjhRv/FrNlTyno0NFxOb+C/GfngASYRfZ/dgHcTRb01ERcQBtOSjw8Obtcr/W8ZalMBSrGIy56LKcrmXrf9XC102c5IHThCWfmUAQVksj/T0ocFCSylW2Woygp1MRJH2szxUG9VBAd2lD9X+JQ2yhlvmHMG57hzCnhcJj3fbwN4B2BK8wbsSQIUHhX0gbd5sqgpkBI1oZhIhJhq2aAU3d6QrsIo5KCoDFuzj5hFIAISs2KyGYLf+mcMOuisY7cIe8dKXncM/2lQbILjxRJXdxPhSdMuNNuaX6ekEpTXAm26T2ccdMS3wi05UtuOMJ77imPzDfANrBQ4mwk05Ur5XrwAAoqZ2LCUzx4ThGFRvwhVR6OagpL/Ds7WYFGvPLOJ9B2oaDrRXWofofeAPPfPzkOTYLzzdWZzVxai0Y/Br5gD3Lr6D2Ck7BinMLQ8x1UIkw+INlBjTGjycDK0VNOoyXVEAxK1cI/56T2hVSCoTO8iZTjIh2Fw3RUJR0s3B6UNxmbvbeCnAC23zzw/KkpjxD1t0CdI4udNurIKV2Q00v860jss+OPAnSgeOPRxxg7zSpOuek8DaiMFb1GfE4ty5fvzXmFvjqgwHhsjlba0t/Xj8iECDqjbPij7r6U/C3y8Zv/XMQfL67ojifJn63BnrzmcSePYOXA5vUY5jZ9H8zzsVO7OwhmRf1C7VwXnjwOtcZkKtULOhoF7Mpc0+InZFbkYFqHBIbi7NTg3jN0M/vQnqWMTzPrcIhXuS5x4oyy0x5xFP0QA/F/oOA5375NtB+ppjH4uGi0c9k4lXvw+5Z3Pud+wMZ5R71tXIpTqcgxE1kFSnNoFkgDyOqVfEoaUTcVmZd6RS1qo6dAjEAZCbI3PsGQ/y4QcQT2WcG18OG8Pn+mDci/6PWWuTcUU83VawGKv0abAsocJ4aBjZXS7LjUP1NR4Brwd6OaKuPdZXdI2ppSwFkHxFRz4+bC+D0KhQ9O02gKaqFF
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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/#page","headline":"Claude Opus 4.5","description":"Claude Opus 4.5 brings further reasoning, coding, and agentic improvements over Opus 4.1, with stronger tool use and tighter instruction following.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
