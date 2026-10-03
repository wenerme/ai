---
description: Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.
title: Claude Haiku 4.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Haiku 4.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-haiku-4.5`

- Third-party
- Zero data retention

Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/haiku) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$1.00</li><li>Output (per 1M tokens)$5.00</li><li>Cached input (per 1M tokens)$0.10</li><li>Cache creation (per 1M tokens)$1.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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
Energy cannot be created or destroyed, only converted from one form to another. The total energy input to a system equals the change in internal energy plus the work done by the system.

## Second Law (Entropy)
The entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold objects, not the reverse, and no process can be 100% efficient at converting heat to work.

## Third Law (Absolute Zero)
As temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero through any finite process.

---

These laws form the foundation of thermodynamics and explain why perpetual motion machines are impossible and why certain processes naturally occur while others don't.
```

```json
{
  "content": [
    {
      "text": "# The Three Laws of Thermodynamics\n\n## First Law (Conservation of Energy)\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy input to a system equals the change in internal energy plus the work done by the system.\n\n## Second Law (Entropy)\nThe entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold objects, not the reverse, and no process can be 100% efficient at converting heat to work.\n\n## Third Law (Absolute Zero)\nAs temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero through any finite process.\n\n---\n\nThese laws form the foundation of thermodynamics and explain why perpetual motion machines are impossible and why certain processes naturally occur while others don't.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01AudBc47nYro7MFJatA3KAW",
  "model": "claude-haiku-4-5-20251001",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 17,
    "output_tokens": 191
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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

Here are the most common methods:

## 1. **Basic Method (Recommended)**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(data)
```

## 2. **Reading JSON String**
If you have JSON as a string instead:
```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)

print(data)
```

## 3. **With Error Handling**
```python
import json

try:
    with open('file.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError:
    print("Invalid JSON format")
```

## 4. **Pretty Print the Data**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(json.dumps(data, indent=2))
```

## Key Differences
| Method | Use Case |
|--------|----------|
| `json.load()` | Read from a file object |
| `json.loads()` | Parse a JSON string |

## Example
**file.json:**
```json
{
  "name": "Alice",
  "age": 25,
  "city": "New York"
}
```

**Python code:**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)
    print(data['name'])  # Output: Alice
```

The `with` statement is recommended because it automatically closes the file when done.
````

```json
{
  "content": [
    {
      "text": "# Reading a JSON File in Python\n\nHere are the most common methods:\n\n## 1. **Basic Method (Recommended)**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## 2. **Reading JSON String**\nIf you have JSON as a string instead:\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data)\n```\n\n## 3. **With Error Handling**\n```python\nimport json\n\ntry:\n    with open('file.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format\")\n```\n\n## 4. **Pretty Print the Data**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n\nprint(json.dumps(data, indent=2))\n```\n\n## Key Differences\n| Method | Use Case |\n|--------|----------|\n| `json.load()` | Read from a file object |\n| `json.loads()` | Parse a JSON string |\n\n## Example\n**file.json:**\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 25,\n  \"city\": \"New York\"\n}\n```\n\n**Python code:**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n    print(data['name'])  # Output: Alice\n```\n\nThe `with` statement is recommended because it automatically closes the file when done.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_018PXaVwoWM8Eo7X51oCHmhz",
  "model": "claude-haiku-4-5-20251001",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 28,
    "output_tokens": 425
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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
# Good Stops on the SF to LA Route

**Halfway/Central Coast Options:**
- **San Luis Obispo** - Charming town with a mission, wineries, and Thursday night farmers market
- **Santa Barbara** - Beautiful coastal town with beaches, State Street shopping, and wine tasting
- **Solvang** - Danish village with unique architecture, wineries, and restaurants

**Scenic Detours:**
- **Big Sur** - Stunning coastal cliffs (adds time but worth it for photos)
- **Hearst Castle** - Historic mansion with tours in San Simeon
- **Monterey/Carmel** - Coastal towns with aquariums, beaches, and galleries

**Faster Route Stops:**
- **Salinas** - Agricultural hub, reasonable break point
- **Paso Robles** - Wine country with tasting rooms

**Tips:**
- Plan for 7-8 hours total if you want to stop for a meal and explore
- Big Sur adds 1-2 hours but offers incredible views
- Consider stopping overnight if you want a more relaxed trip

What's your timeline? Are you interested in nature, wine, food, or something else? That would help me narrow down recommendations.
```

```json
{
  "content": [
    {
      "text": "# Good Stops on the SF to LA Route\n\n**Halfway/Central Coast Options:**\n- **San Luis Obispo** - Charming town with a mission, wineries, and Thursday night farmers market\n- **Santa Barbara** - Beautiful coastal town with beaches, State Street shopping, and wine tasting\n- **Solvang** - Danish village with unique architecture, wineries, and restaurants\n\n**Scenic Detours:**\n- **Big Sur** - Stunning coastal cliffs (adds time but worth it for photos)\n- **Hearst Castle** - Historic mansion with tours in San Simeon\n- **Monterey/Carmel** - Coastal towns with aquariums, beaches, and galleries\n\n**Faster Route Stops:**\n- **Salinas** - Agricultural hub, reasonable break point\n- **Paso Robles** - Wine country with tasting rooms\n\n**Tips:**\n- Plan for 7-8 hours total if you want to stop for a meal and explore\n- Big Sur adds 1-2 hours but offers incredible views\n- Consider stopping overnight if you want a more relaxed trip\n\nWhat's your timeline? Are you interested in nature, wine, food, or something else? That would help me narrow down recommendations.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01H4xB3mngxiKQMyrfDoJzKe",
  "model": "claude-haiku-4-5-20251001",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 76,
    "output_tokens": 279
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Higher temperature for creative output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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
# The Photograph

Detective Sarah Chen stood in the victim's apartment, her latex gloves snapping softly as she examined the bookshelf for the third time. The case had gone cold within hours—no signs of forced entry, no witnesses, no motive that made sense.

Then she saw it.

Wedged behind a row of paperbacks, barely visible, was a Polaroid photograph. Sarah's breath caught. Not because of what it showed—a lake at sunset, unremarkable—but because of what was written on the back in faded blue ink:

*"The day before everything changed."*

And underneath, a date: twenty-three years ago.

Sarah turned the photo over again, studying the water, the trees, the single figure standing at the shore. The figure's face was deliberately obscured by a smudge of thumb, as if someone had tried to erase it.

She'd been a detective for twelve years. She'd learned that most mysteries had ordinary answers: greed, passion, rage. But something about this photograph—the deliberate hiding place, the cryptic message, the erased face—told her this case was different.

This photograph wasn't evidence of a crime.

It was a warning.
```

```json
{
  "content": [
    {
      "text": "# The Photograph\n\nDetective Sarah Chen stood in the victim's apartment, her latex gloves snapping softly as she examined the bookshelf for the third time. The case had gone cold within hours—no signs of forced entry, no witnesses, no motive that made sense.\n\nThen she saw it.\n\nWedged behind a row of paperbacks, barely visible, was a Polaroid photograph. Sarah's breath caught. Not because of what it showed—a lake at sunset, unremarkable—but because of what was written on the back in faded blue ink:\n\n*\"The day before everything changed.\"*\n\nAnd underneath, a date: twenty-three years ago.\n\nSarah turned the photo over again, studying the water, the trees, the single figure standing at the shore. The figure's face was deliberately obscured by a smudge of thumb, as if someone had tried to erase it.\n\nShe'd been a detective for twelve years. She'd learned that most mysteries had ordinary answers: greed, passion, rage. But something about this photograph—the deliberate hiding place, the cryptic message, the erased face—told her this case was different.\n\nThis photograph wasn't evidence of a crime.\n\nIt was a warning.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01TG861uc7b1Tbn664aaCLPf",
  "model": "claude-haiku-4-5-20251001",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 21,
    "output_tokens": 269
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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

**Recursion** is when a function calls itself to solve smaller instances of the same problem until it reaches a simple base case.

## Key Components

1. **Base Case**: The condition that stops the recursion
2. **Recursive Case**: The function calling itself with a simpler input

## Simple Example: Factorial

Calculate 5! (5 × 4 × 3 × 2 × 1)

```python
def factorial(n):
    # Base case: stop here
    if n == 1:
        return 1

    # Recursive case: break problem into smaller piece
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

### How It Works

```
factorial(5)
→ 5 * factorial(4)
  → 4 * factorial(3)
    → 3 * factorial(2)
      → 2 * factorial(1)
        → return 1  [BASE CASE]
      → return 2 * 1 = 2
    → return 3 * 2 = 6
  → return 4 * 6 = 24
→ return 5 * 24 = 120
```

## Real-World Analogy

It's like opening Russian nesting dolls:
- Open a doll → find a smaller doll inside
- Open that doll → find an even smaller one
- Keep going until you reach the tiniest doll (base case)
- Now work backwards: you've reached the smallest piece

## Why Use Recursion?

✅ **Good for**: Problems with naturally recursive structure (trees, nested data, divide-and-conquer)
⚠️ **Caution**: Can be slow and cause stack overflow if not careful

Recursion is elegant but always ensure you have a clear base case!
````

```json
[
  {
    "message": {
      "content": [],
      "id": "msg_01KvQp2GZvMb9V166tjgWh8q",
      "model": "claude-haiku-4-5-20251001",
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
        "output_tokens": 2,
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
  "... 19 more chunks omitted ...",
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
  'anthropic/claude-haiku-4.5',
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
  "model": "anthropic/claude-haiku-4.5",
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
Let me search for more recent news from this week specifically.
```

```json
{
  "id": "msg_01NgyYq84DqRm9gyaizK2pMV",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_01R5mdFCHNmfZ1M66S6yRNnU",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news this week 2026"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_01R5mdFCHNmfZ1M66S6yRNnU",
      "content": [
        {
          "type": "web_search_result",
          "title": "Agents Week 2026 Updates and Announcements | Cloudflare",
          "url": "https://www.cloudflare.com/agents-week/updates/",
          "encrypted_content": "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",
          "page_age": "May 18, 2026"
        },
        {
          "type": "web_search_result",
          "title": "Cloudflare Status",
          "url": "https://www.cloudflarestatus.com/",
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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/#page","headline":"Claude Haiku 4.5","description":"Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-haiku-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
